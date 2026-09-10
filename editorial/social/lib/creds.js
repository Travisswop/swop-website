/* Shared credential loader for every platform module. Same pattern as the
   original post-to-x.js: env vars win, falls back to a per-platform file at
   ~/.config/swop/<platform>.env (chmod 600, gitignored, never commit real
   values). Keeps every platform's secrets in one predictable place. */
const fs = require('fs');
const os = require('os');
const path = require('path');

function envFile(platform) {
  return path.join(os.homedir(), '.config/swop', `${platform}.env`);
}

function loadCreds(platform, keys) {
  const file = envFile(platform);
  const out = {};
  for (const k of keys) if (process.env[k]) out[k] = process.env[k];
  if (Object.keys(out).length < keys.length && fs.existsSync(file)) {
    const text = fs.readFileSync(file, 'utf8');
    for (const k of keys) {
      if (out[k]) continue;
      const m = text.match(new RegExp(`^${k}=(.+)$`, 'm'));
      if (m) out[k] = m[1].trim();
    }
  }
  const missing = keys.filter((k) => !out[k]);
  if (missing.length) {
    const err = new Error(`missing ${platform} credentials: ${missing.join(', ')} (env or ${file})`);
    err.missingCreds = true;
    err.platform = platform;
    throw err;
  }
  return out;
}

module.exports = { loadCreds, envFile };
