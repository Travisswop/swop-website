/* Upload a local image to Cloudinary and print its public URL. Standalone
   helper for platforms whose API needs a public image_url rather than a
   direct file upload — currently just Instagram's Content Publishing API
   (see social/meta.js's publishInstagram). Reuses the backend's already-
   configured Cloudinary account (src/config/cloudinary.js), same as
   feed-publish.js does for Swop feed posts — same "feed_posts" folder, so
   these show up alongside those uploads rather than scattered elsewhere.

   Usage (MUST run from the swop-app-backend checkout so its node_modules
   and .env resolve):
     cd ../swop-app-backend && node ../swop-website/editorial/upload-image.js <local-path>

   Prints RESULT_JSON:<json> on its own line (see social/post.js's parsing
   convention in postSwop()) plus a human-readable line above it. */
const path = require('path');

(async () => {
  const filePath = process.argv[2];
  if (!filePath) throw new Error('usage: node upload-image.js <local-path>');

  const backendRoot = process.cwd(); // must be swop-app-backend
  // require() resolves relative to THIS file's location, not cwd — see the
  // identical note in feed-publish.js.
  const reqBackendModule = (name) => require(path.join(backendRoot, 'node_modules', name));
  const req = (p) => require(path.join(backendRoot, p));

  reqBackendModule('dotenv').config({ path: path.join(backendRoot, '.env') });
  const { cloudinary } = req('src/config/cloudinary');

  const uploaded = await cloudinary.uploader.upload(filePath, { folder: 'feed_posts', resource_type: 'image' });
  const result = { url: uploaded.secure_url };
  console.log('uploaded:', filePath, '->', uploaded.secure_url);
  console.log('RESULT_JSON:' + JSON.stringify(result));
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
