/* One-time LinkedIn OAuth helper. Spins up a local HTTP server to catch the
   redirect, exchanges the code for an access token, and prints exactly what
   to save into ~/.config/swop/linkedin.env.

   Prereqs (do this in the LinkedIn Developer Portal first — see ../../SETUP.md#linkedin):
     1. Create an app at https://www.linkedin.com/developers/apps
     2. Add the "Sign In with LinkedIn using OpenID Connect" AND
        "Share on LinkedIn" products
     3. Under Auth, add redirect URL: http://localhost:8734/callback
     4. Copy the Client ID and Client Secret

   Usage:
     LINKEDIN_CLIENT_ID=... LINKEDIN_CLIENT_SECRET=... node oauth/linkedin-auth.js
   Then open the printed URL in a browser, log in, approve. */
const http = require('http');
const { execSync } = require('child_process');

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:8734/callback';
const SCOPES = 'openid profile w_member_social';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET env vars first (from your LinkedIn app\'s Auth tab)');
  process.exit(1);
}

const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/callback')) { res.end('waiting...'); return; }
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get('code');
  if (!code) { res.end('no code in callback — check LinkedIn app config'); return; }
  res.end('Got it — check your terminal for the access token. You can close this tab.');

  const r = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
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
  console.log('\nSave this to ~/.config/swop/linkedin.env:\n');
  console.log(`LINKEDIN_ACCESS_TOKEN=${j.access_token}`);
  console.log(`\n(expires in ${Math.round(j.expires_in / 86400)} days — re-run this script to refresh when it lapses)`);
  server.close();
});

server.listen(8734, () => {
  console.log('Open this URL to authorize (log in as the account that should post):\n');
  console.log(authUrl + '\n');
  try { execSync(`open "${authUrl}"`); } catch { /* not on macOS with `open`, or headless — just paste the URL manually */ }
});
