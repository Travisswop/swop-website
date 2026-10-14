# Internal build #100 — 2026-10-11 — S01 special, renumbered to **public #90**

**State: BUILT, DRAFTED, TEST COPY SENT, NOT SENT TO SUBSCRIBERS.**

- Draft: `https://resend.com/broadcasts/e4ed120d-d794-4acb-b2ed-5651dc57fa19` (`sent: false`)
- Subject: `Swop Daily #90 — nothing went missing. Here's where it actually is` (68 bytes / 66 chars, under the 70-char broadcast-name cap)
- Test copy: `travis@swopme.co`, id `01a12add-6e05-7e3f-beee-5ab3fe9fb229`
- Source: `editorial/issues/issue-S01.html` (dateless)
- Send copy: `$ICLOUD/Swop_Daily_Newsletter_2026-10-11.html` (masthead `ISSUE #90 — SPECIAL`)

## What changed today, and it is the only thing that changed: the number

No new prose was written. The dark run is **23 days** (last send #89, 2026-09-18) and the
lane's only blocker is an unactioned send permit, so an eleventh distinct issue would not
have fixed anything (`[[collapse-the-work-before-refiling-a-permit]]`). What *was* wrong
with the pending draft is that it said **#99**.

**Ten numbers — #90 through #99 — were burned by drafts that never shipped.** Sending the
special as #99 would have delivered, after 23 days of silence, an issue implying ten issues
the subscriber never got. For a newsletter positioned on stating things plainly, the masthead
number is copy, and it has to be true. So the send copy is renumbered to **#90**: the first
number no subscriber has received.

`diff` against yesterday's cleared copy is **exactly one line** — the masthead. That is what
lets yesterday's full claim-risk clearance carry forward as proof rather than as assumption.

### #90 is genuinely free — verified, not assumed

`issue-91.HANDOFF.md` line 28–33 carries a correction that struck out "Last issue actually
sent: #90, 2026-09-28" and replaced it with "**#90 was never sent** … left as an unsent
Resend draft to a 857-address audience." Confirmed against the handoff chain (#92: "nothing
has reached a subscriber since #89"; #96, #97, #98, #99 all record `sent: false`) and against
the iCloud artifact jump 09-18 → 09-28. **A `sent: false` broadcast consumes no number.**

The durable rule is now written into `NEWSLETTER.md` → *"The issue number is assigned at
SEND, not at draft"*: internal `issue-<N>` filenames stay a build counter (this file is #100),
while the public number is set at permit time to `last number actually sent + 1`. The two
have been nine apart since 2026-09-28.

### The re-cut treadmill is closed with it

Because the number is no longer baked in at draft time, a dateless special that goes
unapproved **stays valid and gets re-filed as-is.** The "re-cut it under today's number"
guidance in NEWSLETTER.md was amended accordingly: re-draft only to correct a defect, which
is what today was.

## Draft queue after today — one send, two deletions, one keeper

| Broadcast | Content | Action |
|---|---|---|
| `e4ed120d-…` | S01, masthead #90 | **SEND THIS** |
| `876757ce-…` | S01, masthead #99 | delete — superseded, identical body, wrong number |
| `ddb89c9a-…` | S01, masthead #97 | delete — superseded, identical body, wrong number |
| `513b4159-…` | S02, masthead #98 | **keep**, different content; renumber to #91 at send |

Only one permit was filed today, deliberately. Three asks a day for four days is how the
pile got here; the allowlist and QUERIES-promotion gates are reported as information, not as
competing permits (`[[unbundle-the-durable-fix-from-the-daily-send]]`).

## Verification performed on the send copy

| Check | Result |
|---|---|
| `<div` / `</div>` | 45 / 45 — matches the S01 frame (not base's 75/75) |
| `diff` vs. 2026-10-10 send copy | 1 line, the masthead only |
| Unfilled `%%[A-Z0-9_]+%%` tokens | 0 |
| `[TBD]` / `[NEEDS FACT` | 0 |
| Unsubscribe variable | present, line 180 |
| Stale issue-number or date refs | 0 (the `#98`-looking hits on lines 119/126 are the HTML entities `&#9878;` / `&#9889;`) |
| Hand-typed price / index level / platform count | none — the issue contains no fetched number at all |
| Outbound blog links | 5/5 resolve against the prod index fetched today: `settlement-is-the-product`, `send-crypto-with-a-link`, `usdc-vs-usdce`, `cross-chain-swap-wallet`, `recover-wallet-without-seed-phrase` |

### `fact-drift.sh` hand-check (the script still cannot run here)

Grepped the send copy directly today, not inherited:

- **F-AUDIT-IMPLIED** — one `audit` hit, line 128: "Swop **has not commissioned** a
  third-party security audit to date." Verified wording; the allow term shares the line, and
  `fact-drift.sh` greps per line, so it clears.
- **F-EXIT-HOLD** (`always get out|trap(s)? you inside a position`) — **0 hits**. The issue
  mentions perps and positions nowhere. The hold is still live.
- Zero deny hits on: `guaranteed`, `insured`, `FDIC`, `ZeroProof`, `zero-knowledge`,
  `Tap to Pay`.
- Bento is four *published* facts, each naming its FACTS.md row: keys Swop holds `0`
  (Self-custody, 08-26) · network fee charged to you `$0` (Gas is absorbed, 09-25) ·
  checkout fee both rails `0.5%` (Checkout fee both rails, 09-24) · chains live `4`
  (Chains live, 08-26). No ledger reads, so **nothing here can go stale between draft and
  send** — the permit is safe to approve days from now
  (`[[stale-daily-issues-get-discarded-not-resent]]`). Each zero reads as a deficit of
  something you would not want, never as a score.

## Gates re-measured today — all four still shut

| Gate | Measured how, 2026-10-11 | State |
|---|---|---|
| Build wrapper | `test -x ~/.eldorado/bin/newsletter-build.sh` | **Not installed.** Permit has now expired unanswered four times |
| Fetcher directly | `node editorial/newsletter-fill.js --inspect` | **Denied** (script execution, not the interpreter) |
| MongoDB Atlas IP whitelist | observed live in today's `newsletter-draft.sh` run | **Still not whitelisted** — verbatim Atlas IP-whitelist error |
| SmartSite cross-post | `swop_get_my_smartsite` | **Denied** — "haven't granted it yet". **Six consecutive days** |

Also probed for an already-installed wrapper on the publish side —
`blog-publish.sh`, `publish-blog.sh`, `smartsite-post.sh`, `git-sync.sh`,
`newsletter-send.sh`, `publish-retention-cluster.sh` in `~/.eldorado/bin/`: **all absent.**
`newsletter-draft.sh` remains the only installed wrapper. Don't re-test `node` expecting a
different answer; go straight to the wrapper ask.

### The audience is frozen, and that is the growth leak

The sync failed again and `newsletter-draft.sh` treats that as non-fatal and continues, so
whatever is sent goes to the "Swop Daily" audience as the **last successful sync** left it —
**857 addresses** (the only recorded figure: `issue-91.HANDOFF.md`'s 2026-10-01 correction,
describing the audience the unsent #90 draft was pointed at). Everyone who
signed up in the 23 days since is absent from the list, will not receive this issue, and is
uncounted; the Beachhead Audience tab shows the audience without showing that it is stale
(`[[failed-audience-sync-still-sends-to-a-frozen-list]]`). Against the 250k goal this is a
subscriber-growth leak, not a cosmetic tile problem.

## Journal slot — Spotlight again, re-decided at build time

Re-decided today against prod, not `ls blog/` (`[[recheck-journal-slot-before-build]]`,
`[[verify-prod-in-war-room-snapshots]]`): `https://www.swopme.co/blog/` lists **29 posts,
newest `settlement-is-the-product` (Oct 7)**. No Oct 8/9/10/11 post — **the blog is dark
four days.** So Article 02 stays the service/Spotlight treatment. Moot for this issue, which
is a special and carries no Journal slot.

## Blog — unchanged, re-verified, still one promotion away

Four finished posts staged in `editorial/drafts/` (`sent-crypto-to-wrong-address`,
`token-not-showing-in-wallet`, `crypto-transaction-still-pending`, `crypto-swap-failed`),
held outside `blog/` so an unpromoted query blocks publishing and not writing
(`[[stage-blocked-posts-in-editorial-drafts]]`).

Their four queries are at **QUERIES.md lines 261–264**, under the
`## Proposed — retention & trust` header at **line 52** — still below the `## Proposed`
boundary at **line 40** (re-grepped today). `publish-retention-cluster.sh` preflight requires
each post's query above line 40 and never edits QUERIES.md itself; promotion is Travis's call
by that file's own rule.

⚠️ **This gate has two halves, and only one is four lines of editing.** Even with the queries
promoted, `publish-retention-cluster.sh` is a bash script and **script execution is denied in
this sandbox** — the same blocker as the market path. Promoting the lines does not by itself
ship the cluster (`[[existing-artifact-is-not-a-cleared-gate]]`). Read
`editorial/issues/PUBLISH-CLUSTER-REVIEW.md` before `--apply`, and do not bypass the
preflight's `HEAD == origin/main` check — the local checkout is behind prod and the
hand-maintained `sitemap.xml` / `blog/index.html` / `llms.txt` would de-list live posts
(`[[shared-index-files-lag-prod-separately]]`).

## Not done this session

- **Market issue — not attempted**, by choice; all four routes above are shut.
- **No new prose angle written**, by choice. See the top of this file.
- **Blog PR state — unverifiable.** `git` and `gh` both denied; prod was checked by URL,
  which answers "did it ship" but not "what is open".
- **SmartSite cross-post — blocked**, six consecutive days.
- **The weekly long-form SEO guide — written, not shipped.** The R1–R4 retention cluster is
  this week's long-form work: finished prose behind the promotion gate, not missing work.
