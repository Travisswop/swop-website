# Issue #93 — build handoff (2026-10-04, Sunday)

## ⏰ STATUS 18:10 EDT — #93 has expired unbuilt. Build #94 tomorrow; do not send this one.

Checked at 18:10, not assumed:

- **The build never ran.** `editorial/issues/` contains `.market-2026-09-28.json` and
  `.market-2026-10-01.json` and **no `.market-2026-10-04.json`**. The template still holds
  its 30 unfilled `%%TOKEN%%` placeholders. Nothing was fetched today.
- **node-with-args is still denied**, so QUILL could not run it. The allowlist permit is
  still unanswered — this is the fourth consecutive issue lost to the same two lines.
- **The 4:00 PM trigger this handoff set for itself has passed.** Padres at Brewers (4:00
  ET) is underway or final, so the "Game 1 winners deliberately not named" framing no
  longer reads as forward-looking — it reads as missing. Braves at Dodgers (8:00 ET) is
  still ahead, but that is one of two bullets.
- **Under six hours to midnight**, after which this handoff's own rule makes the Sunday
  Day-ahead block (two NL Game 2s, closed US market) simply wrong.

**Do not send #93 even if node is unblocked tonight.** Per the expiry rule in §4 and the
standing lesson that stale issues get discarded rather than re-sent, it joins #90/#91/#92 as
an artifact. The dark run becomes 17 days.

**What carries forward to #94 — none of this needs redoing:**

- The §2 pre-flight (75/75 divs, 30 placeholders, no hand-typed price, unsubscribe token).
- The §1a static review of `build-daily.sh` with its three fixed defects. The script is
  still unexecuted and still not syntax-verified.
- The fact-check and the deliberate absence of every exit claim (FACTS.md hold still on).
- The editorial spine in §3 — the custody story (Atkins / OCC charters / ICBA suit) is a
  *week*-scale story, not a Sunday one, and survives into Monday. **What must be rebuilt:**
  the Day-ahead block (Monday ISM services 10:00 ET is now same-day, not next-day) and the
  games block.
- **Re-decide the Journal slot at build time.** No post went live 10-04; if one lands before
  the #94 build, swap Article 02 from Journal to Spotlight. Both variants are 4 divs, so the
  count stays 75/75 either way.


**One command now, not four.** Everything below collapses into:

```bash
cd /Users/travis/Desktop/SwopLive/swop-website
bash editorial/build-daily.sh 93
```

It fetches, shows you the token-of-the-day candidate and waits for your yes, pulls the
bento ledgers from the backend repo, builds to iCloud, and sends a test copy to
travis@swopme.co. **It does not send the broadcast** — that stays a separate permit-gated
command, which the script prints when it finishes.

⚠️ **The script still has never been executed** — `bash <script>` and `bash -n` are both
still denied at 12:32 EDT, so it is **not syntax-verified**. But as of 12:32 it has been
**statically reviewed line by line against the three scripts it calls**, and three defects
are fixed. See §1a. Read it before trusting it; ~140 lines, nothing destructive (writes two
dotfiles and one iCloud HTML).

---

## 1a. Static review, 2026-10-04 12:32 EDT — three defects found and fixed

Every flag the script passes was checked against the real argument parsing of
`newsletter-fill.js`, `newsletter-audience-sync.js` and `newsletter-send.js`. **All flag
names and all required arguments match** (`--inspect`; `--build --template --market --stats
--totd-ok --out`; `--dry-run`; `--html --subject --test`). `date +'%b %-d'` was executed and
returns `Oct 4` on this Mac — the GNU-only `%-d` works here. Three things were wrong:

1. **The rebuild path re-fetched, rotating the token you just approved.** The documented
   rebuild invocation `build-daily.sh 93 --max-age-hours 12` passed that flag only to step 4,
   while step 1 still ran `--inspect` unconditionally — a fresh fetch that overwrites the
   market file and picks a new `tokenOfTheDay`. That is precisely what the script's own
   comment and this handoff's expiry rule forbid. `--max-age-hours` is now the rebuild
   signal: it **reuses** the newest market file and does not fetch.
2. **A silent-to-opaque failure after the human gate.** `newsletter-audience-sync.js
   --dry-run` has one exit path (line 154) that returns `{dryRun, eligible, audience:"would
   create \"Swop Daily\""}` with **no bento ledgers** — it fires when the audience id can't
   be resolved. The two normal dry-run paths do spread `...stats`, so the documented
   redirect is correct; but on that one path step 4 fails with an opaque missing-ledger-key
   error *after* you have already spent the token-of-the-day gate. There is now a `grep`
   guard right after step 3 that fails fast and names the cause.
3. **The broadcast would have gone to a 16-day-stale audience.** The script runs audience
   sync in `--dry-run` only — read-only, correctly, since a real sync writes to Resend. But
   that means **no wallet that signed up during the dark run is in the "Swop Daily"
   audience.** The closing block now prints the real sync as step (a) before the broadcast,
   flagged as Travis's call because it writes.

### Build before 4:00 PM ET today

Re-checked at 12:32, both still true, no template edit needed:

- **Journal slot is still correct.** `ls -t swop-website/blog` shows nothing newer than
  `sell-digital-products-for-crypto` (10-01). No post went live this morning, so Article 02
  stays Journal, not Spotlight, and the div count stays 75/75.
- **The Game-2 bullet is still accurate** — Padres at Brewers 4:00 ET, Braves at Dodgers
  8:00 ET are both still ahead of first pitch, so "Game 1 winners deliberately not named"
  reads as forward-looking rather than evasive. **After 4:00 PM ET that bullet needs a
  re-read**; after midnight the whole Sunday frame is wrong and this becomes #94.

---

## 0. State of the archive — the number that matters

| Issue | Built? | Sent? |
|---|---|---|
| #89 (**09-18**) | yes | **yes — still the last issue any subscriber received** |
| — (09-19 … 09-27) | nothing built | nothing sent |
| #90 (09-28) | yes, in iCloud | no — permit expired 09-29 (24h timeout) |
| #91 (10-01) | no — template only | no — permit expired 10-02 |
| #92 (10-02) | no — template only | no — permit expired 10-03 |
| #93 (10-04) | this one | pending |

**The dark run is 16 days.** Verified against both required sources, not one: the iCloud
`Swop_Daily_Newsletter_*.html` files stop at 09-28, and the floor-6 lessons log records
`send_swop_daily_90` expiring 09-29, `build_and_send_swop_daily_91` expiring 10-02, and
`send_swop_daily_92` expiring 10-03.

**Three consecutive permits have now expired unanswered.** That is the actual failure, and
it is not a content failure — #91 and #92 were both fact-checked and pre-flighted before
they died. Each permit bundled "apply an allowlist change" + "run four commands" + "send to
857 people" into one 24-hour window. This handoff unbundles it: the build is now one
command you can run without changing any setting, and the standing allowlist fix is filed
separately so it stops riding on a daily deadline.

Numbering carries forward regardless — #90, #91 and #92 exist as artifacts and renumbering
desyncs the archive. **Do not send #90, #91 or #92.** Their tiles are days stale and their
Day-ahead blocks describe events that already happened.

---

## 1. The blocker, re-tested today (not assumed)

| Command | Result 2026-10-04 |
|---|---|
| `node --version` | ✅ v22.22.0 |
| `node /abs/path/editorial/newsletter-fill.js --inspect` | ❌ denied |
| `bash -n editorial/build-daily.sh` | ❌ denied |
| compound (`cd … && node …`, `a; b`) | ❌ denied |

State it precisely: **node runs; node *with arguments* is what the allowlist denies.** The
vague version — "QUILL can't run node" — is how a 24h permit gets spent on the wrong fix.
`swop-website/.claude/settings.local.json` still contains only the two stale `git` entries
from 2026-08-27; the entries requested in the #91 and #92 handoffs were never added.

**QUILL did not edit that file.** Writing my own allowlist entry would be self-granting the
execute permission the sandbox exists to withhold, which is Travis's call and not mine. The
exact two lines are in the permit instead.

---

## 2. Pre-flight — done, don't redo

Four of the six conditions `newsletter-fill.js` refuses to write on are verified clean:

- ✅ **`<div>`/`</div>` balance: 75 / 75**, matching `newsletter-base.html` and #92.
- ✅ **30 `%%TOKEN%%` placeholders, all unfilled** — exact parity with #92.
- ✅ **No hand-typed price.** `\$[0-9]` over the whole template: zero hits. There is
  nowhere in it to type a price.
- ✅ **`{{{RESEND_UNSUBSCRIBE_URL}}}` present.**

The other two (stats-ledger keys, market-file age) can only be checked by running it.

### Journal slot — Journal, not Spotlight

Article 02 is **`/blog/sell-digital-products-for-crypto`** with its `og.png` banner. It
published 10-01, but #91 and #92 never went out, so **no subscriber has seen it** — it is
new to the list. Copy says "Newest on the Swop Journal", not "new today", which is honest
for a post three days old. No new post today (the blog lane is a maintenance item).
**Standing rule: if a post goes live before you build, swap the block.** Journal and
Spotlight variants are both exactly 4 divs, so the count stays 75/75 either way.

### Fact-check — passed, with one deliberate omission

Every Swop claim in Article 01 is verbatim from a Verified FACTS.md row: checkout fee 0.5%
both rails (Travis 09-24), gas absorbed not passed through (09-25), crypto/x402 never
identity-gated (08-31 / 09-23), card rail requires merchant verification (09-23), card
proceeds never touch a Swop wallet — Stripe holds the fiat and pays the merchant's bank
(09-23). No swap-fee number, no SWOP token claim, no audit claim, no user counts.

> ⚠️ **Deliberately absent: every exit / "owner can always get out" claim.** That FACTS.md
> row is under a publication hold (2026-10-02) while the `bbeeb20e` reduceOnly regression
> is unconfirmed in prod. Verified absent from this template by grep. Do not add it back
> until the hold block is deleted.

### No `--why` file — on purpose

`issue-93.why.txt` does not exist and should not be invented. The "why it moved" paragraph
has to be about a *specific* token, and QUILL could not fetch, so there was no token to
research. Omitting `--why` makes the card fall back to a paragraph derived only from fetched
numbers: **weaker, never wrong.** Don't hand-write one at build time against a token nobody
researched.

---

## 3. Editorial content of this issue

- **Big story** — three US answers to who may hold your crypto in one week: Atkins' 10-03
  custody remarks, the OCC's 09-18 trust charters to Bastion/Catena/Agora, and ICBA's 10-02
  APA suit in D.D.C. against the 03-02 final rule. Lands self-custody as declining the
  custody argument rather than winning it.
- **Article 01** — the non-US calendar: South Korea's Feb-2027 on-chain securities rules,
  NY+Wyoming joint supervision, Circle/Hyperliquid on MiCA, the SEC's tokenised-stock
  innovation exemption. Then the FACTS-sourced "boring money path" paragraph.
- **Day ahead** — Sunday: no US data. Monday ISM services 10:00 ET (cons. 55.7 vs 55.4),
  Wednesday FOMC minutes (Sept 15–16), OPEC+ / Canadian jobs Friday / ECB accounts; CPI not
  until 10-14. Court Watch: ICBA v. OCC, the prediction-markets cert pool, CFTC v. KalshiEX
  Rule 16 conference reported 10-13, SEC custody comment window. Games: the two NL Game 2s
  — Padres at Brewers 4:00 ET, Braves at Dodgers 8:00 ET, both FS1.
  **Game 1 winners are deliberately not named** — QUILL could not verify them, so the copy
  does not assert them. If you build after first pitch, re-read that bullet.

Suggested subject: **`Swop Daily #93 — Three answers to who holds your crypto`**

---

## 4. The send — stays a permit

The build and the `--test` copy need no approval. The broadcast to the "Swop Daily"
audience goes only on Travis's explicit yes.

**Expiry:** six hours after the market file's `fetchedAt`. Past that, re-run with
`--max-age-hours 12` against the **same** market file — never a re-fetch, which rotates
`tokenOfTheDay`. Past midnight it is a rewrite, not a rebuild: **discard #93 and build
#94**, because the Day-ahead block is Sunday-specific (two NL Game 2s, a closed market).

Deliverability, do not regress: multipart is automatic (`htmlToText` derives the text part)
— never send `html` without `text`. Open/click tracking stays off on purpose. DKIM at
`resend._domainkey.news.swopme.co` and SPF + feedback MX at `send.news.swopme.co` are
verified and correct — don't "fix" them.
