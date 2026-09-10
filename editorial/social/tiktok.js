/* TikTok Content Posting API — video only (TikTok has no static-image feed
   post in the public API). Requires TikTok app review before ANY posting
   scope works, even in sandbox with your own account for some scope tiers —
   see ../SETUP.md#tiktok. Not usable until that approval lands; wired up now
   so it's ready the moment it is. */
const fs = require('fs');
const { loadCreds } = require('./lib/creds');

const API = 'https://open.tiktokapis.com/v2';

function creds() {
  return loadCreds('tiktok', ['TIKTOK_ACCESS_TOKEN']);
}

async function call(method, p, token, body) {
  const r = await fetch(`${API}${p}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`${method} ${p} -> ${r.status}: ${text.slice(0, 500)}`);
  return JSON.parse(text);
}

async function checkCreds() {
  const { TIKTOK_ACCESS_TOKEN } = creds();
  const info = await call('GET', '/user/info/?fields=open_id,display_name', TIKTOK_ACCESS_TOKEN);
  return { platform: 'tiktok', identity: info.data?.user?.display_name };
}

async function publish({ text, video }, live) {
  const { TIKTOK_ACCESS_TOKEN } = creds();
  if (!video) throw new Error('tiktok requires --video (TikTok has no static-image post type)');
  const size = fs.statSync(video).size;
  const CHUNK = 10 * 1024 * 1024; // 10MB, mid-range per TikTok's chunking rules
  const chunkCount = Math.max(1, Math.ceil(size / CHUNK));

  if (!live) return { dryRun: true, platform: 'tiktok', text, video, sizeBytes: size, chunkCount };

  const init = await call('POST', '/post/publish/video/init/', TIKTOK_ACCESS_TOKEN, {
    post_info: { title: text, privacy_level: 'SELF_ONLY', disable_duet: false, disable_comment: false, disable_stitch: false },
    source_info: { source: 'FILE_UPLOAD', video_size: size, chunk_size: Math.min(CHUNK, size), total_chunk_count: chunkCount },
  });
  const { publish_id, upload_url } = init.data;

  const data = fs.readFileSync(video);
  for (let i = 0; i < chunkCount; i++) {
    const start = i * CHUNK;
    const end = Math.min(start + CHUNK, size) - 1;
    const chunk = data.subarray(start, end + 1);
    const r = await fetch(upload_url, {
      method: 'PUT',
      headers: { 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Type': 'video/mp4' },
      body: chunk,
    });
    if (!r.ok) throw new Error(`PUT chunk ${i} -> ${r.status}`);
  }

  let status;
  for (let attempt = 0; attempt < 10; attempt++) {
    const s = await call('POST', '/post/publish/status/fetch/', TIKTOK_ACCESS_TOKEN, { publish_id });
    status = s.data.status;
    if (status === 'PUBLISH_COMPLETE' || status === 'FAILED') break;
    await new Promise((res) => setTimeout(res, 3000));
  }
  return { live: true, platform: 'tiktok', publish_id, status };
}

module.exports = { checkCreds, publish };
