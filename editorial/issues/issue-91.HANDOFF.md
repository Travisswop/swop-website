# Issue #91 — build handoff (2026-10-01)

> ### ⏰ ADDENDUM (QUILL, 2026-10-01 ~22:00Z) — the 6h window has closed
>
> Re-tested this session: `node editorial/newsletter-fill.js …` is **still auto-denied**.
> The allowlist in §1 has not been applied, so the build did not happen, and
> `.market-2026-10-01.json` (fetchedAt 16:24:15Z) passed its 6h limit at **22:24Z**.
>
> **Use the expedient path in §4, not the preferred one:** add `--max-age-hours 12` to the
> step-2 command and build from the existing market file. Do **not** re-fetch tonight.
> Re-fetching rotates `tokenOfTheDay`, and `issue-91.why.txt` is written specifically about
> **BP (Backpack)** — its "touched $1.65 earlier today" and "the price on the card above is
> below that" sentences are only true against *this* fetch. A re-fetch means dropping
> `--why` or rewriting it, which is editorial work, not a rebuild.
>
> Tiles will read a few hours behind the close. §4 calls that acceptable for a same-day
> send, and prose and tiles stay consistent with each other — which is the failure mode the
> guard actually exists to prevent.
>
> **If this slips past tonight, do not rebuild — the issue needs a rewrite.** The Day-ahead
> block is today-only (ISM, and the Phillies–Braves winner-take-all elimination game), and
> tomorrow it is simply wrong.

Template is finished and pre-verified. It cannot be **built** from a non-interactive
QUILL session. Everything below is what a session with shell rights needs; nothing
in it requires re-deciding editorial content.

~~Last issue actually sent: **#90, 2026-09-28.**~~ 09-29 and 09-30 are dark. #91 is today.

> **Correction (QUILL, 2026-10-01):** #90 was **never sent.** The floor-6 lessons log
> records `external.send_swop_daily_90` expiring unanswered on 2026-09-29 (24h timeout,
> treated as denied). #90 was built, fact-checked, test-copied to travis@swopme.co and
> left as an unsent Resend **draft** to a 857-address audience. So subscribers have had
> nothing since **#89**, and the dark run is four days (09-28 … 10-01), not two.
>
> **Do not send #90 now.** Its market tiles are three days stale and its Day-ahead block
> is for 09-28. A daily that arrives three days late with wrong prices does more damage
> than silence. Discard that draft; #91 supersedes it. Carry the issue number forward as
> **#91** regardless — #90 exists as a built artifact even though it never shipped, and
> renumbering would desync the archive.

---

## 1. Why QUILL can't finish it (verified today, not assumed)

Tested empirically this session:

| Command | Result |
|---|---|
| `node --version` | ✅ v22.22.0 |
| `node editorial/newsletter-fill.js --inspect` | ❌ permission prompt → auto-denied (non-interactive) |
| `node -e "<anything>"` | ❌ same |
| `ls ../swop-app-backend` | ❌ outside the session's allowed working directories |
| `ls /tmp/swop-stats.json` | ❌ same |

So the blocker is **two separate things**, and fixing only one changes nothing:

1. **Permission allowlist.** `/Users/travis/Desktop/SwopLive/swop-website/.claude/settings.local.json`
   currently contains only two stale `git` entries from 2026-08-27 and nothing else.
   Every `node <script> <args>` invocation prompts, and a non-interactive session
   auto-denies the prompt.
2. **Working-directory sandbox.** `newsletter-audience-sync.js` must run with CWD
   inside `swop-app-backend` (it needs that repo's `node_modules` and Mongo env), and
   the documented recipe writes its output to `/tmp`. Both paths are outside the
   session's allowed directories, so no allowlist entry alone reaches them.

Correction to a standing note: "QUILL can't run node" is half true. Node runs; *node
with arguments* is what the allowlist denies. Worth stating precisely, because the
imprecise version is the kind of thing that burns a 24h permit on the wrong fix.

**Minimum change that actually unblocks it** — add to the `allow` list in
`.claude/settings.local.json`:

```
"Bash(node editorial/newsletter-fill.js:*)",
"Bash(node editorial/newsletter-audience-sync.js --dry-run)"
```

…**and** add `swop-app-backend` as an allowed working directory for QUILL's sessions.

Deliberately NOT requested: any allowlist entry for `newsletter-send.js`. Prefix
matching can't distinguish `--send` from a draft, and the broadcast must stay a
human decision every single time. Keep it prompting forever.

---

## 2. Pre-flight already done (don't redo)

`newsletter-fill.js` refuses to write on six conditions. Four are verified clean:

- ✅ **`<div>`/`</div>` balance: 75 / 75**, byte-identical to `newsletter-base.html`
  (90 and 91 both 75/75). This is the check that caught 28 orphaned wrappers in #79–#84.
- ✅ **All 39 `%%TOKEN%%` placeholders present and unfilled.** No hand-typed price
  anywhere in the template — there is nowhere in it to type one.
- ✅ **`{{{RESEND_UNSUBSCRIBE_URL}}}` present** (line 277), so `newsletter-send.js`
  won't inject a bare footer.
- ✅ **Day-ahead block is current for today**, not carried forward: ISM manufacturing
  today, BLS September payrolls tomorrow 8:30 ET, Phillies–Braves NL Wild Card Game 3
  winner-take-all 8:15 ET tonight. (This block is the one that goes stale silently.)

Two can only be checked by running the script: the stats-ledger keys and market-file age.

**Journal slot (re-decided at build time, per the standing rule):** Article 02 is
`/blog/sell-digital-products-for-crypto`, drafted and live today with `og.png`
present and linked from `blog/index.html`. It is a real post, so this is a Journal
issue, **not** a Spotlight fallback. Do not swap it.

**Fact-check — passed.** Every Swop claim in that post is verbatim from a Verified
FACTS.md row: the two-rails/never-identity-gated row, the x402-SmartSite-storefront
row, checkout fee 0.5% both rails, self-custody, sponsored gas, chains, platforms.
No swap-fee number (correctly — that row is still unverified), no SWOP token claim,
no ZeroProof, no audit claim, no named-competitor fee comparison. Clean to ship.

---

## 3. The build — three commands

Market data is already fetched and the prose was written against it:
`editorial/issues/.market-2026-10-01.json`, `fetchedAt 2026-10-01T16:24:15Z`.

> ⏰ **The 6h window on that file closes at 22:24Z.** Read §4 before building after that.

```bash
cd /Users/travis/Desktop/SwopLive/swop-website

# 1. bento ledgers (must run from the backend repo)
cd ../swop-app-backend && node ../swop-website/editorial/newsletter-audience-sync.js \
  --dry-run > /tmp/swop-stats.json
cd ../swop-website

# 2. build from the SAME fetch the prose was written against
node editorial/newsletter-fill.js --build \
  --template editorial/issues/issue-91.template.html \
  --market   editorial/issues/.market-2026-10-01.json \
  --stats    /tmp/swop-stats.json \
  --why      editorial/issues/issue-91.why.txt \
  --totd-ok \
  --out "/Users/travis/Library/Mobile Documents/com~apple~CloudDocs/Documents/Claude/Projects/Swop/Swop_Daily_Newsletter_2026-10-01.html"

# 3. test copy to Travis only — NOT the broadcast
node editorial/newsletter-send.js \
  --html "/Users/travis/Library/Mobile Documents/com~apple~CloudDocs/Documents/Claude/Projects/Swop/Swop_Daily_Newsletter_2026-10-01.html" \
  --subject "Swop Daily #91 — Tokenised stocks find a lane" \
  --test travis@swopme.co
```

The stats file must contain `winnings_paid_7d_usd`, `winners_7d` and
`winnings_paid_24h_usd` or step 2 exits — hand-writing that file is explicitly
rejected, and a literal `[TBD]` must never reach the bento.

`--totd-ok` is correct here: Token of the Day is **BP (Backpack)**, +25.6%, rank 137
— a real exchange/wallet token, not politically charged, and framed honestly as a
token that has already given back part of its move. The editorial check passed.

---

## 4. If you build after 22:24Z

`--max-age-hours` defaults to 6 and the script **refuses**, by design (this is the
guard added after #83–#84 shipped a stale $0.01 token price). Two options, and the
difference matters:

- **Preferred — re-fetch, then re-check the token.**
  `node editorial/newsletter-fill.js --inspect` writes a fresh market file.
  ⚠️ **Then open it and confirm `tokenOfTheDay` is still `BP`.** `issue-91.why.txt`
  is written specifically about Backpack — BP at ~$1.40 against its $1.65 ATH earlier
  today, the SEC Innovation Exemption, the 200→10,000 tokenised-symbol plan. If the
  fetcher has rotated to a different token, that paragraph is now about the wrong
  asset: drop `--why` (the script falls back to a weaker paragraph derived only from
  fetched numbers — never wrong) or rewrite it. Do not ship it mismatched.
  Also re-read the BP sentences: "touched $1.65 earlier today" and "the price on the
  card above is below that" must still be true of the new numbers.
- **Expedient — `--max-age-hours 12`.** Prose and tiles stay consistent with each
  other, but the tiles show prices a few hours behind the open. Acceptable for a
  same-day send; not acceptable tomorrow.

If it slips past today entirely, the Day-ahead block in §2 is wrong (ISM and the
Phillies–Braves elimination game are both today-only) and the issue needs a real
rewrite, not a rebuild.

---

## 5. The send

Stays a permit. Build + the `--test` copy to Travis are safe; the broadcast to the
"Swop Daily" audience goes only on Travis's explicit yes:

```bash
node editorial/newsletter-send.js \
  --html "…/Swop_Daily_Newsletter_2026-10-01.html" \
  --subject "Swop Daily #91 — Tokenised stocks find a lane" \
  --send
```

Multipart is automatic (`htmlToText` derives the text part) — never send html without
text. Tracking stays off. DKIM/SPF are verified and correct; don't "fix" them.
