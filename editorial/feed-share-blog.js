/* Share a SmartSite blog into the Swop feed as Travis — the automation twin of
   the desktop composer's "Share a blog" button (feat 5a03d4df): a regular
   postType:'post' carrying content.blogCard, rendered by BlogFeedCard with a
   /sp/<handle>?blog=<id> deep link.

   Part of the daily loop: after the SmartSite cross-post, share that blog to
   the feed. MUST run from the swop-app-backend checkout:
     cd ../swop-app-backend && node ../swop-website/editorial/feed-share-blog.js "<blog title substring>" ["<caption>"]

   Mirrors POST /api/v2/feed's regular-post path for a text+blogCard post:
   publicationForPost gives {feedCategory, publication origin:'manual'};
   invalidateAuthorFeedCaches is skipped (cache TTL covers it). */
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');

const OWNER_ID = '67fd713332190ac5842b0989'; // Travis Herron
const MICROSITE_ID = '67fd713532190ac5842b099d'; // travis.swop.id

(async () => {
  const titleQuery = process.argv[2];
  const caption = process.argv[3] || '';
  if (!titleQuery) throw new Error('usage: node feed-share-blog.js "<blog title substring>" ["caption"]');

  const backendRoot = process.cwd();
  const req = (p) => require(path.join(backendRoot, p));
  const { initAppSecrets } = req('src/utils/awsSecrets');
  await initAppSecrets();
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 9000 });

  const { Microsite, Blog } = req('src/models');
  const FeedPost = req('src/models/feed/PostV2');
  const { publicationForPost } = req('src/services/feedPreferences.service');

  const microsite = await Microsite.findById(MICROSITE_ID).select('username').lean();
  const BlogModel = Blog;

  const esc = titleQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const blog = await BlogModel.findOne({ micrositeId: MICROSITE_ID, title: new RegExp(esc, 'i') })
    .sort({ createdAt: -1 })
    .lean();
  if (!blog) throw new Error(`no blog matching "${titleQuery}" on the SmartSite`);

  const dup = await FeedPost.findOne({
    userId: OWNER_ID,
    postType: 'post',
    'content.blogCard.blogId': String(blog._id),
    isDeleted: { $ne: true },
  }).lean();
  if (dup) {
    console.log('already shared to feed:', String(dup._id));
    process.exit(0);
  }

  const feedData = {
    smartsiteId: MICROSITE_ID,
    userId: OWNER_ID,
    postType: 'post',
    content: {
      title: caption || blog.title,
      post_content: [],
      blogCard: {
        blogId: String(blog._id),
        micrositeId: MICROSITE_ID,
        handle: microsite.username,
        title: blog.title,
        headline: blog.headline || undefined,
        image: blog.image || undefined,
        category: blog.category || undefined,
        publishedAt: blog.publishedAt || blog.createdAt || null,
      },
    },
  };
  const pub = publicationForPost(feedData, null);
  feedData.feedCategory = pub.feedCategory;
  feedData.publication = pub.publication;

  const saved = await new FeedPost(feedData).save();
  console.log('feed post created:', String(saved._id), '->', `/sp/${microsite.username}?blog=${blog._id}`);
  process.exit(0);
})().catch((e) => { console.error(e.message); process.exit(1); });
