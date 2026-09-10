/* Post directly into Swop's native in-app Feed (distinct from the SmartSite
   "Blog" tab — see smartsite-publish.js — and distinct from external
   platforms in social/). Writes straight to the PostV2 model the same way
   swop-app-backend/src/controllers/v2/feedController.js#createFeedPost does,
   bypassing HTTP/JWT entirely since this runs as a trusted local script
   (same pattern as smartsite-publish.js).

   Usage (MUST run from the swop-app-backend checkout so its node_modules,
   .env, and helpers resolve):
     cd ../swop-app-backend && node ../swop-website/editorial/feed-publish.js <spec.json> [--live]

   spec.json: {
     "text": "...",                 // required; becomes content.title
     "images": ["path/or/https://...", ...],  // required, >=1; local paths are
                                               // uploaded to Cloudinary first,
                                               // https:// urls are used as-is
     "ens": "support.swop.id"       // optional, defaults to support.swop.id
   }

   Default is a DRY RUN: resolves the target smartsite, reports what would be
   uploaded/posted, saves nothing. --live uploads images (if local) and
   creates the FeedPost document. */
const fs = require('fs');
const path = require('path');

const DEFAULT_ENS = 'support.swop.id';

(async () => {
  const specPath = process.argv[2];
  if (!specPath) throw new Error('usage: node feed-publish.js <spec.json> [--live]');
  const live = process.argv.includes('--live');
  const spec = JSON.parse(fs.readFileSync(path.resolve(specPath), 'utf8'));
  if (!spec.text) throw new Error('spec missing text');
  if (!Array.isArray(spec.images) || !spec.images.length) throw new Error('spec needs a non-empty "images" array');

  const backendRoot = process.cwd(); // must be swop-app-backend
  // require() resolves relative to THIS file's location (swop-website/editorial),
  // not cwd — so plain require('dotenv')/require('mongoose') would miss
  // swop-app-backend's node_modules entirely. Resolve explicitly instead.
  const reqBackendModule = (name) => require(path.join(backendRoot, 'node_modules', name));
  const req = (p) => require(path.join(backendRoot, p));

  reqBackendModule('dotenv').config({ path: path.join(backendRoot, '.env') });
  const mongoose = reqBackendModule('mongoose');

  const { initAppSecrets } = req('src/utils/awsSecrets');
  await initAppSecrets();
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 9000 });

  const Microsite = req('src/models/Microsite');
  const PostV2 = req('src/models/feed/PostV2');
  const { publicationForPost } = req('src/services/feedPreferences.service');
  const { cloudinary } = req('src/config/cloudinary');

  const ens = spec.ens || DEFAULT_ENS;
  const smartsite = await Microsite.findOne({ ens }).select('name ens profilePic parentId').lean();
  if (!smartsite) throw new Error(`no microsite found with ens "${ens}"`);

  if (!live) {
    const result = {
      dryRun: true,
      postingAs: { name: smartsite.name, ens: smartsite.ens, smartsiteId: String(smartsite._id), userId: String(smartsite.parentId) },
      text: spec.text,
      images: spec.images,
    };
    console.log(JSON.stringify(result, null, 2));
    console.log('RESULT_JSON:' + JSON.stringify(result)); // machine-parseable marker line, for social/post.js
    await mongoose.disconnect();
    return;
  }

  const postContent = [];
  for (const img of spec.images) {
    if (/^https?:\/\//.test(img)) {
      postContent.push({ type: 'image', src: img });
      continue;
    }
    const uploaded = await cloudinary.uploader.upload(img, { folder: 'feed_posts', resource_type: 'image' });
    console.log('uploaded to cloudinary:', img, '->', uploaded.secure_url);
    postContent.push({ type: 'image', src: uploaded.secure_url });
  }

  const feedData = {
    smartsiteId: smartsite._id,
    userId: smartsite.parentId,
    smartsiteUserName: smartsite.name,
    smartsiteEnsName: smartsite.ens,
    smartsiteProfilePic: smartsite.profilePic,
    postType: 'post',
    content: { title: spec.text, post_content: postContent },
  };
  Object.assign(feedData, publicationForPost(feedData, null));

  const post = new PostV2(feedData);
  const saved = await post.save();
  const result = { live: true, posted: { id: String(saved._id), text: spec.text, images: postContent.map((c) => c.src) } };
  console.log(JSON.stringify(result, null, 2));
  console.log('RESULT_JSON:' + JSON.stringify(result)); // machine-parseable marker line, for social/post.js
  await mongoose.disconnect();
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
