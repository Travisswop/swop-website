# DRAFT — `crypto-transaction-still-pending` (QUILL, 2026-10-06)

> ## 🚩 2026-10-08 — the publish checklist below is SUPERSEDED. Use the script.
>
> `editorial/publish-retention-cluster.sh 3 <YYYY-MM-DD>` publishes R1+R2+R3 together and does
> every step below. Dry-run by default. **Read `editorial/issues/PUBLISH-CLUSTER-REVIEW.md`
> first** — QUILL could not execute the script, so it was reviewed by reading.
>
> **This post is the script's default featured pick** when it is in the batch, because it is
> the cluster hub — it triages the undecided case and links out to the others. Override with
> `--featured <slug>` if you disagree.
>
> ⚠️ **The checklist below is missing `git pull --ff-only origin main` as step 0.**
> `blog/index.html`, `sitemap.xml` and `llms.txt` are hand-maintained flat files and this
> working copy is **three posts behind prod** in all three. A push IS a production deploy, so
> editing them from a stale checkout **de-lists three live posts**. Any post-count figure in
> the checklist is wrong too — the label says 26, prod is at 30; recompute as
> `(number of .row entries) + 1`.
>
> ✅ **The "render only after moving into `blog/`" ordering rule is obsolete** — `og.html` now
> carries a dual `@font-face` src list, so it renders from either location. The script renders
> after the move anyway. **Only your eye catches a font fallback — the SWOP logo must be
> monospaced.**

## ⛔ Do not publish until query R3 is promoted in QUERIES.md

This post is **finished**, staged in `editorial/drafts/` rather than `blog/` for the same reason
as its two siblings: QUERIES.md forbids writing to an unpromoted query, and putting this in
`blog/` today would be the mistake four consecutive drafters already made.

Nothing is in the blog tree, nothing is in `sitemap.xml`, nothing is queued in TOPICS.md
"Up next". The post cannot publish itself.

### The unblock is one line

Move this line in `editorial/QUERIES.md` from *Proposed — retention & trust* up into the
**SEO keywords** list:

```
- why is my crypto transaction still pending  <!-- promoted by Travis 2026-10-__ -->
```

**No new FACTS.md rows are needed.** QUERIES.md rated R3 "~80% writable — the Swop paragraph
needs 1 new row." That rating assumed §s5 would answer *what Swop does when a transfer shows
pending*. This draft does not attempt that answer, and is complete without it — see the
deliberate-omission note below, which is the same resolution R2 used for its missing
token-display row. The proposed **Pending transactions** row would still improve the post later;
it is not blocking.

### This is now the third post waiting on one line each

| Post | Query | Staged at | Needs |
|---|---|---|---|
| Sent crypto to the wrong address | R1 | `editorial/drafts/sent-crypto-to-wrong-address/` | promote R1 |
| Token not showing in wallet | R2 | `editorial/drafts/token-not-showing-in-wallet/` | promote R2 |
| **Why is my crypto transaction still pending** | **R3** | **this folder** | **promote R3 + render `og.png`** |

Promoting all three lines in one sitting publishes a complete, cross-linked retention cluster.
See the link note below for what happens if they ship separately.

---

## Why this post, and why it is this week's long-form guide

The weekly long-form SEO guide had not shipped this week. This is it, and R3 is the right
subject rather than a convenient one:

- **It is the highest-anxiety query in the retention set that is writable today.** R4 (failed
  swap) is higher-anxiety still but needs a new FACTS row to be worth publishing at all; R5 is
  hold-conflicted and parked. R3 is the deepest query available with no new facts required.
- **It is the cluster's missing hub.** R1 and R2 are both *downstream* of this moment — the
  user checks the explorer, and the answer is either "it went somewhere else" (R1) or "it
  arrived and isn't displaying" (R2). This post is where that triage happens, so it links out
  to both rather than competing with them. That is the pillar-and-cluster shape the blog did
  not have.
- **The honest answer is genuinely reassuring**, which is what makes it retention content
  rather than support content: pending is symmetrical, nothing has moved, and two of the three
  endings are fine. It resolves the panic instead of managing it.
- **The real loss in this scenario is self-inflicted**, and almost nobody who ranks for the
  query says so plainly. §s3 is the part that earns the link: replace vs. repeat, and why the
  "accelerator" and "recovery specialist" replies arrive within minutes of a public hash.

Stage 1 fit: "make the money paths boring" includes making the scary moments legible. Nothing
in this post requires a product change to be true.

---

## Fact-check record — every Swop claim traced to a Verified row

No claim is inferred, softened, or paraphrased. Verified against `editorial/FACTS.md`
on 2026-10-06. **Zero new rows needed.**

| Sentence in the post | Verified row | Row date |
|---|---|---|
| "Swop runs on Solana, Ethereum, Base, and Polygon." (§s5) | Chains live | 2026-08-26 |
| "Transactions on Swop are gas-sponsored — you don't need to hold SOL or ETH to transact." (§s5) | Sponsored gas | 2026-08-26 |
| "Swop covers the network fee: it is a cost Swop absorbs, not a charge passed through to you." (§s5) | Gas is absorbed | 2026-09-25 |
| "Swop has a built-in swap: you get a quote and sign inside the app, without sending funds to an exchange or connecting to a separate site." (§s5) | Built-in swap | 2026-09-21 |
| "Swop routes Solana swaps through Jupiter and EVM swaps through LiFi." (§s5) | Swap routing | 2026-09-21 |
| "Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them." (§s5) | Self-custody | 2026-08-26 |
| "Losing your phone doesn't mean losing your funds… You can also save your private key, which lets you open your assets in any wallet you choose." (§s5) | Phone loss / recovery | 2026-09-01 |
| iOS / Android / swopme.app links (§s5) | Platforms | 2026-08-26 |

### Publication hold — clear

The held row ("Policy exits always open", on hold since 2026-10-02) is **absent**, verified by
grep over the whole draft folder: `always get out|never blocked|cannot trap|trap you|
risk-reducing` → **no matches**.

> ⚠️ **This post needed that check more carefully than R1 or R2 did, and here is why.** Its
> subject is a transaction that will not complete, which is one short step in meaning from "a
> position you cannot exit" — the exact thing the `bbeeb20e` reduceOnly regression makes true
> in prod. The temptation is to reassure the reader that on Swop things always go through, or
> to draw the parallel to exits being open. Both would leak the held claim.
>
> Handled structurally rather than by willpower: **the post never mentions perps, liquidations,
> prediction markets or positions at all.** Grep over the draft for
> `perp|liquidat|prediction market|funding rate` → **zero hits.** The scope is transfers and
> swaps only. Do not "complete" the post by adding a trading-side section while the hold stands.

### ⚠️ The negative claim this post deliberately does NOT make

QUERIES.md flagged this trap explicitly, and it is the single most important editorial note in
this file:

> *Gas is absorbed (Verified 09-25) implies underpaid-gas is not a Swop failure mode, but that
> is an **inference**, and FACTS.md requires a Verified row for negative claims. Do not let a
> drafter assert it without this row.*

So §s5 states the two verified gas rows and then **explicitly declines the inference**, in the
copy itself rather than only here:

> "What we are not going to tell you is that this makes a slow confirmation impossible. Whether
> a transaction is included, and when, is the network's decision rather than any wallet's, and
> an app promising otherwise is overselling. The honest claim is narrower: you should not have
> to go and buy a gas token before your money can move."

That paragraph is load-bearing. It is what keeps the post from making an unverified negative
claim, and it is also better copy than the overclaim would have been — refusing to oversell is
the trust signal. **Do not delete it as hedging.**

Two further claims the post does not make, for the same reason:

- **Nothing about how the Swop app displays or handles a pending transfer** — no row exists for
  it (no row for retry behaviour, no row for a speed-up or cancel affordance, no row for how
  long the app waits before showing an error). §s1 and §s2 are written wallet-agnostically and
  §s5 makes no pending-behaviour claim at all.
- **Nothing about what Swop does with a failed swap** — that is R4's question, and R4 is
  explicitly blocked on a new row. §s4 states only the *general* on-chain mechanic (an atomic
  swap either completes both sides or neither, so a revert leaves you holding the input), which
  is a general fact about swaps rather than a Swop claim. This deliberately leaves R4 its own
  post without duplicating it.

### The one row that would improve this post later

| Proposed row | Why it's worth having |
|---|---|
| **Pending transactions** — what a user should expect and do when a Swop transfer or swap shows "pending", how long is normal, and whether the app offers any retry or replace affordance | Would let §s5 answer the actual question with a Swop-specific answer instead of a general one, and would retire the inference trap above by making the negative claim sayable. Not blocking: the post is complete and honest without it. This is the same row QUERIES.md proposed for R3. |

Behaviour question, not a number, not investment-adjacent — answerable in a sentence or two.

---

## Duplication check — clean (done 2026-10-06)

Per the standing rule, checked against post **bodies**, not just titles. A query can be
unclaimed while the angle is already answered inside another post.

```
grep -riE "still pending|transaction pending|pending transaction|stuck|taking so long|not confirmed|speed it up|replace by fee|why is my" swop-website/blog/
```

→ **6 hits across 3 files, every one incidental or adjacent-but-distinct.** No live post
explains confirmation, pending, or what to do while waiting. Specifically:

- `cross-chain-swap-wallet` (3 hits) — owns "the classic stuck state", which is a **different**
  stuck: arriving on a destination chain with no native token to pay fees with. That is a
  post-arrival problem, not an unconfirmed-transaction problem. **Linked in §s2, not restated.**
- `gasless-crypto-wallet` (1 hit) — owns gas mechanics. Linked in §s5.
- `best-wallet-for-prediction-markets` (2 hits) — the word "pending" inside a custody paragraph.
  Pure incidental.

A broader sweep (`pending|confirmation|unconfirmed|mempool|finality`, case-insensitive) returns
44 hits across 18 files; all are the word "confirmation" in a signing context or similar. The
narrow pattern above is the one that matters and it is clean.

Adjacent posts, deliberately linked rather than re-explained: `cross-chain-swap-wallet`,
`gasless-crypto-wallet`, `recover-wallet-without-seed-phrase`, plus the two staged siblings.

---

## ⚠️ Two internal links depend on R1 and R2 also being published

`index.html` links to both staged siblings. Each is **one `<a>` tag, one occurrence**, and each
sentence reads correctly without its link.

| Link | Where | If that post is NOT published |
|---|---|---|
| `/blog/token-not-showing-in-wallet` (R2) | §s4, "Confirmed" paragraph | Delete the `<a>`, keep the sentence. Drop the trailing clause "That is its own article: <a…>token not showing in your wallet</a>." — the paragraph ends cleanly on "…a token it has no entry for." |
| `/blog/sent-crypto-to-wrong-address` (R1) | §s4, final paragraph | Delete the `<a>`, keep the sentence. Rewrite the tail as "…none of the advice above applies to it." and drop the "see <a…>" clause. |

Find both with:

```
grep -n 'token-not-showing-in-wallet\|sent-crypto-to-wrong-address' index.html
```

→ exactly two hits, both in §s4. **Every other internal link points at a live post** —
`cross-chain-swap-wallet`, `gasless-crypto-wallet`, `recover-wallet-without-seed-phrase` —
verified against `blog/` on 2026-10-06 (27 live post directories).

If all three ship together, both links are correct and the cluster is complete: R3 triages,
R1 and R2 resolve.

---

## Publish checklist — the whole job once R3 is promoted

1. **Promote the query.** Move the R3 line in `editorial/QUERIES.md` into the SEO keywords list
   with a `<!-- promoted by Travis <date> -->` comment. Mark R3 resolved in the retention table.
2. **Move the folder into the blog tree.**
   ```
   git mv editorial/drafts/crypto-transaction-still-pending blog/crypto-transaction-still-pending
   ```
   Then delete `README.md` from the moved folder — it is a staging artifact, not a published
   page. Keep `index.html` and `og.html`.
3. **Decide the two sibling links** (see the table above): keep them if R1/R2 ship too,
   otherwise remove the one `<a>` each.
4. **Render the banner — this is the only hard gate.**
   ```
   editorial/render-og.sh blog/crypto-transaction-still-pending
   ```
   Fallback if headless Chrome is unavailable:
   `python3 editorial/make-og.py crypto-transaction-still-pending "Why is my crypto transaction still pending" "Guides"`
   and flag "og.html needs local render" in the PR body.
   **Both commands were denied in this sandbox today**, which is why `og.png` does not exist
   yet. The `og:image` and `twitter:image` tags already point at `og.png`, so publishing
   without rendering it ships a broken preview image.
   The banner reads **PENDING / ISN'T LOST.** over a ⏳ focal object with a "NOTHING MOVED"
   tag, house style, copied from the R2 base.
   ✅ **The render-order hazard is gone (fixed 2026-10-07, QUILL).** `og.html` previously
   carried a single `@font-face` path `../../editorial/fonts/…`, which resolves only from
   `blog/<slug>/` — rendering in place fell back to system fonts silently. It now carries a
   dual `src` list (`url('../../editorial/fonts/…'),url('../../fonts/…')`) and renders
   identically from either location, so render **before or after** the move.
   This is not theoretical: R1 and R2 were rendered in place on 10-06 and both shipped
   off-brand banners into their draft folders. Both are flagged for re-render in their READMEs.
   After rendering, confirm the logo is monospaced against `blog/usdc-vs-usdce/og.png`.
5. **Move `distribution.md`** to `editorial/distribution/crypto-transaction-still-pending.md`.
6. **Update `blog/index.html`** — new post featured, previous featured down into Recent, bump
   the post count.
7. **Update `sitemap.xml`** — add the URL with `lastmod`.
8. **Update dates if it isn't still 2026-10-06.** Six places in `index.html`:
   `article:published_time`, `article:modified_time`, the two JSON-LD fields
   (`datePublished`/`dateModified`), and the two visible strings in `.art-meta`
   ("Oct 6, 2026" and "Updated Oct 6, 2026"). Nothing in the post expires in substance — there
   is no dated news, no price and no market claim in it — so only the stamps need touching.
9. **`llms.txt`** — definition-shaped guide against a head query, and the hub of the retention
   cluster, so add one line in the same PR per Playbook #6.
10. **TOPICS.md** — move the line into "Drafted (in review)".

### Structural pre-flight — already done, don't redo

- ✅ **TOC parity: 6 anchors, 6 targets.** `href="#s1…#s5"` + `#faq` against `id="s1…s5"` +
  `id="faq"`, verified by grep (12 matches, 6 of each).
- ✅ **Title 43 chars** (≤60), target query at the front and matching the h1 exactly.
- ✅ **Meta description 159 chars** (140–160 band, at the top of it), answers the query
  directly. If you add a word to it, it goes over — trim first.
- ✅ **No hand-typed price anywhere.** `\$[0-9]` over the draft folder → **zero hits.** This post
  carries no number of any kind — no fee, no duration, no count. Deliberate: every "how long"
  answer is qualitative, because a specific number would be a claim about networks we don't
  control and would date the post.
- ✅ **No `[NEEDS FACT]` markers** — grep-verified. Nothing is pending; the one claim that could
  not be sourced was omitted and the omission is documented above, not marked in the copy.
- ✅ **Publication hold clear** and **zero perps/predictions references** — both grep-verified
  above.
- ✅ **FAQ: 5 questions, h3 each, matching the FAQPage JSON-LD** entry for entry, byte-identical
  answers. If you edit a visible FAQ answer, edit the JSON-LD too — a mismatch between the two
  is one of the defects already logged against `how-does-swop-make-money`.
- ✅ **Both JSON-LD blocks** (Article + FAQPage) present, canonical/OG/Twitter all pointing at
  `https://www.swopme.co/blog/crypto-transaction-still-pending`.
- ✅ **Share links** (copy-link / X / Farcaster) all carry the new slug; the `copy-link` script
  at the bottom carries it too.
- ✅ **Structure follows STYLEGUIDE**: liftable 2–3 sentence answer first, 5 h2 sections, FAQ,
  Swop framing last.
- ⚠️ **Not verified: HTML renders correctly in a browser.** No shell to open it. The skeleton
  was copied from the R2 draft, which was copied from a live post, and the inline SVG is
  hand-checked against R2's geometry (same 980×232 viewBox, same three 300px panels at
  x=6/340/674). A reviewer should eyeball it pre-merge, particularly the SVG at narrow widths.
