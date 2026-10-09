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
3. Bento (pulled, never [TBD]): Winnings paid 7d ($ + claim count) and Winners
   paid 7d, both from the audience-sync summary JSON (confirmed
   predictionclaimattempts); the FIXED "Checkout fee · both rails — 0.5%" tile
   (FACTS.md "Checkout fee, both rails", Travis 2026-09-24 — a published rate,
   not a pulled number, so it never goes stale); the phase-2 fund-loss counter
   ("Fund-loss incidents · 90d") once FORGE's `AdminIncident.fundLoss` field
   ships and DEPOT's read path exists — until then it is NOT in the bento, do
   not hand-type a zero; plus Market mover (verified top mover).
   **Swop wallets total is OUT** (removed from the base 2026-09-26): the value
   came from `estimatedDocumentCount()` — an estimate that also counts internal
   test signups — and FACTS.md says no public user number exists, never
   estimate. `editorial/fact-drift.sh` rule F-WALLET-COUNT-TILE blocks it.
   Every tile must name the FACTS.md row or the ledger it comes from; a tile
   with no citable source does not ship.
   Money moving beats activity counts (Travis, Aug 27). Swap volume/counts
   have NO live ledger — don't invent them; agent/feed counts are out.
4. Big story: single most important crypto/fintech headline of the 24h + 3 tags
5. Token of the day: the fetcher's `tokenOfTheDay` (hottest trending non-major,
   $50M+ mcap) — pair title, 24h% + price, metric chips (mcap, 24h vol,
   vol/mcap, rank), then a WebSearch-sourced "why it moved" paragraph.
   Always ends "Illustrative only, not advice."
6. Article 01 Fintech pulse: macro/regulatory/institutional story, 2 tight paragraphs
7. Article 02 From the Journal (see above)
8. Article 03 Day ahead: 📅 Macro Calendar (3-5 items) / ⚖️ Court Watch (2-4) /
   🎯 Tonight's Games with Swop-Predictions-vs-books framing (never sportsbook voice)

## Building an issue (v4 — template + fill script) — DO THIS
Since #90 an issue is two files, and the split is the whole point: **QUILL writes
prose, the fetcher writes numbers, and the two never mix.**

1. `editorial/issues/issue-<N>.template.html` — a complete issue, copied from
   `newsletter-base.html` with **whole prose blocks replaced and every wrapper tag
   left byte-identical**. Every number is a `%%TOKEN%%`. QUILL can write this with
   no shell access at all, and cannot hand-type a price because there is nowhere
   to type one.
2. `editorial/newsletter-fill.js` — fetches, substitutes, verifies, writes.

```
# 1. fetch once; look at the token-of-the-day candidate before accepting it
node editorial/newsletter-fill.js --inspect

# 2. pull the bento ledgers
cd ../swop-app-backend && node ../swop-website/editorial/newsletter-audience-sync.js --dry-run > /tmp/swop-stats.json

# 3. build from that same fetch
node editorial/newsletter-fill.js --build \
  --template editorial/issues/issue-90.template.html \
  --market editorial/issues/.market-2026-09-27.json \
  --stats /tmp/swop-stats.json --totd-ok \
  --out "$ICLOUD/Swop_Daily_Newsletter_2026-09-27.html"
```

Steps 1 and 3 share one market file deliberately — two fetches let the tiles and
the prose disagree. The script **refuses to write** on any of: an unfilled token, a
market file older than 6h (`--max-age-hours`), a `<div>`/`</div>` imbalance, a div
count that differs from `newsletter-base.html`, a missing unsubscribe variable, a
missing bento ledger key, or a token-of-the-day card without `--totd-ok`. Those are
the failure modes that have actually shipped — #78's ETH $12,507, #79–#84's 28
orphaned wrappers, #83–#84's stale $0.01 token price — so they are exit codes now,
not checklist items.

`--why <file>` supplies the researched "why it moved" paragraph (must contain the
"not advice" line). Without it the card falls back to a paragraph derived only from
fetched numbers: weaker, never wrong.

## Building an issue from the previous one (HTML hygiene) — fallback only
Superseded by v4 above; keep for issues generated before #90. Two rules,
both learned the hard way:
- **Replace inner text, never re-emit the wrapper.** If a replacement starts mid-
  paragraph and ends at `</div>`, do NOT insert a fresh `<div ...>` — the original
  opening tag is left orphaned and every later element nests one level deeper.
  Issues #79-#84 accumulated 28 such orphans before it was caught (2026-09-09).
- **Verify before sending.** Two checks, every issue:
  1. `<div` count == `</div>` count, and both match `newsletter-base.html` (75/75).
  2. Every tile value (crypto, indices, token-of-the-day price/%/mcap/vol/rank,
     bento stats) appears verbatim in the HTML and matches the
     `newsletter-market-data.js` + audience-sync JSON for that run. The token
     PRICE tile silently went stale for two issues (#83-#84 shipped $0.01) because
     only the % and mcap were being updated.
Also re-read the Day-ahead block each day: Macro Calendar / Court Watch / Tonight's
Games are carried forward and go stale silently (a "today's Journal post covers it"
line survived a week before it was noticed).

## Token of the day — editorial check required
`newsletter-market-data.js` picks the trending non-major with the largest ABSOLUTE
24h move, so it can hand you a crash, and it applies no editorial filter at all. On
2026-09-10 it returned a politically-charged memecoin ("Hunter Biden's Laptop",
-63%) — do not ship that. Rules:
- Never feature a politically charged, partisan, or offensive token name. Take the
  next viable candidate; re-run the trending list and pick by hand if needed.
- A faller is fine to feature, but frame it honestly as a faller — do not write a
  crash up as momentum.
- Best case: close a loop on a token the newsletter already covered, and say what
  we said last time.

## Deliverability (do not regress)
- **Every send is multipart** — `newsletter-send.js` derives a plain-text part from
  the issue HTML (`htmlToText`) and sends it as `text` alongside `html`. Issues
  #78-#87 shipped HTML-only, which is a standing spam-filter penalty at Gmail and
  Outlook. Never send `html` without `text`.
- **Auth is correct and verified — don't "fix" it.** DKIM at
  `resend._domainkey.news.swopme.co`; SPF + the feedback MX at `send.news.swopme.co`
  (the Return-Path domain, which is where SPF is actually evaluated — it is NOT
  supposed to be on `news.swopme.co`). Resend reports all three verified.
- **Open/click tracking is intentionally OFF.** Turning it on rewrites every link
  through a tracking domain, which costs more in spam score than the stats are worth.
- Known gap needing Travis + DNS access: `swopme.co` has no DMARC record of its own
  (`news.swopme.co` publishes `p=none`). See the deliverability note in memory.

## Voice
Tight, builder-first, crypto-native, zero hype. No financial advice language.
Numbers only from checkable sources; platform stats stay [TBD] until Travis provides.

## Output (v3 — Resend broadcast, automatic)
1. Write the HTML to iCloud: `.../Documents/Claude/Projects/Swop/Swop_Daily_Newsletter_YYYY-MM-DD.html`
   — this is `--out` on `newsletter-fill.js --build`, not a hand-saved file.
2. Sync the audience (Privy-bound Swop users, minus deleted accounts; Resend
   owns unsubscribes):
   `cd ../swop-app-backend && node ../swop-website/editorial/newsletter-audience-sync.js`
   Because sends are automatic, the bento must never ship a literal `[TBD]`:
   the fill script hard-fails on a missing ledger key rather than emitting one.
3. Send as a Resend Broadcast to the "Swop Daily" audience:
   `node editorial/newsletter-send.js --html <issue.html> --subject "Swop Daily #N — <hook>" --send`
   The script injects a Resend unsubscribe footer if the HTML lacks one.
   Use `--test travis@swopme.co` first when the template changed structurally,
   and plain draft mode (no `--send`) if anything about the issue is uncertain.
4. Gmail drafts are no longer part of the flow (v2 behavior); Travis receives
   the real broadcast like any subscriber. Broadcast stats surface on the
   Beachhead Audience tab.

## Dark-day fallback — the special edition (added 2026-10-08, QUILL)

**A blocked market fetch no longer has to mean a dark day.** Every number in this
newsletter comes from `newsletter-fill.js`, so when `node` or the build wrapper is
denied, the whole issue is unbuildable and the day passes with nothing sent — that
happened on #97, and it is the second lane the same blocker has drained.

`editorial/issues/issue-S01.html` is the standing fix: **a complete, already-built
issue that contains no fetched number at all.** It is reusable on any day, by anyone,
with no shell beyond the draft wrapper.

- **Why it cannot go stale:** no prices, no index levels, no token of the day, no
  ledger tiles, no dated calendar. The four bento tiles are *published* facts
  (self-custody, gas absorbed, checkout fee, chains live), which NEWSLETTER.md already
  treats as never-stale, and each names its FACTS.md row in the chip. The masthead
  carries no date. **A send permit on it is therefore safe to approve days later** —
  unlike a market issue, which the staleness guard correctly refuses.
- **Content:** the four post-install panic moments (pending / wrong address / token not
  showing / swap refused) answered inline, plus three limits stated plainly. It is the
  R1–R4 retention cluster's substance delivered by email, so it does **not** depend on
  those four blog posts being unblocked, and it links only to prod-verified slugs.
- **To send it:** `cp` it to
  `$ICLOUD/Swop_Daily_Newsletter_<date>.html`, set the masthead's right cell to that
  day's issue number, then run `newsletter-draft.sh`. That is the whole procedure.

### Two hard constraints on `newsletter-draft.sh`, learned by hitting both

1. **It refuses any path but `$ICLOUD/Swop_Daily_Newsletter_<date>.html`.** A file kept
   anywhere else — including `editorial/issues/` — is rejected with exit 2. Keep the
   reusable copy in the repo, but always `cp` to the canonical path before drafting.
2. **The subject is also the Resend broadcast `name`, which caps at 70 characters.**
   Over that, the POST fails 422 *after* audience sync has already run. Count the
   subject before invoking.
