/* Polls Beachhead's content calendar for due social-post items and executes
   them via post.js. Meant to run every few minutes from a local launchd job
   (co.swopme.social-scheduler) — Beachhead itself is Vercel/serverless and
   holds no posting credentials, so something local has to wake up and fire
   these (same shape as the existing blog-loop's marketing-ship job).

   A calendar item becomes a schedulable social post when added via
   Beachhead's calendar UI with channel "social" — see beachhead's
   public/index.html calAdd(). Shape (fields beyond the base calendar item):
     { ch: "social", platforms: "x,swop", imagePaths: "path1,path2",
       time: "HH:MM", caption: "full post text" }

   Safety property: an item is marked done=true the MOMENT it's picked up,
   before any posting happens — not after. Duplicate posts are worse than a
   silently-missed one (which shows up as a stuck "posting…" note Travis can
   re-add by hand), so this never re-fires an item across overlapping ticks
   or a mid-run crash.

   Usage: node schedule-poller.js [--dry-run]
   Requires MARKETING_TOKEN — env var, or read from beachhead/.env.marketing. */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const BEACHHEAD_URL = process.env.BEACHHEAD_URL || 'https://beachhead.swopme.co';
const DRY_RUN = process.argv.includes('--dry-run');

function marketingToken() {
  if (process.env.MARKETING_TOKEN) return process.env.MARKETING_TOKEN;
  const envFile = path.join(__dirname, '..', '..', '..', 'beachhead', '.env.marketing');
  if (fs.existsSync(envFile)) {
    const m = fs.readFileSync(envFile, 'utf8').match(/^MARKETING_TOKEN=(.+)$/m);
    if (m) return m[1].trim();
  }
  throw new Error(`MARKETING_TOKEN not set (env or ${envFile})`);
}

function expandHome(p) {
  return p.startsWith('~') ? path.join(os.homedir(), p.slice(1)) : p;
}

function dueAt(item) {
  return new Date(`${item.d}T${item.time || '09:00'}:00`);
}

async function fetchSocialItems(token) {
  const r = await fetch(`${BEACHHEAD_URL}/api/calendar?channel=social`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!r.ok) throw new Error(`GET /api/calendar -> ${r.status}: ${(await r.text()).slice(0, 300)}`);
  const j = await r.json();
  return j.items || [];
}

async function patchItem(token, id, patch) {
  const r = await fetch(`${BEACHHEAD_URL}/api/calendar`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...patch }),
  });
  if (!r.ok) throw new Error(`PATCH /api/calendar -> ${r.status}: ${(await r.text()).slice(0, 300)}`);
}

function runPost({ platforms, caption, images }) {
  const scriptPath = path.join(__dirname, 'post.js');
  const args = [scriptPath, '--platforms', platforms, '--text', caption, '--live'];
  for (const img of images) args.push('--image', img);
  const res = spawnSync('node', args, { encoding: 'utf8' });
  let parsed;
  try { parsed = JSON.parse(res.stdout); } catch { parsed = null; }
  return { status: res.status, stdout: res.stdout, stderr: res.stderr, parsed };
}

function summarize(parsed) {
  if (!parsed || !Array.isArray(parsed.results)) return 'no result parsed — check logs';
  return parsed.results
    .map((r) => `${r.platform}:${r.error ? 'ERROR ' + r.error.slice(0, 80) : 'ok'}`)
    .join(' ');
}

async function run() {
  const token = marketingToken();
  const items = await fetchSocialItems(token);
  const now = new Date();
  const due = items.filter((it) => it.ch === 'social' && !it.done && it.platforms && it.caption && dueAt(it) <= now);

  if (!due.length) {
    console.log(`[${now.toISOString()}] no due social items (checked ${items.length})`);
    return;
  }

  for (const item of due) {
    console.log(`[${now.toISOString()}] due: ${item.id} "${item.t}" @ ${item.d} ${item.time}`);
    if (DRY_RUN) {
      console.log(`  would post platforms="${item.platforms}" images="${item.imagePaths || ''}"`);
      continue;
    }

    // Claim it BEFORE posting — see the safety-property note at the top of this file.
    await patchItem(token, item.id, { done: true, note: `posting… (${new Date().toISOString()})` });

    const images = (item.imagePaths || '').split(',').map((s) => s.trim()).filter(Boolean).map(expandHome);
    const result = runPost({ platforms: item.platforms, caption: item.caption, images });
    const summary = summarize(result.parsed);
    console.log(`  result: ${summary}`);
    if (result.stderr) console.log(`  stderr: ${result.stderr.slice(0, 500)}`);

    await patchItem(token, item.id, { done: true, note: `Posted ${item.platforms} @ ${new Date().toISOString()} — ${summary}` });
  }
}

run().catch((e) => { console.error('ERR', e.message); process.exit(1); });
