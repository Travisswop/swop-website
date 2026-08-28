# Swop Journal — SEO/AEO Operating Playbook

The 8 daily steps. Every routine run and every human review checks against this list.

| # | Step | Owner | Where it lives |
|---|------|-------|----------------|
| 1 | Content targets: write to a query, not a vibe | Agent (pulls), Travis (curates) | `editorial/QUERIES.md` — every post must name its target query |
| 2 | Answer-first structure | Agent | `editorial/STYLEGUIDE.md` template — 2-3 sentence direct answer in paragraph one, marketing after |
| 3 | E-E-A-T signals | Agent | Named byline linking to `/blog/authors/swop-team`, visible published + updated dates, links to primary sources |
| 4 | Evergreen over news | Travis (queue), Agent (executes) | `editorial/TOPICS.md` weighted to comparison / definition / how-to; announcements are the exception |
| 5 | Crawlability + schema | Agent | Static HTML (already SSR by nature); Article JSON-LD always, FAQPage JSON-LD when the post has an FAQ; AI crawlers allowed in `robots.txt` |
| 6 | `llms.txt` kept current | Agent | `/llms.txt` — regenerated in the same PR whenever a cornerstone post is added |
| 7 | Real proof points only | Travis (verifies), Agent (cites) | `editorial/FACTS.md` — the ONLY source of numbers/claims; anything else gets `[NEEDS FACT]` |
| 8 | Distribution for earned mentions | Agent (drafts), Travis/human (posts) | Agent emits `editorial/distribution/<slug>.md` with ready-to-paste Reddit/X/Discord/Telegram copy per post. Kits must include **staged composer URLs**: an `https://x.com/intent/post?text=…` link and an `https://www.reddit.com/r/<sub>/submit?type=TEXT&title=…&text=…` link (URL-encoded), so a local Claude session can open them in Chrome — or Travis can click them — with the post prefilled; a human always clicks Post. Say "stage distribution for <slug>" in a local session to have the tabs opened. |

## Definitions
- **Cornerstone post**: a comparison or definition page targeting a head query
  (e.g. "Swop vs Phantom", "what is a self-custody wallet"). These go in `llms.txt`.
- **AEO prompt**: a question a person asks an AI assistant ("best self-custody wallet
  for Solana", "is Swop safe"). The first paragraph of the targeting post must be a
  liftable, self-contained answer to it.

## Daily review loop (Claude, on each morning's PR)
1. Fact-check any claims the drafter flagged (live web sources)
2. Render the banner: `editorial/render-og.sh blog/<slug>` (drafter authors og.html;
   its sandbox has no Chrome) and push to the PR branch. The banner must follow the
   **Banner style** spec below — if the drafted og.html is a plain text card, redesign
   it before rendering.
3. VIEW the rendered og.png and fix layout bugs (overlaps, clipped text) before pushing.
4. Travis merges -> auto-deploys swopme.co
5. Cross-publish to the SmartSite Blog tab: author a spec JSON (SmartSite-length
   adaptation of the article, allowed tags only, canonical link at the end) and run
   `cd ../swop-app-backend && node ../swop-website/editorial/smartsite-publish.js <spec>`

## Banner style (og.html) — "clickable thumbnail", not a text card
Travis's standing direction (2026-08-28): banners should look like a high-CTR
thumbnail, not a quiet title card. Reference: `blog/gasless-crypto-wallet/og.html`.
- **Hook, not headline.** 3–6 punchy words in 90–120px 900-weight type ("PAY $0
  IN GAS. EVER."), NOT the article title. Highlight the key word/number in accent
  green (#2ec27e / #5ff0ab) with a glow. Article title can appear as a small one-line
  subtitle.
- **One big visual focal point** on the right ~45% of the frame: a large emoji or
  drawn object on a glowing coin/disc, with a bold prop where it helps (red slash,
  rotated sticker tag, arrow). The visual must dramatize the claim (gas pump crossed
  out), never decorate it.
- **Depth + contrast:** dark radial gradient bg tinted toward the accent, glow blobs,
  subtle diagonal stripes, drop shadows. Must read clearly at ~300px wide in a feed.
- **Keep:** SWOP wordmark top-left, kicker pill, `swopme.co/blog` small at bottom.
- **Never:** dense text, more than ~10 words total, misleading claims not backed by
  the article, off-palette rainbow colors (red is reserved for the "bad thing" prop).
- Layout QA: everything inside 56–72px margins, no overlapping elements — always view
  the rendered PNG before pushing.

## Weekly human loop (Travis)
- Refill `QUERIES.md` / reorder `TOPICS.md` (what are people actually asking?)
- Verify or strike rows in `FACTS.md`; resolve `[NEEDS FACT]` markers in open PRs
- Merge approved drafts — merging to main auto-deploys production
- Post the distribution kits for anything merged
