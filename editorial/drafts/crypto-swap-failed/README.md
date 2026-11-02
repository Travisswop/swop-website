# DRAFT — `crypto-swap-failed` (QUILL, 2026-10-07)

> ## 🚩 2026-10-08 — the publish checklist below is SUPERSEDED. Use the script.
>
> `editorial/publish-retention-cluster.sh 4 <YYYY-MM-DD>` publishes the whole cluster and does
> every step below. Dry-run by default. **Read `editorial/issues/PUBLISH-CLUSTER-REVIEW.md`
> first** — QUILL could not execute the script, so it was reviewed by reading.
>
> ⚠️ **This post must never ship alone.** It links backwards to R1, R2 and R3, so publishing
> it on its own ships three live 404s. The script enforces prefix order — it only accepts a
> count of 1–4 and takes posts in order R1 → R2 → R3 → R4 — so `4` is the only invocation that
> includes this post.
>
> ⚠️ **The checklist below is missing `git pull --ff-only origin main` as step 0.**
> `blog/index.html`, `sitemap.xml` and `llms.txt` are hand-maintained flat files and this
> working copy is **three posts behind prod** in all three. A push IS a production deploy, so
> editing them from a stale checkout **de-lists three live posts**. Any post-count figure in
> the checklist is wrong too — the label says 26, prod is at 30; recompute as
> `(number of .row entries) + 1`.
>
> The 50 bps / *Default slippage* note below is still binding — the script does not touch
> copy. **Only your eye catches a banner font fallback — the SWOP logo must be monospaced.**

## ⛔ Do not publish until query R4 is promoted in QUERIES.md

This post is **finished**, staged in `editorial/drafts/` rather than `blog/` for the same
reason as its three siblings: QUERIES.md forbids writing to an unpromoted query, and putting
this in `blog/` today would be the mistake four consecutive drafters already made.

Nothing is in the blog tree, nothing is in `sitemap.xml`, nothing is queued in TOPICS.md
"Up next". The post cannot publish itself.

### The unblock is one line

Move this line in `editorial/QUERIES.md` from *Proposed — retention & trust* up into the
**SEO keywords** list:

```
- crypto swap failed / swap failed but money gone  <!-- promoted by Travis 2026-10-__ -->
```

---

## ⚠️ This revises QUERIES.md's standing rating of R4. Read this before anything else.

QUERIES.md currently rates R4 **"⚠️ Needs 1 new row"** and says, in the row-proposal table:

> **Failed swap** — what happens to the funds when a swap fails on Swop, and whether the user
> is left out of pocket. *Unlocks R4. The whole post is worthless if it cannot answer this
> plainly.*

**That rating is half right, and the half that is wrong is the half that was blocking the
post.** The correction matters because it is the reason R4 sat unwritten for three days while
being described in the same file as the highest-anxiety query in the set.

The question "what happens to the funds when a swap fails" has **two different answers, and
which one applies is decided by a row that is already Verified.** The *Swap routing* row
(2026-09-21) establishes that Swop routes Solana swaps through Jupiter and EVM swaps through
LiFi — i.e. that a swap is a same-chain trade or a cross-chain route, not one undifferentiated
thing. And for the same-chain case:

> **A same-chain swap is one transaction, and transaction atomicity is a property of the chain,
> not a property of Swop.** A chain applies a transaction completely or not at all. There is no
> state in which the instruction taking the input token committed and the instruction
> delivering the output did not. So "the swap failed and the input is gone" is not a thing a
> single chain produces — and saying so is a general fact about blockchains, not a Swop claim.

That is **exactly** the move that made R1 writable with zero rows ("on-chain finality is
general fact, not a Swop claim"), and R3's README already applied it to swaps in one sentence
while explicitly reserving the rest for R4:

> *§s4 states only the general on-chain mechanic (an atomic swap either completes both sides or
> neither, so a revert leaves you holding the input), which is a general fact about swaps rather
> than a Swop claim. This deliberately leaves R4 its own post without duplicating it.*

So the post **can** answer its central question plainly, and does, in the first paragraph. It
is not worthless without the row.

**What the proposed row would genuinely add** — and this is the half of the rating that was
right — is the *Swop-specific remediation* answer: what Swop does about a swap that already
failed, whether anything is retried or refunded, what support can actually retrieve. The post
does not assert any of that. It **declines it in the copy**, the same resolution R2 used for
its missing token-display row and R3 used for the gas/pending inference. See the omissions
section below.

**Net effect: one of the two outstanding FACTS asks on Travis is off the critical path.** The
*Failed swap* row is now a post-improvement, not a blocker. The *Pending transactions* row
(R3's) was already downgraded the same way on 10-06. Neither blocks publishing anything.

---

## This is now the fourth post waiting on one line each

| Post | Query | Staged at | Needs |
|---|---|---|---|
| Sent crypto to the wrong address | R1 | `editorial/drafts/sent-crypto-to-wrong-address/` | promote R1 |
| Token not showing in wallet | R2 | `editorial/drafts/token-not-showing-in-wallet/` | promote R2 |
| Why is my crypto transaction still pending | R3 | `editorial/drafts/crypto-transaction-still-pending/` | promote R3 + render `og.png` |
| **Crypto swap failed** | **R4** | **this folder** | **promote R4 + render `og.png`** |

Promoting all four lines in one sitting publishes a complete, cross-linked retention cluster:
**R3 triages the undecided case, R1/R2 resolve the two confirmed cases, and R4 owns the trade
that refused itself.** They are worth materially more together than separately — see the link
table below for what to edit if they ship apart.

---

## Why this post, and why now

R4 is the query QUERIES.md itself calls **"the highest-anxiety query in the set"**, and after
the correction above it is writable with **zero new FACTS rows**. It was also the only
remaining retention query available: R5 (perps liquidation) is hold-conflicted and parked,
R6 needs a resolution/payout row and was never duplication-cleared.

It completes the cluster's logic rather than extending it sideways. The other three are about
**transfers** — value moving from A to B, and what to do when that stalls, misfires, or
doesn't display. R4 is the first one about a **trade**, which has a failure mode the transfer
posts structurally cannot cover: an operation that succeeded at a price you did not want.

The section that earns the link is **§s3**, and it is the genuinely contrarian claim in the
set: *the revert is the good outcome, and the successful swap is the one that cost you money.*
Almost everything ranking for this query treats a failed swap as the problem and a filled swap
as the resolution. That is backwards, because only one of the two is final. Stating that
plainly — including that no support desk anywhere can unwind a trade you authorised — is the
trust signal, and it is the kind of thing competitors won't write because it declines to
promise a remedy.

Stage 1 fit: "make the money paths boring" includes making the guardrails legible. The core
message of this post is that a refusal is a protection firing correctly — which is a
reliability story told at the exact moment a user is deciding whether to trust the app.
Nothing in it requires a product change to be true.

---

## Fact-check record — every Swop claim traced to a Verified row

No claim is inferred, softened, or paraphrased. Verified against `editorial/FACTS.md` on
2026-10-07. **Zero new rows needed.**

| Sentence in the post | Verified row | Row date |
|---|---|---|
| "Swop has a built-in swap: you get a quote and sign inside the app, without sending funds to an exchange or connecting to a separate site." (§s5) | Built-in swap | 2026-09-21 |
| "Swop routes Solana swaps through Jupiter and EVM swaps through LiFi." (§s5) | Swap routing | 2026-09-21 |
| "Swop runs on Solana, Ethereum, Base, and Polygon." (§s5) | Chains live | 2026-08-26 |
| "Swop quotes Solana swaps with a 50 bps default slippage tolerance." (§s5) | Default slippage | 2026-09-21 |
| "Transactions on Swop are gas-sponsored — you don't need to hold SOL or ETH to transact." (§s5) | Sponsored gas | 2026-08-26 |
| "Swop covers the network fee: it is a cost Swop absorbs, not a charge passed through to you." (§s5) | Gas is absorbed | 2026-09-25 |
| "Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them." (§s5) | Self-custody | 2026-08-26 |
| iOS / Android / swopme.app links (§s5) | Platforms | 2026-08-26 |

### ⚠️ This is the first post in the cluster to carry a number — deliberately

R1, R2 and R3 all carry **zero** numbers. This one states **50 bps**, and that is a considered
exception rather than a slip:

- It is **row-exact.** The *Default slippage* row's "Exact wording to use" is quoted verbatim:
  *"Swop quotes Solana swaps with a 50 bps default slippage tolerance."*
- The row carries a warning — *"(a DEFAULT, not a cap — don't imply it can't be changed)"* — and
  the copy respects it in both directions. It says "it is the default the quote is built with"
  and makes **no claim either way about changing it**, because whether the app exposes a
  slippage control is a UI question with no Verified row. Do not "improve" this by adding
  "which you can adjust in settings".
- It is load-bearing for the reader. The whole of §s2 argues that most reverts are a tolerance
  protecting you; a reader on Solana can only act on that if they know what the tolerance
  actually is.

`grep -oE '\$[0-9]'` over the draft → **zero hits.** No price, no fee, no duration, no count.

### ⛔ The swap-fee trap — checked, and avoided

FACTS.md lists **swap fee** under *Needs verification*, with an explicit instruction: *"Do not
infer it from the checkout rate."* This post is unusually exposed to that trap, because a
reader asking "where did my money go" is about to wonder what was deducted, and the pull toward
explaining the fee is strong.

**No fee claim is made.** `grep -ciE "swap fee|0\.5%|percent fee"` → 2 hits, **both false
positives**: the substring `swap fee` inside *"a swap **fee**ls like it lost money"*, appearing
once in the visible FAQ and once in the FAQPage JSON-LD. (Same class of artifact as
`mi**stake**s` tripping the staking rule in issue #95.) Verified with
`grep -oE '.{90}swap fee.{90}'`.

The post attributes cost only to the **network fee**, which is what the two verified gas rows
cover, and never to a Swop swap fee.

### Publication hold — clear

The held row ("Policy exits always open", on hold since 2026-10-02) is **absent**, verified by
grep over the draft: `always get out|never blocked|cannot trap|trap you|risk-reducing` →
**no matches.**

> ⚠️ **This post needs the hold check at least as carefully as R3 did.** Its subject is a trade
> that would not execute, which is a short step in meaning from "a position you cannot exit" —
> the exact condition the `bbeeb20e` reduceOnly regression makes true in prod. The specific
> temptation here is strong and worth naming: §s2's argument is *"a refused trade is a
> protection working."* One sentence generalising that to risk-reducing actions or to exits
> would leak the held claim directly, and it would read as a natural flourish.
>
> Handled structurally rather than by willpower: **the post never mentions perps, liquidations,
> prediction markets, positions or funding rates at all.** Grep for
> `perp|liquidat|prediction market|funding rate` → **zero hits.** Scope is swaps and transfers
> only. Do not "complete" this post with a trading-side section while the hold stands.

### ⚠️ The claims this post deliberately does NOT make

Four omissions, each because no Verified row supports it. All four are the documented-omission
pattern R2 and R3 established, not oversights:

1. **What Swop does about an already-failed swap** — no row for retry behaviour, refunds, or
   what support can retrieve. This is R4's famous "needs 1 new row", and §s5 declines it in
   the copy rather than hedging around it:

   > "We are also not going to tell you what we can retrieve after the fact, because the honest
   > answer is that the chain decides what happened and we read the same record you do."

   That sentence is load-bearing. **Do not delete it as hedging** — it is what keeps the post
   from making an unverified claim, and the refusal is itself the trust signal.

2. **That a failed swap costs nothing on Swop.** The *Gas is absorbed* row makes this inference
   tempting and it is exactly the shape FACTS.md warns about (a negative claim needs its own
   Verified row). §s5 states the two gas rows and then explicitly refuses the extrapolation:

   > "What we are not going to extrapolate from that is a blanket promise that a failed swap can
   > never cost you anything under any condition. That is a wider claim than the one we have
   > actually checked."

3. **Whether the slippage tolerance is user-adjustable.** No row. Covered above.

4. **Any swap fee.** No row. Covered above.

### The one row that would improve this post later

| Proposed row | Why it's worth having |
|---|---|
| **Failed swap** — what happens to the funds when a swap fails on Swop, whether anything is retried automatically, and what support can establish from a hash | Would let §s5 answer the remediation question with a Swop-specific answer instead of declining it, and would retire omission (1) above. **Not blocking** — the post's central question is answered by chain atomicity, which is general fact. This is the same row QUERIES.md proposed for R4, downgraded from blocker to improvement. |

Behaviour question, not a number, not investment-adjacent — answerable in a sentence or two.

---

## Duplication check — clean (done 2026-10-07)

Per the standing rule, checked against post **bodies**, not just titles. A query can be
unclaimed while the angle is already answered inside another post.

```
grep -riE "swap failed|failed swap|swap fail|transaction failed|failed transaction|out of pocket|slippage|revert" swop-website/blog/
```

→ **8 hits across 3 files, every one incidental.** Seven are the bare word *slippage*; not one
live post explains what a failed swap does with your funds. Specifically:

- `solana-wallet-with-built-in-swap` (6 hits) — all the word *slippage* inside paragraphs about
  what an in-wallet swap **is**. It never addresses failure. **This post is its missing
  sequel**, and the distribution kit proposes the one-line link from it.
- `cross-chain-swap-wallet` (1 hit) — a checklist bullet: *"Failure behaviour. Find out what the
  wallet does with a half-finished route before you need to know, not after."* Adjacent and
  worth noting: it **poses** this post's question without answering it. Linked in §s4, not
  restated — that post owns cross-chain route mechanics, this one owns the all-or-nothing
  distinction.
- `agentic-trading-is-live` (1 hit) — the word *failure* in a paragraph about autonomous-mode
  attribution. Pure incidental.

**Prod-only posts were checked too**, because the local `blog/` tree is behind prod (the
correction logged in TOPICS.md on 10-07). The two posts that exist only in prod were fetched by
canonical URL:

- `settlement-is-the-product` (published 10-07) — **clean.** It is about settlement latency
  (T+2 vs instant) and contains no failed-swap, revert or slippage material. Its one adjacent
  passage is about finality removing administrative remedy for a wrong address, which is R1's
  territory and already linked there. Confirmed by fetching the live page, not by `ls`.
- `banking-the-unbanked-self-custody` (published 10-06) — not swap-related.

Adjacent posts, deliberately linked rather than re-explained: `cross-chain-swap-wallet`,
`usdc-vs-usdce`, plus the three staged siblings.

---

## ⚠️ Three internal links depend on R1, R2 and R3 also being published

`index.html` links to all three staged siblings. Each is **one `<a>` tag, one occurrence**, and
each sentence reads correctly without its link.

| Link | Where | If that post is NOT published |
|---|---|---|
| `/blog/crypto-transaction-still-pending` (R3) | §s2, final paragraph | Delete the `<a>`, keep the sentence. End it at "…where resending is how people accidentally pay twice." and drop the trailing clause "That distinction, and what to do while something is still undecided, is <a…>." |
| `/blog/token-not-showing-in-wallet` (R2) | §s3, final paragraph | Delete the whole final paragraph of §s3 — it exists only to hand off the display case. §s3 ends cleanly on the USDC.e bullet. |
| `/blog/sent-crypto-to-wrong-address` (R1) | §s5, self-custody paragraph | Delete the `<a>`, keep the sentence. End it at "…independently of anything we say." and drop the trailing "If a transfer rather than a trade…" clause. |

Find all three with:

```
grep -n 'crypto-transaction-still-pending\|token-not-showing-in-wallet\|sent-crypto-to-wrong-address' index.html
```

→ exactly three hits. **Every other internal link points at a live post** —
`cross-chain-swap-wallet`, `usdc-vs-usdce`, `/blog/authors/swop-team` — verified against
`blog/` on 2026-10-07 (27 post directories in the local tree, plus the two prod-only ones —
`settlement-is-the-product` and `banking-the-unbanked-self-custody`, which are live but absent
from this working copy).

If all four ship together, every link is correct and the cluster is complete.

---

## Publish checklist — the whole job once R4 is promoted

1. **Promote the query.** Move the R4 line in `editorial/QUERIES.md` into the SEO keywords list
   with a `<!-- promoted by Travis <date> -->` comment. Mark R4 resolved in the retention table,
   and **update its "Needs 1 new row" rating** per the correction at the top of this file.
2. **Move the folder into the blog tree.**
   ```
   git mv editorial/drafts/crypto-swap-failed blog/crypto-swap-failed
   ```
   Then delete `README.md` from the moved folder — it is a staging artifact, not a published
   page. Keep `index.html` and `og.html`.
3. **Decide the three sibling links** (see the table above): keep them if R1/R2/R3 ship too,
   otherwise apply the one edit each.
4. **Render the banner — this is the only hard gate.**
   ```
   editorial/render-og.sh blog/crypto-swap-failed
   ```
   Fallback if headless Chrome is unavailable:
   `python3 editorial/make-og.py crypto-swap-failed "Crypto swap failed? Where your money actually went" "Guides"`
   and flag "og.html needs local render" in the PR body.
   **Both commands were denied in this sandbox**, which is why `og.png` does not exist yet. The
   `og:image` and `twitter:image` tags already point at `og.png`, so publishing without
   rendering it ships a broken preview image.
   The banner reads **FAILED / ISN'T GONE.** over a 🔄 focal object with an "ALL OR NOTHING"
   tag, house style, copied from the R3 base.
   ✅ **The render-order hazard is gone (fixed 2026-10-07, QUILL).** `og.html` previously
   carried a single `@font-face` path `../../editorial/fonts/…`, which resolves only from
   `blog/<slug>/` — rendering in place fell back to system fonts silently. It now carries a
   dual `src` list (`url('../../editorial/fonts/…'),url('../../fonts/…')`) and renders
   identically from either location, so render **before or after** the move.
   This is not theoretical: R1 and R2 were rendered in place on 10-06 and both shipped
   off-brand banners into their draft folders. Both are flagged for re-render in their READMEs.
   After rendering, confirm the logo is monospaced against `blog/usdc-vs-usdce/og.png`.
5. **Move `distribution.md`** to `editorial/distribution/crypto-swap-failed.md`.
6. **Update `blog/index.html`** — new post featured, previous featured down into Recent, bump
   the post count.
7. **Update `sitemap.xml`** — add the URL with `lastmod`.
8. **Update dates if it isn't still 2026-10-07.** Six places in `index.html`:
   `article:published_time`, `article:modified_time`, the two JSON-LD fields
   (`datePublished`/`dateModified`), and the two visible strings in `.art-meta`
   ("Oct 7, 2026" and "Updated Oct 7, 2026"). Nothing in the post expires in substance — no
   dated news, no price, no market claim — so only the stamps need touching.
9. **`llms.txt`** — definition-shaped guide against a head query, so add one line in the same
   PR per Playbook #6.
10. **TOPICS.md** — move the line into "Drafted (in review)".
11. **Add the two inbound links** proposed at the bottom of `distribution.md`
    (`solana-wallet-with-built-in-swap` §s3 and `cross-chain-swap-wallet` §s4). Both are
    one-line edits and both are the natural next question in those posts.

### Structural pre-flight — already done, don't redo

- ✅ **TOC parity: 6 anchors, 6 targets.** `href="#s1…#s5"` + `#faq` against `id="s1…s5"` +
  `id="faq"`, verified by grep — 1 each, 12 total.
- ✅ **Title 50 chars** (≤60), measured, target query at the front and matching the h1 exactly.
- ✅ **Meta description 151 chars** (140–160 band), measured, answers the query directly.
- ✅ **FAQ: 5 questions, h3 each, matching the FAQPage JSON-LD** entry for entry and in the same
  order — verified by grep (5 `<h3>`, 5 `"@type": "Question"`, names compared one by one). If
  you edit a visible FAQ answer, edit the JSON-LD too; a mismatch between the two is one of the
  defects already logged against `how-does-swop-make-money`.
- ✅ **Both JSON-LD blocks** (Article + FAQPage) present, canonical/OG/Twitter all pointing at
  `https://www.swopme.co/blog/crypto-swap-failed`.
- ✅ **No `[NEEDS FACT]` markers** — grep-verified. The claims that could not be sourced were
  omitted and the omissions documented above, not marked in the copy.
- ✅ **Publication hold clear**, **zero perps/predictions references**, **no swap-fee claim**,
  **no hand-typed price** — all four grep-verified above.
- ✅ **Share links** (copy-link / X / Farcaster) all carry the new slug; the `copy-link` script
  at the bottom carries it too.
- ✅ **Structure follows STYLEGUIDE**: liftable 2–3 sentence answer first, 5 h2 sections, FAQ,
  Swop framing last.
- ⚠️ **Not verified: HTML renders correctly in a browser.** No shell to open it. The skeleton
  was copied from the R3 draft, which traces back to a live post, and the inline SVG reuses
  R3's exact geometry (980×232 viewBox, three 300px panels at x=6/340/674) with new copy and
  the panel order/fills rearranged. A reviewer should eyeball it pre-merge, particularly the
  SVG at narrow widths and the longest panel line ("This one needs patience.").
