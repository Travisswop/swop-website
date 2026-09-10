/* One-time Meta (Facebook Page + Instagram Business) setup helper. Meta's
   full OAuth redirect dance needs a whitelisted HTTPS domain, which is more
   setup than it's worth for a single-account use case — the Graph API
   Explorer gives the same result in one click. This script takes the
   short-lived user token it hands you and does the rest: exchanges it for a
   long-lived token, lists your Pages with their Page tokens, and shows which
   Page (if any) has an Instagram Business account linked.

   Prereqs (see ../../SETUP.md#meta):
     1. Create an app at https://developers.facebook.com/apps (type: Business)
     2. Add the "Facebook Login" and "Instagram Graph API" products
     3. Your Instagram account must be a Business or Creator account, linked
        to a Facebook Page you admin (Instagram app > Settings > Account type,
        then Linked Accounts)
     4. Go to https://developers.facebook.com/tools/explorer, pick your app,
        "Get User Access Token", and check these permissions:
        pages_show_list, pages_read_engagement, pages_manage_posts,
        instagram_basic, instagram_content_publish
     5. Copy the generated token

   Usage:
     META_APP_ID=... META_APP_SECRET=... node oauth/meta-setup.js <short-lived-user-token> */
const APP_ID = process.env.META_APP_ID;
const APP_SECRET = process.env.META_APP_SECRET;
const shortToken = process.argv[2];
const GRAPH = 'https://graph.facebook.com/v21.0';

if (!APP_ID || !APP_SECRET || !shortToken) {
  console.error('usage: META_APP_ID=... META_APP_SECRET=... node oauth/meta-setup.js <short-lived-user-token>');
  process.exit(1);
}

async function run() {
  const exch = await fetch(`${GRAPH}/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${shortToken}`);
  const exchJson = await exch.json();
  if (!exch.ok) throw new Error(`long-lived exchange failed: ${JSON.stringify(exchJson)}`);
  const longLivedUserToken = exchJson.access_token;
  console.log(`Long-lived user token (~60 days): ${longLivedUserToken}\n`);

  const pagesRes = await fetch(`${GRAPH}/me/accounts?access_token=${longLivedUserToken}`);
  const pagesJson = await pagesRes.json();
  if (!pagesRes.ok) throw new Error(`page list failed: ${JSON.stringify(pagesJson)}`);

  for (const page of pagesJson.data || []) {
    console.log(`Page: ${page.name} (${page.id})`);
    console.log(`  Page access token (long-lived, doesn't expire while the app stays active): ${page.access_token}`);
    const igRes = await fetch(`${GRAPH}/${page.id}?fields=instagram_business_account&access_token=${page.access_token}`);
    const igJson = await igRes.json();
    if (igJson.instagram_business_account) {
      console.log(`  Linked Instagram Business account id: ${igJson.instagram_business_account.id}`);
    } else {
      console.log('  No Instagram Business account linked to this Page');
    }
    console.log('');
  }

  console.log('Save to ~/.config/swop/meta.env:\n');
  console.log('META_PAGE_ID=<the Page id above>');
  console.log('META_PAGE_ACCESS_TOKEN=<that Page\'s access token above>');
  console.log('META_IG_USER_ID=<the linked Instagram Business account id, if posting to Instagram>');
}

run().catch((e) => { console.error(e.message); process.exit(1); });
