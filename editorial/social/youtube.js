/* YouTube Data API v3 — video only, resumable upload. Uses a stored OAuth2
   refresh token (Google installed-app flow, see oauth/youtube-auth.js) to
   mint short-lived access tokens on demand, so there's no manual re-auth
   once set up. Not usable until a Google Cloud project + OAuth client exist
   — see ../SETUP.md#youtube. */
const fs = require('fs');
const { loadCreds } = require('./lib/creds');

function creds() {
  return loadCreds('youtube', ['YOUTUBE_CLIENT_ID', 'YOUTUBE_CLIENT_SECRET', 'YOUTUBE_REFRESH_TOKEN']);
}

async function getAccessToken({ YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET, YOUTUBE_REFRESH_TOKEN }) {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: YOUTUBE_CLIENT_ID,
      client_secret: YOUTUBE_CLIENT_SECRET,
      refresh_token: YOUTUBE_REFRESH_TOKEN,
      grant_type: 'refresh_token',
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`token refresh -> ${r.status}: ${JSON.stringify(j)}`);
  return j.access_token;
}

async function checkCreds() {
  const c = creds();
  const token = await getAccessToken(c);
  const r = await fetch('https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true', { headers: { Authorization: `Bearer ${token}` } });
  const j = await r.json();
  if (!r.ok) throw new Error(`channels -> ${r.status}: ${JSON.stringify(j)}`);
  return { platform: 'youtube', identity: j.items?.[0]?.snippet?.title };
}

async function publish({ text, title, video }, live) {
  const c = creds();
  if (!video) throw new Error('youtube requires --video (no static-image post type)');
  const videoTitle = title || text.slice(0, 100);

  if (!live) return { dryRun: true, platform: 'youtube', title: videoTitle, description: text, video };

  const token = await getAccessToken(c);
  const size = fs.statSync(video).size;

  const initRes = await fetch('https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Upload-Content-Type': 'video/mp4',
      'X-Upload-Content-Length': String(size),
    },
    body: JSON.stringify({
      snippet: { title: videoTitle, description: text },
      status: { privacyStatus: 'private' }, // default safe; flip to 'public' once verified in the caller
    }),
  });
  if (!initRes.ok) throw new Error(`resumable init -> ${initRes.status}: ${(await initRes.text()).slice(0, 500)}`);
  const uploadUrl = initRes.headers.get('location');

  const data = fs.readFileSync(video);
  const putRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': 'video/mp4', 'Content-Length': String(size) },
    body: data,
  });
  const j = await putRes.json();
  if (!putRes.ok) throw new Error(`resumable upload -> ${putRes.status}: ${JSON.stringify(j)}`);
  return { live: true, platform: 'youtube', posted: j };
}

module.exports = { checkCreds, publish };
