#!/usr/bin/env bash
#
# build-daily.sh — build one Swop Daily issue and send Travis a test copy.
#
# WHY THIS EXISTS
#   The documented pipeline in NEWSLETTER.md is four commands across two repos,
#   one of which must run with its CWD inside swop-app-backend. QUILL cannot run
#   any of them (the sandbox denies `node <script>` and compound commands), so
#   every issue has waited on Travis pasting four commands in the right order.
#   Issues #90, #91 and #92 all died waiting. This collapses it to one command.
#
# WHAT IT DOES NOT DO
#   It never sends the broadcast. The last step is a --test copy to Travis only.
#   The broadcast to the "Swop Daily" audience stays a separate, deliberate,
#   permit-gated command, printed at the end for you to run after you've read
#   the test copy. Do not add --send to this script.
#
# USAGE
#   bash editorial/build-daily.sh 93
#   bash editorial/build-daily.sh 93 --max-age-hours 12   # rebuild, same market file
#
set -euo pipefail

ISSUE="${1:-}"
if [[ -z "$ISSUE" ]]; then
  echo "usage: bash editorial/build-daily.sh <issue-number> [extra fill args]" >&2
  exit 2
fi
shift || true
EXTRA_ARGS=("$@")

SITE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$(cd "$SITE_DIR/../swop-app-backend" 2>/dev/null && pwd || true)"
ICLOUD_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Documents/Claude/Projects/Swop"
TODAY="$(date +%F)"

TEMPLATE="$SITE_DIR/editorial/issues/issue-${ISSUE}.template.html"
OUT="$ICLOUD_DIR/Swop_Daily_Newsletter_${TODAY}.html"
STATS="$SITE_DIR/editorial/issues/.stats-${TODAY}.json"

cd "$SITE_DIR"

[[ -f "$TEMPLATE" ]] || { echo "✗ no template at $TEMPLATE" >&2; exit 1; }
[[ -n "$BACKEND_DIR" ]] || { echo "✗ swop-app-backend not found next to swop-website" >&2; exit 1; }

echo "── Swop Daily #${ISSUE} · ${TODAY} ──────────────────────────────"
echo "   template : editorial/issues/issue-${ISSUE}.template.html"
echo "   out      : $OUT"
echo

# ── 1. fetch market data once ────────────────────────────────────────
# Steps 1 and 4 deliberately share ONE market file. Two fetches let the
# tiles and the prose disagree, and a re-fetch rotates tokenOfTheDay.
#
# REBUILD MODE: passing --max-age-hours means "rebuild against the market
# file I already approved a token from". Fetching again in that mode would
# rotate tokenOfTheDay out from under the yes you already gave — the exact
# thing the shared-market-file rule exists to prevent — so rebuild mode
# reuses the newest existing file and does not fetch.
REBUILD=0
# NB: written as an `if`, not `[[ … ]] && REBUILD=1`. Under `set -e` a trailing
# AND-list whose test fails returns non-zero and kills the script.
for a in ${EXTRA_ARGS[@]+"${EXTRA_ARGS[@]}"}; do
  if [[ "$a" == "--max-age-hours" ]]; then REBUILD=1; fi
done

if [[ "$REBUILD" == "1" ]]; then
  MARKET="$(ls -t editorial/issues/.market-*.json 2>/dev/null | head -1 || true)"
  [[ -n "$MARKET" ]] || {
    echo "✗ rebuild mode (--max-age-hours) but no market file exists to rebuild from." >&2
    echo "  Drop --max-age-hours to fetch one." >&2
    exit 1
  }
  MARKET_AGE_H=$(( ( $(date +%s) - $(stat -f %m "$MARKET") ) / 3600 ))
  echo "1/4  rebuild mode — REUSING market file, not fetching"
  echo "     $MARKET  (~${MARKET_AGE_H}h old; tokenOfTheDay unchanged)"
else
  echo "1/4  fetching market data…"
  node editorial/newsletter-fill.js --inspect
  MARKET="$(ls -t editorial/issues/.market-*.json 2>/dev/null | head -1 || true)"
  [[ -n "$MARKET" ]] || { echo "✗ --inspect wrote no market file" >&2; exit 1; }
  echo "     market file: $MARKET"
fi
echo

# ── 2. the token-of-the-day editorial gate ───────────────────────────
# newsletter-market-data.js picks the trending non-major with the largest
# ABSOLUTE 24h move and applies NO editorial filter, so it can hand you a
# crash or a slur. On 2026-09-10 it returned "Hunter Biden's Laptop" at -63%.
# --totd-ok is a human sign-off, not a flag to paste.
echo "2/4  token-of-the-day editorial check"
node -e '
  const fs = require("fs");
  const m = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
  const t = m.tokenOfTheDay || {};
  const show = (k, v) => console.log("     " + k.padEnd(12) + (v ?? "—"));
  show("name", t.name); show("symbol", t.symbol);
  show("24h %", t.change24h ?? t.priceChangePercentage24h);
  show("price", t.price); show("mcap", t.marketCap); show("rank", t.marketCapRank);
' "$MARKET"
cat <<'GATE'

     Check, before you say yes:
       • Politically charged, partisan or offensive name?  → do NOT ship it.
       • A faller? Fine to feature, but it must READ as a faller.
       • A real asset with a real story ($50M+ mcap, non-major, recognisable)?
GATE
read -r -p "     Ship this token of the day? [yes/no] " TOTD_ANSWER
if [[ "$TOTD_ANSWER" != "yes" ]]; then
  cat >&2 <<'NOPE'

✗ Stopped at the editorial gate — nothing was built, nothing was sent.
  To feature a different token, re-run `node editorial/newsletter-fill.js --inspect`
  to rotate the trending list, or pick a candidate by hand. Do not pass --totd-ok
  for a token you would not defend in print.
NOPE
  exit 3
fi
echo

# ── 3. bento ledgers (must run with CWD inside the backend repo) ─────
# The fill script hard-fails on a missing ledger key rather than emitting a
# literal [TBD], because sends are automatic. Hand-writing this file is
# explicitly rejected.
echo "3/4  pulling bento ledgers from swop-app-backend…"
( cd "$BACKEND_DIR" && node "$SITE_DIR/editorial/newsletter-audience-sync.js" --dry-run ) > "$STATS"
echo "     stats file: editorial/issues/.stats-${TODAY}.json"

# audience-sync has one --dry-run exit path that returns WITHOUT the bento
# ledgers: when it cannot resolve the "Swop Daily" audience id, it prints
# {dryRun, eligible, audience:"would create ..."} and returns. Downstream that
# surfaces as an opaque missing-ledger-key failure in step 4 — i.e. after you
# have already spent the token-of-the-day gate. Fail here, with the reason.
if ! grep -q 'winnings_paid_7d_usd' "$STATS"; then
  echo "✗ stats file has no bento ledgers." >&2
  echo "  audience-sync could not resolve the \"Swop Daily\" audience — check" >&2
  echo "  RESEND_API_KEY / RESEND_AUDIENCE_ID and editorial/resend.config.json." >&2
  echo "  Nothing was built, nothing was sent." >&2
  exit 1
fi
echo

# ── 4. build from that SAME fetch, then test-copy to Travis ──────────
echo "4/4  building…"
node editorial/newsletter-fill.js --build \
  --template "$TEMPLATE" \
  --market   "$MARKET" \
  --stats    "$STATS" \
  --totd-ok \
  --out      "$OUT" \
  "${EXTRA_ARGS[@]+"${EXTRA_ARGS[@]}"}"

echo
echo "✓ built: $OUT"
echo
echo "     sending a TEST copy to travis@swopme.co (not the audience)…"
node editorial/newsletter-send.js \
  --html "$OUT" \
  --subject "Swop Daily #${ISSUE} — $(date +'%b %-d')" \
  --test travis@swopme.co

cat <<EOF

────────────────────────────────────────────────────────────────────
✓ Done. A test copy is in travis@swopme.co. Read it before sending.

The broadcast is NOT part of this script and needs your explicit yes:

  # a) sync the audience FIRST — this script only ran audience-sync in
  #    --dry-run (read-only), so no wallet that signed up during the
  #    16-day dark run is in the "Swop Daily" audience yet. Skipping this
  #    sends to a stale list; it writes to Resend, so it is your call:
  cd ../swop-app-backend && node ../swop-website/editorial/newsletter-audience-sync.js

  # b) then broadcast:
  node editorial/newsletter-send.js \\
    --html "$OUT" \\
    --subject "Swop Daily #${ISSUE} — <hook>" \\
    --send

Expiry: the market file passes its 6h --max-age-hours guard six hours
after its fetchedAt. Past that, re-run this script with
\`--max-age-hours 12\` against the SAME market file — never a re-fetch,
which rotates tokenOfTheDay. Past midnight local it is a rewrite, not a
rebuild: discard this issue and build the next number.
────────────────────────────────────────────────────────────────────
EOF
