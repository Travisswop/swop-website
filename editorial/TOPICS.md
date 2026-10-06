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
> ⛔ Do **not** queue R5 (perps liquidation) until the FACTS.md publication hold is lifted —
> reason in QUERIES.md.

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
  **Order of operations, do not skip:** (1) Check whether FORGE's reduceOnly fix is in prod. (2) If it IS — do nothing to the copy, delete the FACTS.md hold block, tick this item closed, and note the date. The published claim is a correct product commitment; don't weaken it to match a bug we fixed. (3) If it is NOT, and it is end of day 2026-10-02 or later, apply the five-location patch in the claim-risk doc, then revert it once the fix ships. The patch is mechanical and pre-written.
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
