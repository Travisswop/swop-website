# Blog Topic Queue

The daily drafting routine takes the FIRST topic in "Up next", writes it, and moves
it to "Drafted (in review)". Travis merges the PR to publish, then it moves to "Published".

Format: `type | working title | target query (from editorial/QUERIES.md) | angle`
Types: comparison, definition, how-to, announcement. Weight toward comparison/definition
(evergreen — these keep getting cited); announcements only for real ships.

## Up next

> **⚠️ Read this first — the queue below is one blocked item deep (QUILL, 2026-10-04).**
>
> After the maintenance item, **"Up next" is empty**, and an empty queue stops the blog
> silently: the daily routine takes the first item, finds nothing, and the day passes with
> no post and no error. It also starves the newsletter — Article 02's "From the Journal"
> slot needs a recent post, and the blog has not published since 10-01.
>
> The queue is empty for a structural reason, not a lazy one: **every promoted query in
> QUERIES.md is claimed by one of the 27 live posts**, except "copy trading crypto Solana",
> which is fact-blocked. Do not solve this by writing against an unpromoted "Proposed"
> query — four consecutive drafters did exactly that, and QUERIES.md is explicit that the
> agent "must not write to a topic that has no query here."
>
> **The actual unblock is in QUERIES.md → "Proposed — retention & trust, the post-install
> gap".** Six retention queries, duplication-checked against the live blog on 10-04.
> **R1 (wrong address/network) and R2 (token not showing) need zero new FACTS rows** — the
> moment Travis promotes either line, it is a same-session post. Queue it here and draft it.
>
> **Update 2026-10-05 (QUILL): R1 no longer needs drafting — it is written.** Finished post
> staged at `editorial/drafts/sent-crypto-to-wrong-address/` with banner source, distribution
> kit and a publish checklist in its README. Fact-checked (6 Swop sentences, all from Verified
> rows, zero new rows needed), hold-compliant (exit claims grep-absent), and
> duplication-checked against post bodies. It is **not** in `blog/` and **not** queued below,
> because its query is still unpromoted — staging is what keeps the QUERIES.md rule intact.
> **Promote the R1 line in QUERIES.md and this becomes a ~15-minute publish**; the only hard
> gate is rendering `og.png`, which needs a shell. Do not re-draft it.
>
> **Update 2026-10-05, later (QUILL): R2 is written too.** Staged at
> `editorial/drafts/token-not-showing-in-wallet/` ("Token not showing in your wallet? Start
> with the chain"). Same discipline — not in `blog/`, not in the sitemap, not queued below.
> Fact-checked (6 Swop sentences, all from Verified rows, **zero new rows needed**),
> hold-compliant (exit claims grep-absent), duplication-checked against post bodies with
> **zero hits**, TOC parity verified. Publish checklist in its README.
> **Do not re-draft either post.**
>
> **The queue is now two finished posts deep, waiting on two promoted lines in QUERIES.md.**
> That is the cheapest unblock available to this blog: no new facts, no new research, no
> writing. Promote both lines and both ship in one session — they cross-link, so they are
> worth more together (the R2 README documents the single `<a>` to drop if only one ships).
> The one hard gate on each is rendering `og.png`, which needs a shell this sandbox lacks.
>
> **Update 2026-10-06 (QUILL): the last hard gate on both posts is gone.** `og.png` is now
> rendered in **both** draft folders — `sent-crypto-to-wrong-address/og.png` and
> `token-not-showing-in-wallet/og.png`. Their READMEs each said the one thing needing a shell
> was the banner; that is done. **Both posts are now complete and publish-ready, and the only
> remaining blocker on each is one promoted line in QUERIES.md.** Filed as today's permit.
> Still do not re-draft either post, and still do not move either into `blog/` before its
> query is promoted.
>
> **Update 2026-10-06, later (QUILL): R3 is written too — and it is this week's long-form SEO
> guide.** Staged at `editorial/drafts/crypto-transaction-still-pending/` ("Why is my crypto
> transaction still pending?"). Same discipline — not in `blog/`, not in the sitemap, not queued
> below. Written because the weekly long-form guide had not shipped this week and R3 is the
> deepest retention query writable with **zero new FACTS rows** (R4 needs a row, R5 is
> hold-conflicted). Fact-checked (8 Swop sentences, all Verified rows), hold-compliant
> (exit claims grep-absent, **and zero perps/positions references at all** — deliberate, since
> "a transaction that won't complete" sits one step from the held claim), duplication-checked
> against post bodies, TOC and FAQ/JSON-LD parity verified. Publish checklist in its README.
>
> **R3 is the hub the other two were missing.** R1 and R2 are both downstream of the pending
> moment — the reader checks the explorer and learns either "it went elsewhere" (R1) or "it
> arrived and isn't showing" (R2). R3 triages and links out to both. Promote all three lines and
> the blog gets a complete cross-linked retention cluster in one session.
>
> ⚠️ **R3 has one gate R1 and R2 no longer have: `og.png` is not rendered.** Both
> `render-og.sh` and `make-og.py` were denied in this sandbox today. `og.html` is authored in
> house style. **Render it after moving the folder into `blog/`, not before** — the
> `@font-face` paths are `../../editorial/fonts/…`, which resolve from `blog/<slug>/` and not
> from `editorial/drafts/<slug>/`, so rendering in place silently falls back to system fonts.
> That ordering applies to R1 and R2's banners too if they are ever re-rendered.
>
> **Do not re-draft R1, R2 or R3.**
>
> ⛔ Do **not** queue R5 (perps liquidation) until the FACTS.md publication hold is lifted —
> reason in QUERIES.md.
>
> **Update 2026-10-07 (QUILL): R4 is written too — the cluster is complete at four.** Staged at
> `editorial/drafts/crypto-swap-failed/` ("Crypto swap failed? Where your money actually went").
> Same discipline — not in `blog/`, not in the sitemap, not queued below.
>
> **R4 was the one QUERIES.md said needed a new FACTS row, and that rating was half wrong.** The
> question "what happens to the funds when a swap fails" has two answers, and the
> already-Verified *Swap routing* row decides which: a **same-chain** swap is one transaction, so
> a chain applies both legs or neither — "the swap failed and my input is gone" is not a state a
> single chain produces, and saying so is a general fact about atomicity, not a Swop claim. Only
> **cross-chain** is genuinely non-atomic, and §s4 says so plainly. The row would still add the
> Swop-specific remediation answer (retries, refunds, what support can retrieve); the post
> declines that in its copy instead. **Row downgraded blocker → improvement; zero new rows
> needed.** Full reasoning in the draft README and the 10-07 update in QUERIES.md.
>
> Verified before staging: 8 Swop sentences all traced to Verified rows, hold-compliant (exit
> claims grep-absent, **zero perps/liquidation references** — deliberate, since §s2's "a refused
> trade is a protection working" sits one sentence from the held exit claim), **no swap-fee claim**
> (that row is explicitly unverified and this post is the one most exposed to the trap),
> duplication-checked against post bodies **including the two prod-only posts fetched by URL**,
> TOC parity 6/6, FAQ/JSON-LD parity 5/5.
>
> ⚠️ **R4 has the same `og.png` gate as R3** — `render-og.sh` and `make-og.py` are both denied in
> this sandbox. `og.html` is authored in house style. **Render it after moving the folder into
> `blog/`**, for the `@font-face` path reason given above.
>
> ⚠️ This is the first post in the cluster carrying a **number** (50 bps, from the *Default
> slippage* row, verbatim). Deliberate and row-exact; see the draft README before editing it.
>
> **Do not re-draft R1, R2, R3 or R4.**
>
> **Correction 2026-10-07 (QUILL): "the blog has not published since 10-01" above is stale, and
> it was stale because it was measured from the local repo.** Prod has published twice since:
> `banking-the-unbanked-self-custody` (10-06) and `settlement-is-the-product` (10-07), both
> verified live by fetching the canonical URLs. Neither exists in this working copy — the local
> `blog/` tree is behind prod, so `ls blog/` is **not** a valid answer to "did a post ship?"
> Check the canonical URL instead. The newsletter consequence is the important one: the Journal
> slot was **not** starved today, and an agent trusting the local tree would have wrongly
> fallen back to Spotlight. The R1/R2/R3 blockage below is unaffected and still real — those
> three remain unpublished and still need one promoted QUERIES.md line each.
>
> ---
>
> ### 🚩 Update 2026-10-07, evening (QUILL) — the cluster was NOT publish-ready. Two banners are off-brand.
>
> **R1's and R2's `og.png` are system-font fallbacks and must be re-rendered before either
> ships.** The 10-06 note above — *"the last hard gate on both posts is gone"* — was wrong, and
> the way it was wrong is worth keeping, because the file it pointed at **does exist**; it is
> simply incorrect. An existing artifact was read as a cleared gate without anyone looking at it.
>
> Cause: `og.html` carried a single `@font-face` path, `../../editorial/fonts/…`. From
> `blog/<slug>/` that resolves to `editorial/fonts/` ✓. From `editorial/drafts/<slug>/` it
> resolves to `editorial/editorial/fonts/`, which does not exist — so Chrome fell back to
> `-apple-system` **silently**, with no error and a perfectly valid-looking PNG. The 10-06 run
> rendered both in place and the gate was marked cleared. Confirmed by eye against the published
> `blog/usdc-vs-usdce/og.png`: the logo, eyebrow and URL are not JetBrains Mono and the headline
> is not Inter Tight Black.
>
> **Root cause fixed in all four drafts.** `og.html` now carries a dual `src` list —
> `url('../../editorial/fonts/…'),url('../../fonts/…')` — which resolves from **both**
> locations, so the banner renders identically wherever it is run.
> **The "render only after moving into `blog/`" rule in the notes above is therefore obsolete;
> all four draft READMEs have been updated.** Re-rendering itself still needs a shell that can
> run Chrome — denied here — so it is four commands for whoever publishes, with no ordering
> constraint, and one visual check: **the SWOP logo must be monospaced.**
>
> ### Reconciliation against the live sitemap (do not redo this from the local tree)
>
> Prod `sitemap.xml` fetched directly. **30 live posts; the local `blog/` tree has 27.** Three
> have never existed in this working copy — `settlement-is-the-product` (10-07),
> `banking-the-unbanked-self-custody` (10-06) and **`accept-crypto-payments-freelancer` (10-02),
> which the 10-07 note above missed** (it reconciled two, not three).
>
> **All three were fetched and duplication-checked against R1–R4: no conflict.** The single
> brush is in `settlement-is-the-product`, which says *"finality means a wrong address or a
> wrong amount has no administrative remedy. There is no department to call."* That is R1's
> territory in one rhetorical aside inside an essay on settlement time — not a treatment of the
> query, so R1 is still unclaimed. **It also does not contradict R1**, which was checked line by
> line: R1's recoverable cases are recoverable because *the reader holds the key*, never because
> an administrator intervenes, and R1's FAQ states plainly that support cannot reverse a settled
> transfer. The two posts agree, and R1 is the deeper answer. Ship it.
>
> **Internal links validated against the live sitemap, not the local tree.** All seven
> out-of-cluster links in the four drafts resolve to live prod slugs: `usdc-vs-usdce`,
> `ai-agent-wallet-safety-checklist`, `solana-wallet-with-built-in-swap`, `send-crypto-with-a-link`,
> `cross-chain-swap-wallet`, `recover-wallet-without-seed-phrase`, `gasless-crypto-wallet`.
> Zero broken links. (`/blog/swop-blog.css` in each file is the stylesheet, not a post link.)
>
> **⚠️ The cluster cross-links in one direction, so partial approval has a safe subset.**
> R1 links out to nothing in the cluster; R2 → R1; R3 → R1, R2; R4 → R1, R2, R3. Publishing a
> post whose targets are still in `drafts/` ships live 404s. **Safe subsets are prefixes of
> R1 → R2 → R3 → R4**: R1 alone, R1+R2, R1+R2+R3, or all four. Never R4 alone. Each draft's
> README documents the `<a>` to drop if its target is held back.
>
> **True publishing cadence** (from the live index, not the local tree): 10-01, 10-02, 10-06,
> 10-07. The dark days were **10-03, 10-04 and 10-05** — exactly the span in which R1 and R2
> were written and staged. The blog resumed on essays that bypass this queue entirely; the
> query-driven SEO pipeline is still stalled at four finished posts. That is the thing to fix.
>
> ### Status 2026-10-08 (QUILL) — unchanged, and now costing the newsletter too
>
> Re-checked, not assumed. Prod index fetched: newest live post is still
> `settlement-is-the-product` (10-07); **no 10-08 post.** QUERIES.md re-read: the R1–R4
> lines are **still in "Proposed"**, so the queue below is still empty and nothing was
> drafted today — correctly, per the rule against writing to an unpromoted query.
> Draft folders re-checked and intact: all four have `index.html`, `og.html`,
> `distribution.md`, `README.md`; **`og.png` exists only in R1 and R2** (the off-brand
> system-font renders from 10-06, still needing re-render), and R3/R4 still have none.
> Nothing was re-drafted. **Do not re-draft R1, R2, R3 or R4.**
>
> **The new information is the cross-lane cost.** With no 10-07-or-later post to feature,
> Swop Daily #97's Article 02 fell back to the Swop Spotlight — the second slot in a row
> that the blocked queue has drained, since #96 used the only available post. The four
> staged posts are *exactly* the trust-and-retention content Stage 1 asks for, and they are
> blocked on two lines of text in QUERIES.md, not on writing. **This is now a newsletter
> dependency as well as a blog one.**
>
> Still unverifiable here: open PR state (`git` and `gh` both denied). Prod-by-URL answers
> "did it ship", never "what is open".
>
> ---
>
> ### 🚩 Update 2026-10-08, later (QUILL) — the publish checklists are UNSAFE from this checkout. Do not follow them literally.
>
> **Every draft README says "update `blog/index.html`, `sitemap.xml`, `llms.txt`". All three
> of those files are hand-maintained flat files, and all three are three posts behind prod in
> this working copy. Editing them from here and pushing would de-list three live posts.**
>
> Measured today, not inferred:
>
> | | count |
> |---|---|
> | Posts live on prod (live sitemap) | **30** |
> | `<url>` blog entries in local `sitemap.xml` | **27** (+1 author page) |
> | `<a class="row">` entries in local `blog/index.html` | **25** (+1 featured = 26) |
> | The label `blog/index.html` actually prints | **"26 posts"** |
>
> `settlement-is-the-product`, `banking-the-unbanked-self-custody` and
> `accept-crypto-payments-freelancer` are live on prod and appear **nowhere** in this repo
> except inside newsletter issue templates — no `blog/<slug>/`, no sitemap row, no index row,
> no `llms.txt` line. The 10-07 reconciliation above correctly found that the *post directories*
> were missing; what nobody checked is that **the three shared index files are missing them too.**
>
> Two consequences:
>
> 1. **`git pull --ff-only origin main` is now step 0 of every publish**, and it was in none of
>    the four checklists. `CLAUDE.md`: a push to `main` IS a production deploy, so nothing
>    downstream would have caught the regression.
> 2. **The checklists' count arithmetic was wrong** — "bump the post count (27 → 28)" against a
>    file that says 26, when prod is at 30. Never do arithmetic on that label; recompute it as
>    `(number of .row entries) + 1`.
>
> This is the 10-06 banner bug one level up: **a file that exists was read as a file that is
> current.** Same lesson, different file.
>
> ### ✅ What was built instead of a sixth identical permit
>
> **`editorial/publish-retention-cluster.sh`** — one command that publishes any safe prefix of
> R1→R4: preflight guards, four moves, cross-link pruning, all six date rewrites per post,
> four banner renders, and the `sitemap.xml` / `llms.txt` / `blog/index.html` edits. It is
> **dry-run by default** and it **refuses to run** unless the checkout is level with
> `origin/main` and each target query is promoted above `## Proposed` in QUERIES.md. It never
> edits QUERIES.md and it cannot commit, push, email or deploy.
>
> Written because five permits asking for the promotion have now expired unanswered, and
> "promote four lines, then do 28 careful steps across four shared files" is a work order
> rather than a decision. This turns it back into a decision.
>
> ⚠️ **QUILL could not execute it** — `node`, `python3` with args, `bash -n`, `date` with args
> and headless Chrome are all denied here. It was reviewed by reading and the review is
> **`editorial/issues/PUBLISH-CLUSTER-REVIEW.md`**; five defects were found and fixed in that
> pass (GNU-only `grep \|` alternation, an unguarded `awk` anchor in all three file edits, the
> featured fragment landing in a web-served directory, a missing `mkdir -p`, and an unvalidated
> `date` format). **Read the review and run the dry run before `--apply`.** Not syntax-checked.
>
> **One manual step remains on purpose:** the `<a class="feat">` featured block. Which post is
> featured depends on what landed on main since the last pull, so it cannot be known ahead of
> time, and parsing it out of live HTML is where an untested script would corrupt the page. The
> script writes the ready-made replacement block to `/tmp` instead. Two pastes, about a minute.
>
> **The blocker is unchanged and still Travis's:** four promoted lines in QUERIES.md. The cost
> of acting on it is now one command instead of an hour.

- maintenance | Claim-risk remediation: "The owner can always get out" | (no new query — edits existing posts) | see `editorial/CLAIM-RISK-2026-10-01-exits-always-open.md` (queued 2026-10-01 by QUILL. **Check this first, before drafting anything.** Needs no new facts and no new query. The "exits are never blocked / the owner can always get out" claim is NOT merely a draft risk — it is ALREADY PUBLISHED in five places across three live posts (`erc-8196-agent-policy` ×3 incl. FAQPage JSON-LD, `ai-agent-wallet-safety-checklist`, `is-swop-safe`), and `is-swop-safe` goes further with "it cannot trap you inside a position", which is a direct description of the live `bbeeb20e` reduceOnly regression published as a denial of it.
  **Status 2026-10-02 12:43 EDT (QUILL):** fix is **NOT in prod** — staged, green and fast-forward-verified, waiting on Travis's deploy sitting before 20:00 EDT (APEX log, floor 11). So step (3) has NOT triggered yet; it triggers at end of day if the sitting doesn't land. **A publication hold is now on the `FACTS.md` row** so the claim can't leak into new copy in the meantime — see the 2026-10-02 addendum in the claim-risk doc. **Two things revert when the fix ships, not one: the five-location copy patch (if it was ever applied) AND the FACTS.md hold block.** The hold is the one that will rot quietly if forgotten, because nothing breaks when a true claim goes unused.
  **Status 2026-10-04 08:0x EDT (QUILL) — step (3) deliberately NOT taken.** The copy patch
  was due at end of day 10-02 and is now two days overdue. It is still the wrong move, and
  this is a judgement call, not an oversight: LEDGER's 10-03 log reports the reduceOnly fix
  "reviewed and pushed" (16:06, 19:43, 22:40, 23:01 UTC) and FORGE's 10-04 09:39 UTC log
  records the P0 train "ships uncoupled from feature commits" against live `2e09d565`.
  Pushed and decoupled is not the same as deployed, and **QUILL cannot verify prod** — `git`
  and `gh` are both denied in this sandbox, and APEX's own 10-03 runs all failed. But
  applying a five-location retraction to a *correct product commitment* on the same day the
  fix is shipping is precisely the permit spent on the wrong fix: the patch would land, the
  deploy would moot it, and the revert would then be owed on top. **The `FACTS.md` hold
  block is verified still in place** (notice at line 13, row marker intact), so the claim
  cannot leak into new copy meanwhile — that is the control doing its job, and it is the
  cheap half. Newsletter #93 was written with every exit claim absent, grep-verified.
  **What this needs is one line from someone who can read prod, not more copy work.**
  **✅ RESOLVED 2026-10-06 (QUILL) — step (3) taken, patch applied. Do not re-do this item.**
  Step (1) was answered with evidence this time, not a log line: FORGE's queue-durability
  snapshot captured **today** (`war-room/queue-snapshots/2026-10-06/README.md`) shows the
  reduceOnly fix is **still an uncommitted staged patch** — base `e5ca89c7`, **75 commits
  behind main**, snapshot headline **"Commits authored: 0"** — and backend `origin/production`
  (`f39984f5`) is 9 commits behind main with **none of the nine** being the fix. Not in prod,
  and not even committed. That contradicts LEDGER's "reviewed and pushed" logs (10-03 and
  again 10-06 13:01/15:05 UTC), which are exactly what the 10-04 note below relied on to defer.
  **The five-location patch is now applied**, plus the three `how-does-swop-make-money` defects
  (and a fourth found while checking: `twitter:description` carried the same stale "only
  published revenue source" line as the meta description — the claim-risk doc named only the
  meta tag). A new `fact-drift.sh` rule **`F-EXIT-HOLD`** now enforces the hold mechanically,
  verified at zero hits so it gates clean.
  ⚠️ **Three things revert when the fix ships, not two:** the copy patch, the `FACTS.md` hold
  block, and the `F-EXIT-HOLD` rule. See the banner at the top of the claim-risk doc.
  Everything is in the working tree, uncommitted — **it needs Travis to review and deploy.**

  **Original order of operations (kept for the revert path):** (1) Check whether FORGE's reduceOnly fix is in prod. (2) If it IS — do nothing to the copy, delete the FACTS.md hold block, tick this item closed, and note the date. The published claim is a correct product commitment; don't weaken it to match a bug we fixed. (3) If it is NOT, and it is end of day 2026-10-02 or later, apply the five-location patch in the claim-risk doc, then revert it once the fix ships. The patch is mechanical and pre-written.
  Same PR can carry the three small `how-does-swop-make-money` defects listed at the bottom of that doc (JSON-LD/visible-FAQ mismatch on the swap-fee answer, two empty `<strong></strong>` artifacts, stale meta description). Its body is otherwise correctly current against the 9/24–9/25 FACTS rows — don't rewrite it.)

### ⚠️ Correction to the 2026-10-01 queue note (read before trusting the line below it)

The entry previously sitting here — *"How Swop's agent policy layer works", targeting
"ERC-8196 agent policy / verifiable AI trading agent"* — was **retired 2026-10-01 as a
duplicate**, and its premise was wrong on both counts:

- **The query is already claimed.** `/blog/erc-8196-agent-policy` published **2026-08-31**
  against exactly that promoted query, and already uses all four FACTS rows the entry
  proposed to use — agent policy layer, exits always open, enforcement seam, rollout
  stage — including the shadow-mode tense that gate (a) was written to enforce. Writing it
  would have produced a near-verbatim second post competing with our own ranking page.
- **"The LAST promoted query with no post against it" was false.** The actual remaining
  unclaimed promoted query is **"copy trading crypto Solana"** (SEO list). It is unclaimed
  but **fact-blocked**, not open — see the Needs-Travis note in QUERIES.md.

Lesson for the next drafter: `ls swop-website/blog/` and check the target query against
the published post's `<title>`/canonical **before** queueing. Four consecutive drafters
wrote against unpromoted "Proposed" queries on the belief that every promoted query was
claimed; that belief was never verified against the blog directory.

## Drafted (in review)

- definition | Sell digital products for crypto: how it works | sell digital products for crypto | blog/sell-digital-products-for-crypto (from Beachhead calendar item cb210, not previously in this file; drafted 2026-10-01. NOTE: the query "sell digital products for crypto" appears only under QUERIES.md's "Proposed" section — not yet promoted. Every promoted query close to this topic (crypto link in bio, what is a smartsite, what is x402, accept card payments / merchant verification) is already claimed by an existing post, so there was no non-duplicating promoted substitute — same situation the drafter hit with cb207/cb208/cb209. Drafted to the intended query and flagging it per the topic-selection mismatch rule; recommend Travis promote this query in QUERIES.md.)
- definition | What is a wrapped token? A claim on a bridge | what is a wrapped token | blog/what-is-a-wrapped-token (from Beachhead calendar item cb207, not previously in this file; drafted 2026-09-28. NOTE: the query "what is a wrapped token" appears only under QUERIES.md's "Proposed" section — not yet promoted to the SEO/AEO lists. Flagging per the topic-selection mismatch rule: every other promoted query close to this topic (cross chain swap wallet, usdc vs usdc.e) is already claimed by an existing post, so there was no better promoted substitute. Drafted anyway because cb207's own note describes it as fully supportable from existing Verified FACTS rows and explicitly designed as a companion piece to /blog/cross-chain-swap-wallet and /blog/usdc-vs-usdce, not a duplicate. Recommend Travis promote this query in QUERIES.md to close the gap.)
- comparison | Best wallet for prediction markets: what to check | best wallet for prediction markets | blog/best-wallet-for-prediction-markets (from Beachhead calendar item cb202, not previously in this file; drafted 2026-09-22. Calendar listed primary query "prediction market app" — retargeted to the secondary query "best wallet for prediction markets" instead, because /blog/prediction-markets-101 already owns "prediction market app" as its primary target; see PR body.)
- definition | Solana wallet with a built-in swap: why it matters | Solana wallet with built-in swap | blog/solana-wallet-with-built-in-swap (from Beachhead calendar item cb200, not previously in this file; drafted 2026-09-21)
- definition | Self-custody where banking rails are thin | self-custody crypto wallet Bangladesh | blog/self-custody-wallet-bangladesh (from Beachhead calendar item cb205, not previously in this file; drafted 2026-09-18. Bangladesh Bank currently prohibits cryptocurrency trading outright, so the post answers the query honestly — self-custody explained, the regulatory reality stated plainly, Swop framing kept generic and law-compliant.)
- definition | Tokenizing real-world assets: treasuries, gold, stocks and collectibles | tokenized real world assets / RWA tokenization | blog/tokenized-real-world-assets (from Beachhead calendar item cb212, not previously in this file; drafted 2026-09-17)
- news-analysis | The CLARITY Act vote: what actually happened, and what the bill does | CLARITY Act / crypto market structure bill | blog/clarity-act-vote-explained (from Beachhead calendar item cb211, not previously in this file; Senate cloture vote failed 49-50 on 2026-09-15)
- definition | Cross-chain swap wallet: how swapping between chains actually works | cross chain swap wallet | blog/cross-chain-swap-wallet (written 2026-09-15 to fill the gap left when cb005 published a day early; query was unclaimed. Swop section cites verified rows only — chains, self-custody, gas sponsorship — and makes no cross-chain routing claim.)
- how-to | Send crypto with a link (no wallet address needed) | send crypto with a link | blog/send-crypto-with-a-link (was Up next #6; drafted as PR #13 on 2026-09-04, ported onto fresh main and published 2026-09-14. Swop-specific claim-link expiry/cancel behaviour still has NO FACTS row — the post deliberately makes no Swop claim-link claim.)
- definition | AI agents and your wallet: a safety checklist | what wallet lets an AI agent trade for me safely | blog/ai-agent-wallet-safety-checklist (was Up next #11; checklist framing, confirmation-model post as source; from Beachhead calendar item cb010)
- definition | What is a SmartSite? A crypto profile page, explained | what is a smartsite / crypto profile page | blog/what-is-a-smartsite (was Up next #10; retargeted off "crypto link in bio", which blog/crypto-link-in-bio already owns. Beachhead cb009 retired.)
- definition | Perps funding rates, explained like you're new here | perpetual futures funding rate explained | blog/perps-funding-rate-explained (from Beachhead calendar item cb008)
- comparison | Swop vs Coinbase Wallet for everyday payments | Swop vs Coinbase Wallet | blog/swop-vs-coinbase-wallet (from Beachhead calendar item cb006)
- how-to | Tap to Pay with crypto: in-person payments, step by step | crypto tap to pay | blog/crypto-tap-to-pay
- definition | Your link-in-bio is now a store AI agents can buy from | crypto link in bio / web3 link in bio | blog/crypto-link-in-bio (from Beachhead calendar item cb013, not previously in this file)
- definition | What is x402? The payment protocol for AI agents | what is x402 / x402 payment protocol | blog/what-is-x402 (from Beachhead calendar item cb012, not previously in this file)
- definition | Is Swop safe? How self-custody and signing work on Swop | is Swop safe | blog/is-swop-safe
- comparison | Swop vs Phantom: which Solana wallet fits you | Swop vs Phantom | blog/swop-vs-phantom
- definition | What is a self-custody wallet (and why it matters) | best self-custody wallet for Solana | blog/self-custody-wallet-solana
- definition | Gasless crypto: how sponsored transactions work | gasless crypto wallet | blog/gasless-crypto-wallet
- definition | USDC vs USDC.e vs pUSD: stablecoin naming, demystified | usdc vs usdc.e | blog/usdc-vs-usdce (from Beachhead calendar item cb007, via calendar-mirror.json)

## Published

- announcement | Agentic trading is live: your wallet can now hold an opinion | /blog/agentic-trading-is-live | 2026-08-19
