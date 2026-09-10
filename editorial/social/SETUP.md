# Swop social posting — setup

One CLI, `post.js`, posts a caption + media to any combination of X,
LinkedIn, Facebook, Instagram, TikTok, and YouTube. Each platform's
credentials live in their own file, same pattern as X:

```
~/.config/swop/x.env         (already set up — @SwopLabs)
~/.config/swop/linkedin.env
~/.config/swop/meta.env      (covers both Facebook + Instagram)
~/.config/swop/tiktok.env
~/.config/swop/youtube.env
```

Every command defaults to a dry run (checks credentials, prints what it
would do, posts nothing). Add `--live` to actually publish. Check any
platform's credentials at any time with:

```bash
node whoami.js                       # all platforms
node whoami.js linkedin,facebook     # just these
```

None of the steps below can be done by an agent — each one requires you to
log into that platform's own developer console with your own account and
grant access. Once you've got the credentials, come back and I'll wire up
and test that platform's module (they're already written, just waiting on
tokens).

## X

Already live — see `../post-to-x.js` and the `x-swoplabs-posting-pipeline`
memory. Nothing to do here.

## LinkedIn

1. Create an app: https://www.linkedin.com/developers/apps
2. On the app's **Products** tab, request "Sign In with LinkedIn using
   OpenID Connect" and "Share on LinkedIn" (both auto-approve instantly for
   your own developer account).
3. On the **Auth** tab, add redirect URL `http://localhost:8734/callback`.
4. Copy the Client ID and Client Secret from the Auth tab.
5. Run:
   ```bash
   LINKEDIN_CLIENT_ID=... LINKEDIN_CLIENT_SECRET=... node oauth/linkedin-auth.js
   ```
   It opens a browser tab — log in, approve, and the terminal prints the
   `LINKEDIN_ACCESS_TOKEN` to save into `~/.config/swop/linkedin.env`.
6. Token lasts ~60 days; re-run step 5 to refresh when `whoami.js` starts
   failing.

## Meta (Facebook + Instagram)

Prerequisite: your Instagram account must already be a **Business or
Creator** account, linked to a Facebook Page you admin (Instagram app →
Settings → Account type → switch if needed, then link it to a Page you
manage). Do this before anything below.

1. Create an app at https://developers.facebook.com/apps — type "Business".
2. Add the "Facebook Login" and "Instagram Graph API" products from the
   dashboard.
3. Note the App ID and App Secret (Settings → Basic).
4. Go to https://developers.facebook.com/tools/explorer, select your app,
   click "Get User Access Token", and check these permissions:
   `pages_show_list`, `pages_read_engagement`, `pages_manage_posts`,
   `instagram_basic`, `instagram_content_publish`. Generate the token.
5. Run:
   ```bash
   META_APP_ID=... META_APP_SECRET=... node oauth/meta-setup.js <the-token-from-step-4>
   ```
   It prints a long-lived Page access token per Page you manage, and tells
   you which Page (if any) has an Instagram Business account linked. Save
   the three values it recommends into `~/.config/swop/meta.env`.
6. Long-lived Page tokens don't expire on their own as long as the app stays
   active and you don't change your Facebook password — no periodic re-auth
   needed like LinkedIn/short OAuth tokens.

Note the asymmetry baked into `meta.js`: Facebook photo posts take a local
file directly; Instagram's API only accepts a public `image_url` it fetches
itself. Posting to Instagram means the image needs to be hosted somewhere
reachable first (e.g. a swopme.co asset path) — `post.js` takes `--image-url`
for this, separate from `--image`.

## TikTok

1. Register at https://developers.tiktok.com and create an app.
2. Request the **Content Posting API** product and the `video.publish`
   scope. **TikTok requires manual review before granting any posting
   scope** — this can take several days, and initially only works in
   "self-only" sandbox mode with your own account until fully approved for
   public posting (the `tiktok.js` module defaults new posts to
   `SELF_ONLY` for exactly this reason — flip it once TikTok approves public
   posting).
3. Once approved, TikTok's docs walk through the OAuth2 flow for
   `TIKTOK_ACCESS_TOKEN` — an `oauth/tiktok-auth.js` helper (matching the
   LinkedIn/YouTube pattern) can be written once the app is approved and the
   redirect URI is registered.
4. Save `TIKTOK_ACCESS_TOKEN` to `~/.config/swop/tiktok.env`.

TikTok video-only, no static images — matches the plan to hold off until
there's actual video content.

## YouTube

1. Create a project at https://console.cloud.google.com.
2. Enable the **YouTube Data API v3** (APIs & Services → Library).
3. Configure the OAuth consent screen: External, Testing mode is fine for
   posting to just your own channel — add your Google account under "Test
   users".
4. Create an OAuth Client ID (Credentials → Create Credentials → OAuth
   client ID), application type **Desktop app**.
5. Run:
   ```bash
   YOUTUBE_CLIENT_ID=... YOUTUBE_CLIENT_SECRET=... node oauth/youtube-auth.js
   ```
   It opens a browser tab — log in as the channel owner, approve, and the
   terminal prints all three values to save into `~/.config/swop/youtube.env`.
6. Refresh tokens don't expire under normal use — no periodic re-auth needed.

Video only, same as TikTok — holding off until there's video content, per
the plan.

## Once credentials exist

```bash
node post.js --platforms x,linkedin,facebook --text "caption" --image path/to/img.png
node post.js --platforms instagram --text "caption" --image-url https://www.swopme.co/path/to/img.png --live
node post.js --platforms tiktok,youtube --text "caption" --video path/to/clip.mp4 --title "..." --live
```

### LinkedIn — posting as the Swop Page (Community Management API)

Travis's decision 2026-09-10: the daily blog post goes out **as the Swop Page**,
then is **reshared from his personal profile**. That needs more than the
"Share on LinkedIn" product used for personal posting:

1. linkedin.com/developers/apps -> "Swop Social Posting" -> **Products** ->
   request **Community Management API**. The app must be associated with the
   Swop Page and Travis must be a Page admin. Some accounts get it self-serve;
   others land in LinkedIn's review queue.
2. Once granted, re-run `node oauth/linkedin-auth.js` so the new token carries
   `w_organization_social` (post as Page) and `r_organization_admin` (list Pages).
3. Find the Page URN:
   `node -e "const l=require('./linkedin');l.listAdminOrgs(l.creds().LINKEDIN_ACCESS_TOKEN).then(o=>console.log(o))"`
   and save the right one as `LINKEDIN_ORG_URN=urn:li:organization:<id>` in
   `~/.config/swop/linkedin.env`. Careful: two similarly-named Pages exist — the
   correct one is "Swop" under Technology, Information and Internet.
4. Verify with `node whoami.js linkedin` (expect `postsAs: organization`), then a
   dry run, then `--live`.

Once `LINKEDIN_ORG_URN` is set, `post.js --platforms linkedin` posts as the Page
and automatically reshares to Travis's personal feed. Override with
`--linkedin-as person` or `--no-linkedin-reshare`.

**API version gotcha:** LinkedIn expires versioned-API dates after ~1 year and
returns 426 NONEXISTENT_VERSION. The pin sat at an expired 202401 until
2026-09-10 and nobody noticed, because `whoami.js` only calls the *unversioned*
`/v2/userinfo` — so "credentials verified" never proved the posting API worked.
Active dates as of 2026-09-10: 202503, 202509. Override with `LINKEDIN_API_VERSION`.
