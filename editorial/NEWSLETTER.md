# Swop Daily Newsletter — Generation Guide (v2)

Revives the Cowork daily newsletter (last legacy issue #77, 2026-07-02; issue #78,
2026-08-27, was the first of this system). Runs as part of the daily review loop in
PLAYBOOK.md, after the day's blog post is merged.

## The one structural change from v1
**Article 02 is now "From the Journal"** — the day's Swop Journal post, with:
- the post's banner (`https://www.swopme.co/blog/<slug>/og.png`) as a linked image
- title + a 3-4 sentence answer-first summary
- a secondary link to one other recent post
- `READ THE POST →` CTA to the canonical URL
On a day with no new post, fall back to the classic Swop Spotlight (tie the day's
news to a Swop value prop) and plug the most recent post in one line.

## Base template
`editorial/newsletter-base.html` (issue #78) is the canonical base — dark bento
layout, section HTML comments as anchors. Generate each issue by string-replacing
its content sections (Python), never hand-assembling the frame. Issue number
increments daily from #78.

## Daily content (all last-24h; cite-checkable facts only)
1. Market row: BTC/ETH/SOL/BNB price + 24h% (green pill #0c2818/#22c55e, red #2a0c0c/#ef4444)
2. Index row: S&P/Nasdaq/Dow/Russell last close + %
   Rows 1-2 + the Market mover tile come ONLY from
   `node editorial/newsletter-market-data.js` (CoinGecko + Yahoo) — never
   hand-type a price, in tiles OR prose (issue #78 shipped ETH $12,507).
   WebSearch is for the stories, not the numbers.
3. Bento (pulled, never [TBD]): Swop wallets total, Agent trade actions 24h,
   Feed posts 24h — all from the audience-sync summary JSON; plus Market mover
   (verified top mover). Swap volume/counts have NO live ledger — don't invent them.
4. Big story: single most important crypto/fintech headline of the 24h + 3 tags
5. Move of the day: notable pair move or setup, "illustrative only, not advice"
6. Article 01 Fintech pulse: macro/regulatory/institutional story, 2 tight paragraphs
7. Article 02 From the Journal (see above)
8. Article 03 Day ahead: 📅 Macro Calendar (3-5 items) / ⚖️ Court Watch (2-4) /
   🎯 Tonight's Games with Swop-Predictions-vs-books framing (never sportsbook voice)

## Voice
Tight, builder-first, crypto-native, zero hype. No financial advice language.
Numbers only from checkable sources; platform stats stay [TBD] until Travis provides.

## Output (v3 — Resend broadcast, automatic)
1. Write the HTML to iCloud: `.../Documents/Claude/Projects/Swop/Swop_Daily_Newsletter_YYYY-MM-DD.html`
2. Sync the audience (Privy-bound Swop users, minus deleted accounts; Resend
   owns unsubscribes):
   `cd ../swop-app-backend && node ../swop-website/editorial/newsletter-audience-sync.js`
   The summary JSON includes `new_wallets_24h` — use it for the bento's
   "New wallets" tile. Because sends are automatic, the bento must never ship
   a literal `[TBD]`: use stats from the sync summary or checkable sources,
   and render an em dash for anything Travis hasn't supplied.
3. Send as a Resend Broadcast to the "Swop Daily" audience:
   `node editorial/newsletter-send.js --html <issue.html> --subject "Swop Daily #N — <hook>" --send`
   The script injects a Resend unsubscribe footer if the HTML lacks one.
   Use `--test travis@swopme.co` first when the template changed structurally,
   and plain draft mode (no `--send`) if anything about the issue is uncertain.
4. Gmail drafts are no longer part of the flow (v2 behavior); Travis receives
   the real broadcast like any subscriber. Broadcast stats surface on the
   Beachhead Audience tab.
