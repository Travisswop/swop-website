# Issue #92 — build handoff (2026-10-02)

**Filed 2026-10-02 at the START of the block, not the end.** The permit for the send went
out with this document. That is deliberate: #90 and #91 both died on timing, not content.

---

## 0. State of the archive — read this before anything

| Issue | Built? | Sent? |
|---|---|---|
| #89 (**09-18**) | yes | **yes — the last issue subscribers actually received** |
| — (09-19 … 09-27) | nothing built | nothing sent |
| #90 (09-28) | yes, in iCloud | **no.** `external.send_swop_daily_90` expired unanswered 09-29 (24h timeout = denied). Discard the Resend draft. |
| #91 (10-01) | **no** — template only; `node` was denied all day, the 6h market window closed at 22:24Z unbuilt | no |
| #92 (10-02) | this one | pending Travis |

**The dark run is 14 days — nothing has reached a subscriber since #89 on 2026-09-18.**

Corrects the #91 handoff, which called it "four days (09-28 … 10-01)". That counted only
the days an issue was *attempted*, and silently dropped the nine-day 09-19 → 09-27 gap in
front of it (confirmed: no issue artifact and no iCloud HTML exists for any of those dates,
and QUILL's own 09-27 log opens "channel dark since #89 (9/18) — 9 days"). Three successive
handoffs have now understated this figure by looking at the wrong row. **Verify against two
things, never one:** the iCloud `Swop_Daily_Newsletter_*.html` files for what was *built*,
and the floor-6 lessons log for which `send_swop_daily_*` permits expired. A handoff's "last
issue sent" line records what was *permitted*, not what left.

Numbering carries forward anyway: #90 and #91 both exist as artifacts, and renumbering
desyncs the archive. Today is #92.

**Do not send #90 or #91 now.** #90's tiles are four days stale; #91's Day-ahead block is
about an ISM print and a Phillies–Braves elimination game that both already happened
(Atlanta won). A daily arriving days late with wrong prices costs more trust than silence,
which is the opposite of what the Stage 1 retention goal is buying.

---

## 1. Why QUILL can't finish it — re-tested today, not assumed

| Command | Result 2026-10-02 |
|---|---|
| `cd …/swop-website && node editorial/newsletter-fill.js --inspect` | ❌ denied — compound command |
| `node /Users/…/swop-website/editorial/newsletter-fill.js --inspect` | ❌ denied — `node` with arguments |

Unchanged from 2026-10-01, and the allowlist in last night's handoff was not applied.
State it precisely: **node runs** (`node --version` → v22.22.0); *node with arguments* is
what the allowlist denies. The vague version — "QUILL can't run node" — is exactly how a
24h permit gets spent on the wrong fix. Cf. the git-lane misdiagnosis that froze the push
queue 108 hours asking Travis to unblock `git push`, which was never blocked.

**Minimum change that unblocks it, both halves required:**

1. Add to `allow` in `/Users/travis/Desktop/SwopLive/swop-website/.claude/settings.local.json`:
   ```
   "Bash(node editorial/newsletter-fill.js:*)",
   "Bash(node editorial/newsletter-audience-sync.js --dry-run)"
   ```
2. Add `swop-app-backend` as an allowed working directory for QUILL's sessions
   (`newsletter-audience-sync.js` needs that repo's `node_modules` + Mongo env, and the
   documented recipe writes to `/tmp` — both outside the current sandbox).

**Deliberately NOT requested:** any allowlist entry for `newsletter-send.js`. Prefix
matching cannot distinguish `--send` from a draft. The broadcast must keep prompting
forever.

---

## 2. Pre-flight already done — don't redo

Four of the six conditions `newsletter-fill.js` refuses to write on are verified clean:

- ✅ **`<div>`/`</div>` balance: 75 / 75**, matching `newsletter-base.html` and the verified
  #91 template. This is the check that caught 28 orphaned wrappers in #79–#84.
- ✅ **30 `%%TOKEN%%` placeholders, all unfilled** — exact parity with #91.
- ✅ **No hand-typed price anywhere.** Grep for `$[0-9]` over the whole template: zero hits.
  There is nowhere in it to type a price.
- ✅ **`{{{RESEND_UNSUBSCRIBE_URL}}}` present**, so `newsletter-send.js` won't inject a
  bare footer.

The remaining two (stats-ledger keys, market-file age) can only be checked by running it.

### Journal slot — decided, and re-decide it at build time anyway

Article 02 is **`/blog/sell-digital-products-for-crypto`**, confirmed live today with
`og.png` present. It published 10-01, but #91 never went out, so **no subscriber has ever
seen it** — it is new to the list. That makes this a Journal issue, not a Spotlight
fallback. The copy says "Newest on the Swop Journal", not "new today", which is the honest
framing for a post one day old.

**Standing rule:** if a new post goes live before you build, swap the block to it. The
Journal and Spotlight variants both use exactly 4 divs and the banner `<a><img></a>` adds
none, so the count stays 75/75 either way. No new post is expected today — today's blog
lane is a maintenance PR against existing posts, not a new piece.

### Fact-check — passed, with one deliberate omission

Every Swop claim in Article 01 is verbatim-sourced to a Verified FACTS.md row: checkout fee
0.5% both rails (Travis 09-24), gas absorbed not passed through (09-25), crypto/x402 never
identity-gated and payable in USDC on listing (08-31 / 09-23), card rail requires merchant
verification (09-23), card proceeds never touch a Swop wallet — Stripe holds the fiat and
pays the merchant's bank (09-23). No swap-fee number (that row is still unverified), no
SWOP token claim, no ZeroProof, no audit claim, no user counts, no named-competitor fee
comparison.

> ⚠️ **Deliberately absent: every exit/"owner can always get out" claim.** The `reduceOnly`
> MCP daily-cap regression from `bbeeb20e` is **still live in prod** — CRITIC reviewed the
> one-predicate fix to executed-approval standard at 09:57 UTC today (red→green proven,
> 432/4782 suite clean, zero regressions), but reviewed is not shipped. Until FORGE pushes
> it, a user trying to *exit* a perp position can be blocked by a cap their close does not
> consume. Writing "the owner can always get out" into a newsletter today would be
> publishing a denial of a live bug to 857 subscribers. See
> `editorial/CLAIM-RISK-2026-10-01-exits-always-open.md`.

---

## 3. The build — three commands

**There is no market fetch for today yet.** `.market-2026-10-01.json` is yesterday's and
must not be reused. Step 1 creates today's.

```bash
cd /Users/travis/Desktop/SwopLive/swop-website

# 1. fetch today's market file, then OPEN IT and do the editorial check in §4
node editorial/newsletter-fill.js --inspect

# 2. bento ledgers (must run from the backend repo)
cd ../swop-app-backend && node ../swop-website/editorial/newsletter-audience-sync.js \
  --dry-run > /tmp/swop-stats.json
cd ../swop-website

# 3. build from that SAME fetch — substitute the real filename from step 1
node editorial/newsletter-fill.js --build \
  --template editorial/issues/issue-92.template.html \
  --market   editorial/issues/.market-2026-10-02.json \
  --stats    /tmp/swop-stats.json \
  --totd-ok \
  --out "/Users/travis/Library/Mobile Documents/com~apple~CloudDocs/Documents/Claude/Projects/Swop/Swop_Daily_Newsletter_2026-10-02.html"

# 4. test copy to Travis only — NOT the broadcast
node editorial/newsletter-send.js \
  --html "/Users/travis/Library/Mobile Documents/com~apple~CloudDocs/Documents/Claude/Projects/Swop/Swop_Daily_Newsletter_2026-10-02.html" \
  --subject "Swop Daily #92 — The SEC writes down what custody costs" \
  --test travis@swopme.co
```

Steps 1 and 3 share one market file deliberately — two fetches let the tiles and the prose
disagree. The stats file must contain `winnings_paid_7d_usd`, `winners_7d` and
`winnings_paid_24h_usd` or step 3 exits; hand-writing that file is explicitly rejected, and
a literal `[TBD]` must never reach the bento.

### No `--why` file this issue — on purpose

`issue-92.why.txt` does not exist and should not be invented. The "why it moved" paragraph
has to be written about a *specific* token, and QUILL could not fetch, so there was no
token to research. Omitting `--why` makes the card fall back to a paragraph derived only
from the fetched numbers: **weaker, never wrong.** That is the correct trade. Do not
hand-write one at build time against a token nobody researched — that is how #91's why.txt
ended up welded to a single fetch.

---

## 4. Token of the day — the editorial gate, for whoever builds

`--totd-ok` is an editorial sign-off, not a flag to paste. `newsletter-market-data.js`
picks the trending non-major with the largest **absolute** 24h move and applies no
editorial filter at all, so it can hand you a crash or a slur. Open the market file from
step 1, find `tokenOfTheDay`, and check:

- **Is the name politically charged, partisan, or offensive?** If yes, do not ship it —
  on 2026-09-10 the fetcher returned "Hunter Biden's Laptop" at -63%. Take the next viable
  candidate instead.
- **Is it a faller?** That is fine to feature, but it must read as a faller. The
  numbers-derived fallback paragraph handles this correctly on its own, which is another
  reason omitting `--why` is safe here.
- **Is it a real asset with a real story?** $50M+ mcap, non-major, recognisable.

Only then pass `--totd-ok`.

---

## 5. The send — stays a permit

Build and the `--test` copy to Travis are safe and need no approval. The broadcast to the
"Swop Daily" audience goes only on Travis's explicit yes. The permit filed with this
document states its own expiry.

```bash
node editorial/newsletter-send.js \
  --html "…/Swop_Daily_Newsletter_2026-10-02.html" \
  --subject "Swop Daily #92 — The SEC writes down what custody costs" \
  --send
```

**Expiry: the market file from step 1 passes its 6h `--max-age-hours` guard six hours after
its `fetchedAt`.** Past that, the fallback is `--max-age-hours 12` against the **same**
market file — never a re-fetch, because a re-fetch rotates `tokenOfTheDay`. Past midnight
local it stops being a rebuild and becomes a rewrite: the Day-ahead block is today-only
(the 8:30 ET payrolls print, ISM services at 10:00, and a travel day with no baseball
before four Division Series open tomorrow). If it slips to 10-03, discard #92 and build #93.

Deliverability, do not regress: multipart is automatic (`htmlToText` derives the text
part) — never send `html` without `text`. Open/click tracking stays off on purpose. DKIM at
`resend._domainkey.news.swopme.co` and SPF + feedback MX at `send.news.swopme.co` are
verified and correct — don't "fix" them.
