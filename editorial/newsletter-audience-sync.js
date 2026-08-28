/* Sync the Swop Daily newsletter audience into Resend.
   Part of the daily newsletter flow (see editorial/NEWSLETTER.md).

   Eligible recipients = Swop users with a Privy DID (privyId matching
   ^did:privy:) and an email, deduped by lowercased email, minus any email that
   appears in the deleteusers collection (deleted accounts). Unsubscribes are
   owned by Resend: a contact who unsubscribed stays in the audience with
   unsubscribed=true and is therefore never "missing", so this script never
   re-adds them.

   Usage (MUST run from the swop-app-backend checkout so Mongo creds resolve):
     cd ../swop-app-backend && node ../swop-website/editorial/newsletter-audience-sync.js [--dry-run]

   Key: RESEND_API_KEY env var, or a RESEND_API_KEY=... line in
   ~/.config/swop/resend.env. Audience id lives in editorial/resend.config.json
   (created on first run if missing) or RESEND_AUDIENCE_ID env.

   Exit code 0 prints a JSON summary on the last line, including
   new_wallets_24h for the newsletter bento. */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createRequire } = require('module');

const backendRoot = process.cwd(); // must be swop-app-backend
const breq = createRequire(path.join(backendRoot, 'package.json'));

const CONFIG_PATH = path.join(__dirname, 'resend.config.json');
const RESEND = 'https://api.resend.com';
const DRY = process.argv.includes('--dry-run');

function apiKey() {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;
  const p = path.join(os.homedir(), '.config/swop/resend.env');
  if (fs.existsSync(p)) {
    const m = fs.readFileSync(p, 'utf8').match(/^RESEND_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  }
  throw new Error('RESEND_API_KEY not set (env or ~/.config/swop/resend.env)');
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function resend(key, method, p, body, attempt = 0) {
  const r = await fetch(RESEND + p, {
    method,
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (r.status === 429 && attempt < 5) {
    await sleep(1500 * (attempt + 1));
    return resend(key, method, p, body, attempt + 1);
  }
  const text = await r.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!r.ok) throw new Error(`${method} ${p} -> ${r.status}: ${text.slice(0, 300)}`);
  return json;
}

async function listAllContacts(key, audienceId) {
  // Paginate defensively: Resend has returned both full lists and paged lists
  // depending on API vintage. Stop when a page adds no new ids.
  const byEmail = new Map();
  let after = '';
  for (let page = 0; page < 100; page++) {
    const q = after ? `?limit=100&after=${after}` : '?limit=100';
    const res = await resend(key, 'GET', `/audiences/${audienceId}/contacts${q}`);
    const rows = res.data || [];
    let added = 0;
    for (const c of rows) {
      const e = (c.email || '').toLowerCase().trim();
      if (e && !byEmail.has(e)) { byEmail.set(e, c); added++; }
    }
    if (!rows.length || added === 0 || rows.length < 100) break;
    after = rows[rows.length - 1].id;
    await sleep(550);
  }
  return byEmail;
}

(async () => {
  let key = null;
  try { key = apiKey(); } catch (e) { if (!DRY) throw e; }
  breq('dotenv').config();
  const mongoose = breq('mongoose');
  const { initAppSecrets } = breq('./src/utils/awsSecrets');
  await initAppSecrets();
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 9000 });
  const db = mongoose.connection.db;

  const deleted = new Set(
    (await db.collection('deleteusers').distinct('email', { email: { $regex: /@/ } }))
      .map((e) => e.toLowerCase().trim())
  );

  const eligible = new Map(); // email -> {firstName, lastName}
  const cur = db.collection('users').find(
    { privyId: { $regex: /^did:privy:/ }, email: { $regex: /@/ } },
    { projection: { email: 1, name: 1 } }
  );
  for await (const u of cur) {
    const e = u.email.toLowerCase().trim();
    if (deleted.has(e) || eligible.has(e)) continue;
    const parts = String(u.name || '').trim().split(/\s+/);
    eligible.set(e, { firstName: parts[0] || '', lastName: parts.slice(1).join(' ') });
  }

  const dayAgo = new Date(Date.now() - 24 * 3600 * 1000);
  const newWallets24h = await db.collection('users').countDocuments({ createdAt: { $gte: dayAgo } });
  // Bento stats (see NEWSLETTER.md): only ledgers that are actually written today.
  const weekAgo = new Date(Date.now() - 7 * 24 * 3600 * 1000);
  const claims = async (since) => (await db.collection('predictionclaimattempts').aggregate([
    { $match: { createdAt: { $gte: since }, status: 'confirmed' } },
    { $group: { _id: null, n: { $sum: 1 }, usd: { $sum: '$amountUsd' } } },
  ]).toArray())[0] || { n: 0, usd: 0 };
  const [c24, c7d] = [await claims(dayAgo), await claims(weekAgo)];
  const stats = {
    wallets_total: await db.collection('users').estimatedDocumentCount(),
    new_wallets_24h: newWallets24h,
    winnings_paid_24h_usd: Math.round(c24.usd),
    winners_24h: c24.n,
    winnings_paid_7d_usd: Math.round(c7d.usd),
    winners_7d: c7d.n,
  };
  await mongoose.disconnect();

  if (DRY && !key) {
    console.log(JSON.stringify({
      dryRun: true, resend: 'skipped (no RESEND_API_KEY)',
      eligible: eligible.size, ...stats,
    }));
    return;
  }

  // Resolve audience
  let cfg = {};
  try { cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8')); } catch {}
  let audienceId = process.env.RESEND_AUDIENCE_ID || cfg.audienceId;
  if (!audienceId) {
    const listed = await resend(key, 'GET', '/audiences');
    const found = (listed.data || []).find((a) => a.name === (cfg.audienceName || 'Swop Daily'));
    if (found) audienceId = found.id;
  }
  if (!audienceId) {
    if (DRY) {
      console.log(JSON.stringify({ dryRun: true, eligible: eligible.size, audience: 'would create "Swop Daily"', new_wallets_24h: newWallets24h }));
      return;
    }
    const created = await resend(key, 'POST', '/audiences', { name: cfg.audienceName || 'Swop Daily' });
    audienceId = created.id;
  }
  if (cfg.audienceId !== audienceId) {
    cfg = { audienceName: 'Swop Daily', from: 'Swop Daily <news@news.swopme.co>', replyTo: 'travis@swopme.co', ...cfg, audienceId };
    if (!DRY) fs.writeFileSync(CONFIG_PATH, JSON.stringify(cfg, null, 2) + '\n');
  }

  const existing = await listAllContacts(key, audienceId);
  const toAdd = [...eligible].filter(([e]) => !existing.has(e));
  const toRemove = [...existing.keys()].filter((e) => deleted.has(e));
  const unsubscribed = [...existing.values()].filter((c) => c.unsubscribed).length;

  if (DRY) {
    console.log(JSON.stringify({
      dryRun: true, audienceId, eligible: eligible.size, alreadyPresent: existing.size,
      wouldAdd: toAdd.length, wouldRemoveDeleted: toRemove.length, unsubscribed,
      ...stats,
    }));
    return;
  }

  let added = 0;
  for (const [email, n] of toAdd) {
    await resend(key, 'POST', `/audiences/${audienceId}/contacts`, {
      email, first_name: n.firstName, last_name: n.lastName, unsubscribed: false,
    });
    added++;
    if (added % 50 === 0) console.error(`  added ${added}/${toAdd.length}`);
    await sleep(550);
  }
  let removed = 0;
  for (const email of toRemove) {
    await resend(key, 'DELETE', `/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`);
    removed++;
    await sleep(550);
  }

  console.log(JSON.stringify({
    audienceId, eligible: eligible.size, added, removedDeleted: removed,
    nowInAudience: existing.size + added - removed, unsubscribed,
    ...stats,
  }));
})().catch((e) => { console.error(e.message); process.exit(1); });
