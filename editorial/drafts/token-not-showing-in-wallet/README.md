# DRAFT — `token-not-showing-in-wallet` (QUILL, 2026-10-05)

## ⛔ Do not publish until query R2 is promoted in QUERIES.md

This post is **finished and publish-ready**, staged in `editorial/drafts/` rather than `blog/`
for the same reason as its sibling: QUERIES.md forbids writing to an unpromoted query, and
putting this in `blog/` today would be the mistake four consecutive drafters already made.

Nothing is in the blog tree, nothing is in `sitemap.xml`, nothing is queued in TOPICS.md
"Up next". The post cannot publish itself.

### The unblock is one line

Move this line in `editorial/QUERIES.md` from *Proposed — retention & trust* up into the
**SEO keywords** list:

```
- token not showing in wallet / missing balance  <!-- promoted by Travis 2026-10-__ -->
```

**No new FACTS.md rows are needed** — every Swop sentence is verbatim from an existing Verified
row, traced below.

### This is now the second post waiting on one line each

| Post | Query | Staged at | Needs |
|---|---|---|---|
| Sent crypto to the wrong address | R1 | `editorial/drafts/sent-crypto-to-wrong-address/` | promote R1 |
| **Token not showing in wallet** | **R2** | **this folder** | **promote R2** |

Promoting both lines in one sitting gives the blog two publishable posts and a non-empty queue
for the first time since 09-18 — and the two posts cross-link into each other, so they are worth
more published together than separately. See the link note below.

---

## ⚠️ One internal link depends on R1 also being published

`index.html` §s2, first bullet, links to `/blog/sent-crypto-to-wrong-address` — the R1 post,
which is **also still staged**. If R1 ships in the same batch, the link is correct and the two
posts reinforce each other.

**If you publish R2 alone, delete that one `<a>` tag and keep the sentence.** Find it with:

```
grep -n 'sent-crypto-to-wrong-address' index.html
```

One hit, in §s2. The sentence reads correctly without the link — it ends "...still means 'at an
address you own.'" Drop the trailing clause "The full version of this case, including when it is
genuinely a problem, is in <a…>sent crypto to the wrong address or wrong network</a>." and the
paragraph is complete. Every other internal link (`usdc-vs-usdce`,
`ai-agent-wallet-safety-checklist`) points at a **live** post — verified against `blog/` on
2026-10-05.

---

## Why this post

The 10-04 audit found that all 27 live posts are acquisition-shaped — "what is X", "is it safe",
"X vs Y" — and not one is about a failure moment. That is the D30 gap: a user churns when
something looks wrong, and we had published nothing for them to land on.

R2 is the highest-frequency version of "something looks wrong" in any wallet community, and the
honest answer is genuinely reassuring: **the balance list is a display over the chain, and a
missing token is usually a display problem.** That makes it unusually good retention content —
it resolves the panic rather than managing it — and unusually good trust content, because the
two expensive mistakes in this situation (reinstalling before confirming recovery access, and
taking a contract address from a DM) are rarely warned about in the pages that rank for it.

It also fits Stage 1 exactly. "Make the money paths boring" includes making the scary moments
legible, and nothing about this post requires a product change to be true.

---

## Fact-check record — every Swop claim traced to a Verified row

No claim is inferred, softened, or paraphrased. Verified against `editorial/FACTS.md`
on 2026-10-05. **Zero new rows needed.**

| Sentence in the post | Verified row | Row date |
|---|---|---|
| "Swop runs on Solana, Ethereum, Base, and Polygon." (§s5) | Chains live | 2026-08-26 |
| "Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them." (§s5) | Self-custody | 2026-08-26 |
| "Losing your phone doesn't mean losing your funds: log in with your email on any phone and your Swop wallet comes back with it. You can also save your private key, which lets you open your assets in any wallet you choose." (§s5, FAQ 5) | Phone loss / recovery | 2026-09-01 |
| "Transactions on Swop are gas-sponsored, so you don't need to hold SOL or ETH to transact." (§s5) | Sponsored gas | 2026-08-26 |
| "Swop has a built-in swap: you get a quote and sign inside the app, without sending funds to an exchange or connecting to a separate site." (§s5) | Built-in swap | 2026-09-21 |
| iOS / Android / swopme.app links (§s5) | Platforms | 2026-08-26 |

### Publication hold — clear

The held row ("Policy exits always open", on hold since 2026-10-02) is **absent**, verified by
grep over the whole draft folder: `always get out|never blocked|cannot trap|trap you|
risk-reducing` → **no matches**. This post has no reason to reach for it; the hold is noted here
only so the next person doesn't have to re-derive that it was checked.

### ⚠️ The negative claim this post deliberately does NOT make

FACTS.md: *never assert Swop LACKS or "doesn't implement" something unless a Verified row says
so.* There is **no row describing Swop's token-display behaviour** — not whether it
auto-detects tokens, not whether you can add a token by contract address, not whether it filters
spam tokens, not whether it shows all four chains in one list.

So §s3 ("Tokens your wallet was never told about") is written **wallet-agnostically** on purpose.
It explains the general mechanic — wallets identify tokens by contract address — and never says
what Swop does or doesn't do. §s5 makes no display claim at all; it stands on self-custody, key
export and chains, which are the facts that make the problem survivable regardless of what any
app renders.

**Do not "complete" the post by adding a Swop how-to here.** It is the one paragraph a
well-meaning editor will want to add, and there is no row for it.

### The one row that would improve this post later

| Proposed row | Why it's worth having |
|---|---|
| **Token display** — whether Swop auto-detects arriving tokens, whether a user can add a token by contract address, and whether unsolicited/spam tokens are filtered from the balance list | Would let §s3 and §s5 give a Swop-specific answer to the actual question instead of a general one. Not blocking: the post is complete and honest without it. Also unlocks the same paragraph in any future post about balances. |

This is a behaviour question, not a number, and not investment-adjacent — the same shape as the
two rows R3 and R4 need.

---

## Duplication check — clean (done 2026-10-05)

Per the standing rule, checked against post **bodies**, not just titles. A query can be
unclaimed while the angle is already answered inside another post.

```
cd swop-website/blog && grep -ril "not showing|missing balance|doesn't appear|does not appear|missing token|balance is wrong|can't see my" .
```

→ **zero files, zero hits.** No live post addresses this angle anywhere in its body. (The 10-04
audit's broader sweep found 22 incidental hits across 12 files for a wider pattern; this
narrower one returns nothing at all.)

Adjacent posts, deliberately linked rather than re-explained:

- `usdc-vs-usdce` — owns the wrong-variant cause, which is cause #2 here. Linked, not restated.
- `sent-crypto-to-wrong-address` (R1, staged) — owns the wrong-network case. Linked, not restated.
- `ai-agent-wallet-safety-checklist` — owns approvals discipline, referenced in §s4.

---

## Publish checklist — the whole job once R2 is promoted

Nothing here is guesswork; this is the full path from staged to live.

1. **Promote the query.** Move the R2 line in `editorial/QUERIES.md` into the SEO keywords list
   with a `<!-- promoted by Travis <date> -->` comment. Mark R2 resolved in the retention table.
2. **Move the folder into the blog tree.**
   ```
   git mv editorial/drafts/token-not-showing-in-wallet blog/token-not-showing-in-wallet
   ```
   Then delete `README.md` from the moved folder — it is a staging artifact, not a published
   page. Keep `index.html` and `og.html`.
3. **Decide the R1 link** (see the warning above): keep it if R1 ships too, otherwise remove
   the one `<a>` in §s2.
4. **Render the banner.** `editorial/render-og.sh blog/token-not-showing-in-wallet` if headless
   Chrome is available; otherwise
   `python3 editorial/make-og.py token-not-showing-in-wallet "Token not showing in your wallet" "Guides"`
   for a placeholder and flag "og.html needs local render" in the PR body. **This is the only
   hard gate that needs a shell** — the `og:image` and `twitter:image` tags already point at
   `og.png`, so publishing without rendering it ships a broken preview image.
   The banner reads **NOT MISSING. / JUST NOT SHOWN.** over a 🔍 focal object, house style,
   copied from the R1 base.
5. **Move `distribution.md`** to `editorial/distribution/token-not-showing-in-wallet.md`.
6. **Update `blog/index.html`** — new post featured, previous featured down into Recent, bump
   the post count.
7. **Update `sitemap.xml`** — add the URL with `lastmod`.
8. **Update dates if it isn't still 2026-10-05.** Four places in `index.html`:
   `article:published_time`, `article:modified_time`, the two JSON-LD fields
   (`datePublished`/`dateModified`), and the two visible strings in `.art-meta`
   ("Oct 5, 2026" and "Updated Oct 5, 2026"). The post is not date-sensitive in substance —
   nothing in it expires — so only the stamps need touching.
9. **`llms.txt`** — this is a definition-shaped guide against a head query, so add one line
   in the same PR per Playbook #6.
10. **TOPICS.md** — move the line into "Drafted (in review)".

### Structural pre-flight — already done, don't redo

- ✅ **TOC parity: 6 anchors, 6 targets.** `href="#s1…#s5"` + `#faq` against `id="s1…s5"` + `id="faq"`, verified by grep.
- ✅ **Title 54 chars** (≤60), target query at the front.
- ✅ **Meta description ~150 chars** (140–160 band), answers the query directly.
- ✅ **No hand-typed price anywhere.** `\$[0-9]` over the draft folder → zero hits. This post has
  no reason to carry a number, and carries none.
- ✅ **No `[NEEDS FACT]` markers** — grep-verified. Nothing is pending; see the deliberate
  omission note above for the one claim that was left out rather than marked.
- ✅ **Length in house band.** 3465 raw words of file vs 3308 (R1) and 3154
  (`sell-digital-products-for-crypto`, live) on the same skeleton — same band, no trimming needed.
- ✅ **FAQ: 5 questions, h3 each, matching the FAQPage JSON-LD** entry for entry. If you edit a
  visible FAQ answer, edit the JSON-LD too — a mismatch between the two is one of the three
  defects already logged against `how-does-swop-make-money`.
- ✅ **Both JSON-LD blocks** (Article + FAQPage) present, canonical/OG/Twitter all pointing at
  `https://www.swopme.co/blog/token-not-showing-in-wallet`.
- ✅ **Share links** (copy-link / X / Farcaster) all carry the new slug.
- ⚠️ **Not verified: HTML renders correctly in a browser.** No shell to open it. The skeleton was
  copied from a live post and the inline SVG is hand-checked, but a reviewer should eyeball it
  pre-merge — particularly the SVG figure at narrow widths.
