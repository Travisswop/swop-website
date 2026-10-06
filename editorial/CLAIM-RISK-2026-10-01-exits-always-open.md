# Live claim contradicted in production: "The owner can always get out"

**Filed:** 2026-10-01 by QUILL · **Severity:** trust claim, already published · **Owner of the fix:** FORGE (code) / QUILL (copy, only if the code slips)

---

## The finding

TOPICS.md gate (b) holds the *unwritten* agent-policy post until FORGE's `reduceOnly`
fix is in prod, because the Verified FACTS row "Policy exits always open" is
contradicted by the `bbeeb20e` MCP daily-cap regression.

That gate protects a draft. **The claim is already published.** It has been live since
2026-08-31 and sits in **five places across three posts**, one of them inside a FAQPage
JSON-LD block — the form Google and AI assistants read as our canonical answer.

Holding a draft does nothing about copy that is already indexed.

### The five occurrences

| File | Line | Form | Note |
|---|---|---|---|
| `blog/erc-8196-agent-policy/index.html` | 44 | **FAQPage JSON-LD** | Q: "Can the policy layer lock me out of my funds?" |
| `blog/erc-8196-agent-policy/index.html` | 108 | body prose | "…cannot be configured away" |
| `blog/erc-8196-agent-policy/index.html` | 121 | visible FAQ | mirrors line 44 |
| `blog/ai-agent-wallet-safety-checklist/index.html` | 132 | body prose | "On the exit guarantee:" |
| `blog/is-swop-safe/index.html` | 126 | `.note` box | **worst one — see below** |

### The worst one

`is-swop-safe` line 126 reads:

> Risk-reducing actions — exits, cancels, and withdrawals back to the owner — are never
> blocked by the policy layer. The owner can always get out. **A policy can restrict what
> the agent opens; it cannot trap you inside a position.**

A user blocked by the daily-cap read on a `reduceOnly` close *is* trapped inside a
position. That sentence is a direct description of the live bug, published as a denial
of it, on the post that owns the query **"is Swop safe"** — our highest trust-intent
page.

---

## Why this is a content problem and not just a code problem

Every occurrence except one is literally scoped — "never blocked **by the policy layer**"
— and the regression is in the MCP daily-cap path, a different subsystem. That scoping is
a real defence on a careful reading.

It does not survive the reading an actual user gives it, for two reasons:

1. The **unscoped sentence that follows** — "The owner can always get out." — carries no
   subsystem qualifier at all. That sentence is the liability, and it is the one lifted
   into JSON-LD and into answer-engine snippets, where the surrounding scope is stripped.
2. A reader cannot be expected to distinguish the policy layer from the MCP cap path.
   TOPICS.md already says this in gate (b), and it is right.

Blast radius FORGE and CRITIC are not currently tracking: this raises the `reduceOnly`
regression from "a money guard that fails closed" to "a live contradiction of a published
trust claim on three indexed pages." It is an argument for APEX priority #2 going today,
not an argument for editing the posts.

---

## Recommendation, in order

**1. Fix the code. Do not touch the copy.** (Strongly preferred.)
FORGE's fix is one predicate and is already APEX priority #2 for today. If it ships, the
published claim becomes true again and nothing below needs to happen. The claim is a
*correct product commitment* — weakening our own copy to match a bug we are fixing within
the day is the wrong trade, and the retraction would cost more trust than the bug does.

**2. If the fix has not shipped by end of day 2026-10-02**, apply the patch below. One
sentence, five locations. It narrows the claim to what is true today without retracting
anything: the policy-layer guarantee stays stated in full, and the unscoped absolute goes.

**3. Revert the patch when the fix ships.** This is a temporary narrowing, not a new
editorial position. Note the revert in TOPICS.md so it does not become permanent by
neglect.

---

## The patch (only if step 2 triggers)

Mechanical. Five edits, no restructuring, no new facts. All five replace the same
sentence. **Every wrapper tag stays byte-identical.**

### Replace, in all five locations

```
The owner can always get out.
```

### With

```
The policy layer will not stand between an owner and an exit.
```

Rationale: keeps the commitment, keeps it scoped to the subsystem the Verified FACTS row
actually covers, and drops the unconditional product-wide promise that the cap regression
currently falsifies. It reads as a statement about the policy layer, which is what the
FACTS row is.

### One extra edit, `is-swop-safe` line 126 only

Also remove the trailing clause:

```
 A policy can restrict what the agent opens; it cannot trap you inside a position.
```

This one cannot be narrowed by rewording — "cannot trap you inside a position" is a
product-wide factual claim about exits, and it is the sentence most directly falsified.
Delete it rather than soften it. The two sentences before it already carry the point.

### After applying

- Re-run `editorial/fact-drift.sh`.
- Confirm the **JSON-LD answer and the visible FAQ answer still match verbatim** in
  `erc-8196-agent-policy` (lines 44 and 121). A FAQPage mismatch risks the rich result —
  so both get the identical replacement or neither does.
- `<div>`/`</div>` counts unchanged in all three files (no wrapper is touched).

---

## Addendum 2026-10-02 (QUILL): the inventory was blog-body only. Three more surfaces.

The original sweep above covered rendered copy inside `blog/`. A repo-wide sweep today
(`always get out|cannot trap|never blocked|exit guarantee|always.{0,15}exit`, case-insensitive)
turned up three surfaces it did not reach. **Only one of them is a real gap — graded
honestly below, because inflating the other two is how a 24h permit gets spent on the
wrong fix.**

### 1. `editorial/FACTS.md` line 27 — the source row. **This is the real gap. Closed today.**

Every one of the five published occurrences exists because a drafter copied this row,
which instructs them to use that exact wording. While the bug is live the row is an
**active source of re-publication**, and nothing on it said so.

The existing controls do not cover this: TOPICS.md gate (b) guards exactly one unwritten
post, and issue #92's newsletter avoided the claim only because that session's QUILL
happened to remember to. Neither generalises to the next drafter, the next issue, or a
social caption.

**Action taken:** a publication hold is now at the top of `FACTS.md`, with a matching
marker on the row's label cell. The row's *Exact wording*, source and verified date are
**byte-identical and untouched** — FACTS.md says Travis adds/verifies rows and the agent
never does, and a hold is the opposite of verifying: it suspends use, it does not
adjudicate truth. Lifting it is deleting one block, and the lift condition is written
into it.

### 2. `llms.txt` line 27 — **monitor, do not patch.**

> "…the five mechanisms — self-custody, confirmation before signing, bounded agent
> authority, an audit trail, and **an always-open exit** — that determine whether a wallet
> lets an AI agent trade for you safely"

This is worth naming because `llms.txt` is, even more than FAQPage JSON-LD, the surface
assistants read as canonical — the exact argument this doc makes for the JSON-LD occurrence.

**But it is generic, not a Swop assertion.** It names a criterion *any* wallet should be
judged on; it does not claim Swop satisfies it. It is not falsified by the regression.
Patching it would retract a checklist item rather than a promise. Leave it, and re-check
it only if the fix slips past this week — at which point the risk stops being the sentence
and starts being the company of sentences it keeps.

### 3. `blog/ai-agent-wallet-safety-checklist/index.html` line 13 (`og:description`) — **monitor, do not patch.** Same reasoning

> "…self-custody, confirmation, bounded authority, an audit trail, and **an exit that's
> never blocked.**"

Generic checklist framing again, and the same is true of **line 122** in that post's body
("should never be something the policy layer can trap you out of") — normative, about what
a wallet ought to do. Line 132 of the same file is the Swop-specific assertion, and it is
already item 4 in the table above. No change to 13 or 122.

### Not patchable — record only

The claim also sits in copy already published to X and LinkedIn:
`distribution/erc-8196-agent-policy.x-thread.json` (post 4/, "exits, cancels, and
withdrawals back to the owner are NEVER blocked"), and
`distribution/ai-agent-wallet-safety-checklist.{x-thread.json,md,linkedin.txt}`. Both are
scoped to the policy layer, and neither can be retroactively edited. Logged so the next
sweep does not rediscover them as new. If the fix slips badly, the response is a forward
post, not an attempted retraction of a month-old thread.

### Net effect on the end-of-day decision

**Unchanged — still five locations, still the pre-written patch above.** The addendum adds
no new edits to the remediation PR. What it adds is the hold, which is the piece that was
actually missing: the patch fixes what is published, the hold stops the next thing from
being published. Both revert together when the fix ships.

---

## Separately: two pre-existing defects in `how-does-swop-make-money`

Found while checking the money-model copy against the five FACTS rows verified 9/24–9/25.
The body is **correctly up to date** — it already carries the both-rails rate, the
referral share, SWOP agent credits, absorbed gas and the verified no-perps-fee negative.
These are smaller, unrelated to the claim risk above, and safe to fix in the same PR:

1. **FAQPage JSON-LD disagrees with the visible FAQ** on the swap-fee question. JSON-LD
   (line ~63) gives the referral-share answer; the visible FAQ gives the
   "no public swap-fee number" answer. Google expects these to match. Make the JSON-LD
   match the visible text, not the reverse — the visible text is the more careful answer.
2. **Two empty `<strong></strong>` tags** render as artifacts in the visible FAQ:
   - after "…not a headline rate with a quieter one behind it. `<strong></strong>`"
   - after "…no swap fee amount has been made public. `<strong></strong>`"
3. Minor: the `<meta name="description">` still says the 0.5% checkout fee is Swop's
   "only published revenue source", which the page's own "Where that fee goes" section
   now contradicts. Reword to match the body.

---

## Resolution 2026-10-06 — step 1, not step 2. No copy was changed.

The code fix shipped. Verified before touching anything:

- `src/controllers/v5/mcpPerpsController.js` now reads `reduceOnly` **before** the policy
  check and exempts a close from the spend cap entirely:
  `mayExecute = isReduceOnly ? closeAuthorized : policy.allowed && policy.autoExecute`,
  and `if (!isReduceOnly) reserveForPreview(...)` — a close reserves nothing and "must
  succeed even at the cap". The comment names the exact regression this filing described.
- Fix commit `4fcde1d3` (2026-10-01 23:14) is an **ancestor of `origin/production`**, and
  `origin/production` itself carries the carve-out. Per SwopLive CLAUDE.md, `main` and
  `production` are the same SHA in practice for this repo and `deploy-prod.sh` builds
  `origin/production` verbatim.

So the published claim is true again, and the recommendation's own step 1 applies: **fix
the code, do not touch the copy.** The five published occurrences stay exactly as written,
including the FAQPage JSON-LD and the `is-swop-safe` `.note` box. No retraction, no
narrowing, no FAQPage mismatch risk.

**Hold lifted** in `FACTS.md`: the notice block is deleted and the `⛔ ON HOLD` marker is
removed from the row's label cell. The row's *Exact wording*, source and verified date were
never modified at any point — by QUILL or here.

Note for the record: the patch in this filing was never applied, so there is nothing to
revert and no TOPICS.md revert note is needed. Step 2 triggered on 2026-10-02 by its own
terms and sat unexecuted until 2026-10-06 — during which the claim was already true again.
The lag is the lesson: the hold had a lift *condition* but no owner watching for it.

