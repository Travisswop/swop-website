/* One-time TikTok OAuth helper (Content Posting API). Spins up a local HTTP
   server to catch the redirect, exchanges the code for an access token, and
   prints exactly what to save into ~/.config/swop/tiktok.env.

   Cannot be run yet — TikTok requires manual app review before any posting
   scope (video.publish) is granted, and this script needs a live, approved
   app + registered redirect URI first. Written ahead of time so there's
   nothing left to build once TikTok approves; see ../SETUP.md#tiktok for the
   registration steps.

   IMPORTANT CAVEAT (unlike LinkedIn/Google): TikTok's docs require redirect
   URIs to be a verified HTTPS domain you control — a bare
   `http://localhost:PORT/callback` like the other oauth/*-auth.js helpers
   use is NOT guaranteed to be accepted. If TikTok's app dashboard rejects a
   localhost redirect URI, the fallback is to register a real
   https://www.swopme.co/... callback path (a static page that just displays
   the `code` query param for manual copy-paste) instead of relying on this
   script's local server catching it automatically — swap REDIRECT_URI below
   and adjust the flow accordingly if that happens.

   Prereqs (see ../../SETUP.md#tiktok):
     1. Register at https://developers.tiktok.com, create an app
     2. Request the "Content Posting API" product + `user.info.basic` and
        `video.publish` scopes — TikTok reviews this manually
     3. Once approved, add the redirect URI below to the app's settings
     4. Copy the Client Key and Client Secret

   Usage:
     TIKTOK_CLIENT_KEY=... TIKTOK_CLIENT_SECRET=... node oauth/tiktok-auth.js */
const http = require('http');
const crypto = require('crypto');
const { execSync } = require('child_process');

const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY;
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:8736/callback';
const SCOPES = 'user.info.basic,video.publish';
const STATE = crypto.randomBytes(8).toString('hex');

if (!CLIENT_KEY || !CLIENT_SECRET) {
  console.error('set TIKTOK_CLIENT_KEY and TIKTOK_CLIENT_SECRET env vars first (from your TikTok app\'s Basic Information tab)');
  process.exit(1);
}

const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${CLIENT_KEY}&scope=${encodeURIComponent(SCOPES)}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${STATE}`;

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) { res.end('waiting...'); return; }
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');
  const returnedState = url.searchParams.get('state');
  if (!code) { res.end('no code in callback — check TikTok app config: ' + req.url); return; }
  if (returnedState !== STATE) { res.end('state mismatch — possible CSRF, aborting'); server.close(); process.exit(1); }
  res.end('Got it — check your terminal for the access token. You can close this tab.');

  const r = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache' },
    body: new URLSearchParams({
      client_key: CLIENT_KEY,
      client_secret: CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
    }),
  });
  const j = await r.json();
  if (!r.ok || j.error) { console.error('token exchange failed:', j); server.close(); process.exit(1); }
  console.log('\nSave this to ~/.config/swop/tiktok.env:\n');
  console.log(`TIKTOK_ACCESS_TOKEN=${j.access_token}`);
  console.log(`TIKTOK_REFRESH_TOKEN=${j.refresh_token}`);
  console.log(`\n(access token expires in ${Math.round(j.expires_in / 3600)}h; refresh token lasts ~1 year —`);
  console.log('tiktok.js does not auto-refresh yet, so re-run this script if whoami.js starts failing)');
  server.close();
});

server.listen(8736, () => {
  console.log('Open this URL to authorize (log in as the account that should post):\n');
  console.log(authUrl + '\n');
  try { execSync(`open "${authUrl}"`); } catch { /* not on macOS with `open`, or headless — just paste the URL manually */ }
});
