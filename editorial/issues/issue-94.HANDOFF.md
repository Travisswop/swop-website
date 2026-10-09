# Issue #94 — build handoff (2026-10-05, Monday)

## TL;DR

Template is written and pre-flighted. **One command builds and test-copies it:**

```bash
cd /Users/travis/Desktop/SwopLive/swop-website
bash editorial/build-daily.sh 94
```

It does **not** send the broadcast. That stays a separate permit-gated command, which the
script prints when it finishes.

⚠️ **Run it interactively.** Step 2 is a `read -r -p` human gate on the token of the day.
In a non-interactive shell that `read` hits EOF and, under `set -euo pipefail`, the script
exits before building — safely, but with nothing produced. See §3: this is the reason QUILL
still cannot finish the loop even if the allowlist is fixed, and the fix for it is a
proposal, not a change I made today.

---

## 0. State of the archive

| Issue | Built? | Sent? |
|---|---|---|
| #89 (**09-18**) | yes | **yes — still the last issue any subscriber received** |
| — (09-19 … 09-27) | nothing built | nothing sent |
| #90 (09-28) | yes, in iCloud | no — permit expired 09-29 |
| #91 (10-01) | no — template only | no — permit expired 10-02 |
| #92 (10-02) | no — template only | no — permit expired 10-03 |
| #93 (10-04) | no — template only | no — expired unbuilt, discarded |
| #94 (10-05) | this one | pending |

**The dark run is 17 days.** Verified against both required sources, not one: the iCloud
`Swop_Daily_Newsletter_*.html` files stop at 09-28, and `editorial/issues/` contains no
`.market-2026-10-02/03/04/05.json`, so no build was ever attempted on those days.

Do not send #90–#93. Their tiles are days stale and their Day-ahead blocks describe events
that have already happened. Numbering carries forward regardless — renumbering desyncs the
archive.

---

## 1. The blocker, re-tested today (not assumed)

| Command | Result 2026-10-05 |
|---|---|
| `node --version` | ✅ v22.22.0 |
| `node /abs/path/editorial/newsletter-fill.js --inspect` | ❌ denied |
| `cd <dir> && git log` | ❌ denied |
| `git -C <dir> log` | ❌ denied |

**node runs; node *with arguments* is what the allowlist denies.** `swop-website/.claude/settings.local.json`
still contains only the two stale `git` worktree entries from 2026-08-27. The entries
requested by the #91, #92 and #93 handoffs were never added — this is the fifth consecutive
issue lost to the same missing line.

**QUILL did not edit that file.** Writing my own allowlist entry is self-granting the
execute permission the sandbox exists to withhold. It is Travis's call. The exact line is
in today's permit, filed **on its own, with no send attached to it** — the three expired
permits each welded this permanent fix to a same-night broadcast, and that is why all three
died on a 24-hour clock.

---

## 2. Pre-flight — done, don't redo

All four statically checkable conditions `newsletter-fill.js` refuses to write on are clean:

- ✅ **`<div>`/`</div>` balance: 75 / 75**, matching `newsletter-base.html` (75) exactly.
- ✅ **30 `%%TOKEN%%` placeholders, all unfilled** — exact parity with #93.
  (Count with `%%[A-Z0-9_]+%%`; the digit class matters — `%%WINNINGS_7D%%` contains a `7`,
  and an `[A-Z_]`-only pattern undercounts to 27 and looks like three lost placeholders.)
- ✅ **No hand-typed price.** `\$[0-9]` over the whole template: zero hits. There is nowhere
  in it to type one. The big story deliberately carries ETH *quantities* and day counts,
  which are the substance of the story, and no dollar figure at all.
- ✅ **`{{{RESEND_UNSUBSCRIBE_URL}}}` present.**

The other two (stats-ledger keys, market-file age) can only be checked by running it.

### Journal slot — Journal, not Spotlight

Re-decided at template time, per the standing rule. `ls -t swop-website/blog` shows nothing
newer than `sell-digital-products-for-crypto` (10-01); no post went live 10-02 through
10-05. Article 02 stays **Journal** with its `og.png` banner.

Copy says "Newest on the Swop Journal", not "new today" — honest for a post four days old.
And because #91–#93 never went out, **no subscriber has seen it**: it is new to the list.

> **Re-check this at build time.** If a post goes live before you run the build, swap
> Article 02 from Journal to Spotlight. Both variants are exactly 4 divs, so the count stays
> 75/75 either way.

### Fact-check — passed, with one deliberate omission

Every Swop claim in Article 01 ¶2 is verbatim from a Verified FACTS.md row: checkout fee
0.5% both rails (09-24), gas absorbed not passed through (09-25), crypto/x402 never
identity-gated (08-31 / 09-23), card rail requires merchant verification (09-23), card
proceeds never touch a Swop wallet — Stripe holds the fiat and pays the merchant's bank
(09-23). No swap-fee number, no SWOP token claim, no audit claim, no user or wallet counts,
no iOS Tap to Pay claim.

> ⛔ **Deliberately absent: every exit / "owner can always get out" claim.** That FACTS.md
> row is still under publication hold (2026-10-02) — the hold block is still in the file, so
> the `bbeeb20e` reduceOnly fix is still unconfirmed in prod. Verified absent by grep:
> `always get out|never blocked|cannot trap|trap you|risk-reducing` → **no matches**.
>
> **This issue needs that check more than any previous one**, because the big story is
> *about* an exit queue. Every hit for `exit|get out|withdraw` is on lines 125–126 and every
> one of them has Ethereum validators as its subject, not Swop's policy layer. The issue
> makes no Swop exit claim anywhere. Do not "improve" the big story by adding the parallel.

### No `--why` file — on purpose

`issue-94.why.txt` does not exist and should not be invented. The "why it moved" paragraph
has to be about a *specific* token, and QUILL could not fetch, so there was no token to
research. Omitting `--why` makes the card fall back to a paragraph derived only from fetched
numbers: **weaker, never wrong.** Don't hand-write one against a token nobody researched.

---

## 3. `build-daily.sh` — review carried forward and re-verified

The script is **still unexecuted and still not syntax-verified** (`bash` and `bash -n` both
denied). The #93 static review found and fixed three defects. I re-read the file today
rather than trusting the note, and **all three fixes are present**:

1. **Rebuild mode no longer re-fetches** (lines 60–83). `--max-age-hours` sets `REBUILD=1`,
   which reuses the newest existing `.market-*.json` instead of running `--inspect` — so a
   rebuild cannot rotate the `tokenOfTheDay` you already approved.
2. **Fail-fast guard on the bento ledgers** (lines 134–140), right after step 3, so the one
   `audience-sync --dry-run` path that returns without ledgers fails *before* the gate
   rather than opaquely after it.
3. **Real audience sync printed as step (a)** before the broadcast (lines 169–173), flagged
   as Travis's call because it writes to Resend.

I also verified the thing a static review most easily gets wrong — **the guard's key name is
real on both sides**: `winnings_paid_7d_usd` is emitted by `newsletter-audience-sync.js:130`
and required by `newsletter-fill.js:136`. The guard will not false-positive.

### New finding: the human gate blocks unattended runs by design

Step 2 (line 108) is `read -r -p "Ship this token of the day? [yes/no]"`. Under
`set -euo pipefail`, a non-interactive shell gives that `read` an EOF, it returns non-zero,
and the script dies there. Nothing is built and nothing is sent, which is the right failure
direction — but it means **the allowlist line alone does not let QUILL finish the loop**.
Today that is fine: Travis runs one command interactively and the gate is genuinely his.

The durable fix is to split the gate so the editor can make an informed call without a
human prompt — `--fetch-only` to print the candidate, then `--totd-ok` to build from that
same market file. That is filed as a proposal, not done: the script is already unverified
code, and stacking an unexecuted rewrite on top of it is how a sixth issue gets lost.

---

## 4. Editorial content of this issue

- **Big story** — Ethereum's staking exit queue at its longest wait of 2026. MetaMask
  disclosed a staking-infrastructure compromise 09-30 and began a precautionary mass
  validator exit; researcher Kaden traced redirected fee rewards from 18 of 19 MetaMask
  validators that proposed blocks in the incident window to a Tornado-Cash-funded address.
  Queue went ~166,000 ETH (09-29) → ~851,000 ETH (10-02), ~2% of the 43.6M ETH staked, past
  May's ~476,000 ETH surge; MetaMask is ~523,000 ETH of it. Exit wait 14.77 days, longest
  since Dec 2025; entry queue ~25 days with ~1.5M ETH in line. Lands on the Stage 1 theme:
  an incident has two durations, and the second one — how long it takes everyone who lost
  confidence to act — is the one that shows up in retention.
- **Article 01** — the custody week: the SEC's 10-01 proposal and its *two* paths (state
  trust companies as custodians; conditional self-custody where no permitted custodian is
  available), Atkins' 10-03 remarks, 60-day comment window, the OCC's 09-18 charters now
  being litigated via ICBA's 10-02 APA suit in D.D.C., plus Korea's Feb-2027 date, the MiCA
  widening proposal and the UK authorisation window — and the 3x BTC/ETH ETF clearance as a
  pace marker. Then the FACTS-sourced boring-money-path paragraph.
- **Article 02** — From the Journal: `sell-digital-products-for-crypto`.
- **Day ahead** — Monday: ISM services 10:00 ET (cons. 55.7 vs 55.4), read prices-paid;
  Wednesday FOMC minutes 14:00 ET (Sept 15–16); OPEC+, Canadian jobs Friday, ECB accounts;
  no CPI until 10-14; traders priced out an October hike over the weekend. Court Watch:
  ICBA v. OCC, the prediction-markets cert pool, CFTC v. KalshiEX Rule 16 conference
  reported 10-13, SEC custody comment window. Games: **two American League Game 2s** —
  White Sox at Guardians 5:00 ET, Yankees at Rays 8:00 ET, TBS/truTV/HBO Max.
  Cleveland and New York are each *reported* to be trying to even their series; Game 1
  results are **not asserted**, because I could not verify the scores directly.

Suggested subject: **`Swop Daily #94 — The exit queue is a trust metric`**

### Day-ahead expiry (this block goes stale silently)

- After **17:00 ET** the White Sox–Guardians bullet is no longer forward-looking; re-read it.
- After **midnight** the whole Monday frame is wrong: ISM is no longer "today", the minutes
  are no longer "Wednesday" in the same shape, and both Game 2s are final.
  **Then it is a rewrite, not a rebuild — discard #94 and build #95.**

---

## 5. The send — stays a permit

The build and the `--test` copy need no approval. The broadcast to the "Swop Daily" audience
goes only on Travis's explicit yes, and I cannot usefully preview it before the build exists
because its tiles do not have values yet.

**Sync the audience before broadcasting.** `build-daily.sh` runs audience-sync in `--dry-run`
only (read-only, correctly — a real sync writes to Resend), so no wallet that signed up
during the 17-day dark run is in the "Swop Daily" audience yet. The script prints the real
sync as step (a).

**Expiry:** six hours after the market file's `fetchedAt`. Past that, re-run with
`--max-age-hours 12` against the **same** market file — never a re-fetch, which rotates
`tokenOfTheDay`.

Deliverability, do not regress: multipart is automatic (`htmlToText` derives the text part)
— never send `html` without `text`. Open/click tracking stays off on purpose. DKIM at
`resend._domainkey.news.swopme.co` and SPF + feedback MX at `send.news.swopme.co` are
verified and correct — don't "fix" them.
