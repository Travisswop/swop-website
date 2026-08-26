# Swop Journal — Writing & Production Guide

## Voice
- Plain, confident, a little dry. Short declarative sentences. No hype words
  ("revolutionary", "game-changing", "seamless"), no exclamation marks.
- Honest about tradeoffs. The reference post is /blog/agentic-trading-is-live —
  match its register.
- Explain jargon the first time it appears. Assume a smart reader who is new to crypto.
- Never invent statistics, user counts, dates, or quotes. If a concrete number is
  needed and unknown, leave a `[NEEDS FACT: …]` marker for review instead.
- Product claims must match what Swop actually ships. When unsure, describe the
  category generally rather than claiming a Swop capability.

## Article production checklist
1. Copy the HTML structure of `blog/agentic-trading-is-live/index.html` exactly
   (same head, nav, art-head, toc, prose, sub, app, foot sections; stylesheet at
   `/blog/swop-blog.css`).
2. Slug: kebab-case from the title, at `blog/<slug>/index.html`.
3. 900–1,600 words. 4–6 `h2` sections with `id="s1"…` matching the TOC.
4. SEO per page: unique `<title>` (≤60 chars, keyword near front), meta description
   (140–160 chars), canonical `https://www.swopme.co/blog/<slug>`, OG + Twitter tags,
   JSON-LD Article. Update share links (X / Farcaster / copy-link) to the new URL.
5. Byline: "Swop Team" unless a named author is specified in the topic queue.
   Do NOT attribute posts to named people without instruction.
6. Update `blog/index.html`: new post becomes the featured entry, previous featured
   moves into the Recent list, bump the post count.
7. Add the URL to `sitemap.xml` with `lastmod`.
8. Move the topic line in `editorial/TOPICS.md` from "Up next" to "Drafted (in review)".
9. Internal links: link to /blog posts and swopme.co pages where natural; app links are
   https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322 and
   https://play.google.com/store/apps/details?id=com.travisheron.swopapp.
   Never link to swop.tech (not our domain).
