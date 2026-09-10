/* Facebook Page + Instagram Business posting via the Graph API. One Meta app
   covers both; both need a long-lived PAGE access token (not a user token —
   see ../SETUP.md#meta for how to generate one with oauth/meta-setup.js).

   IMPORTANT asymmetry: Facebook Page photo posts accept a direct binary
   upload. Instagram's Content Publishing API does NOT — it fetches the image
   itself from a public `image_url` you give it. So `--image` (local file)
   works for Facebook; Instagram needs `--image-url` pointing at something
   already hosted (e.g. swopme.co). Passing only a local file for Instagram
   is a hard error, not a silent skip. */
const { loadCreds } = require('./lib/creds');
const { buildMultipart } = require('./lib/multipart');

const GRAPH = 'https://graph.facebook.com/v21.0';

function facebookCreds() {
  return loadCreds('meta', ['META_PAGE_ID', 'META_PAGE_ACCESS_TOKEN']);
}
function instagramCreds() {
  return loadCreds('meta', ['META_IG_USER_ID', 'META_PAGE_ACCESS_TOKEN']);
}

async function graphGet(p) {
  const r = await fetch(`${GRAPH}${p}`);
  const text = await r.text();
  if (!r.ok) throw new Error(`GET ${p} -> ${r.status}: ${text.slice(0, 500)}`);
  return JSON.parse(text);
}
async function graphPostJson(p) {
  const r = await fetch(`${GRAPH}${p}`, { method: 'POST' });
  const text = await r.text();
  if (!r.ok) throw new Error(`POST ${p} -> ${r.status}: ${text.slice(0, 500)}`);
  return JSON.parse(text);
}

async function checkCredsFacebook() {
  const { META_PAGE_ID, META_PAGE_ACCESS_TOKEN } = facebookCreds();
  const me = await graphGet(`/${META_PAGE_ID}?fields=name&access_token=${encodeURIComponent(META_PAGE_ACCESS_TOKEN)}`);
  return { platform: 'facebook', identity: me.name, pageId: META_PAGE_ID };
}
async function checkCredsInstagram() {
  const { META_IG_USER_ID, META_PAGE_ACCESS_TOKEN } = instagramCreds();
  const me = await graphGet(`/${META_IG_USER_ID}?fields=username&access_token=${encodeURIComponent(META_PAGE_ACCESS_TOKEN)}`);
  return { platform: 'instagram', identity: `@${me.username}`, igUserId: META_IG_USER_ID };
}

async function publishFacebook({ text, images = [] }, live) {
  const { META_PAGE_ID, META_PAGE_ACCESS_TOKEN } = facebookCreds();
  if (!live) return { dryRun: true, platform: 'facebook', text, images };

  if (images.length === 0) {
    const r = await fetch(`${GRAPH}/${META_PAGE_ID}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, access_token: META_PAGE_ACCESS_TOKEN }),
    });
    const j = await r.json();
    if (!r.ok) throw new Error(`POST /feed -> ${r.status}: ${JSON.stringify(j)}`);
    return { live: true, platform: 'facebook', posted: j };
  }

  if (images.length === 1) {
    // Single image: publish it directly with the caption as the message.
    const { body, contentType } = buildMultipart([
      { name: 'caption', value: text },
      { name: 'access_token', value: META_PAGE_ACCESS_TOKEN },
      { name: 'source', filePath: images[0] },
    ]);
    const r = await fetch(`${GRAPH}/${META_PAGE_ID}/photos`, { method: 'POST', headers: { 'Content-Type': contentType }, body });
    const j = await r.json();
    if (!r.ok) throw new Error(`POST /photos (publish) -> ${r.status}: ${JSON.stringify(j)}`);
    return { live: true, platform: 'facebook', posted: j };
  }

  // Multiple images: upload each unpublished, then attach all to one feed post.
  const attachedMedia = [];
  for (const img of images) {
    const { body, contentType } = buildMultipart([
      { name: 'published', value: 'false' },
      { name: 'access_token', value: META_PAGE_ACCESS_TOKEN },
      { name: 'source', filePath: img },
    ]);
    const r = await fetch(`${GRAPH}/${META_PAGE_ID}/photos`, { method: 'POST', headers: { 'Content-Type': contentType }, body });
    const j = await r.json();
    if (!r.ok) throw new Error(`POST /photos -> ${r.status}: ${JSON.stringify(j)}`);
    attachedMedia.push({ media_fbid: j.id });
  }
  const r = await fetch(`${GRAPH}/${META_PAGE_ID}/feed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text, attached_media: attachedMedia, access_token: META_PAGE_ACCESS_TOKEN }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`POST /feed (multi-photo) -> ${r.status}: ${JSON.stringify(j)}`);
  return { live: true, platform: 'facebook', posted: j };
}

async function publishInstagram({ text, imageUrls = [] }, live) {
  const { META_IG_USER_ID, META_PAGE_ACCESS_TOKEN } = instagramCreds();
  if (!imageUrls.length) throw new Error('instagram requires --image-url (hosted, publicly reachable) — local --image files are not accepted by the Instagram Content Publishing API');
  if (!live) return { dryRun: true, platform: 'instagram', text, imageUrls };

  const tok = encodeURIComponent(META_PAGE_ACCESS_TOKEN);
  let creationId;
  if (imageUrls.length === 1) {
    const container = await graphPostJson(`/${META_IG_USER_ID}/media?image_url=${encodeURIComponent(imageUrls[0])}&caption=${encodeURIComponent(text)}&access_token=${tok}`);
    creationId = container.id;
  } else {
    const childIds = [];
    for (const url of imageUrls) {
      const child = await graphPostJson(`/${META_IG_USER_ID}/media?image_url=${encodeURIComponent(url)}&is_carousel_item=true&access_token=${tok}`);
      childIds.push(child.id);
    }
    const carousel = await graphPostJson(`/${META_IG_USER_ID}/media?media_type=CAROUSEL&caption=${encodeURIComponent(text)}&children=${childIds.join(',')}&access_token=${tok}`);
    creationId = carousel.id;
  }
  const published = await graphPostJson(`/${META_IG_USER_ID}/media_publish?creation_id=${creationId}&access_token=${tok}`);
  return { live: true, platform: 'instagram', posted: published };
}

module.exports = { checkCredsFacebook, checkCredsInstagram, publishFacebook, publishInstagram };
