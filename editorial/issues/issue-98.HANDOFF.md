# Issue #98 — 2026-10-09 — SPECIAL EDITION No. 02, drafted and awaiting a send permit

**State: BUILT, DRAFTED, TEST COPY SENT, NOT SENT TO SUBSCRIBERS.**

- Draft: `https://resend.com/broadcasts/513b4159-c7e2-4426-aabb-babfa6548b08` (`sent: false`)
- Subject: `Swop Daily #98 — the half of the pitch nobody emails you` (56 chars, under the 70-char broadcast-name cap)
- Test copy: `travis@swopme.co`, id `01a12091-fdb6-745b-ba39-93a1d647a063`
- Reusable source: `editorial/issues/issue-S02.html` (dateless, masthead `SPECIAL EDITION — NO. 02`)
- Send copy: `$ICLOUD/Swop_Daily_Newsletter_2026-10-09.html` (masthead `ISSUE #98 — SPECIAL`)

⏳ **This permit does not expire into uselessness.** There is no fetched number, no index
level, no token of the day, no ledger tile and no dated calendar anywhere in the issue, so
it is as true next week as today. Contrast #96, which was discarded because its market data
went stale while its permit sat (`[[stale-daily-issues-get-discarded-not-resent]]`).

⚠️ **#97's draft is also still unsent** (`ddb89c9a-787f-494a-8c79-1eba832dc889`). Both are
dateless, so neither is spoiling. If only one goes out, either order works — #97 is the
four-panic-moments service issue, #98 is the trust/limits issue. They share no content.

---

## Why this is a special edition and not a market issue

The market path has **two independent gates, both re-measured today rather than inherited**
(`[[re-derive-blocker-ratings-dont-inherit-them]]`), and both are still shut:

| Gate | Measured how, 2026-10-09 | State |
|---|---|---|
| The build wrapper | `test -x ~/.eldorado/bin/newsletter-build.sh` | **Not installed.** The permit to install + allowlist it has now expired unanswered twice |
| MongoDB Atlas IP whitelist | Observed live in today's `newsletter-draft.sh` run: *"Could not connect to any servers in your MongoDB Atlas cluster… an IP that isn't whitelisted"* | **Still not whitelisted** |

The second gate is the one worth restating, because it changes the shape of the ask that
has been going to Travis: **approving the build-wrapper permit alone would still not ship a
market issue.** The bento's `winnings_paid_7d_usd` / `winners_7d` keys come from
`newsletter-audience-sync.js`, which cannot reach Atlas, and `newsletter-fill.js` hard-fails
on a missing ledger key rather than emitting a `[TBD]`. Both gates have to clear in the same
day or the market build dies at a different line than it did yesterday.

`newsletter-draft.sh` treats the Atlas failure as non-fatal and continues, which is why a
numbers-free issue sails through it — and is exactly why the special edition exists.

### A real consequence of gate 2, beyond the bento

**The Resend audience was not re-synced today**, because the sync is the step that cannot
reach Atlas. The broadcast will go to the "Swop Daily" audience (`709b94d8-…`) as it was
left by the last *successful* sync. Anyone who signed up since then will not receive #98,
and will not be counted. That is a subscriber-growth leak, not just a tile problem, and it
is invisible from the Beachhead Audience tab — which shows the audience, not its staleness.

## Verification performed (no shell beyond `grep` needed)

| Check | Result |
|---|---|
| `<div` / `</div>` | 45 / 45 |
| vs. `issue-S01.html` (the frame this was derived from) | 45 — matches, so no orphaned wrappers |
| Unfilled `%%[A-Z0-9_]+%%` tokens | 0 (the digit class is load-bearing — see the memory note) |
| Literal `[TBD]` / `[NEEDS FACT` | 0 |
| Unsubscribe variable | present |
| Hand-typed price, index level or platform count | **none** — the issue contains no fetched number at all |
| Outbound links resolve on prod | 4/4, checked against the live `swopme.co/blog/` index: `accept-card-payments-merchant-verification`, `settlement-is-the-product`, `recover-wallet-without-seed-phrase`, `how-does-swop-make-money` |

### `fact-drift.sh` hand-check (the script still cannot run here)

`fact-drift.sh` greps **per line** (`grep -niE "$deny"`, then `grep -viE "$allow"` on the
matched lines), so a deny phrase and its allow phrase must sit on the *same* line. Every
deny regex in the rule table was run against the issue by hand. Three rules produce deny
hits; all three are cleared by an allow term on the same line:

- **F-AUDIT-IMPLIED** — lines 30, 114 (`third-party security audit`). Cleared: line 30 has
  "there is **no** third-party security audit" (27 chars to `audit`, inside the 40-char
  window); line 114 is the verified sentence "Swop **has not commissioned** a third-party
  security audit to date." (37 chars). The agent section's "hash-chained audit log" is
  itself an explicit allow term.
- **F-ZEROPROOF-TENSE** — lines 30, 115 (`ZeroProof is`). Cleared: both lines carry
  "is not live"; line 115 additionally carries "in development" and "disabled in
  production". The **F-ZEROPROOF-ZK** deny does *not* fire, because `[^.]{0,60}` cannot
  cross the period between "ZeroProof is not live." and the zero-knowledge clause — and
  that clause reads "it is **not a zero-knowledge** proof" anyway, which is an allow term.
- **F-IOS-TAPTOPAY** — lines 30, 116. Cleared: the claim is written as "Tap to Pay **is
  not** live on iPhone" deliberately, so the allow term is inside the same sentence rather
  than borrowed from a neighbouring one; line 116 also has "we would rather name the gap".

Explicitly grepped and **zero deny hits**: `F-EXIT-HOLD`, `F-STAKING`, `F-CARD-PROCEEDS`,
`F-CUSTODY-KEEPS`, `F-INTERNAL-DETAIL`, `F-SWAP-FEE-NUMBER`, `F-SLIPPAGE-CAP`,
`F-PERPS-FEE-NO-CAVEAT`, `F-TOKEN-INVESTMENT`, `F-FEE-SHARE-HOLDERS`, `F-OWN-THE-NETWORK`,
`F-EFFECTIVE-RATE`, `F-MINT-ADDRESS`, `F-COPYTRADE-UNPROMOTED`, `F-WALLET-COUNT-TILE`,
`F-USER-COUNTS`, `F-RATINGS-COUNT`, `F-X402-NEGATIVE`, `F-COMPETITOR-UNCITED`,
`F-REFERRAL-CHECKOUT`, `F-REFERRAL-FUNDED-OUT`, `F-REFERRAL-DEK`.

⚠️ **The exit hold is still live** (`FACTS.md` notice, 2026-10-02). This issue mentions
**perps and positions nowhere at all** — not as a hedge but as a design choice, the same
discipline #97 and the R3/R4 drafts used. The phrase "the owner can always get out" and
every paraphrase of it are absent. Note that the agent section describes the policy layer's
*mechanics* (versioned policy, owner signature to expand authority, hash-chained audit log,
shadow mode, backend signing seam, not an on-chain guarantee) and says **nothing about what
the policy never blocks** — that is the held claim, and it was left out on purpose.

### Every Swop sentence, traced to a Verified FACTS.md row

Bento: *Two rails, one rule* (2026-09-23) · *Card proceeds* (09-23) · *Who holds the
documents* (09-23) · *Platforms* (08-26).
Article 01: *Two rails, one rule* · *x402 SmartSite storefront* (09-02) · *Who holds the
documents* · *Nothing on-chain* (09-23) · *Card proceeds* · *Checkout fee, both rails* (09-24).
Article 02: *Self-custody* (08-26) · *Phone loss / recovery* (09-01).
Article 03: *No third-party audit (honest)* (09-01) · *ZeroProof status (honest)* (09-23) ·
*Card payments live* (09-23, the iOS-Tap-to-Pay negative) · *AI agent model* (08-26) ·
*Agent policy layer* (08-28) · *Policy rollout stage* (08-28) · *Policy enforcement seam
(honest framing)* (08-28) · *Self-custody* · *Gas is absorbed* (09-25) · *Sponsored gas*
(08-26) · *Checkout fee, both rails* · *Chains live* (08-26) · *Built-in swap* (09-21).

**No Swop platform number in this issue is a pulled number**, because there are none: the
four bento values are `0`, `$0`, `0` and `3`, and all four are *published facts* rather than
ledger reads. The `3` is the Platforms row counted (iOS App Store, Google Play, swopme.app) —
not a user, wallet or transaction count, so `F-USER-COUNTS` does not apply and nothing here
can go stale between the draft and the send.

An editorial note on the two `0` tiles and the `$0` tile: each is framed so the zero reads
as a *deficit of something you would not want* (ID checks, stored documents, your card money
in our hands), never as an achievement metric. A tile reading "third-party audits: 0" was
drafted and **cut** for exactly this reason — a big green zero next to the word "audit"
reads as a safety score, which inverts the honest meaning. The audit gap is in prose, in the
verified wording, where it cannot be skimmed as a win.

## Journal slot — Spotlight again, and why

**Article 02 is the Swop Spotlight fallback, not "From the Journal."** Verified against
prod, not `ls blog/` (`[[verify-prod-in-war-room-snapshots]]`): fetching
`https://www.swopme.co/blog/` lists 29 posts, newest `settlement-is-the-product` (Oct 7).
**There is no Oct 8 and no Oct 9 post** — the blog has been dark two days. #96 already used
`settlement-is-the-product` as its Journal slot, so re-using it as the Journal article would
have been the third issue on one post; it is plugged in one line inside the Spotlight
instead, per NEWSLETTER.md.

🔁 **Re-decide this at build time for #99** (`[[recheck-journal-slot-before-build]]`). The
blog shipped same-day twice the week of 10-06, and four finished posts are one promotion
away from going live — if any lands, restore the eyebrow to `02 &mdash; From the Journal`,
re-insert the banner anchor above the title div and repoint both `<a href>`s. That block
contains no `<div>`, so the 45/45 count is unaffected either way.

## Why the blog is dark, and what it is blocked on

Not a drafting problem — **four finished posts are staged** in `editorial/drafts/`
(`sent-crypto-to-wrong-address`, `token-not-showing-in-wallet`,
`crypto-transaction-still-pending`, `crypto-swap-failed`), staged outside `blog/` precisely
so an unpromoted query blocks *publishing* and not *writing*
(`[[stage-blocked-posts-in-editorial-drafts]]`).

Their four queries are still under `## Proposed — retention & trust` at **QUERIES.md line
52**, below the `## Proposed` boundary at **line 40**. `publish-retention-cluster.sh`
preflight requires each post's query *above* line 40 and **never edits QUERIES.md itself** —
promotion is Travis's call by that file's own rule. So the gate is four lines moved up, then
one command. The script, its guarantees and its read-only review are in
`editorial/issues/PUBLISH-CLUSTER-REVIEW.md`; read that before `--apply`.

Also still true and still unfixed, from that review: the local checkout is **behind prod by
three posts**, and `sitemap.xml` / `blog/index.html` / `llms.txt` are hand-maintained flat
files that do not know about them (`[[shared-index-files-lag-prod-separately]]`). Following
the old per-post checklists literally from this checkout would have **de-listed three live
posts**. The script's preflight refusing to run unless `HEAD == origin/main` is the fix; do
not bypass it.

## Not done this session

- **Market issue #98 — not attempted**, by choice. Both gates above are shut, and
  hand-typing a price is the failure the template/fill split exists to prevent
  (#78 shipped ETH $12,507).
- **Blog PR state — unverifiable.** `git` and `gh` are both denied. Prod was checked by
  URL, which answers "did it ship" but not "what is open".
- **SmartSite cross-post — blocked, re-measured today.** `swop_get_my_smartsite` returns
  *"requested permissions … haven't granted it yet"* in this non-interactive session, so the
  SmartSite was never read and nothing was added. Four consecutive days.
- **The weekly long-form SEO guide — written, not shipped.** The R1–R4 retention cluster
  *is* this week's long-form work; it is finished prose sitting behind the promotion gate,
  not missing work.
