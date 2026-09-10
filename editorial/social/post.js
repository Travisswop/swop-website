/* Unified multi-platform posting CLI. One command, one caption, fans out to
   however many platforms you name — each platform succeeds or fails
   independently so one bad credential doesn't block the rest.

   Usage:
     node post.js --platforms x,swop,linkedin,facebook,instagram,tiktok,youtube \
       --text "caption text" \
       [--image path ...]        images for x / swop / linkedin / facebook
       [--image-url https://...] hosted image url(s), required for instagram
       [--video path]            required for tiktok / youtube
       [--title "..."]           optional video title override (tiktok/youtube; defaults to --text)
       [--swop-ens support.swop.id]  which Swop smartsite's feed to post to (default support.swop.id)
       [--linkedin-as org|person]    author for LinkedIn; defaults to org (the Swop
                                     Page) when LINKEDIN_ORG_URN is configured
       [--no-linkedin-reshare]       skip the automatic personal-profile reshare
       [--linkedin-reshare-text "..."]  commentary on that personal reshare
       [--link URL]                  LinkedIn: render a real preview card for URL
                                     (a bare URL in --text does NOT make a card)
       [--link-title "..."] [--link-desc "..."] [--link-thumb path]
       [--live]                  actually publish; default is dry-run

   "swop" posts to Swop's own native in-app Feed (see ../feed-publish.js) —
   distinct from every external platform below it.

   Dry-run (default) checks credentials exist and, where cheap, verifies the
   account identity via a read-only call — nothing is posted. Instagram has
   no local dry-run identity check skip logic beyond creds; see meta.js.

   X is NOT reimplemented here — it shells out to the existing, already-live
   ../post-to-x.js so there is exactly one code path posting to @SwopLabs. */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
}
function argAll(name) {
  const out = [];
  process.argv.forEach((v, i) => { if (v === name) out.push(process.argv[i + 1]); });
  return out;
}
const has = (name) => process.argv.includes(name);

function postX({ text, images, live }) {
  const scriptPath = path.join(__dirname, '..', 'post-to-x.js');
  const args = ['--post', text];
  for (const img of images) args.push('--image', img);
  if (live) args.push('--live');
  const res = spawnSync('node', [scriptPath, ...args], { encoding: 'utf8' });
  if (res.status !== 0) return { platform: 'x', error: (res.stderr || res.stdout || '').trim() };
  try { return { platform: 'x', ...JSON.parse(res.stdout) }; } catch { return { platform: 'x', raw: res.stdout }; }
}

// feed-publish.js needs backend node_modules/.env/Mongo access, so it must
// run with cwd = swop-app-backend (see feed-publish.js header). It also takes
// a spec file rather than flags, matching smartsite-publish.js's convention.
function postSwop({ text, images, live, ens }) {
  const scriptPath = path.join(__dirname, '..', 'feed-publish.js');
  const backendRoot = path.join(__dirname, '..', '..', '..', 'swop-app-backend');
  const specFile = path.join(os.tmpdir(), `swop-feed-spec-${Date.now()}.json`);
  fs.writeFileSync(specFile, JSON.stringify({ text, images, ...(ens ? { ens } : {}) }));
  const args = [scriptPath, specFile];
  if (live) args.push('--live');
  const res = spawnSync('node', args, { encoding: 'utf8', cwd: backendRoot });
  fs.unlinkSync(specFile);
  if (res.status !== 0) return { platform: 'swop', error: (res.stderr || res.stdout || '').trim() };
  const marker = res.stdout.split('\n').find((l) => l.startsWith('RESULT_JSON:'));
  if (!marker) return { platform: 'swop', raw: res.stdout };
  try { return { platform: 'swop', ...JSON.parse(marker.slice('RESULT_JSON:'.length)) }; }
  catch { return { platform: 'swop', raw: res.stdout }; }
}

async function run() {
  const text = arg('--text');
  if (!text) throw new Error('usage: post.js --platforms <list> --text "<caption>" [--image path...] [--image-url url...] [--video path] [--title "..."] [--live]');
  const platforms = (arg('--platforms') || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!platforms.length) throw new Error('--platforms is required, e.g. --platforms x,linkedin,facebook');
  const images = argAll('--image').filter(Boolean);
  const imageUrls = argAll('--image-url').filter(Boolean);
  const video = arg('--video');
  const title = arg('--title');
  const live = has('--live');

  const results = [];
  for (const platform of platforms) {
    try {
      let result;
      switch (platform) {
        case 'x':
          result = postX({ text, images, live });
          break;
        case 'swop':
          result = postSwop({ text, images, live, ens: arg('--swop-ens') });
          break;
        case 'linkedin': {
          const linkedin = require('./linkedin');
          result = await linkedin.publish(
            {
              text,
              images,
              as: arg('--linkedin-as') || undefined,
              reshare: has('--no-linkedin-reshare') ? false : undefined,
              reshareText: arg('--linkedin-reshare-text') || undefined,
              article: arg('--link')
                ? {
                    source: arg('--link'),
                    title: arg('--link-title') || undefined,
                    description: arg('--link-desc') || undefined,
                    thumbnailPath: arg('--link-thumb') || undefined,
                  }
                : undefined,
            },
            live
          );
          break;
        }
        case 'facebook': {
          const meta = require('./meta');
          result = await meta.publishFacebook({ text, images }, live);
          break;
        }
        case 'instagram': {
          const meta = require('./meta');
          result = await meta.publishInstagram({ text, imageUrls }, live);
          break;
        }
        case 'tiktok': {
          const tiktok = require('./tiktok');
          result = await tiktok.publish({ text, video, title }, live);
          break;
        }
        case 'youtube': {
          const youtube = require('./youtube');
          result = await youtube.publish({ text, video, title }, live);
          break;
        }
        default:
          result = { error: `unknown platform "${platform}"` };
      }
      results.push(result);
    } catch (e) {
      results.push({ platform, error: e.message });
    }
  }

  console.log(JSON.stringify({ live, results }, null, 2));
  if (results.some((r) => r.error)) process.exitCode = 1;
}

run().catch((e) => { console.error(e.message); process.exit(1); });
