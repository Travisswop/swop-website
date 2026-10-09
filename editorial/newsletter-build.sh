#!/usr/bin/env bash
# QUILL's newsletter BUILD step. Fetches the numbers and fills a template.
# It deliberately CANNOT send anything: newsletter-send.js is never invoked here.
#
#   newsletter-build.sh fetch
#       Runs `newsletter-fill.js --inspect`: one market fetch, written to
#       editorial/issues/.market-<YYYY-MM-DD>.json, and prints the
#       token-of-the-day candidate so a human can make the editorial call
#       (NEWSLETTER.md "Token of the day" — the fetcher applies no filter and
#       has returned a politically charged memecoin before).
#
#   newsletter-build.sh build <N> <YYYY-MM-DD> --totd-ok [why-file]
#       Pulls the bento ledger with `newsletter-audience-sync.js --dry-run`
#       (read-only: --dry-run writes nothing to Resend and does not touch
#       resend.config.json) and fills editorial/issues/issue-<N>.template.html
#       into $ICLOUD/Swop_Daily_Newsletter_<YYYY-MM-DD>.html.
#
# Both steps share ONE market file on purpose — two fetches let the tiles and
# the prose disagree. Every guard inside newsletter-fill.js still applies:
# unfilled %%TOKEN%%, div imbalance, a div count that differs from
# newsletter-base.html, a market file older than 6h, a missing bento ledger key
# and a missing unsubscribe variable are all hard failures, not warnings.
#
# The draft step stays in newsletter-draft.sh; the send stays in
# newsletter-publish.sh (which requires ELDORADO_APPROVED=1).
set -euo pipefail

SWOP="$HOME/Desktop/SwopLive"
ICLOUD="$HOME/Library/Mobile Documents/com~apple~CloudDocs/Documents/Claude/Projects/Swop"
cd "$SWOP/swop-website"

case "${1:-}" in
  fetch)
    exec node editorial/newsletter-fill.js --inspect
    ;;

  build)
    N="${2:-}"; DATE="${3:-}"; OK="${4:-}"; WHY="${5:-}"

    case "$N" in ''|*[!0-9]*) echo "refused: issue number must be digits, got '$N'" >&2; exit 2;; esac
    case "$DATE" in
      [0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]) ;;
      *) echo "refused: date must be YYYY-MM-DD, got '$DATE'" >&2; exit 2;;
    esac
    if [ "$OK" != "--totd-ok" ]; then
      echo "refused: pass --totd-ok as the 3rd argument to record that a human checked the" >&2
      echo "         token-of-the-day NAME and framing (NEWSLETTER.md). Run 'fetch' first." >&2
      exit 2
    fi

    TEMPLATE="editorial/issues/issue-$N.template.html"
    MARKET="editorial/issues/.market-$DATE.json"
    OUT="$ICLOUD/Swop_Daily_Newsletter_$DATE.html"

    [ -f "$TEMPLATE" ] || { echo "refused: no such template $TEMPLATE" >&2; exit 2; }
    [ -f "$MARKET" ] || { echo "refused: no market file $MARKET — run 'newsletter-build.sh fetch' first" >&2; exit 2; }
    if [ -n "$WHY" ] && [ ! -f "$WHY" ]; then
      echo "refused: --why file '$WHY' does not exist" >&2; exit 2
    fi

    STATS="$(mktemp -t swop-stats)"
    trap 'rm -f "$STATS"' EXIT

    echo "== bento ledger (audience-sync --dry-run; no Resend writes) =="
    ( cd "$SWOP/swop-app-backend" && node ../swop-website/editorial/newsletter-audience-sync.js --dry-run ) > "$STATS"
    cat "$STATS"

    echo "== fill =="
    if [ -n "$WHY" ]; then
      node editorial/newsletter-fill.js --build \
        --template "$TEMPLATE" --market "$MARKET" --stats "$STATS" \
        --totd-ok --why "$WHY" --out "$OUT"
    else
      node editorial/newsletter-fill.js --build \
        --template "$TEMPLATE" --market "$MARKET" --stats "$STATS" \
        --totd-ok --out "$OUT"
    fi
    echo "== wrote $OUT =="
    ;;

  *)
    echo "usage: newsletter-build.sh fetch" >&2
    echo "       newsletter-build.sh build <N> <YYYY-MM-DD> --totd-ok [why-file]" >&2
    exit 2
    ;;
esac
