# DRAFT — `copy-trading-solana` (QUILL, 2026-10-09)

**Title:** Copy trading on Solana: how it works and where it goes wrong
**Primary query:** `copy trading crypto Solana` — **already promoted**, QUERIES.md line 19, under *SEO keywords (search-box queries)*
**Calendar slot:** `cb204` ("Copy trading on Solana", originally Tue 9/23) — unshipped since 9/23

---

## ✅ The thing that makes this post different from the other four drafts

**It needs no QUERIES.md promotion.** Its query sits at **QUERIES.md line 19**, under
`## SEO keywords (search-box queries)` (line 8) — i.e. *above* the `## Proposed` boundary at
line 40 — and has been there since before the retention cluster existed. Travis curates that
file and has already curated this line.

That is also exactly what `publish-retention-cluster.sh`'s promotion gate tests
(`head -n 39 editorial/QUERIES.md | grep -qiF "copy trading crypto Solana"`), so **this post
passes that gate today, with no edit to QUERIES.md.**

| | R1–R4 (`drafts/sent-crypto-*`, `token-not-*`, `crypto-transaction-*`, `crypto-swap-*`) | **This post** |
|---|---|---|
| Query promoted? | **No** — all four sit under `## Proposed — retention & trust` | **Yes, already** |
| Gates to publish | promote query **+** publish | **publish only** |
| New FACTS.md rows needed | none | **none** |
| In-cluster link dependencies | R2→R1, R3→R1+R2, R4→R1+R2+R3 | **none** |

That makes this the only finished post on the blog that Travis can ship with a single
decision and no editorial curation step. It is also why it was written: the blog has been
dark since **Oct 7** (`settlement-is-the-product`), TOPICS.md "Up next" was empty, and an
empty queue stops the blog silently.

### Why this query was marked blocked, and why that rating was wrong

The 10-01 audit in `QUERIES.md` §"Needs Travis" checked the 9/24–9/25 SWOP rows against this
topic and concluded they "do not cover the copy-trade mechanic." **That was right, and it is
still right** — *Fee split*, *Who earns*, *Buyback mechanism* and *Ordinary swaps do not earn
SWOP* remain *Proposed*, and this post publishes none of them.

The step not yet taken was the R4 step: asking whether the **query** needs the mechanic at
all. It does not. Someone searching `copy trading crypto Solana` wants to know how copy
trading works and whether to do it. cb204 described a post *about Swop's copy-trade rewards*,
and that post is still unwritable. The post the query actually asks for needs no token row,
and was writable the whole time. **Rating: blocker → improvement**, the same downgrade R4
received on 10-07.

A minor doc defect, worth one line when someone is next in `FACTS.md`: *Needs verification*
still reads *"SWOP token — any claim at all: **No token row exists.** Blocks cb204"*. Four
rows have existed since 09-24/09-25 (*Agent is paid in SWOP*, *Referral rewards paid in
SWOP*, *Agent credits*, and the corrected *Referral share* row — whose own wording
references "any copy-trade payout on the same transaction"). The 10-01 audit reasoned past
that sentence correctly; it would still mislead a fresh reader. **FACTS.md edits are
Travis's alone — not touched.**

Re-deriving splits the query cleanly:

- **The general half — writable today, from nothing but Verified rows.** What copy trading
  mechanically *is* on a public chain, the three custody models, why a mirrored fill differs
  from the leader's, why return-ranked leaderboards select for variance, and the questions
  to ask before delegating. This is the whole post.
- **The claim half — still genuinely blocked, and left out entirely.** The fee split, who
  earns, the per-payout buyback, the mint, staking. All still *Proposed*, none published.

**This post makes no claim of any kind about Swop's own copy-trade product or its reward
economics.** Not a positive claim, and — per the FACTS.md rule that negative claims need a
row too — not a negative one either. The topic simply does not appear. §s6 is about custody
and delegated authority, which is where the Verified rows actually are.

> ⚠️ **For whoever promotes the token rows later:** the natural place for a Swop copy-trade
> paragraph is §s6, after the built-in-swap paragraph and before the agent paragraph. Add it
> *then*, from the promoted wording, and keep it mechanical (how fees route — no price,
> return or appreciation language, per the FACTS.md token rule). Do not infer it from this
> post's silence, and do not reach for the Proposed table.

---

## ⛔ The one hard gate: `og.png` is not rendered

`og.html` is authored and uses the house banner frame. **`og.png` does not exist yet** —
Chrome is denied in this session, so the render could not be run here.

```bash
cd /Users/travis/Desktop/SwopLive/swop-website
editorial/render-og.sh editorial/drafts/copy-trading-solana
```

That wrapper is a two-line call to headless Chrome at `--window-size=1200,630`. If it is
run **after** the folder is moved into `blog/`, point it at `blog/copy-trading-solana`
instead.

### Render order does not matter for this banner

TOPICS.md's R3 and R4 notes say the banner must be rendered *only* after the folder is moved
into `blog/`, "so rendering in place silently falls back to system fonts." **Those notes are
superseded by the 10-07 evening entry further down the same file**, which found that exact
bug (R1's and R2's committed `og.png` were silent `-apple-system` fallbacks), fixed the root
cause in all four drafts, and recorded the ordering rule as obsolete. This banner inherits
the fixed version. Each `@font-face` carries two URLs:

```css
src:url('../../editorial/fonts/InterTight.ttf'),url('../../fonts/InterTight.ttf');
```

CSS tries them in order, so exactly one resolves from either location:

| Rendering from | `../../editorial/fonts/…` | `../../fonts/…` |
|---|---|---|
| `editorial/drafts/<slug>/` | ✗ `editorial/editorial/fonts/` | ✅ `editorial/fonts/` |
| `blog/<slug>/` | ✅ `editorial/fonts/` | ✗ repo-root `fonts/` (absent) |

Verified: `editorial/fonts/` holds `InterTight.ttf` and `JetBrainsMono.ttf`, and R3's, R4's
and this banner's `src` lines are byte-identical. So **render in place or after the move;
either works.**

⚠️ **Reasoned from path resolution, not from a render** — Chrome is denied here, so this was
not executed, and the eye-check below is required regardless. The 10-07 lesson is the one to
keep: a valid-looking 1200×630 PNG is not evidence the fonts loaded
(`[[existing-artifact-is-not-a-cleared-gate]]`).

⚠️ **Check the render with your eye, not just for the file existing.** The known failure
mode on the two earlier banners was a silent system-font fallback that still produced a
valid 1200×630 PNG. **The `SWOP` logotype must be monospaced** (JetBrains Mono, wide
letter-spacing). If it looks like Helvetica, the fonts did not load and the PNG is off-brand.

`publish-retention-cluster.sh` renders banners itself at step 197, so if this post is ever
folded into that script the render comes free.

---

## Publishing: why I did **not** extend `publish-retention-cluster.sh`

The reviewed script is the right machine for this job but **cannot currently publish this
post**, and the reason is structural rather than a missing table row.

Its post list is a fixed string and `<count>` publishes the **first N slugs as a prefix**:

```
SLUGS="sent-crypto-to-wrong-address token-not-showing-in-wallet crypto-transaction-still-pending crypto-swap-failed"
case "$COUNT" in 1|2|3|4) ;; *) die ...
```

So there is no argument that means "publish only this one":

- **Appending** this slug makes it slug #5 — reachable only at `COUNT=5`, which also
  publishes R1–R4, and the script's QUERIES.md promotion gate (line ~174) would correctly
  `die` on their four unpromoted queries. Blocked behind exactly the gate this post avoids.
- **Prepending** it makes `COUNT=1` mean this post instead of R1. That silently re-points
  the numbering referenced by `PUBLISH-CLUSTER-REVIEW.md` and all four draft READMEs — a
  trap for whoever runs `… 2 <date>` next expecting R1+R2.

**The clean change is a `--only <slug>` flag**, which the script's shape already suits: it
would set `PUBLISH="$slug"`, leave `HELD` as everything else, and reuse every existing
guarantee untouched — the `HEAD == origin/main` staleness guard, the QUERIES.md gate (which
**this post passes as-is**, since `grep -qiF "copy trading crypto Solana"` finds the line
above `## Proposed`), the banner render, and the sitemap/llms/index-row writers.

I have not written that flag. It is a change to a script that edits three
hand-maintained production index files, I cannot execute it to test it, and
`PUBLISH-CLUSTER-REVIEW.md` exists precisely because unverified code in this path is how a
permit ends up sitting unanswered. **It wants a shell and a reviewer, in that order.** Filed
as a proposal rather than applied.

### The guarantees that still apply however this ships

From `PUBLISH-CLUSTER-REVIEW.md`, and they are not optional:

1. **`git pull --ff-only origin main` first.** This checkout has been **three posts behind
   prod** (`settlement-is-the-product`, `banking-the-unbanked-self-custody`,
   `accept-crypto-payments-freelancer`). `sitemap.xml`, `blog/index.html` and `llms.txt`
   are hand-maintained flat files that do not know about them, so editing them from a stale
   checkout and pushing **de-lists three live posts**.
2. **Never hand-type a post count.** Recompute it as `(number of .row entries) + 1`. Any
   count written in an older checklist is wrong.
3. A push to this repo **is** a production deploy.

---

## Every Swop sentence, traced to a Verified FACTS.md row

All of §s6 and one FAQ answer. Nothing outside this list makes a claim about Swop.

| Sentence | Verified row | Verified |
|---|---|---|
| "Swop runs on Solana, Ethereum, Base, and Polygon." | *Chains live* | 2026-08-26 |
| "fully self-custodial — keys are generated and held on your device; Swop never holds them" (×2, §s6 + FAQ 5) | *Self-custody* | 2026-08-26 |
| "losing your phone doesn't mean losing your funds… save your private key, which lets you open your assets in any wallet you choose" | *Phone loss / recovery* | 2026-09-01 |
| "built-in swap: you get a quote and sign inside the app, without sending funds to an exchange or connecting to a separate site" | *Built-in swap* | 2026-09-21 |
| "routes Solana swaps through Jupiter and EVM swaps through LiFi" | *Swap routing* | 2026-09-21 |
| "50 bps **default** slippage tolerance… a default rather than a ceiling, and it is adjustable" | *Default slippage* | 2026-09-21 |
| "Swop's agent proposes; you approve. Nothing signs without a tap, and the agent never holds keys." | *AI agent model* | 2026-08-26 |
| "versioned policy… owner's EIP-712 signature… per-vault hash-chained audit log" | *Agent policy layer* | 2026-08-28 |
| "Enforcement happens at Swop's backend signing seam… It is not an on-chain guarantee." | *Policy enforcement seam (honest framing)* | 2026-08-28 |
| "shipped Aug 28, 2026 and is running in shadow (observe-and-log) mode while it soaks; enforcement mode follows" | *Policy rollout stage* | 2026-08-28 |
| "Swop has not commissioned a third-party security audit to date." | *No third-party audit (honest)* | 2026-09-01 |
| iOS / Android / swopme.app / support.swop.id links | *Platforms* + *Primary sources* | 2026-08-26 |

**No pulled number, no price, no index level, no user or wallet count, and no fee figure
anywhere in the post.** The only number about Swop is the 50 bps slippage **default**.
Nothing here can go stale between drafting and publishing.

### Deliberately absent

- **Any swap-fee number.** The swap fee is still under *Needs verification* — a 0.5% swap
  fee is **not** a publishable claim, and must not be inferred from the checkout rate. §s3's
  cost argument is written generically about copy trading and names no Swop figure.
- **Perps, positions, and the exit claim.** The `⛔` hold on *Policy exits always open* is
  still live (`FACTS.md`, 2026-10-02; FORGE's `reduceOnly` fix was still not in prod as of
  10-06). This post mentions **perpetual futures nowhere at all** — same discipline as #97,
  #98 and R1–R4. "The owner can always get out" and every paraphrase are absent.
- **The SWOP token.** Not named once.

---

## `fact-drift.sh` hand-check (the script could not be run here)

`fact-drift.sh` greps **per line**, then clears matched lines with the allow regex on the
**same line** — so a deny phrase and its allow phrase must share a line. Every deny regex
in the rule table was run against `index.html` by hand with `rg`. **Two lines produce hits.
One is cleared on its own line; the other is a pre-existing false positive in the rule.**

**F-AUDIT-IMPLIED — line 203, cleared.** `third-party security audit` matches the deny. The
same line carries `has not commissioned a third-party security audit` (37 chars from
"has not" to "audit", inside the 40-char allow window) *and* `audit chain`, both allow
terms. Line 202's `hash-chained` / `audit log` are independently allow terms.

**F-TOKEN-INVESTMENT — lines 204 and 251: FALSE POSITIVE, and not mine.** The deny
`swop[^.]{0,60}(…|roi|…)` fires on the **Google Play URL**: `…swopapp">Android` contains
`roi` inside "And**roi**d", 11 characters after `swop`. Verified pre-existing — the same hit
appears **twice in the live post `blog/is-swop-safe/index.html`**, and will appear in every
post that links the Android listing.

> 🔧 **This is worth fixing, and not cosmetically.** A BLOCK rule that cries wolf on every
> post containing a store link trains a reviewer to wave F-TOKEN-INVESTMENT through — which
> is how a real investment-language leak eventually ships. Anchoring the alternative as
> `\broi\b` removes the false positive without weakening the rule. Filed as a proposal.

Explicitly grepped, **zero deny hits**: `F-COPYTRADE-UNPROMOTED`, `F-EXIT-HOLD`,
`F-STAKING`, `F-SWAP-FEE-NUMBER`, `F-SLIPPAGE-CAP`, `F-CUSTODY-KEEPS`, `F-MINT-ADDRESS`,
`F-INTERNAL-DETAIL`, `F-FEE-SHARE-HOLDERS`, `F-OWN-THE-NETWORK`, `F-EFFECTIVE-RATE`,
`F-USER-COUNTS`, `F-WALLET-COUNT-TILE`, `F-RATINGS-COUNT`, `F-ZEROPROOF-TENSE`,
`F-ZEROPROOF-ZK`, `F-IOS-TAPTOPAY`, `F-CARD-PROCEEDS`, `F-PERPS-FEE-NO-CAVEAT`,
`F-X402-NEGATIVE`, `F-COMPETITOR-UNCITED`, `F-REFERRAL-CHECKOUT`, `F-REFERRAL-FUNDED-OUT`,
`F-REFERRAL-DEK`.

Two near-misses worth recording, because both were written deliberately:

- **F-COPYTRADE-UNPROMOTED** (`(copy[- ]trade|copied trader)[^.]{0,60}(0\.25|half|buyback|buys swop)`)
  — the deny regex returns **no match** (verified by running it). The word *half* as a word
  never appears, and no fraction is ever stated near a copy-trade phrase; §s3 uses "two per
  cent" and "forty per cent" as *illustrative position sizing*, not fees, and neither shares
  a sentence with a copy-trade phrase.

  ⚠️ But note **the rule's `half` is unanchored**, and `half` occurs twice in this post as a
  substring of **"on your be*half*"** (lines 121, 204). It is harmless here only because the
  deny requires the copy-trade phrase *first* and both instances precede it. **One ordinary
  sentence — "a program trading on your behalf, copy-trade style" — would fire a BLOCK rule
  on the word "behalf".** Same unanchored-substring bug as the `roi`/"Android" hit above;
  `\bhalf\b` fixes it. Both are in the one proposal.
- **F-SLIPPAGE-CAP** — the slippage sentence ends at "tolerance.", so the deny's `[^.]{0,30}`
  window cannot reach "ceiling" in the next sentence. `default` is on the line regardless,
  which clears it twice over.

---

## Verification performed

| Check | Result |
|---|---|
| `<div` / `</div>` | **17 / 17** |
| vs. reference frame `drafts/token-not-showing-in-wallet` (16/16) | +1, accounted for: this post has **two** `.note` blocks to its one |
| Unfilled `%%[A-Z0-9_]+%%` tokens | 0 |
| Literal `[TBD]` / `[NEEDS FACT` | 0 |
| TOC anchors vs section ids | 7 / 7 exact (`s1`–`s6`, `faq`) |
| FAQ body `<h3>`s vs FAQPage JSON-LD questions | 5 / 5, question text and answer text identical in both |
| Canonical / og:url / twitter / JSON-LD slug agreement | all `copy-trading-solana`, no stale slug |
| Internal links | 2: `/blog/ai-agent-wallet-safety-checklist`, `/blog/erc-8196-agent-policy` |
| Those targets live on prod | **Yes.** Both present in this checkout, and this checkout is *behind* prod — local ⊆ prod, so presence here implies presence there. Neither is a recent post. |
| Link dependency on any staged draft | **None** — unlike R2→R1, this post ships alone |
| Duplication vs live post **bodies** (not just titles) | `rg -i "copy.trad\|copied trader\|copytrad"` over all of `blog/` → **0 hits in 0 files**. Not one live post mentions the topic even incidentally. |
| Duplication vs the **3 prod-only posts** absent from this checkout | **Checked by fetching each canonical URL**, not inferred from titles: `settlement-is-the-product`, `banking-the-unbanked-self-custody`, `accept-crypto-payments-freelancer` — all three return no copy-trading content of any kind. **Coverage is now all 30 live posts, not the local 27.** |
| `og.png` | ⛔ **not rendered** — see the gate above |

---

## If only one thing gets read

The post is finished and claim-clean. **One shell command renders the banner; after that the
only remaining gate is the publish itself, and no QUERIES.md edit is needed at any point.**
Do not re-draft it, and do not move it into `blog/` without the `git pull --ff-only` in
step 1 above.
