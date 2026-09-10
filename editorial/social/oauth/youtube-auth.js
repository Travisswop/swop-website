/* One-time Google/YouTube OAuth helper (installed-app / loopback flow).
   Spins up a local HTTP server to catch the redirect, exchanges the code for
   a refresh token, and prints exactly what to save into
   ~/.config/swop/youtube.env.

   Prereqs (see ../../SETUP.md#youtube):
     1. Create a project at https://console.cloud.google.com
     2. Enable the "YouTube Data API v3"
     3. Configure the OAuth consent screen (External, Testing mode is fine
        for just your own channel — add your Google account as a test user)
     4. Create an OAuth Client ID, type "Desktop app"
     5. Copy the Client ID and Client Secret

   Usage:
     YOUTUBE_CLIENT_ID=... YOUTUBE_CLIENT_SECRET=... node oauth/youtube-auth.js */
const http = require('http');
const { execSync } = require('child_process');

const CLIENT_ID = process.env.YOUTUBE_CLIENT_ID;
const CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:8735/callback';
const SCOPES = 'https://www.googleapis.com/auth/youtube.upload';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('set YOUTUBE_CLIENT_ID and YOUTUBE_CLIENT_SECRET env vars first (from your Google Cloud OAuth client)');
  process.exit(1);
}

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPES)}&access_type=offline&prompt=consent`;

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) { res.end('waiting...'); return; }
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');
  if (!code) { res.end('no code in callback — check Google Cloud OAuth client config'); return; }
  res.end('Got it — check your terminal for the refresh token. You can close this tab.');

  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });
  const j = await r.json();
  if (!r.ok) { console.error('token exchange failed:', j); server.close(); process.exit(1); }
  console.log('\nSave this to ~/.config/swop/youtube.env:\n');
  console.log(`YOUTUBE_CLIENT_ID=${CLIENT_ID}`);
  console.log(`YOUTUBE_CLIENT_SECRET=${CLIENT_SECRET}`);
  console.log(`YOUTUBE_REFRESH_TOKEN=${j.refresh_token}`);
  console.log('\n(refresh tokens don\'t expire under normal use — no need to re-run this unless access is revoked)');
  server.close();
});

server.listen(8735, () => {
  console.log('Open this URL to authorize (log in as the account that owns the channel):\n');
  console.log(authUrl + '\n');
  try { execSync(`open "${authUrl}"`); } catch { /* not on macOS, or headless — just paste the URL manually */ }
});
