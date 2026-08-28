/* Post a Swop Journal distribution thread to X (@swoplabs) as a reply chain.
   Part of the daily flow in editorial/PLAYBOOK.md step 8 — the drafter writes
   editorial/distribution/<slug>.x-thread.json, a human (or the post-merge
   trigger, once wired) runs this to actually publish it.

   Usage (any cwd; no deps beyond Node 18+ fetch/crypto):
     node post-to-x.js --thread <slug>.x-thread.json [--live] [--skip-live-check]

   Default (no --live) is a DRY RUN: verifies credentials against
   GET /2/users/me, checks every swopme.co URL in the thread actually
   resolves (200), and prints the exact posts it would make — nothing is
   published. Pass --live to actually post the thread as a reply chain.

   thread.json: { "posts": ["1/ ...", "2/ ...", ...] }  (posts[0] is the root)

   Credentials: OAuth 1.0a user context, "Read and write" app permissions.
   Env vars X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET, or a
   fallback file at ~/.config/swop/x.env with the same four keys (never
   commit real credentials — .env / *.env are gitignored). */
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const API = 'https://api.twitter.com';
const ENV_FALLBACK = path.join(os.homedir(), '.config/swop/x.env');

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
}
const has = (name) => process.argv.includes(name);

function creds() {
  const keys = ['X_API_KEY', 'X_API_SECRET', 'X_ACCESS_TOKEN', 'X_ACCESS_SECRET'];
  const out = {};
  for (const k of keys) if (process.env[k]) out[k] = process.env[k];
  if (Object.keys(out).length < keys.length && fs.existsSync(ENV_FALLBACK)) {
    const text = fs.readFileSync(ENV_FALLBACK, 'utf8');
    for (const k of keys) {
      if (out[k]) continue;
      const m = text.match(new RegExp(`^${k}=(.+)$`, 'm'));
      if (m) out[k] = m[1].trim();
    }
  }
  const missing = keys.filter((k) => !out[k]);
  if (missing.length) throw new Error(`missing credentials: ${missing.join(', ')} (env or ${ENV_FALLBACK})`);
  return { apiKey: out.X_API_KEY, apiSecret: out.X_API_SECRET, token: out.X_ACCESS_TOKEN, tokenSecret: out.X_ACCESS_SECRET };
}

// --- OAuth 1.0a signing (HMAC-SHA1). No form body params are signed here —
// every call we make is either a bare GET or a JSON POST, and per the OAuth1
// spec only application/x-www-form-urlencoded bodies join the signature base. ---
function pct(s) {
  return encodeURIComponent(s).replace(/[!*'()]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

function oauthHeader(method, url, c) {
  const u = new URL(url);
  const oauthParams = {
    oauth_consumer_key: c.apiKey,
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: String(Math.floor(Date.now() / 1000)),
    oauth_token: c.token,
    oauth_version: '1.0',
  };
  const allParams = { ...oauthParams };
  for (const [k, v] of u.searchParams) allParams[k] = v;
  const paramString = Object.keys(allParams).sort()
    .map((k) => `${pct(k)}=${pct(allParams[k])}`).join('&');
  const baseUrl = `${u.protocol}//${u.host}${u.pathname}`;
  const baseString = `${method.toUpperCase()}&${pct(baseUrl)}&${pct(paramString)}`;
  const signingKey = `${pct(c.apiSecret)}&${pct(c.tokenSecret)}`;
  const signature = crypto.createHmac('sha1', signingKey).update(baseString).digest('base64');

  const headerParams = { ...oauthParams, oauth_signature: signature };
  const header = 'OAuth ' + Object.keys(headerParams).sort()
    .map((k) => `${pct(k)}="${pct(headerParams[k])}"`).join(', ');
  return header;
}

async function xCall(method, p, c, body) {
  const url = API + p;
  const headers = { Authorization: oauthHeader(method, url, c) };
  if (body) headers['Content-Type'] = 'application/json';
  const r = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const text = await r.text();
  if (!r.ok) throw new Error(`${method} ${p} -> ${r.status}: ${text.slice(0, 400)}`);
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

async function checkUrlsLive(posts) {
  const urls = [...new Set(posts.join(' ').match(/https:\/\/www\.swopme\.co\S*/g) || [])]
    .map((u) => u.replace(/[).,]+$/, ''));
  const results = [];
  for (const u of urls) {
    try {
      const r = await fetch(u, { method: 'GET', redirect: 'follow' });
      results.push({ url: u, status: r.status, ok: r.ok });
    } catch (e) {
      results.push({ url: u, status: 'ERR', ok: false, error: e.message });
    }
  }
  return results;
}

(async () => {
  const threadPath = arg('--thread');
  if (!threadPath) throw new Error('usage: post-to-x.js --thread <slug>.x-thread.json [--live] [--skip-live-check]');
  const { posts } = JSON.parse(fs.readFileSync(path.resolve(threadPath), 'utf8'));
  if (!Array.isArray(posts) || !posts.length) throw new Error('thread.json needs a non-empty "posts" array');
  for (const [i, p] of posts.entries()) {
    if (p.length > 280) throw new Error(`post ${i + 1} is ${p.length} chars, over the 280 limit`);
  }

  const c = creds();

  if (!has('--skip-live-check')) {
    const checks = await checkUrlsLive(posts);
    const dead = checks.filter((r) => !r.ok);
    if (dead.length) {
      console.error('URL check failed — not posting a thread that links to a dead page:');
      console.error(JSON.stringify(checks, null, 2));
      process.exit(1);
    }
    if (checks.length) console.log('URL check OK:', checks.map((r) => `${r.url} -> ${r.status}`).join(', '));
  }

  if (!has('--live')) {
    const me = await xCall('GET', '/2/users/me', c);
    console.log(JSON.stringify({
      dryRun: true,
      authenticatedAs: me.data ? `@${me.data.username}` : me,
      postCount: posts.length,
      posts,
    }, null, 2));
    return;
  }

  let replyTo;
  const posted = [];
  for (const text of posts) {
    const body = replyTo ? { text, reply: { in_reply_to_tweet_id: replyTo } } : { text };
    const res = await xCall('POST', '/2/tweets', c, body);
    replyTo = res.data.id;
    posted.push({ id: res.data.id, text });
    console.log('posted:', res.data.id);
  }
  console.log(JSON.stringify({ live: true, posted }, null, 2));
})().catch((e) => { console.error(e.message); process.exit(1); });
