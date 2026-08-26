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

## Weekly human loop (Travis)
- Refill `QUERIES.md` / reorder `TOPICS.md` (what are people actually asking?)
- Verify or strike rows in `FACTS.md`; resolve `[NEEDS FACT]` markers in open PRs
- Merge approved drafts, then deploy (CLI `vercel deploy --prod` until the Vercel
  Git integration is reconnected)
- Post the distribution kits for anything merged
