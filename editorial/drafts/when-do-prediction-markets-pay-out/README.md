# R6 — `when-do-prediction-markets-pay-out` (QUILL, 2026-10-21)

**Staged, not published.** Nothing is in `blog/`, the sitemap, `llms.txt` or TOPICS.md
"Up next". The query is in QUERIES.md under *Proposed*, not promoted, and the rule at the
top of that file forbids writing into `blog/` for an unpromoted query. Staging outside
`blog/` is how R1–R4 were handled (`[[stage-blocked-posts-in-editorial-drafts]]`).

This closes the retention cluster: **R1–R4 and R6 are now written. R5 remains parked** —
it is still hold-conflicted and must not be drafted (see the warning in QUERIES.md).

---

## The headline: this post needs ZERO promoted FACTS rows

`FACTS.md` has carried this since 2026-10-13:

> ⭐ **P2 is why R6 cannot be written the way R3 and R4 were.** … The reader's actual
> question is "the game is over and I won — where is my money", and the honest answer to
> it *is* P2: the lag is real, it is measured in hours, and it is normal. A post that
> explains oracle challenge windows in the abstract while declining to say that would be
> answering a question nobody asked.

**That re-derivation was right about the reader and wrong about the sourcing**, and the
error is one word: *abstract*. The lag is not abstract. It is a published, numbered,
primary-sourced property of the resolution process, and it can be stated precisely without
a single Swop behavioural claim. The post below does exactly what P2 asks for — tells the
reader the lag is real, normal, and roughly how long — and cites it to UMA and Polymarket
rather than to a row Travis has not answered.

Re-derived 2026-10-21 per `[[re-derive-blocker-ratings-dont-inherit-them]]`. The 10-13
rating is superseded; the 10-04 rating ("needs a resolution/payout row") is superseded too.

### What the post asserts, and where each number comes from

Every figure in the post is sourced to a public primary source and linked inline. There is
no number in this post that came from `FACTS.md`, from the vault, or from inference.

| Claim in the post | Source | Fetched |
|---|---|---|
| Markets are resolved by "the UMA Optimistic Oracle, a smart-contract based optimistic oracle" | [Polymarket help — how are prediction markets resolved](https://help.polymarket.com/en/articles/13364518-how-are-prediction-markets-resolved) | 2026-10-21, quoted verbatim |
| Proposer must "put up a bond in USDC.e which will be forfeited if the proposal is unsuccessful" | same | 2026-10-21, verbatim |
| "Once a market is proposed for resolution it goes into a challenge period of 2 hours" | same | 2026-10-21, verbatim |
| Winning shares pay $1, losing shares $0 | same, and already asserted in the live `/blog/prediction-markets-101` | 2026-10-21 |
| "Disputes are forwarded to the DVM for dispute resolution"; DVM is "a Schelling point mechanism where UMA stakers resolve disputes in return for staking rewards" | [UMA docs — how does UMA's oracle work](https://docs.uma.xyz/protocol-overview/how-does-umas-oracle-work) | 2026-10-21, verbatim |
| "commit secret votes during a 24-hour commit period and subsequently reveal them in a 24-hour reveal period" | same | 2026-10-21, verbatim |
| "Disputes must be at least 4 hours old to enter a new voting round"; minimum 65% majority of staked UMA | same | 2026-10-21, verbatim |

**Banner carries no figure at all** — the tag reads `ENDED ≠ RESOLVED`. Deliberate: a
number baked into a PNG cannot be corrected if Polymarket changes the window
(`[[fix-the-transport-before-the-copy]]` logic applied to artwork — fix what can drift).

---

## The three rows this post deliberately does NOT use

This is the part to check me on. Each of these would have made the post slightly better and
each one is unpromoted, so each is absent:

1. **P1 — "Swop's prediction markets are Polymarket markets."** Not asserted anywhere.
   The post describes Polymarket's resolution process as Polymarket's, in a section about
   how these markets work; it never says Swop's markets are those markets. The §6 "Where
   Swop fits" section is written to be true whichever venue Swop uses.

   *New evidence on P1's rating, for Travis:* its stated justification is that promoting it
   "names a third-party dependency publicly for the first time." **That premise is not
   accurate.** `swopme.co`'s own homepage already renders a product ticker row reading
   `PREDICT · POLYMARKET · 62¢` (`index.html:2402`), and the live post
   `/blog/usdc-vs-usdce` discusses Polymarket, pUSD and its April 2026 collateral migration
   at length. The front page has been making the association for months. That does not make
   P1 mine to promote — asserting *"Swop cannot grade a market"* is a statement about
   Swop's own architecture and is Travis's call — but it is a smaller decision than the row
   currently implies.

2. **P4 — whether Swop auto-redeems or the user claims.** Not asserted. §6 says out loud
   that we are not going to guess at the in-app specifics and points at `support@swopme.co`.
   This is the R3 move — decline the inference in the copy rather than wait for the row.

3. **"No perps/predictions fee (negative, verified)".** Verified 2026-09-25, and the row
   carries its own instruction to re-check before reusing because Travis noted a fee was
   under consideration. It is now **26 days old**, so the post says nothing about fees on
   winnings at all. If that row is re-confirmed, a fee sentence is a one-line addition —
   see "If rows get promoted later" below.

---

## Checks run before staging

| Check | Method | Result |
|---|---|---|
| Duplication vs post **bodies**, not titles (`[[check-topic-duplication-in-post-bodies]]`) | `grep -iE "redeem\|resolv\|payout\|pay out\|challenge period\|UMA\|oracle"` across `blog/` | 87 hits / 20 files, **all incidental**. The two adjacent posts are clean: `prediction-markets-101` has 3 hits, all about the $1 settlement identity; `best-wallet-for-prediction-markets` has 1, the phrase "until the event resolves". **No published post covers resolution timing or payout mechanics.** |
| Query claimed? | QUERIES.md | R6, *Proposed*, **unpromoted** — this is the only thing blocking publication |
| Publication-hold leakage ("Policy exits always open") | `grep` for exits/cancels/withdrawals/"always get out" | **absent** — and the post has no perps content |
| Swop claims traced to Verified rows | by hand, §6 only | **One**: *Self-custody* ("keys are generated and held on your device; Swop never holds them"), quoted close to verbatim. Nothing else in the post is a Swop claim |
| Unsourced numbers | by hand | **Zero.** Every figure is linked inline to the source it came from |
| Internal links | 2 — `/blog/prediction-markets-101`, `/blog/best-wallet-for-prediction-markets` | Both are live on prod |
| External links | 2 — Polymarket help, UMA docs | Both fetched 2026-10-21 and returned the quoted text |
| Signup widget | omitted, with the 10-18 comment block | Correct — the shared widget still transmits nothing and still promises "every other Tuesday" |

### Not verified, stated plainly

- **`og.png` is not rendered.** `editorial/render-og.sh` needs headless Chrome and the
  shell is gated from this seat. `og.html` is written and ready; rendering is a publish step.
- **The HTML has not been opened in a browser.** No `node`, no shell, no local server from
  this seat. The file is hand-matched against `drafts/token-not-showing-in-wallet/index.html`
  structurally — same head block, same nav/header/TOC/prose/sub/app/footer skeleton, same
  two scripts with the slug substituted. Reviewed by reading, not by running
  (`[[review-handoff-scripts-you-cannot-execute]]`). **Worth a second pair of eyes on the
  inline SVG specifically** — it is the only markup here not copied from a shipped post.
- **Reading time (7 min) is an estimate**, not a measurement.

---

## To publish (the whole list)

1. **Promote the query.** Move this line in `QUERIES.md` from *Proposed* up into
   *SEO keywords*: `when do prediction markets pay out / market resolution`
2. `git pull` — the checkout is 20 days stale (`.git/index` is 2026-10-02; prod serves 32
   posts to this tree's 27).
3. `mv editorial/drafts/when-do-prediction-markets-pay-out blog/when-do-prediction-markets-pay-out`
4. Render the banner: `editorial/render-og.sh blog/when-do-prediction-markets-pay-out/og.html`
5. Add to the three index surfaces — they lag separately and all three must be touched
   (`[[shared-index-files-lag-prod-separately]]`): `blog/index.html`, `sitemap.xml`, `llms.txt`.
   Recompute the post count rather than bumping it.
6. Add the row to `TOPICS.md` so the queue reflects reality.
7. Commit, push, **then verify on prod** — a push here has silently produced zero
   deployments before (`CLAUDE.md`).
8. Distribution kit: `editorial/distribution/when-do-prediction-markets-pay-out.x-thread.json`
   — step 8 has no failure mode and 7 of 30 live posts once shipped without one
   (`[[missing-distribution-kits-fail-silently]]`). Written, 5 posts, inside VOLT's daily cap.

## If rows get promoted later

The post is written so that promotion *adds* rather than rewrites. Three drop-in points,
each one paragraph, none of which changes anything already on the page:

- **P1 promoted** → §6 can name the venue directly instead of saying "the market and its
  oracle", and the whole §2–§3 timeline becomes explicitly *your* timeline.
- **P4 promoted** → the last paragraph of §6 replaces "we're not going to guess at it" with
  the actual answer.
- **No-fee row re-confirmed** → one sentence in §1 after the $1 settlement line: what, if
  anything, comes out of a winning dollar.
