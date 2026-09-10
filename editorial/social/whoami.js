/* Credential/identity check across every platform, no posting. Run this
   after wiring up a new platform's env file to confirm it actually works
   before trusting it with --live.

   Usage: node whoami.js [x,linkedin,facebook,instagram,tiktok,youtube]
   (defaults to all six) */
const { spawnSync } = require('child_process');
const path = require('path');

const ALL = ['x', 'linkedin', 'facebook', 'instagram', 'tiktok', 'youtube'];

async function checkX() {
  const scriptPath = path.join(__dirname, '..', 'post-to-x.js');
  // No dedicated whoami mode on post-to-x.js; the thread path's dry-run already
  // calls GET /2/users/me, but needs a thread file. Cheapest honest check here
  // is just confirming the credential file parses, via the --post dry-run path
  // with a throwaway 1-char text (no images, and dry-run never sends anything).
  const res = spawnSync('node', [scriptPath, '--post', '.'], { encoding: 'utf8' });
  if (res.status !== 0) return { platform: 'x', error: (res.stderr || res.stdout || '').trim() };
  try {
    const j = JSON.parse(res.stdout);
    return { platform: 'x', identity: j.authenticatedAs };
  } catch {
    return { platform: 'x', raw: res.stdout };
  }
}

async function run() {
  const requested = process.argv[2] ? process.argv[2].split(',') : ALL;
  const results = [];
  for (const platform of requested) {
    try {
      switch (platform) {
        case 'x':
          results.push(await checkX());
          break;
        case 'linkedin':
          results.push(await require('./linkedin').checkCreds());
          break;
        case 'facebook':
          results.push(await require('./meta').checkCredsFacebook());
          break;
        case 'instagram':
          results.push(await require('./meta').checkCredsInstagram());
          break;
        case 'tiktok':
          results.push(await require('./tiktok').checkCreds());
          break;
        case 'youtube':
          results.push(await require('./youtube').checkCreds());
          break;
        default:
          results.push({ platform, error: 'unknown platform' });
      }
    } catch (e) {
      results.push({ platform, error: e.message });
    }
  }
  console.log(JSON.stringify(results, null, 2));
}

run();
