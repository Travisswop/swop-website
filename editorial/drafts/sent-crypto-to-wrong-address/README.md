# DRAFT — `sent-crypto-to-wrong-address` (QUILL, 2026-10-05)

## ⛔ Do not publish until query R1 is promoted in QUERIES.md

This post is **finished and publish-ready**, and it is deliberately staged in
`editorial/drafts/` rather than `blog/`. QUERIES.md line 3-6 is explicit: the agent "must not
write to a topic that has no query here… may APPEND candidate queries… but never writes to them
until they are moved up." Its target query, **R1 — "sent crypto to the wrong address / wrong
network"** — is still under *Proposed — retention & trust*, so putting this in `blog/` today
would be the exact mistake four consecutive drafters already made.

Staging it instead keeps the rule intact and still collapses the work: nothing is in the blog
tree, nothing is in `sitemap.xml`, nothing is queued in TOPICS.md "Up next", and the post cannot
publish itself.

### The unblock is one line

Move this line in `editorial/QUERIES.md` from *Proposed — retention & trust* up into the
**SEO keywords** list:

```
- sent crypto to the wrong address / wrong network  <!-- promoted by Travis 2026-10-__ -->
```

That is the whole ask. **No new FACTS.md rows are needed** — see the fact-check record below;
every Swop sentence in the post is verbatim from an existing Verified row. The moment that line
moves, this is a same-session publish via the checklist below.

---

## Why this post, and why now

The blog has not published since **2026-10-01** and "Up next" has been empty behind a maintenance
item since **09-18**, because every promoted query is claimed by one of the 27 live posts except
"copy trading crypto Solana", which is fact-blocked on the token rows. The 10-04 audit found the
way out: **all 27 live posts are acquisition-shaped** — "what is X", "is it safe", "X vs Y" — and
not one is about a failure moment. That is the D30 gap. A user churns when something looks wrong,
and we have published nothing for them to land on.

This is the first post aimed at that moment, and it fits Stage 1 exactly: "make the money paths
boring" includes making the scary moments legible. It is also the kind of page that earns trust
links, because the honest version — *irreversible is not the same as lost* — is rarely written
well, and the recovery-scam section is almost never written at all.

---

## Fact-check record — every Swop claim traced to a Verified row

No claim in this post is inferred, softened, or paraphrased from a row. Verified against
`editorial/FACTS.md` on 2026-10-05.

| Sentence in the post | Verified row | Row date |
|---|---|---|
| "Swop is fully self-custodial — keys are generated and held on your device; Swop never holds them." (§s6 + FAQ 3) | Self-custody | 2026-08-26 |
| "Losing your phone doesn't mean losing your funds: log in with your email on any phone and your Swop wallet comes back with it. You can also save your private key, which lets you open your assets in any wallet you choose." (§s6) | Phone loss / recovery | 2026-09-01 |
| "Swop runs on Solana, Ethereum, Base, and Polygon." (§s6) | Chains live | 2026-08-26 |
| "Swop has a built-in swap, so you get a quote and sign inside the app, without sending funds to an exchange or connecting to a separate site." (§s6) | Built-in swap | 2026-09-21 |
| "Transactions on Swop are gas-sponsored, so you don't need to hold SOL or ETH to transact." (§s6) | Sponsored gas | 2026-08-26 |
| iOS / Android / swopme.app links (§s6) | Platforms | 2026-08-26 |

**Everything else in the post is general blockchain fact, not a Swop claim** — on-chain finality,
the absence of a chargeback mechanism, EVM address derivation, Solana-vs-EVM address formats,
gas-token requirements, and how recovery scams operate. That is what makes R1 a zero-new-rows
post: the article's load-bearing content is about *chains*, and Swop appears only in the last
section as prevention and as the key-export lever.

### Claims deliberately NOT made

- ⛔ **No exit / "owner can always get out" claim.** That FACTS.md row is still under publication
  hold (2026-10-02, `bbeeb20e` reduceOnly regression). Verified absent by grep over the whole
  draft folder: `always get out|never blocked|cannot trap|trap you|risk-reducing|exits, cancels`
  → **0 matches.** This post is about recovering funds, so it sits close to that row; the hold
  held.
- **No claim about what Swop support can or cannot recover.** FAQ 3 answers at the category level
  ("with a self-custodial wallet there is no central party holding your funds") and attaches only
  the Verified self-custody row. Negative Swop claims need their own Verified row and there isn't
  one — so the post never asserts one.
- **No "send by link" Swop claim.** There is no FACTS row for Swop claim-link behaviour, so §s6
  links `/blog/send-crypto-with-a-link` as a general explainer of the pattern and makes no
  Swop-specific claim about it. (Same discipline that post itself used.)
- **No numbers at all.** Grep for `\$[0-9]|0\.5%|swap fee|audit|SWOP token|Tap to Pay` → 0 hits.
  No fee, no count, no rating, no token claim.

### Optional enhancement, needs one new row (do NOT block publish on it)

If Travis wants it, one row would strengthen §s6 — **"does the Swop app warn or block when a
destination address doesn't match the selected network at send time?"** A verified answer would
turn the prevention paragraph from structural ("make fewer transfers") into specific. I left the
claim out entirely rather than leaving a `[NEEDS FACT]` marker in the file, so the post stays
publish-ready as written. This is a nice-to-have for a later `dateModified` bump.

---

## Duplication check (done 2026-10-05, against post bodies — not just titles)

Grep over `swop-website/blog/` for `wrong address|wrong network|wrong chain|irreversible|cannot
be reversed` → **3 hits, all in one file**: `solana-wallet-with-built-in-swap` (its og:description
and two body lines), where wrong-address risk is used as *motivation for in-wallet swapping*, not
as the subject. No live post is about the failure moment. **R1 is unclaimed ground.**

Handled by internal-linking rather than re-explaining, per the 10-04 duplication note:

- `/blog/usdc-vs-usdce` → owns the wrong-token-variant cause (§s1 bullet 3)
- `/blog/solana-wallet-with-built-in-swap` → owns the fewer-hops argument (§s6)
- `/blog/send-crypto-with-a-link` → owns the no-address-transcription pattern (§s6)

---

## Pre-flight already done — don't redo

- ✅ **Title 49 chars** (≤60), target query at the front.
- ✅ **Meta description 159 chars** (140–160), answers the query.
- ✅ **TOC matches headings exactly** — 7 anchors (`#s1`–`#s6`, `#faq`) against 7 headings.
- ✅ **5 FAQ `<h3>` match the 5 FAQPage JSON-LD questions** verbatim.
- ✅ **Both JSON-LD blocks present** (Article + FAQPage), canonical/OG/Twitter all on the final
  `https://www.swopme.co/blog/sent-crypto-to-wrong-address` URL, share links and the `copy-link`
  script all updated off the reference skeleton.
- ✅ **No `[NEEDS FACT]` markers left in the file.**
- ✅ Skeleton copied from `blog/sell-digital-products-for-crypto/index.html` (current house
  version): nav, art-head, toc, prose, art-end, sub, app, foot, both tail scripts, `.ig` figure
  CSS.
- ⚠️ **Prose word count not machine-verified.** `python3` with arguments is denied in this sandbox
  (same denial as `node`), so I could not run a tag-stripping count. By section it is ~1,250–1,350
  words, inside the 900–1,600 range, but a reviewer with a shell should confirm.

### One SVG figure, house style

A four-card triage figure (980×232 viewBox, Inter Tight, `#17a35c` accents, white cards) matching
the `ig2` pattern in `sell-digital-products-for-crypto`. The two recoverable cases carry the green
`#17a35c` stroke and the two dead ones are neutral/grey — the verdict is readable before the text
is. `role="img"` + full `aria-label` + `figcaption` as per the house pattern.

---

## Publish checklist (once R1 is promoted — ~15 minutes)

1. `mv editorial/drafts/sent-crypto-to-wrong-address blog/sent-crypto-to-wrong-address`
   — then delete this README and move `distribution.md` to
   `editorial/distribution/sent-crypto-to-wrong-address.md`.
2. **Render the banner.** `og.html` is written and its `@font-face` paths
   (`../../editorial/fonts/`) are correct *for the final `blog/` location*, so render after the
   move: `editorial/render-og.sh blog/sent-crypto-to-wrong-address`, or
   `python3 editorial/make-og.py sent-crypto-to-wrong-address "Sent crypto to the wrong address or wrong network" "Guides"`
   for the Pillow placeholder. **This has not been run** — headless Chrome and `python3` with
   args are both denied here. `og.png` does not exist yet, and `index.html` already references it,
   so rendering is a hard gate: merging without it ships a broken `og:image`.
   Hook is `WRONG CHAIN. / NOT GONE.` with `💸` focal + `❓` prop + `USUALLY FIXABLE` tag.
3. Update `blog/index.html` — new post featured, previous featured (`sell-digital-products-for-crypto`)
   down into Recent, bump the post count (27 → 28).
4. Add to `sitemap.xml` with `lastmod` = publish date.
5. Add to `/llms.txt` — this is a definition-shaped post on a head query, so it qualifies as
   cornerstone; one line.
6. Move the topic line into TOPICS.md **"Drafted (in review)"**, and delete the "Up next is empty"
   warning block if R1 (or R2) is now queued.
7. If the publish date is not 2026-10-05, bump **all four** dates:
   `article:published_time`, `article:modified_time`, both JSON-LD `datePublished`/`dateModified`,
   and the two visible `art-meta` dates (`Oct 5, 2026` and `Updated Oct 5, 2026`).

## What is still blocked after this

R2 ("token not showing in wallet / missing balance") is the natural follow-up and is also
zero-new-rows — it would make a two-post retention cluster that internal-links to this one. I did
not draft it today; one finished post is worth more than two half-checked ones, and R2 should link
to a *published* R1 rather than to another draft.

R3 and R4 still need the two behaviour rows listed in QUERIES.md (pending transactions; failed
swap). R5 stays parked until the FACTS.md hold block is deleted.
