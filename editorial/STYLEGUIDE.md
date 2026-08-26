# Swop Journal — Writing & Production Guide

Read editorial/PLAYBOOK.md first — every rule here implements one of its 8 steps.

## Voice
- Plain, confident, a little dry. Short declarative sentences. No hype words
  ("revolutionary", "game-changing", "seamless"), no exclamation marks.
- Honest about tradeoffs. The reference post is /blog/agentic-trading-is-live —
  match its register.
- Explain jargon on first use. Assume a smart reader who is new to crypto.

## Facts discipline (Playbook #7)
- Numbers, fees, counts, and product claims come ONLY from editorial/FACTS.md
  ("Verified" table). Use the exact wording column where given.
- Anything else: write `[NEEDS FACT: what's needed]` and flag it in the PR body.
- Comparison posts: claims about competitors must be neutral, verifiable from the
  competitor's own public docs, and phrased as of the writing date. When unsure,
  describe the category, not the competitor.

## Post structure (Playbook #1, #2, #4)
Every post targets ONE primary query from editorial/QUERIES.md, named in the PR body.
Structure, in order:
1. **The answer** — first paragraph is a 2-3 sentence, self-contained, liftable answer
   to the target query. No throat-clearing, no marketing framing. A reader (or an AI
   answer engine) who stops here got the answer.
2. **Supporting detail** — the h2 sections: mechanics, tradeoffs, examples.
3. **Comparison table or FAQ** — comparisons get an HTML table; definitions and
   how-tos get a 3-5 question FAQ section (h2 "FAQ", h3 per question) matching a
   FAQPage JSON-LD block.
4. **Swop framing last** — how Swop does it, with FACTS.md claims and app links.
Content types, in priority order: comparison → definition → how-to → announcement.
Announcements only when something actually shipped.

## E-E-A-T (Playbook #3)
- Byline: "Swop Team", `.by .nm` linking to /blog/authors/swop-team (JSON-LD author
  url too). Named authors only when the topic queue specifies one.
- Dates: visible published date AND "Updated <date>" in the art-meta row;
  `datePublished` + `dateModified` in JSON-LD. Bump both when revising.
- Every post links at least two primary sources (FACTS.md list, Swop docs, or
  competitor docs for comparisons). Never link swop.tech (not our domain).

## Per-page SEO/schema checklist (Playbook #5)
1. Copy the HTML skeleton of blog/agentic-trading-is-live/index.html exactly
   (head, nav, art-head, toc, prose, sub, app, foot; stylesheet /blog/swop-blog.css).
2. Slug: kebab-case; file at blog/<slug>/index.html. 900-1600 words, 4-6 h2 sections
   with id="s1"… matching the TOC.
3. Unique <title> ≤60 chars with the target query near the front; meta description
   140-160 chars answering the query; canonical https://www.swopme.co/blog/<slug>;
   OG + Twitter tags; Article JSON-LD; FAQPage JSON-LD when there is an FAQ section.
4. Share links (copy-link / X / Farcaster) updated to the new URL.
5. Update blog/index.html (new post featured, previous featured into Recent, bump
   count) and sitemap.xml (add URL with lastmod).
6. Move the topic line in editorial/TOPICS.md to "Drafted (in review)".

## llms.txt (Playbook #6)
If the post is a cornerstone (comparison or definition targeting a head query),
add it to /llms.txt in the same PR, keeping the file short — one line per link.

## Distribution kit (Playbook #8)
For every draft, also write editorial/distribution/<slug>.md containing ready-to-paste:
a Reddit post (suggest 1-2 relevant subreddits, non-spammy framing that leads with
the answer), an X thread (3-5 posts), and a 2-sentence Discord/Telegram recap.
A human posts these — the agent never posts externally.
