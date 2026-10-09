#!/usr/bin/env bash
# fact-drift.sh — PLAYBOOK step 9, the fact-drift sweep.
#
# Bodies are not the only place a claim lives. When a FACTS.md row is corrected,
# superseded, or marked "never claim", the correction gets applied to the post body
# and nowhere else — the derived surfaces (llms.txt, the blog index dek, every
# <meta>/OG/Twitter/JSON-LD block, and the unposted distribution kits) keep quoting
# the retracted version. This greps every such phrase across ALL published surfaces
# and exits non-zero on a hit, so it can gate the daily routine.
#
# Usage:
#   editorial/fact-drift.sh                 # sweep, gate on BLOCK
#   editorial/fact-drift.sh --strict        # gate on WARN too
#   editorial/fact-drift.sh --list          # print the pattern table, scan nothing
#   editorial/fact-drift.sh path/to/file    # sweep one file (pre-send check on a draft)
#
#   NEWSLETTER_ARCHIVE=~/Library/Mobile\ Documents/com~apple~CloudDocs/Documents/Claude/Projects/Swop \
#     editorial/fact-drift.sh             # also sweep the sent-issue archive
#
# KNOWN LIMIT: grep is line-based, so a claim split across lines is invisible to it.
# Newsletter bento tiles are exactly that shape — the label and the number live on
# separate lines. Rules that target email therefore match the LABEL, which is where
# the claim actually is ("wallets · total" asserts a public user count on its own).
#
# Add a rule whenever a FACTS.md row moves to superseded / "never claim".
# Rule format:  ID ||| SEVERITY ||| what it catches ||| deny regex ||| allow regex
# A line matching `deny` is a hit UNLESS it also matches `allow` (leave allow empty for none).
# Regexes are POSIX ERE, matched case-insensitively.

set -uo pipefail

ROOT="${FACT_DRIFT_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
STRICT=0
LIST=0
TARGETS=()

for arg in "$@"; do
  case "$arg" in
    --strict) STRICT=1 ;;
    --list)   LIST=1 ;;
    -h|--help) sed -n '2,25p' "$0"; exit 0 ;;
    *)        TARGETS+=("$arg") ;;
  esac
done

# ---------------------------------------------------------------------------
# Pattern table. Every rule cites the FACTS.md row it enforces.
# ---------------------------------------------------------------------------
read -r -d '' RULES <<'EOF'
F-REFERRAL-CHECKOUT ||| BLOCK ||| Referral share described as a cut of the CHECKOUT fee (superseded 2026-09-25 — the share is on SWAP fees) ||| (referr[a-z]*|refer a friend)[^.]{0,120}(half|50%|0\.25)[^.]{0,60}(checkout|that fee|of it|of that)|(half|50%|0\.25)[^.]{0,80}(checkout fee|swoppay fee)[^.]{0,80}referr ||| swap fee
F-REFERRAL-FUNDED-OUT ||| BLOCK ||| "referral share funded out of it" — antecedent is the checkout fee (superseded) ||| referral share[^.]{0,40}(funded out of it|out of that fee|from that fee|comes out of it) |||
F-REFERRAL-DEK ||| BLOCK ||| Blog-index / dek shorthand "where half of it goes" attached to the one published fee ||| (one published (number|fee)|0\.5%)[^.]{0,140}(where )?half of it goes |||
F-ZEROPROOF-TENSE ||| BLOCK ||| ZeroProof stated in the present tense (FACTS: not live, future tense only) ||| zeroproof (is|does|lets|gives|provides|proves|handles|works|makes|keeps|runs) ||| (is not|isn.t|not live|in development|being built|is the piece we think|still in development|disabled in production)
F-ZEROPROOF-ZK ||| BLOCK ||| ZeroProof called a zero-knowledge proof (FACTS: never call it ZK) ||| zeroproof[^.]{0,60}(zero-knowledge|zero knowledge|zk[ -]proof|zk proof)|(zero-knowledge|zk)[^.]{0,40}zeroproof ||| not a zero-knowledge|never call|isn.t a zero-knowledge|rather than a zero-knowledge
F-IOS-TAPTOPAY ||| BLOCK ||| Tap to Pay claimed on iPhone/iOS (FACTS: Android only, never claim iOS) ||| tap to pay[^.]{0,40}(on iphone|on ios|iphone and android|ios and android)|(iphone|ios)[^.]{0,30}tap to pay ||| not (yet|live)|isn.t|is not|no[t]? available|android only|we would rather name the gap|not there
F-STAKING ||| BLOCK ||| Staking mentioned (FACTS: do not mention — unmerged branch only) ||| stak(e|ing|ed)[^.]{0,30}(swop|token|rewards|yield)|swop[^.]{0,30}stak(e|ing) |||
F-SWAP-FEE-NUMBER ||| BLOCK ||| A public swap-fee NUMBER stated (FACTS: still under "Needs verification") ||| (0\.5|half a percent|50 bps)[^.]{0,40}swap fee|swap[s]? (carry|charge|cost|have)[^.]{0,30}0\.5 |||
F-AUDIT-IMPLIED ||| BLOCK ||| Implies a third-party security audit exists (FACTS: none commissioned) ||| (third-party|external|independent|security)[^.]{0,20}audit(ed|s)?\b ||| (has not|hasn.t|no|never|not commissioned|without a)[^.]{0,40}audit|audit log|audit chain|audit trail|hash-chained
F-X402-NEGATIVE ||| BLOCK ||| The retracted "Swop doesn't implement x402" claim (every SmartSite IS an x402 storefront) ||| swop[^.]{0,40}(doesn.t|does not|do not|don.t|no)[^.]{0,20}(implement|support|use)[^.]{0,20}x402 |||
F-TOKEN-INVESTMENT ||| BLOCK ||| Investment-adjacent SWOP language (FACTS: keep token claims mechanical) ||| swop[^.]{0,60}(token price|price target|apy|yield|roi|return on|appreciat|moon|pump|go up|upside|value accrual|accrues value) |||
F-FEE-SHARE-HOLDERS ||| BLOCK ||| Token HOLDERS earn a share of fees (F6 — fee-pool buyback was REMOVED 2026-07-01; the proposed row says the opposite: ordinary swaps do not earn SWOP) ||| (hold|holding|holders?)[^.]{0,40}\$?swop[^.]{0,80}(earn|share of every|shares? of the fee|pays? back|rebate)|earn back a share of[^.]{0,40}fee|your holdings pay |||
F-OWN-THE-NETWORK ||| BLOCK ||| Ownership / equity framing of SWOP (FACTS: no comparison implying an investment case) ||| own(ing)? a piece of the network|piece of the network you |||
F-EFFECTIVE-RATE ||| BLOCK ||| Fee falling toward zero because you hold the token (F6 pull-quote shape) ||| effective rate[^.]{0,40}(drop|fall|lower|below|near zero)|near(ly)? zero at scale |||
F-COMPETITOR-UNCITED ||| WARN ||| Competitor fee comparison with no cited source (FACTS: must cite that competitor's own published fee docs) ||| ([0-9]([–-]|to )?[0-9]?(×|x))[^.]{0,30}(lower|cheaper|less)[^.]{0,40}(visa|stripe|paypal|square|coinbase)|sav(e|ing)[^.]{0,10}[0-9]+%[^.]{0,40}(card|processor|visa|stripe|paypal) ||| according to|published|pricing page|per (visa|stripe|paypal|square|coinbase)
F-WALLET-COUNT-TILE ||| BLOCK ||| Newsletter bento publishes a wallet/user TOTAL. The value comes from estimatedDocumentCount() — an estimate, and it counts internal test signups. FACTS: no public user number exists, never estimate ||| (swop )?wallets[^<]{0,24}(&middot;|·)[^<]{0,24}total|wallets created[^<]{0,24}(&middot;|·)[^<]{0,24}all time |||
F-RATINGS-COUNT ||| WARN ||| Cites the App Store ratings COUNT (FACTS: don't cite 35, link the listing) ||| (35|thirty-five)[^.]{0,30}(rating|review)|(rating|review)[s]?[^.]{0,20}\b35\b |||
F-PERPS-FEE-NO-CAVEAT ||| WARN ||| Perps/predictions "no fee" without the "today" caveat (FACTS: re-check before reuse) ||| (no|zero|doesn.t charge|does not charge|without a)[^.]{0,30}fee[^.]{0,40}(perp|prediction market) ||| today|at the time of|as of|re-check|for now|currently
F-SLIPPAGE-CAP ||| WARN ||| 50 bps slippage described as a cap/limit (FACTS: it is a DEFAULT, changeable) ||| (50 bps|0\.5%)[^.]{0,30}slippage[^.]{0,30}(cap|limit|maximum|max|ceiling)|slippage[^.]{0,20}(cap|capped|limited|maximum)[^.]{0,20}(50 bps|0\.5) ||| default
F-USER-COUNTS ||| WARN ||| A user / transaction count (FACTS: no public number exists — never estimate) ||| ([0-9][0-9,.]*(k|m|\+| thousand| million))[^.]{0,30}(users|wallets|transactions|customers|merchants)|(users|wallets|transactions)[^.]{0,20}(grew|passed|reached|topped)[^.]{0,20}[0-9] |||
F-INTERNAL-DETAIL ||| BLOCK ||| Internal implementation detail on a public surface (FACTS: describe behaviour, never configuration) ||| (CONNECT_CARD_MODE|OIDC scope|\bECS\b|\bRDS\b|\bALB\b|signing key id|privy server wallet|referral\.service\.js|RewardSettings\.js|privyWalletService|REWARDS_ARCHITECTURE) |||
F-MINT-ADDRESS ||| WARN ||| SWOP mint address / decimals published (proposed row, not promoted) ||| GAehkgN1ZDNvavX81FmzCcwRnzekKMkSyUNq8WkMsjX1|9 decimals |||
F-COPYTRADE-UNPROMOTED ||| BLOCK ||| Copy-trade fee split / buyback mechanics (proposed rows, NOT promoted to Verified) ||| (copy[- ]trade|copied trader)[^.]{0,60}(0\.25|half|buyback|buys swop)|buyback[^.]{0,40}jupiter |||
F-CUSTODY-KEEPS ||| WARN ||| "Swop keeps X% " — asserts net margin; verified wording is "charges" ||| swop keeps[^.]{0,20}(0\.5|half|[0-9]+%) |||
F-CARD-PROCEEDS ||| BLOCK ||| Implies card proceeds land in a Swop wallet (FACTS: they never touch one) ||| card (proceeds|payments|revenue|money)[^.]{0,60}(into|to) (your|a|the) (swop )?wallet ||| never touch|don.t touch|do not touch
F-EXIT-HOLD ||| BLOCK ||| Unscoped exit promise, held 2026-10-02 while the bbeeb20e reduceOnly cap-read regression is live (FACTS row "Policy exits always open" is ON HOLD). DELETE THIS RULE when the hold block is deleted from FACTS.md — it reverts with the copy patch, not separately ||| always get out|trap(s)? you inside a position |||
EOF

if [[ $LIST -eq 1 ]]; then
  printf '%-24s %-6s %s\n' "RULE" "SEV" "CATCHES"
  while IFS= read -r rule; do
    [[ -z "$rule" ]] && continue
    id="${rule%% |||*}"; rest="${rule#*||| }"
    sev="${rest%% |||*}"; rest="${rest#*||| }"
    desc="${rest%% |||*}"
    printf '%-24s %-6s %s\n' "$id" "$sev" "$desc"
  done <<< "$RULES"
  exit 0
fi

# ---------------------------------------------------------------------------
# Surfaces. Published + anything staged for distribution.
# ---------------------------------------------------------------------------
if [[ ${#TARGETS[@]} -gt 0 ]]; then
  FILES=$(printf '%s\n' "${TARGETS[@]}")
else
  FILES=$(
    {
      [[ -f "$ROOT/llms.txt" ]] && echo "$ROOT/llms.txt"
      # EVERY root-level page, not just index.html. The first version of this list
      # named index.html alone, which is why F6 (the token-as-investment panel in
      # swop_fee_calculator.html, footer-linked site-wide) had to be found by hand.
      find "$ROOT" -maxdepth 1 -name '*.html' -type f 2>/dev/null
      find "$ROOT/pitch" -name '*.html' -type f 2>/dev/null
      find "$ROOT/blog" -name '*.html' -type f 2>/dev/null
      find "$ROOT/editorial/distribution" -type f \( -name '*.txt' -o -name '*.json' -o -name '*.md' \) 2>/dev/null
      find "$ROOT/editorial/social" -type f \( -name '*.txt' -o -name '*.json' \) 2>/dev/null
      # Email is a published surface too. The newsletter base template ships to every
      # subscriber, and the issue archive is where a bad claim has already landed.
      [[ -f "$ROOT/editorial/newsletter-base.html" ]] && echo "$ROOT/editorial/newsletter-base.html"
      [[ -n "${NEWSLETTER_ARCHIVE:-}" ]] && find "$NEWSLETTER_ARCHIVE" -name 'Swop_Daily*.html' -type f 2>/dev/null
    } | sort -u
  )
fi

FILE_COUNT=$(printf '%s\n' "$FILES" | grep -c . || true)

BLOCK_HITS=0
WARN_HITS=0

echo "fact-drift sweep · $(date '+%Y-%m-%d %H:%M') · $FILE_COUNT surfaces under $ROOT"
echo

while IFS= read -r rule; do
  [[ -z "$rule" ]] && continue
  id="${rule%% |||*}";   rest="${rule#*||| }"
  sev="${rest%% |||*}";  rest="${rest#*||| }"
  desc="${rest%% |||*}"; rest="${rest#*||| }"
  deny="${rest%% |||*}"
  allow="${rest#*||| }"
  [[ "$allow" == "$deny" ]] && allow=""

  hits=""
  while IFS= read -r f; do
    [[ -z "$f" ]] && continue
    matched=$(grep -niE "$deny" "$f" 2>/dev/null || true)
    [[ -z "$matched" ]] && continue
    if [[ -n "${allow// /}" ]]; then
      matched=$(printf '%s\n' "$matched" | grep -viE "$allow" || true)
    fi
    [[ -z "$matched" ]] && continue
    while IFS= read -r m; do
      [[ -z "$m" ]] && continue
      ln="${m%%:*}"; txt="${m#*:}"
      txt=$(printf '%s' "$txt" | sed 's/^[[:space:]]*//' | cut -c1-150)
      hits+="    ${f#$ROOT/}:${ln}
      ${txt}
"
    done <<< "$matched"
  done <<< "$FILES"

  if [[ -n "$hits" ]]; then
    n=$(printf '%s' "$hits" | grep -c ':[0-9]' || true)
    echo "[$sev] $id — $desc"
    printf '%s' "$hits"
    echo
    if [[ "$sev" == "BLOCK" ]]; then
      BLOCK_HITS=$((BLOCK_HITS + n))
    else
      WARN_HITS=$((WARN_HITS + n))
    fi
  fi
done <<< "$RULES"

echo "─────────────────────────────────────────────"
echo "BLOCK: $BLOCK_HITS    WARN: $WARN_HITS"

if [[ $BLOCK_HITS -gt 0 ]]; then
  echo "FAIL — a retracted or never-claim phrase is live on a published surface."
  exit 1
fi
if [[ $STRICT -eq 1 && $WARN_HITS -gt 0 ]]; then
  echo "FAIL (--strict) — warnings present."
  exit 1
fi
echo "PASS — no fact drift on published surfaces."
exit 0
