# Issue #99 — 2026-10-10 — SPECIAL EDITION No. 01 content, re-cut as #99

**State: BUILT, DRAFTED, TEST COPY SENT, NOT SENT TO SUBSCRIBERS.**

- Draft: `https://resend.com/broadcasts/876757ce-7e23-4ff7-948d-5a3392cf4976` (`sent: false`)
- Subject: `Swop Daily #99 — nothing went missing. Here's where it actually is` (66 chars, under the 70-char broadcast-name cap)
- Test copy: `travis@swopme.co`, id `01a125b5-225a-7d61-b3b1-2798913c7775`
- Source: `editorial/issues/issue-S01.html` (dateless; repo copy keeps `SPECIAL EDITION — NO. 01`)
- Send copy: `$ICLOUD/Swop_Daily_Newsletter_2026-10-10.html` (masthead `ISSUE #99 — SPECIAL`)

## The number that should drive today's decision: the dark run is 22 days

**Nothing has reached a subscriber since #89 on 2026-09-18.** Verified against both
required sources rather than one: the iCloud `Swop_Daily_Newsletter_*.html` files jump
09-18 → 09-28 → 10-06…10-10 (built artifacts, not sends), and the handoff chain records
#90–#98 as built-and-unsent or expired-unbuilt. Ten consecutive issues drafted, zero sent.

**This is no longer a content-production problem, and building an eleventh distinct issue
would not fix it.** The lane's only blocker is that a send permit has not been actioned.
So today deliberately produced **no new prose angle** — it re-cut the already-verified
S01 special as #99 so that the pending decision is one click on one broadcast, rather
than a third unrelated issue added to a queue of two
(`[[collapse-the-work-before-refiling-a-permit]]`).

### Duplicate-send hazard — this is the one thing to get right

#99 carries **the same content as #97** (`ddb89c9a-787f-494a-8c79-1eba832dc889`, still
`sent: false`). NEWSLETTER.md's rule for the specials library is that a subscriber must not
receive the same issue twice under two numbers, so:

- **Send #99** (`876757ce-…`) — it is the current, re-verified, re-dated cut.
- **Delete the #97 draft** — superseded, identical body.
- **Leave #98 alone** (`513b4159-…`, S02, the published-commitments/honest-gaps issue). Its
  content is different and still unshipped; it is the natural next send on a later day.

## One editorial fix made to the reusable source today

`issue-S01.html` line 131 read *"No prices in this issue, so nothing in it to act on.
**Back to the market tomorrow.**"* That promise has now been false on three consecutive
drafting days, and it quietly made a deliberately **dateless** asset dated — the one
property the specials library exists to protect. Replaced with:

> "No prices in this issue, so there is nothing in it to act on. That is the point of this one."

The edit is inside an existing `<span>` within a `<div>`, so the wrapper count is unchanged
(re-verified 45/45 both in the repo source and in the send copy). This fix is durable: it
applies to every future reuse of S01, not just #99.

## Verification performed

| Check | Result |
|---|---|
| `<div` / `</div>` in send copy | 45 / 45 |
| vs. `issue-S01.html` frame | 45 — matches, no orphaned wrappers |
| Unfilled `%%[A-Z0-9_]+%%` tokens | 0 |
| Literal `[TBD]` / `[NEEDS FACT` | 0 |
| Unsubscribe variable | present (line 180) |
| Masthead | `ISSUE #99 — SPECIAL`, no date anywhere in the issue |
| Hand-typed price, index level or platform count | **none** — the issue contains no fetched number at all |
| Outbound blog links resolve on prod | 5/5, checked against the live `swopme.co/blog/` index fetched today: `settlement-is-the-product`, `send-crypto-with-a-link`, `usdc-vs-usdce`, `cross-chain-swap-wallet`, `recover-wallet-without-seed-phrase` |

### `fact-drift.sh` hand-check (the script still cannot run here)

- **F-EXIT-HOLD** (`always get out|trap(s)? you inside a position`) — **0 hits**, grepped
  directly. The issue mentions perps and positions nowhere; the finality passages are about
  *reversal* ("no administrator… with the power to reverse a settled transfer"), which is
  the self-custody claim, not the held exit claim. The hold is still live (FACTS.md notice,
  2026-10-02; FORGE's `reduceOnly` fix still not in prod as of the 10-06 snapshot).
- **F-AUDIT-IMPLIED** — deny hit on line 128, cleared on the same line: "Swop **has not
  commissioned** a third-party security audit to date" is the verified wording and the
  allow term sits inside the 40-char window. (`fact-drift.sh` greps per line, so deny and
  allow must share a line.)
- **F-SLIPPAGE-CAP** — line 122 pairs "50 bps default slippage tolerance" with "a
  **default**, not a ceiling, and changeable" on the same line. Cleared.
- Grepped with **zero deny hits**: staking (the only `stake` match is inside *"mistake"*),
  ZeroProof, zero-knowledge, Tap to Pay, guaranteed/insured/FDIC, perps, liquidation,
  `F-WALLET-COUNT-TILE`, `F-USER-COUNTS`, `F-CUSTODY-KEEPS`.

### Bento — four published facts, each naming its FACTS.md row

Keys Swop holds `0` (*Self-custody*, 08-26) · Network fee charged to you `$0` (*Gas is
absorbed*, 09-25) · Checkout fee both rails `0.5%` (*Checkout fee, both rails*, 09-24) ·
Chains live `4` (*Chains live*, 08-26 — Solana, Ethereum, Base, Polygon, counted from the
row's own wording).

No tile is a ledger read, so **nothing in this issue can go stale between the draft and the
send** — the permit is safe to approve days from now, unlike a market issue
(`[[stale-daily-issues-get-discarded-not-resent]]`). Each zero is framed as a deficit of
something you would not want (keys we hold, fees charged to you), never as a score.

## The market path — both gates re-measured today, both still shut

| Gate | Measured how, 2026-10-10 | State |
|---|---|---|
| The build wrapper | `test -x ~/.eldorado/bin/newsletter-build.sh` | **Not installed.** Permit expired unanswered three times now |
| Running the fetcher directly | `node editorial/newsletter-fill.js --inspect` | **Denied.** `node --version` is allowlisted (v22.22.0) but script execution is not — the allowlist is per-invocation, so the installed-wrapper route is still the only one |
| MongoDB Atlas IP whitelist | Observed live in today's `newsletter-draft.sh` run: *"Could not connect to any servers in your MongoDB Atlas cluster… an IP that isn't whitelisted"* | **Still not whitelisted** |
| `curl` to CoinGecko/Yahoo directly | denied | n/a — and hand-typing a price off a curl is the exact failure the template/fill split exists to prevent (#78 shipped ETH $12,507) |

Worth re-stating because it reads like a breakthrough every time: **`node` is present and
`node --version` runs** (v22.22.0). It does not help — the limit is *script execution*, not
the interpreter, so the fetch still cannot happen and no market issue is buildable. This was
already the recorded finding; it was re-measured today rather than inherited
(`[[re-derive-blocker-ratings-dont-inherit-them]]`), and the verdict is unchanged. Don't
spend time re-testing `node` expecting a different answer — go straight to the wrapper ask.

### Gate 3's real cost, beyond the bento

**The Resend audience was not re-synced today** — the sync is the step that cannot reach
Atlas, and `newsletter-draft.sh` treats that failure as non-fatal and continues. Whatever
is sent goes to the "Swop Daily" audience (`709b94d8-…`) as the **last successful sync**
left it. Everyone who signed up in the 22 days since is not in the list, will not receive
#99, and is not counted — and the Beachhead Audience tab shows the audience without showing
that it is stale (`[[failed-audience-sync-still-sends-to-a-frozen-list]]`). That is a
subscriber-growth leak against the 250k goal, not a cosmetic tile problem.

## Journal slot — Spotlight again, re-decided at build time

Re-decided today rather than inherited (`[[recheck-journal-slot-before-build]]`) and
verified against prod rather than `ls blog/` (`[[verify-prod-in-war-room-snapshots]]`):
`https://www.swopme.co/blog/` lists **29 posts, newest `settlement-is-the-product` (Oct 7)**.
There is no Oct 8, Oct 9 or Oct 10 post — **the blog is dark three days**. So Article 02 is
the service/Spotlight treatment, not "From the Journal"; `settlement-is-the-product` is
plugged as the Article 01 CTA instead, per NEWSLETTER.md.

## Why the blog is dark, and what it is blocked on — unchanged, re-verified

Four finished posts are staged in `editorial/drafts/` (`sent-crypto-to-wrong-address`,
`token-not-showing-in-wallet`, `crypto-transaction-still-pending`, `crypto-swap-failed`),
kept outside `blog/` so an unpromoted query blocks *publishing* and not *writing*
(`[[stage-blocked-posts-in-editorial-drafts]]`).

Their four queries are still at **QUERIES.md lines 263–266**, under the
`## Proposed — retention & trust` header at **line 52** — i.e. still below the
`## Proposed` boundary at **line 40**. `publish-retention-cluster.sh` preflight requires each
post's query *above* line 40 and never edits QUERIES.md itself; promotion is Travis's call by
that file's own rule. **The gate is four lines moved up, then one command.** Read
`editorial/issues/PUBLISH-CLUSTER-REVIEW.md` before `--apply`, and do not bypass the
preflight's `HEAD == origin/main` requirement — the local checkout is behind prod and the
hand-maintained `sitemap.xml` / `blog/index.html` / `llms.txt` would de-list live posts
(`[[shared-index-files-lag-prod-separately]]`).

## Not done this session

- **Market issue #99 — not attempted**, by choice; all four routes above are shut.
- **Blog PR state — unverifiable.** `git status` and `gh` are both denied. Prod was checked
  by URL, which answers "did it ship" but not "what is open".
- **SmartSite cross-post — blocked, re-measured today.** `swop_get_my_smartsite` returns
  *"requested permissions … haven't granted it yet"* in this non-interactive session, so the
  SmartSite was never read and nothing was added. **Five consecutive days.**
- **The weekly long-form SEO guide — written, not shipped.** The R1–R4 retention cluster is
  this week's long-form work: finished prose behind the promotion gate, not missing work.
