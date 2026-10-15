# Issue #96 — 2026-10-07 — build, verification and send state

**State: DRAFT created in Resend, test copy sent to Travis, send NOT made.**
Waiting on Travis's approval of the send permit filed 2026-10-07 ~09:25 EDT.

- Issue HTML: `$ICLOUD/Swop_Daily_Newsletter_2026-10-07.html`
- Template: `editorial/issues/issue-96.template.html`
- Market fetch: `editorial/issues/.market-2026-10-07.json` (`fetchedAt` 2026-10-07T12:58:26Z)
- Why-it-moved: `editorial/issues/issue-96.why.txt`
- Resend broadcast (draft): `9e2701b2-a5ec-489c-b8d9-6cc90087593c`
  → https://resend.com/broadcasts/9e2701b2-a5ec-489c-b8d9-6cc90087593c
- Test email id: `01a11687-e63b-711c-b9f2-3f21cac39936` → travis@swopme.co
- Subject: `Swop Daily #96 — Spot fell under 2%. Leverage did the rest.`

The template and the built HTML were produced by an earlier run this morning (09:03 EDT)
and left without a handoff. This session reviewed, corrected and drafted it.

## Verification actually performed (not a checklist, these were run)

| Check | Result |
|---|---|
| `%%TOKEN%%` left unfilled | 0 |
| Literal `[TBD]` | 0 |
| `<div>` / `</div>` balance | 75 / 75 — matches `newsletter-base.html` |
| Tile values vs. the market fetch | all 15 verbatim (BTC $83,429 / -3.2%, ETH $2,568 / -5.4%, SOL $116.40 / -3.3%, BNB $766.81 / -2.4%, S&P 7,818.93, Nasdaq 27,599.89, Dow 51,521.28, Russell 2,830.30, BP $1.08 / -13.9% / $269M / $17M / 0.1x / rank 160) |
| Bento vs. audience-sync ledger | exact: `winnings_paid_7d_usd` 4543 → `$4,543`; `winners_7d` 30 → `30`; `winnings_paid_24h_usd` 4 → `$4 paid out · last 24h` |
| Wallet/user total tile (F-WALLET-COUNT-TILE) | absent ✓ — sync reports `wallets_total` 1841, deliberately NOT published |
| Fund-loss 90d tile | absent ✓ — correct until FORGE's `AdminIncident.fundLoss` + DEPOT read path ship |
| Unsubscribe | present (line 273) |
| Multipart send | `newsletter-send.js` derives the text part; not bypassed |

## One correction applied

**F-AUDIT-IMPLIED would have fired on Article 01.** The line read "CIP-0113 went live on
mainnet after multiple independent **security audits**", which matches the rule's deny
pattern `(third-party|external|independent|security)[^.]{0,20}audit(ed|s)?\b` with nothing
in the allow list to rescue it. The audits are **Cardano's**, not Swop's, so in substance it
was a false positive — but it is a BLOCK rule in a Swop newsletter, and "audited" sitting
near Swop copy is exactly the misread the rule exists to prevent.

Changed to "multiple independent security **reviews**" in **both** the template and the
built HTML, byte-identically. Prose-only edit inside an existing text node — no wrapper tag
touched, div balance re-verified 75/75 after the edit. The underlying fact is unchanged and
confirmed: the Cardano Foundation shipped CIP-0113 to mainnet 2026-10-07 "following multiple
independent security audits" and did not name the auditors.

`editorial/fact-drift.sh` could **not** be executed in this sandbox (bash script execution
denied), so all rules were checked by hand against the rule table. `stak(e|ing|ed)` appears
to hit at line 192 — it is the substring in "mi**stake**s get caught", and F-STAKING requires
`swop|token|rewards|yield` within 30 non-period chars, which does not follow. Not a hit.
**Re-run `fact-drift.sh` on this issue when a shell allows it** to confirm the hand check.

## Journal slot — re-decided at build time, correctly

Article 02 links `blog/settlement-is-the-product`. **That directory does not exist in the
local working copy**, which looks like a broken link and nearly triggered a Spotlight
fallback. It is live in prod — fetched and confirmed, H1 "Settlement Is the Product",
published Oct 7, 2026. The secondary link `banking-the-unbanked-self-custody` is live too
(Oct 6). The local `blog/` tree is simply behind prod. Correction recorded in TOPICS.md:
**`ls blog/` is not a valid answer to "did a post ship?" — fetch the canonical URL.**

Day-ahead was re-read rather than trusted: Fed minutes at 14:00 ET, MBA applications for the
week ended Oct 2, 10-year auction, ICBA v. OCC filed Oct 2, CFTC v. KalshiEX conference
Oct 13 — all dated for today. Tonight's four Division Series games, their start times,
networks and series states were independently confirmed against the published schedule.

## Not done this session

- **SmartSite cross-post of today's post — blocked.** `swop_get_my_smartsite` requires a
  permission grant this non-interactive session cannot obtain, so the SmartSite was never
  read and nothing was added. Unverified, not merely unfinished.
- **Blog PR state — unverifiable.** `git` and `gh` are both denied here. Prod was checked
  by URL instead, which answers "did it ship" but not "what is open".
