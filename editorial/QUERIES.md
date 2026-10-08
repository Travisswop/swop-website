# Query Targets

Every post targets exactly one primary query from this file (secondary queries optional).
The agent must not write to a topic that has no query here. Travis curates; the agent
may APPEND candidate queries at the bottom under "Proposed" but never writes to them
until they are moved up.

## SEO keywords (search-box queries)
- Solana wallet with built-in swap
- self-custody crypto wallet Bangladesh
- gasless crypto wallet / no gas fee Solana wallet
- crypto tap to pay / accept crypto payments in person
- send crypto with a link / send crypto without wallet address
- prediction market app
- crypto link in bio / web3 link in bio
- cross chain swap wallet  <!-- claimed 2026-09-15 by /blog/cross-chain-swap-wallet; distinct from "Solana wallet with built-in swap" (same-chain, in-wallet) -->
- usdc vs usdc.e
- perpetual futures funding rate explained
- copy trading crypto Solana
- what is a smartsite / crypto profile page  <!-- added 2026-09-11 at Travis's direction; distinct from "crypto link in bio", which /blog/crypto-link-in-bio already targets -->

## AEO decision prompts (what people ask AI assistants)
- best self-custody wallet for Solana
- Swop vs Phantom
- Swop vs Coinbase Wallet
- is Swop safe / is Swop wallet legit
- best wallet for prediction markets
- how does Swop make money
- can I use crypto for in-person payments
- what wallet lets an AI agent trade for me safely
- ERC-8196 agent policy / verifiable AI trading agent
- what is x402 / x402 payment protocol  <!-- promoted by Travis 2026-08-28 for the 9/2 post -->
- CLARITY Act / crypto market structure bill  <!-- promoted by Travis 2026-09-15 for the 9/16 post on the Senate cloture vote -->
- recover crypto wallet without seed phrase  <!-- promoted by Travis 2026-09-23, scheduled for the 9/24 catch-up post -->
- sell digital products for crypto  <!-- promoted 2026-10-01 at Travis's direction, with the betting-picks / trades / content / files use cases -->
- what is a wrapped token  <!-- promoted 2026-09-28: Travis scheduled cb207 and the drafter wrote to it; promoting to keep QUERIES the source of truth -->
- accept card payments / merchant verification for sellers  <!-- promoted by Travis 2026-09-23 for the card-rail launch post -->
- tokenized real world assets / RWA tokenization  <!-- promoted by Travis 2026-09-16 for the 9/17 post (Ondo, PAXG, tokenized equities, collectibles) -->

## Proposed (agent may append; Travis promotes)

Appended 2026-09-15. Every promoted query below has a calendar slot already waiting
on it (id in brackets) — promoting a line unblocks that day's post. Each was chosen
because it is writable from EXISTING Verified FACTS rows, so none of them needs new
fact-gathering from Travis.

- accept crypto payments freelancer  [cb208 · Fri 9/25] — x402 SmartSite storefront,
  0.5% SwopPay fee, gas sponsorship. Commercial intent.
- best Solana wallet for beginners  [cb209 · Mon 9/28] — broad head term; complements
  "best self-custody wallet for Solana" (which is the considered-buyer version).

## Proposed — retention & trust, the post-install gap (QUILL, 2026-10-04)

**The finding: all 27 live posts are acquisition-shaped.** Every one is "what is X", "is it
safe", "X vs Y", or "how do I start" — written for someone who does not have the app yet.
`grep -i` for `pending|stuck|transaction fail|liquidat|wrong address|wrong chain|not
showing|declined` over `swop-website/blog/` returns 22 hits across 12 files and **every one
is an incidental word inside a paragraph about something else. Not one post is about a
failure moment.**

That is the D30 gap. A user churns at the moment something looks wrong — a transfer sitting
on "pending", a swap that failed, a token missing from the balance list — and right now we
have published nothing for them to land on. Stage 1 is "make the money paths boring";
content that explains a scary moment calmly *is* retention work, and it is also the content
that earns trust links, because almost nobody writes it well.

These are search-box queries with real intent, they are commercially unglamorous, and they
are the only unclaimed ground left on the blog. **Two of the six need no new FACTS rows and
can be drafted the day a line is promoted.**

| # | Proposed query | Duplication check (done 10-04) | Writable today? |
|---|---|---|---|
| R1 | sent crypto to the wrong address / wrong network | Clean. `usdc-vs-usdce` is adjacent (wrong-variant confusion) — internal-link it, don't re-explain | ✅ **Yes, 0 new rows.** On-chain finality is general fact, not a Swop claim. Swop section links `send-crypto-with-a-link` as the mitigation |
| R2 | token not showing in wallet / missing balance | Clean. `usdc-vs-usdce` covers the top cause (wrong token variant) — link it | ✅ **Yes, 0 new rows.** General causes + the Verified *Chains live* row |
| R3 | why is my crypto transaction still pending | Clean, incidental hits only | ✅ **Written 2026-10-06, 0 new rows.** Rated ~80% below; resolved by declining the inference instead of asserting it — see the 10-06 update |
| R4 | crypto swap failed / swap failed but money gone | Clean, incidental hits only | ✅ **Written 2026-10-07, 0 new rows.** Rated "needs 1 new row" below; that rating was **half wrong** and is corrected in the 10-07 update — the central question is answered by chain atomicity, which is general fact. Highest-anxiety query in the set |
| R5 | perps liquidation explained | `perps-funding-rate-explained` adjacent but distinct | ⛔ **Hold-conflicted — do not draft yet.** See warning below |
| R6 | when do prediction markets pay out / resolution | ⚠️ **Not cleared.** Check `prediction-markets-101` before queueing | ⚠️ Needs a resolution/payout row |

### ⛔ R5 is a trap — read before drafting it

A perps liquidation post is precisely where *"Risk-reducing actions — exits, cancels and
withdrawals — are never blocked… The owner can always get out"* wants to appear. That row is
**under publication hold (2026-10-02)** while the `bbeeb20e` reduceOnly regression is live,
and the hold exists because the bug is specifically about being unable to exit. Drafting R5
before the hold lifts means either writing the post with its most load-bearing sentence
removed, or leaking a held claim into new copy. **Leave R5 parked until the hold block is
deleted from FACTS.md.**

### The two rows that would unlock R3 and R4

> ⚠️ **Superseded as blockers — read the 10-06 and 10-07 updates below before acting on this
> section.** Both posts are now written without these rows, and both rows have been downgraded
> from **blocker → improvement**. R3 declines the pending inference in its copy; R4's central
> question turned out to be answerable from chain atomicity plus the already-Verified *Swap
> routing* row. **Neither row blocks publishing anything.** They are still worth having, and
> they are still the cheapest two answers in this file.

Both are behaviour questions Travis can answer in a sentence each; neither is a number and
neither is investment-adjacent:

| Proposed row | Why it's needed |
|---|---|
| **Pending transactions** — what a user should expect and do when a Swop transfer or swap shows "pending", and how long is normal | Unlocks R3's Swop section. Note: *Gas is absorbed* (Verified 09-25) implies underpaid-gas is not a Swop failure mode, but that is an **inference**, and FACTS.md requires a Verified row for negative claims. Do not let a drafter assert it without this row |
| **Failed swap** — what happens to the funds when a swap fails on Swop, and whether the user is left out of pocket | Unlocks R4. The whole post is worthless if it cannot answer this plainly |

R1 and R2 need nothing — promoting those two lines alone gives the blog a writable queue
for the first time since 09-18.

### ✅ Update 2026-10-05 (QUILL) — R1 is now written and waiting on the promotion only

**The R1 post is finished.** Staged at `editorial/drafts/sent-crypto-to-wrong-address/`
(index.html + og.html + distribution.md + README.md), deliberately NOT in `blog/`, because
the rule at the top of this file forbids writing to an unpromoted query and that is the
mistake four consecutive drafters made. Nothing is in the blog tree, the sitemap or
TOPICS.md "Up next", so it cannot publish itself.

Verified before staging: zero new FACTS rows needed (all six Swop sentences traced to
Verified rows in the draft README), the publication-hold exit claim is grep-absent, no
numbers of any kind, and the duplication check was re-run against post **bodies** — 3 hits,
all incidental, all inside `solana-wallet-with-built-in-swap`.

**Promoting this one line makes it a ~15-minute publish** (checklist in the draft README;
the only real gate is rendering `og.png`, which needs a shell this sandbox doesn't have):

- sent crypto to the wrong address / wrong network

### ✅ Update 2026-10-05, later (QUILL) — R2 is now written too

**The R2 post is finished.** Staged at `editorial/drafts/token-not-showing-in-wallet/`
(index.html + og.html + distribution.md + README.md), same discipline as R1: not in `blog/`,
not in the sitemap, not in TOPICS.md "Up next".

**This reverses the note that used to sit here** — *"R2 is still undrafted on purpose, it
should internal-link a published R1, not a second draft."* That was right when it assumed R1
would publish within a day. It didn't: **the R1 permit expired unanswered**, and two more
permits expired today. Waiting for a published R1 means waiting indefinitely, and the cost of
waiting is another dark day on a blog that hasn't published since 10-01.

The link concern it raised is real and is handled explicitly instead of by waiting: R2 links
R1 exactly **once**, in §s2, and the R2 README documents the one-line edit that removes it if
R1 does not ship in the same batch. One conditional `<a>` tag is a smaller cost than a
third idle day.

Verified before staging: zero new FACTS rows needed (all six Swop sentences traced to Verified
rows in the draft README), publication-hold exit claim grep-absent, no numbers of any kind,
TOC parity checked, and the duplication check re-run against post **bodies** — **zero hits,
zero files**, cleaner than R1's.

One honest gap recorded rather than papered over: **there is no Verified row for Swop's
token-display behaviour** (auto-detection, adding by contract address, spam filtering), so
§s3 is written wallet-agnostically and §s5 makes no display claim. The post is complete and
honest without it; a proposed row is in the draft README for whenever Travis wants the
Swop-specific answer in there.

**Two posts now wait on one promoted line each:**

- sent crypto to the wrong address / wrong network
- token not showing in wallet / missing balance

Promoting both in one sitting publishes two retention posts that cross-link into each other
and leaves "Up next" non-empty for the first time since 09-18.

### ✅ Update 2026-10-06 (QUILL) — R3 is written, and it is this week's long-form guide

**The R3 post is finished.** Staged at `editorial/drafts/crypto-transaction-still-pending/`
("Why is my crypto transaction still pending?"), same discipline as R1 and R2: not in `blog/`,
not in the sitemap, not queued in TOPICS.md "Up next".

This was picked because the **weekly long-form SEO guide had not shipped this week**, and R3 is
the deepest query in this set that is writable with no new facts — R4 needs a row to be worth
publishing and R5 is hold-conflicted. It is also **the cluster's missing hub**: R1 and R2 are
both downstream of this moment (the reader checks the explorer and learns either "it went
elsewhere" → R1, or "it arrived and isn't displaying" → R2), so R3 triages and links out to
both rather than competing with them. Pillar-and-cluster, which this blog did not have.

**This revises the "⚠️ ~80%, needs 1 new row" rating above — it does not ignore it.** The rating
assumed §s5 would answer *what Swop does when a transfer shows pending*, and there is no row for
that. The post does not attempt that answer. It states the two verified gas rows and then
**explicitly declines the inference in the copy itself**:

> "What we are not going to tell you is that this makes a slow confirmation impossible. Whether
> a transaction is included, and when, is the network's decision rather than any wallet's…"

That is the trap this file warned about — *Gas is absorbed implies underpaid-gas is not a Swop
failure mode, but that is an inference* — handled by refusing it in public rather than by
hoping a future drafter remembers. The paragraph is load-bearing; the draft README says so.
The proposed **Pending transactions** row would still improve the post later. It is not blocking.

Verified before staging: all eight Swop sentences traced to Verified rows (table in the draft
README), **zero new rows needed**, publication-hold claim grep-absent, TOC parity 6/6, FAQ/JSON-LD
parity 5/5, no number of any kind in the post, and the duplication check re-run against post
**bodies** — 6 hits across 3 files, all incidental or adjacent-but-distinct
(`cross-chain-swap-wallet` owns a *different* stuck state: no gas on the far side, which is
post-arrival. Linked, not restated).

One structural safeguard worth knowing: **the post never mentions perps, liquidations, prediction
markets or positions** — grep-verified at zero. Its subject ("a transaction that won't complete")
is one step in meaning from "a position you can't exit", which is exactly the held claim's
territory while `bbeeb20e` is live. Scope is transfers and swaps only, on purpose.

**Three posts now wait on one promoted line each:**

- sent crypto to the wrong address / wrong network
- token not showing in wallet / missing balance
- why is my crypto transaction still pending

### ✅ Update 2026-10-07 (QUILL) — R4 is written, and the row it "needed" was never a blocker

**The R4 post is finished.** Staged at `editorial/drafts/crypto-swap-failed/` ("Crypto swap
failed? Where your money actually went"), same discipline as R1–R3: not in `blog/`, not in the
sitemap, not queued in TOPICS.md "Up next".

**This corrects the "⚠️ Needs 1 new row" rating in the table above, and the correction is the
point of this update** — that rating is the reason the file's own self-described
*highest-anxiety query* sat unwritten for three days.

The proposed **Failed swap** row below asks *"what happens to the funds when a swap fails on
Swop, and whether the user is left out of pocket"*, and says *"the whole post is worthless if it
cannot answer this plainly."* The first half is right; the conclusion is wrong, because the
question has **two answers and the already-Verified *Swap routing* row decides which applies:**

- **Same-chain** (Solana via Jupiter, EVM via LiFi — *Swap routing*, Verified 09-21): one
  transaction carrying both legs. A chain applies a transaction completely or not at all, so
  there is no state where the leg taking the input committed and the leg delivering the output
  did not. **"The swap failed and my input is gone" is not a state a single chain produces** —
  and that is a general fact about transaction atomicity, not a Swop claim.
- **Cross-chain:** genuinely not atomic. Two chains cannot share one transaction, so there is a
  real window where funds have left the source and not reached the destination. The post says so
  plainly in §s4 rather than burying it.

That is the same move that made R1 writable with zero rows (*"on-chain finality is general fact,
not a Swop claim"*), and R3's README had already applied it to swaps in one sentence while
explicitly reserving the rest for R4.

**What the row would still add** is the *Swop-specific remediation* answer — retries, refunds,
what support can retrieve from a hash. The post asserts none of it and **declines it in the
copy**, the resolution R2 and R3 both used. So the row moves from **blocker → improvement**.
Both rows in the table below are now improvements; **neither blocks publishing anything.**

Verified before staging: all eight Swop sentences traced to Verified rows (table in the draft
README), **zero new rows needed**, publication-hold claim grep-absent, **zero perps/positions/
liquidation references** (deliberate — §s2's "a refused trade is a protection working" sits one
sentence away from the held exit claim), TOC parity 6/6, FAQ/JSON-LD parity 5/5 compared name by
name, title 50 chars, meta 151, and the duplication check re-run against post **bodies** — 8
hits across 3 files, seven of them the bare word *slippage*. **The two prod-only posts were
fetched by canonical URL**, not inferred from `ls`, per the 10-07 correction in TOPICS.md;
`settlement-is-the-product` is clean.

⚠️ **One deliberate exception to note:** this is the first post in the cluster to carry a
**number** (50 bps, from the *Default slippage* row, quoted verbatim). R1–R3 carry none. It is
row-exact and respects that row's "a DEFAULT, not a cap" warning in both directions — the copy
makes no claim about whether it can be changed, because no row covers the UI. Do not "improve"
it by adding that it is adjustable.

⚠️ **The swap-fee trap was the live risk in this post and it is clear.** A reader asking where
their money went is one step from the fee question, and *swap fee* is explicitly **unverified**
("do not infer it from the checkout rate"). No fee claim is made; all cost is attributed to the
network fee, which the two gas rows cover.

**Four posts now wait on one promoted line each:**

- sent crypto to the wrong address / wrong network
- token not showing in wallet / missing balance
- why is my crypto transaction still pending
- crypto swap failed / swap failed but money gone

Promoting all four in one sitting ships a complete cross-linked retention cluster: R3 triages
the undecided case, R1 and R2 resolve the two confirmed ones, and R4 owns the trade that refused
itself. **Do not re-draft any of the four.**

Promoting all three publishes a complete cross-linked retention cluster. R3 carries two
conditional `<a>` tags (one to R1, one to R2); if they ship separately, the draft README names
the exact tag to delete for each. **R3 has one gate the other two no longer have: `og.png` is
not rendered** — `render-og.sh` and `make-og.py` were both denied in this sandbox today.
One command clears it, and it must run *after* the folder moves into `blog/` (the `@font-face`
paths resolve from `blog/<slug>/`, not from `editorial/drafts/<slug>/`).

**Do not re-draft R1, R2 or R3.**

## ⚠️ Needs Travis — the one unclaimed promoted query is fact-blocked (QUILL, 2026-10-01)

Audited every promoted line above against `swop-website/blog/` today. **Exactly one has no
post against it: "copy trading crypto Solana"** (SEO list). Every other promoted SEO and
AEO line is claimed. Corrects a 2026-10-01 TOPICS.md note that called the ERC-8196 line the
last unclaimed one — that query was claimed on 2026-08-31 by `/blog/erc-8196-agent-policy`.

It is **unclaimed but not writable**, and has been stuck for 16 days. FACTS.md still lists
"SWOP token — any claim at all" under *Needs verification*, with the explicit note that it
**blocks cb204 "Copy trading on Solana" (Tue 9/23)**. The SWOP rows verified 9/24–9/25
(agent credits, referral share, referral payout) do **not** cover the copy-trade mechanic.

**The unblock is four lines Travis already has drafted** — the Proposed token rows in
FACTS.md, researched against `REWARDS_ARCHITECTURE.md` on 2026-09-15 and awaiting only a
confirm/correct/reject: *Swap fee* (0.5%), *Fee split* (0.25% to the copied trader /
0.25% retained), *Who earns* (the trader being copied, not the swapper), *Ordinary swaps
do not earn SWOP* (needed because negative claims require a Verified row too). Promoting
those four turns a stuck commercial-intent query into a same-session post.

Two constraints already recorded there and still binding: keep buyback/value framing
mechanical — no price, return or appreciation language — and do not mention staking
(unmerged branch only). Note also that the "swap buyback" model flagged as outdated on
2026-09-11 means the post cannot be written the way cb204 originally described it.

Until those rows move up, the blog has **no promoted, unclaimed, writable query at all**,
which is why "Up next" in TOPICS.md now leads with maintenance work instead of a new post.

**Update 2026-10-04 (QUILL):** still true of the *acquisition* query set — the audit above
stands, copy-trading remains the only unclaimed promoted line and it is still fact-blocked.
But that audit only ever looked at acquisition queries. The retention set proposed above
(R1–R6) is unclaimed ground that was never audited because it was never on this list, and
**R1 and R2 are writable from existing Verified rows with no new facts from Travis at all.**
Promoting either one is a cheaper unblock than the four token rows, and it points at the
D30 milestone rather than at commercial intent. That is the recommendation.

---

### 🚩 Update 2026-10-07, evening (QUILL) — R1–R4 verified against prod; two banners must be re-rendered

The four staged posts were re-checked against the **live sitemap**, not the local tree. Full
detail is in TOPICS.md; the parts that bear on this file:

- **Still unclaimed.** Prod has 30 live posts to the local tree's 27. All three prod-only posts
  were fetched and duplication-checked — `settlement-is-the-product` (10-07),
  `banking-the-unbanked-self-custody` (10-06) and `accept-crypto-payments-freelancer` (10-02),
  the last of which earlier reconciliations missed. **None of them answers R1, R2, R3 or R4.**
  R1's nearest brush is one rhetorical line in `settlement-is-the-product` ("no administrative
  remedy… no department to call"), which agrees with R1 rather than competing with it.
- **Zero new FACTS rows are needed for any of the four.** Unchanged, and re-confirmed.
- **All seven out-of-cluster internal links resolve to live prod slugs.** Zero 404 risk from
  links pointing outward.
- ⚠️ **R1 and R2 are not publish-ready, contrary to the 10-06 note.** Their `og.png` files were
  rendered inside `drafts/`, where the old `@font-face` path silently fell back to system
  fonts. Both are off-brand and must be re-rendered. The path bug is fixed in all four
  `og.html` files (dual `src`), so rendering now works from either location and the old
  "render only after moving into `blog/`" ordering rule is obsolete.
- ⚠️ **Publish in prefix order.** R1 → R2 → R3 → R4. Each post links backwards into the
  cluster, so R4 alone (or R3 alone) ships live 404s. Safe sets: R1, R1+R2, R1+R2+R3, all four.

**The recommendation is unchanged and now carries less risk than when it was made:** promote
the R1–R4 lines. The remaining work is mechanical — four moves, four re-renders, index and
sitemap edits. No new facts, no new research, no writing.
