# swop-website — swopme.co (main site + blog)

Plain static HTML site (no framework). Repo `Travisswop/swop-website`, Vercel
project `swop-website`, serves **https://swopme.co**.

## Deploy

- Git auto-deploy from `main` is connected (re-granted 2026-08-26) — a push IS a
  production deploy.
- **Always verify the deploy actually ran**: pushes have silently produced zero
  deployments before (no BLOCKED row, nothing). Check the Vercel deployments list
  or curl the live URL for your change after pushing.
- Fallback that always works: `vercel deploy --prod --yes --scope travisswops-projects`
  **from this directory** (cwd resets between shell calls — cd first; running it
  from the SwopLive root nearly created a junk project).
- Git identity in this clone must stay `98964561+Travisswop@users.noreply.github.com`.

## Structure

- `blog/index.html` (Swop Journal index), `blog/<slug>/index.html` per article,
  shared `blog/swop-blog.css`. Update root `sitemap.xml` + `robots.txt` per post.
- Brand is a TEXT wordmark (`.brand`) — do not reintroduce the corrupted
  swop-wordmark.png.
- OG banners: source `blog/<slug>/og.html` beside the committed png; render with
  `editorial/render-og.sh` (headless Chrome, local only). Style rules in
  `editorial/STYLEGUIDE.md` §4b.
- Editorial/AEO system lives in `editorial/` (PLAYBOOK, QUERIES, FACTS — the ONLY
  source of citable numbers — STYLEGUIDE, TOPICS). A daily cloud routine drafts
  posts to `draft/blog-<slug>` branches; Travis approves by merging.
- Root `llms.txt` lists cornerstone content; keep it updated for major pages.
- **After adding or editing any page (blog posts included) run
  `python3 tools/build-agent-files.py`.** It regenerates the Markdown twin of every
  page (`/pay.md`, `/blog/<slug>.md`), `llms-full.txt`, `feed.xml`, and the
  `<!-- seo:start -->` head block (canonical, alternates, FAQPage / Breadcrumb /
  Organization JSON-LD built from the visible page). Never edit those by hand;
  `--check` exits 1 if they are stale. A new root page also needs a row in
  `ROOT_PAGES` in that script.
  The `Agent files` GitHub workflow (`.github/workflows/agent-files.yml`) also runs it
  on every PR and every push to `main` and commits the result back to the branch,
  so a post merged without it still gets its twin, feed entry and schema. Pull before
  pushing again to a branch the workflow has touched.

## Don'ts

- Only real articles in the blog index — never placeholder/fake posts.
- Distribution kits in `editorial/distribution/` are posted by a HUMAN, never
  auto-published.
