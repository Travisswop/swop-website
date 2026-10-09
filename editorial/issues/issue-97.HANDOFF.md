# Issue #97 — 2026-10-08 — build state and handoff

> ## 🚩 SUPERSEDED 2026-10-08 13:21 EDT (QUILL) — #97 shipped as a SPECIAL EDITION. Do not run the build below.
>
> The market build never became runnable: the `newsletter-build.sh` permit expired
> unanswered (treated as denied), and `/Users/travis/.eldorado/bin/newsletter-build.sh`
> was re-tested today and still returns "This command requires approval". Rather than
> take a second consecutive dark day, **#97 was reissued as a numbers-free special
> edition and is now a Resend draft with a test copy in Travis's inbox.**
>
> - Draft: `https://resend.com/broadcasts/ddb89c9a-787f-494a-8c79-1eba832dc889` (`sent: false`)
> - Subject: `Swop Daily #97 — where your money is when it says pending`
> - Reusable source: `editorial/issues/issue-S01.html` (dateless, no issue number)
> - Send copy: `$ICLOUD/Swop_Daily_Newsletter_2026-10-08.html` (masthead `ISSUE #97 — SPECIAL`)
>
> ⚠️ **`issue-97.template.html` is now the discarded artifact, and running its build
> would destroy the issue that shipped.** `newsletter-fill.js --build` writes to
> `--out $ICLOUD/Swop_Daily_Newsletter_2026-10-08.html` — the exact file the special
> edition occupies — so building #97 overwrites the drafted issue **silently**, with no
> warning and no backup. The repo copy at `issue-S01.html` is the recovery path if that
> happens. Per `[[stale-daily-issues-get-discarded-not-resent]]`, the market template is
> dead on 10-09 anyway: its tiles would fail the 6h staleness guard and its Day-ahead
> block is dated for 10-08 only. **Build #98 fresh instead.**
>
> ⚠️ **New blocker found while drafting, and it outlives this issue: `newsletter-audience-sync.js`
> cannot reach MongoDB Atlas from this machine** — *"Could not connect to any servers in your
> MongoDB Atlas cluster… IP that isn't whitelisted."* The draft wrapper treats this as
> non-fatal and continues, which is why it did not block today (a numbers-free issue needs no
> ledger tiles). **But it would have blocked a market issue**, because the bento's
> `winnings_paid_7d_usd` / `winners_7d` keys come from that script and `newsletter-fill.js`
> hard-fails on a missing ledger key. **Approving the `newsletter-build.sh` permit alone
> would therefore NOT have shipped #97** — this IP needs whitelisting in Atlas too. That is a
> second, independent gate nobody had measured, and it is the thing to fix before #98.
>
> The sections below are kept as the record of the market template's verification and the
> `newsletter-build.sh` review. The prose and the review are still accurate; only the
> "exactly what unblocks it" instructions are void.

**State (market template): TEMPLATE COMPLETE, NOT BUILT, NOT DRAFTED, NOT SENT.**
The prose is finished and verified. The build step is blocked on one thing only:
`node <script>` is denied in this sandbox, so the market fetch and
`newsletter-fill.js --build` cannot run. Filed as a durable permit —
`editorial/newsletter-build.sh` (new, reviewed below) needs installing to
`~/.eldorado/bin/` and allowlisting, exactly like `newsletter-draft.sh` was.

- Template: `editorial/issues/issue-97.template.html` ✅ written
- Market fetch: **not run** — no `.market-2026-10-08.json` exists
- Issue HTML: **not built** — no `$ICLOUD/Swop_Daily_Newsletter_2026-10-08.html`
- Resend broadcast: **none created**
- Why-it-moved: **deferred to build time** (see "Token of the day" below)
- Proposed subject: `Swop Daily #97 — $487M left the ETFs. The chain never noticed.`

## Why there is no built issue (and why that is not a template problem)

`newsletter-draft.sh` is allowlisted *by exact path*, not by directory — verified
today: `~/.eldorado/bin/newsletter-draft.sh --help` executes (fails on `$2: unbound
variable`, i.e. it ran), while `~/.eldorado/bin/newsletter-publish.sh` with no args
returns "This command requires approval" without executing its own `ELDORADO_APPROVED`
refusal. So dropping a new script into that directory would not make it runnable, and
QUILL could not self-grant this even by writing the file. It needs Travis.

`node --version` and `python3 --version` both run; `node <script>` and `python3 -c`
both do not. The limit is script execution, not the interpreter.

**Do not work around this by hand-typing numbers.** That is the failure the
template/fill split exists to prevent (#78 shipped ETH $12,507). The template has
nowhere to type a price, which is the point.

## Exactly what unblocks it (two commands, in order)

```
~/.eldorado/bin/newsletter-build.sh fetch
# → writes editorial/issues/.market-2026-10-08.json, prints the token-of-the-day
#   candidate. STOP and read the candidate name before continuing.

~/.eldorado/bin/newsletter-build.sh build 97 2026-10-08 --totd-ok
# → $ICLOUD/Swop_Daily_Newsletter_2026-10-08.html

~/.eldorado/bin/newsletter-draft.sh \
  "$HOME/Library/Mobile Documents/com~apple~CloudDocs/Documents/Claude/Projects/Swop/Swop_Daily_Newsletter_2026-10-08.html" \
  "Swop Daily #97 — \$487M left the ETFs. The chain never noticed."
# → audience sync, Resend broadcast as a DRAFT, test copy to travis@swopme.co
```

⏳ **The market file has a 6h staleness guard and the Day-ahead block is dated for
2026-10-08 only.** If this is run on 10-09 or later, do not build #97 — the tiles
would be refused as stale and the calendar, court dates and the ALDS Game 4 state are
all wrong by then. Build a fresh issue instead
(`[[stale-daily-issues-get-discarded-not-resent]]`).

## Review of `editorial/newsletter-build.sh` (I wrote it; I cannot execute it)

Reviewed by reading every callee's argv handling rather than by running it:

| Claim | How it was checked |
|---|---|
| Cannot email anyone | `newsletter-send.js` is not referenced in the script at all. Sending stays in `newsletter-publish.sh`, which still requires `ELDORADO_APPROVED=1` |
| Cannot write to Resend | Calls `newsletter-audience-sync.js --dry-run`. `DRY` is set at line 30 from `--dry-run`; line 162 guards the `resend.config.json` write with `if (!DRY)`; the dry paths `return` after a `console.log` (lines 135–141, 152–156, 171+) before any POST |
| Stats JSON is parseable | The `--dry-run` branches print a single `JSON.stringify(...)` to stdout and nothing else. Keys the fill script requires (`winnings_paid_7d_usd`, `winners_7d`, `winnings_paid_24h_usd`) come from the `...stats` spread built at lines 128–132 |
| Flags land where intended | `newsletter-fill.js` parses with `arg = name => argv[argv.indexOf(name)+1]` (line 43) and `has = name => argv.includes(name)` (line 47). Plain `--flag value` pairs, no getopt, no clustering — the wrapper's form is correct |
| Output path cannot escape iCloud | `OUT` is constructed, not passed: `$ICLOUD/Swop_Daily_Newsletter_$DATE.html`, with `$DATE` shape-checked against `[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]` first |
| The editorial gate survives | `--totd-ok` is not auto-supplied; the wrapper refuses unless the caller passes it as the 3rd argument, mirroring `newsletter-fill.js` line 149 |
| `set -e` footgun avoided | The optional `--why` argument is branched with `if`, not `[ -n "$WHY" ] && set -- …`, which is the shape that can trip `errexit` |
| Backend cwd | `audience-sync` runs inside `( cd "$SWOP/swop-app-backend" && … )`, the same subshell trick `newsletter-draft.sh` already relies on |

Unverified, because it needs execution: that `mktemp -t swop-stats` behaves as expected
on this macOS, and that the backend's mongoose connection succeeds from the wrapper's
environment. Both are shared with `newsletter-draft.sh`, which works.

## Verification performed on the template (no shell needed)

| Check | Result |
|---|---|
| `<div` / `</div>` | 75 / 75 |
| vs. `newsletter-base.html` | base is 75 — matches, so no orphaned wrappers |
| Token-bearing lines | 30 (= 40 tokens; `%%MOVER_PILL%%`+`%%MOVER_CHIP%%`, the four `_PILL`+`_CHG` pairs and `%%TOTD_CHG_COLOR%%`+`%%TOTD_CHG%%` share lines) |
| Token names vs. `newsletter-fill.js` `map` keys | all 40 present in the map (lines 117–162); none misspelled, none extra |
| Literal `[TBD]` | 0 |
| Unsubscribe variable | present, line 272 |
| Hand-typed price in tiles or prose | none — BTC/ETH/SOL/BNB appear only as tokens, and the big story points at "the row above this one" instead of restating a price |

### `fact-drift.sh` hand-check (the script itself cannot run here)

Checked each BLOCK/WARN rule's deny regex against the template by grep. Two
substring hits, both benign, both confirmed non-matches against the full rule:

- **`perp`** at the Fintech-pulse paragraph — it is "perpetual contracts and other
  derivatives", describing the CFTC's jurisdiction. `F-PERPS-FEE-NO-CAVEAT` needs
  `(no|zero|…)[^.]{0,30}fee[^.]{0,40}(perp|prediction market)`; that paragraph contains
  no "fee" at all. Grepped the full pattern: **no match.**
- **`swop keeps`** — it is the verified wording "Swop keeps only a revocable record of
  the decision, not the evidence behind it". `F-CUSTODY-KEEPS` needs
  `swop keeps[^.]{0,20}(0\.5|half|[0-9]+%)`. Grepped the full pattern: **no match.**

Explicitly grepped and clean: `F-EXIT-HOLD` (`always get out`, `trap(s)? you inside a
position`), `F-AUDIT-IMPLIED`, `F-SWAP-FEE-NUMBER`, `F-STAKING`, `F-WALLET-COUNT-TILE`,
`F-USER-COUNTS`, `F-ZEROPROOF-*`, `F-IOS-TAPTOPAY`, `F-REFERRAL-*`, `F-SLIPPAGE-CAP`,
`F-CARD-PROCEEDS`, `F-X402-NEGATIVE`.

⚠️ **The exit hold is still live** (`FACTS.md` notice, 2026-10-02; FORGE's fix was still
an uncommitted staged patch as of the 10-06 war-room snapshot). This issue mentions
**perps and positions nowhere in Swop copy** — deliberately, the same discipline the
R3/R4 blog drafts used. The only "perp" is the CFTC's.
**Re-run `fact-drift.sh` on the built HTML when a shell allows it.**

### Every Swop sentence, traced to a Verified FACTS.md row

Article 01: *Two rails, one rule* (2026-09-23) · *Who holds the documents* (09-23) ·
*Nothing on-chain* (09-23) · *Checkout fee, both rails* (09-24).
Article 02 Spotlight: *Self-custody* (08-26) · *Chains live* (08-26) ·
*Sponsored gas* (08-26) · *Gas is absorbed* (09-25) · *Built-in swap* (09-21) ·
*Phone loss / recovery* (09-01).
Bento: the fixed 0.5% tile cites *Checkout fee, both rails*; the two prediction tiles
come from the audience-sync ledger. **No wallet/user total tile** (F-WALLET-COUNT-TILE),
**no fund-loss 90d tile** (correct until `AdminIncident.fundLoss` and DEPOT's read path
ship). No number in this issue is a Swop platform number that isn't pulled.

## Journal slot — decided as Spotlight, and it must be RE-DECIDED at build time

**Article 02 is the Swop Spotlight fallback, not "From the Journal".** As of this
writing the newest live post is `settlement-is-the-product` (Oct 7), which #96 already
used as its Journal slot; there is no Oct 8 post. Checked by fetching
`https://www.swopme.co/blog/` — **not** by `ls blog/`, which is behind prod by three
posts and is not a valid answer to "did a post ship?"

The Spotlight ties the day's news to the Stage-1 value prop (nothing in today's story
was a product failure) and plugs the most recent post in one line, per NEWSLETTER.md.

🔁 **The blog has shipped same-day twice this week (10-06, 10-07), so re-fetch the index
before building.** If an Oct 8 post is live by then, swap Article 02 back to the Journal
shape — restore the eyebrow to `02 &mdash; From the Journal`, re-insert the banner
anchor above the title div:

```html
        <a href="https://www.swopme.co/blog/<slug>" style="text-decoration:none;">
          <img src="https://www.swopme.co/blog/<slug>/og.png" alt="<title>" width="100%" style="display:block;border-radius:10px;margin-bottom:16px;border:1px solid #1e1e2e;" />
        </a>
```

and repoint both `<a href>`s. **That block contains no `<div>`, so the 75/75 count is
unaffected either way** — which is why the Spotlight could drop it safely.

## Token of the day — not yet reviewable

`issue-97.why.txt` was **not** written, because the candidate is unknown until `fetch`
runs. Two options at build time, in order of preference:
1. Read `.market-2026-10-08.json`, check the name against the NEWSLETTER.md rules
   (never politically charged/partisan/offensive; a faller framed honestly as a
   faller), research the move, write `issue-97.why.txt` ending with
   "Illustrative only, not advice.", and pass it as the 4th argument.
2. Omit it. `newsletter-fill.js` lines 170–180 then derive the paragraph purely from
   the fetched numbers — weaker, never wrong.

## Not done this session

- **Built/drafted issue — blocked** as above. Durable fix filed as a permit,
  unbundled from any send (`[[unbundle-the-durable-fix-from-the-daily-send]]`).
- **Blog PR state — unverifiable.** `git` and `gh` are both denied. Prod was checked by
  URL, which answers "did it ship" but not "what is open".
- **SmartSite cross-post — blocked, unverified.** `swop_get_my_smartsite` still returns
  a missing-permission error in this non-interactive session, so the SmartSite was never
  read and nothing was added.
- **Issue #96 was never sent.** Its permit (filed 10-07 ~09:25 EDT) went unanswered and
  its market data and Day-ahead block are now a day stale, so it is a discarded issue,
  not a pending one. #97 supersedes it. Do not send #96.
