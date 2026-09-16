/* LinkedIn posting via the current Posts API (api.linkedin.com/rest/posts,
   replaces the deprecated /v2/ugcPosts). OAuth 2.0 bearer token — this module
   does not do the browser login dance; run oauth/linkedin-auth.js once to get
   ACCESS_TOKEN, save it to ~/.config/swop/linkedin.env.

   TWO AUTHOR MODES (Travis's decision 2026-09-10 — post as the Swop Page, then
   reshare from his personal profile):

   - person (default when no org is configured): author = urn:li:person:<sub>.
     Scopes: openid, profile, w_member_social.
   - organization: author = urn:li:organization:<id>, taken from
     LINKEDIN_ORG_URN in ~/.config/swop/linkedin.env. Requires LinkedIn's
     **Community Management API** product on the app plus the
     w_organization_social scope (and r_organization_admin to enumerate the
     Pages the member administers). Without that product the token simply will
     not carry the scope and LinkedIn returns 403 ACCESS_DENIED.

   When an org URN is configured, publish() posts as the Page and then reshares
   that post to the member's personal feed, unless reshare:false is passed.

   Setup: see ../SETUP.md#linkedin. */
const fs = require('fs');
const { loadCreds, envFile } = require('./lib/creds');
const { mimeFor } = require('./lib/multipart');

const API = 'https://api.linkedin.com';
// LinkedIn expires versioned-API dates after ~1 year and returns 426
// NONEXISTENT_VERSION once yours lapses. This WILL recur — budget for it.
//   2026-09-10: 202401 had already expired (nothing versioned had ever actually
//     been called, since whoami only hits the unversioned /v2/userinfo, so the
//     rot went unnoticed). Pinned 202509.
//   2026-09-16: 202509 expired too, six days later — the window is short, and it
//     fails mid-publish on the image upload, not on whoami. Pinned 202609.
// To re-probe: GET /rest/posts/<any urn> with a candidate LinkedIn-Version.
//   426 = that version does not exist. 403 = version is live (you just lack read
//   scope for that call), which is the signal you want. On 2026-09-16 the active
//   band was 202510..202609; 202610+ and 202512 and older all returned 426.
const VERSION = process.env.LINKEDIN_API_VERSION || '202609';

function creds() {
  return loadCreds('linkedin', ['LINKEDIN_ACCESS_TOKEN']);
}

// Optional — present only once the Community Management API is granted and the
// Page URN has been recorded. Absent = person-only mode, which is the pre-2026-09-10 behaviour.
function orgUrn() {
  if (process.env.LINKEDIN_ORG_URN) return process.env.LINKEDIN_ORG_URN.trim();
  const file = envFile('linkedin');
  if (!fs.existsSync(file)) return null;
  const m = fs.readFileSync(file, 'utf8').match(/^LINKEDIN_ORG_URN=(.+)$/m);
  return m ? m[1].trim() : null;
}

async function call(method, p, token, body, extraHeaders) {
  const headers = {
    Authorization: `Bearer ${token}`,
    'LinkedIn-Version': VERSION,
    'X-Restli-Protocol-Version': '2.0.0',
    ...extraHeaders,
  };
  if (body && !extraHeaders?.['Content-Type']) headers['Content-Type'] = 'application/json';
  const r = await fetch(API + p, { method, headers, body: body ? (typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body)) : undefined });
  const text = await r.text();
  if (!r.ok) throw new Error(`${method} ${p} -> ${r.status}: ${text.slice(0, 500)}`);
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  // /rest/posts returns 201 with an empty body; the new post's URN comes back
  // in the x-restli-id header. Reshares need that URN, so surface it.
  const restliId = r.headers.get('x-restli-id');
  if (restliId && data && typeof data === 'object' && !data.id) data.id = restliId;
  return data;
}

async function whoAmI(token) {
  // OIDC userinfo — needs the `openid profile` scopes. `sub` is the member id.
  return call('GET', '/v2/userinfo', token);
}

/* Pages this member administers. Needs r_organization_admin (Community
   Management API). Used by whoami.js and by setup to discover the Swop Page id. */
async function listAdminOrgs(token) {
  const res = await call(
    'GET',
    '/rest/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&state=APPROVED',
    token
  );
  const urns = (res.elements || []).map((e) => e.organization).filter(Boolean);
  const out = [];
  for (const urn of urns) {
    const id = urn.split(':').pop();
    try {
      const org = await call('GET', `/rest/organizations/${id}`, token);
      out.push({ urn, id, name: org.localizedName || org.name?.localized?.en_US || '(unnamed)' });
    } catch {
      out.push({ urn, id, name: '(name unavailable)' });
    }
  }
  return out;
}

async function uploadImage(token, ownerUrn, filePath) {
  const init = await call('POST', '/rest/images?action=initializeUpload', token, {
    initializeUploadRequest: { owner: ownerUrn },
  });
  const uploadUrl = init.value.uploadUrl;
  const imageUrn = init.value.image;
  const data = fs.readFileSync(filePath);
  const r = await fetch(uploadUrl, { method: 'PUT', headers: { 'Content-Type': mimeFor(filePath) }, body: data });
  if (!r.ok) throw new Error(`PUT image upload -> ${r.status}`);
  return imageUrn;
}

async function checkCreds() {
  const { LINKEDIN_ACCESS_TOKEN } = creds();
  const me = await whoAmI(LINKEDIN_ACCESS_TOKEN);
  const out = {
    platform: 'linkedin',
    identity: me.name || me.sub,
    urn: `urn:li:person:${me.sub}`,
    orgUrn: orgUrn() || null,
    postsAs: orgUrn() ? 'organization (Page), then reshared to personal' : 'personal profile',
  };
  // Best effort: only works once Community Management API is granted.
  try { out.adminPages = await listAdminOrgs(LINKEDIN_ACCESS_TOKEN); }
  catch (e) { out.adminPages = `unavailable (${String(e.message).slice(0, 120)})`; }
  return out;
}

async function createPost(token, { author, text, images = [], reshareOf, article }) {
  let content;
  if (article && article.source) {
    // A URL in the commentary does NOT produce a preview card on API-created
    // posts — LinkedIn just shortens it to lnkd.in as plain text (verified
    // 2026-09-10 on urn:li:share:7503855565555634176). The card only renders
    // when the post carries an explicit article object. thumbnail must be an
    // uploaded image URN, not a URL.
    const thumb = article.thumbnailPath
      ? await uploadImage(token, author, article.thumbnailPath)
      : undefined;
    content = {
      article: {
        source: article.source,
        ...(article.title ? { title: article.title } : {}),
        ...(article.description ? { description: article.description } : {}),
        ...(thumb ? { thumbnail: thumb } : {}),
      },
    };
  } else if (images.length === 1) {
    const imageUrn = await uploadImage(token, author, images[0]);
    content = { media: { id: imageUrn, title: '' } };
  } else if (images.length > 1) {
    const urns = [];
    for (const img of images) urns.push(await uploadImage(token, author, img));
    content = { multiImage: { images: urns.map((id) => ({ id })) } };
  }
  const body = {
    author,
    commentary: text,
    visibility: 'PUBLIC',
    distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] },
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false,
    ...(content ? { content } : {}),
    ...(reshareOf ? { reshareContext: { parent: reshareOf } } : {}),
  };
  const res = await call('POST', '/rest/posts', token, body);
  return { urn: res.id || null, raw: res };
}

/* opts:
     as: 'org' | 'person'   — default 'org' when LINKEDIN_ORG_URN is set
     reshare: boolean       — default true in org mode; reshares the Page post
                              to the member's personal feed
     reshareText: string    — optional commentary on the personal reshare */
async function publish({ text, images = [], as, reshare, reshareText, article }, live) {
  const { LINKEDIN_ACCESS_TOKEN } = creds();
  const token = LINKEDIN_ACCESS_TOKEN;
  const me = await whoAmI(token);
  const personUrn = `urn:li:person:${me.sub}`;
  const org = orgUrn();
  const mode = as || (org ? 'org' : 'person');
  if (mode === 'org' && !org) {
    throw new Error('linkedin: --linkedin-as org requested but LINKEDIN_ORG_URN is not set (Community Management API not configured yet — see SETUP.md#linkedin)');
  }
  const author = mode === 'org' ? org : personUrn;
  const doReshare = mode === 'org' && reshare !== false;

  if (!live) {
    return {
      dryRun: true,
      platform: 'linkedin',
      authenticatedAs: me.name || me.sub,
      postingAs: mode === 'org' ? author : `${author} (${me.name || 'personal'})`,
      willResharePersonally: doReshare,
      text,
      images,
      article: article || null,
    };
  }

  const post = await createPost(token, { author, text, images, article });
  const result = { live: true, platform: 'linkedin', postedAs: mode, author, urn: post.urn, posted: post.raw };

  if (doReshare) {
    if (!post.urn) {
      result.reshare = { skipped: 'no post URN returned by LinkedIn; cannot reshare' };
    } else {
      try {
        const rs = await createPost(token, {
          author: personUrn,
          text: reshareText || '',
          reshareOf: post.urn,
        });
        result.reshare = { author: personUrn, urn: rs.urn };
      } catch (e) {
        // The Page post already succeeded — never fail the whole run on the reshare.
        result.reshare = { error: String(e.message).slice(0, 300) };
      }
    }
  }
  return result;
}

module.exports = { checkCreds, publish, listAdminOrgs, whoAmI, creds };
