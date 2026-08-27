/* Cross-publish a Swop Journal article to Travis's SmartSite (travis.swop.id).
   Part of the daily review flow: after merging a blog PR, run this with a JSON
   spec to mirror the post on the SmartSite's Blog tab.

   Usage (MUST run from the swop-app-backend checkout so its node_modules,
   .env, and helpers resolve):
     cd ../swop-app-backend && node ../swop-website/editorial/smartsite-publish.js <spec.json>

   spec.json: {
     "title": "...", "headline": "...",            // required
     "descriptionHtml": "<p>...</p>",              // required; allowed tags only:
                                                   // p br strong b em i u s ul ol li
                                                   // blockquote h1-h6 pre code div span a
                                                   // (NO tables). End with a link to the
                                                   // canonical swopme.co/blog/<slug> URL.
     "image": "https://www.swopme.co/blog/<slug>/og.png",  // required cover
     "category": "Guides",                         // optional
     "publishedAt": "2026-08-27T15:00:00Z"          // optional ISO
   }

   Side effects match POST /api/v4/microsite/blog exactly (sanitize + createSocial),
   then the new post's key is appended to the site's "Blog" tab through
   applyTabWriteGuards (never write tabs/templateOrder directly — repo rule). */
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const OWNER_ID = '67fd713332190ac5842b0989'; // Travis Herron (travis@swopme.co)
const MICROSITE_ID = '67fd713532190ac5842b099d'; // travis.swop.id (primary)

(async () => {
  const specPath = process.argv[2];
  if (!specPath) throw new Error('usage: node smartsite-publish.js <spec.json>');
  const spec = JSON.parse(fs.readFileSync(path.resolve(specPath), 'utf8'));
  for (const k of ['title', 'headline', 'descriptionHtml', 'image']) {
    if (!spec[k]) throw new Error(`spec missing ${k}`);
  }

  const backendRoot = process.cwd(); // must be swop-app-backend
  const req = (p) => require(path.join(backendRoot, p));

  const { initAppSecrets } = req('src/utils/awsSecrets');
  await initAppSecrets();
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 9000 });

  const Microsite = req('src/models/Microsite');
  const { createSocial } = req('src/helper/microsite');
  const { sanitizeBlogHtml } = req('src/utils/storedContentSecurity');
  const micrositeServices = req('src/services/micrositeService');
  const { micrositeTabsValidation } = req('src/utils/schemaValidation');

  const safe = sanitizeBlogHtml(spec.descriptionHtml);
  if (!safe) throw new Error('sanitizer emptied the description');

  const res = await createSocial('blog', MICROSITE_ID, {
    title: spec.title,
    headline: spec.headline,
    description: safe,
    micrositeId: MICROSITE_ID,
    image: spec.image,
    category: spec.category || 'General',
    status: 'published',
    scheduledAt: null,
    publishedAt: spec.publishedAt ? new Date(spec.publishedAt) : new Date(),
  }, OWNER_ID);
  console.log('blog created:', spec.title);

  // Append the new post's key to the Blog tab (create the tab if missing).
  const site = await Microsite.findById(MICROSITE_ID)
    .select('tabs pinnedOrder templateOrder info.widget info.blog')
    .lean();
  const blogIds = (site.info?.blog || []).map(String);
  const newId = blogIds[blogIds.length - 1];
  const newKey = `blog:${encodeURIComponent(newId)}:${blogIds.length - 1}`;

  const cleanTabs = (site.tabs || []).map(({ id, name, order, gated, gate }) => ({
    id, name, order: [...(order || [])], gated: !!gated, gate: gate ?? null,
  }));
  let blogTab = cleanTabs.find((t) => t.name === 'Blog');
  if (!blogTab) {
    blogTab = { id: `tab-blog-${Date.now().toString(36)}`, name: 'Blog', order: [], gated: false, gate: null };
    cleanTabs.push(blogTab);
  }
  if (!blogTab.order.some((k) => k.includes(newId))) blogTab.order.push(newKey);

  const { error } = micrositeTabsValidation(cleanTabs);
  if (error) throw new Error(`tabs validation: ${error.details[0].message}`);

  const guarded = micrositeServices.applyTabWriteGuards({
    storedWidgetIds: site.info?.widget || [],
    tabs: cleanTabs,
    pinnedOrder: site.pinnedOrder || [],
    templateOrder: undefined,
  });
  const body = { tabs: guarded.tabs };
  if (guarded.templateOrder !== undefined) body.templateOrder = guarded.templateOrder;
  await micrositeServices.updateMicrosite(MICROSITE_ID, body, OWNER_ID);

  const saved = await Microsite.findById(MICROSITE_ID).select('tabs').lean();
  console.log('tabs:', saved.tabs.map((t) => `${t.name}(${t.order.length})`).join(', '));
  process.exit(0);
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
