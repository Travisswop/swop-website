#!/bin/bash
# publish-retention-cluster.sh — publish the staged R1–R4 retention posts.
#
# Collapses the four draft READMEs' 7-step checklists (28 manual steps, plus date
# bumps and three hand-maintained index files) into one command.
#
#   Usage: editorial/publish-retention-cluster.sh <count 1-4> <YYYY-MM-DD> [--apply]
#
#   <count>  how many posts to publish, in PREFIX ORDER R1 -> R2 -> R3 -> R4.
#            The cluster cross-links backwards only, so a prefix is the only safe
#            subset. Publishing R4 alone would ship live 404s. Links to posts you
#            are NOT publishing are unwrapped to plain text automatically.
#   <date>   publish date. Every date inside each post is rewritten to it.
#   --apply  actually do it. WITHOUT THIS FLAG THE SCRIPT ONLY REPORTS (dry run).
#
# Written by QUILL 2026-10-08. QUILL could not execute this file: `node`, `python3`
# with args and headless Chrome are all denied in the drafting sandbox. It was
# reviewed by reading, and the review is in editorial/issues/PUBLISH-CLUSTER-REVIEW.md.
# Read that before --apply. Dry run first; it is the default for that reason.

set -uo pipefail

ME="$(basename "$0")"
APPLY=0
FEATURED_OVERRIDE=""

die()  { printf '\n\033[31mFAIL\033[0m  %s\n' "$*" >&2; exit 1; }
ok()   { printf '\033[32m  ok\033[0m  %s\n' "$*"; }
warn() { printf '\033[33mnote\033[0m  %s\n' "$*"; }
step() { printf '\n\033[1m%s\033[0m\n' "$*"; }
run()  { if [ "$APPLY" = 1 ]; then "$@" || die "command failed: $*"; else printf '       would run: %s\n' "$*"; fi; }

# ---------------------------------------------------------------- arguments
COUNT="${1:-}"
DATE="${2:-}"
shift 2 2>/dev/null || true
while [ "$#" -gt 0 ]; do
  case "$1" in
    --apply)    APPLY=1 ;;
    --featured) FEATURED_OVERRIDE="${2:-}"; shift ;;
    *) die "unknown argument: $1" ;;
  esac
  shift
done

case "$COUNT" in 1|2|3|4) ;; *) die "usage: $ME <count 1-4> <YYYY-MM-DD> [--apply]" ;; esac
case "$DATE" in
  [0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]) ;;
  *) die "date must be YYYY-MM-DD, got '${DATE}'" ;;
esac

# ---------------------------------------------------------------- post table
# Prefix order is load-bearing: R1 has no in-cluster outbound links, R2 -> R1,
# R3 -> R1+R2, R4 -> R1+R2+R3.
SLUGS="sent-crypto-to-wrong-address token-not-showing-in-wallet crypto-transaction-still-pending crypto-swap-failed"

# Authored dates, used to find-and-replace the dates inside each post.
authored_date() { case "$1" in
  sent-crypto-to-wrong-address)      echo "2026-10-05" ;;
  token-not-showing-in-wallet)       echo "2026-10-05" ;;
  crypto-transaction-still-pending)  echo "2026-10-06" ;;
  crypto-swap-failed)                echo "2026-10-07" ;;
esac; }
authored_human() { case "$1" in
  sent-crypto-to-wrong-address)      echo "Oct 5, 2026" ;;
  token-not-showing-in-wallet)       echo "Oct 5, 2026" ;;
  crypto-transaction-still-pending)  echo "Oct 6, 2026" ;;
  crypto-swap-failed)                echo "Oct 7, 2026" ;;
esac; }
post_title() { case "$1" in
  sent-crypto-to-wrong-address)      echo "Sent crypto to the wrong address or wrong network" ;;
  token-not-showing-in-wallet)       echo "Token not showing in your wallet? Start with the chain" ;;
  crypto-transaction-still-pending)  echo "Why is my crypto transaction still pending?" ;;
  crypto-swap-failed)                echo "Crypto swap failed? Where your money actually went" ;;
esac; }
# Short index-row deks, house voice. Deliberately NOT the long art-dek.
row_dek() { case "$1" in
  sent-crypto-to-wrong-address)      echo "Irreversible is not the same as lost. What you get back depends on who controls the destination." ;;
  token-not-showing-in-wallet)       echo "Your balance list is a view of the chain, not the chain itself. One explorer check settles it." ;;
  crypto-transaction-still-pending)  echo "Pending means the network has not decided yet. Nothing has left and nothing has arrived." ;;
  crypto-swap-failed)                echo "A swap that fails does nothing &mdash; both legs are discarded together. The case worth checking is the one that succeeded." ;;
esac; }
read_time() { case "$1" in
  sent-crypto-to-wrong-address)      echo "6 min" ;;
  token-not-showing-in-wallet)       echo "6 min" ;;
  crypto-transaction-still-pending)  echo "7 min" ;;
  crypto-swap-failed)                echo "8 min" ;;
esac; }
llms_line() { case "$1" in
  sent-crypto-to-wrong-address)      echo "- [Sent crypto to the wrong address](https://www.swopme.co/blog/sent-crypto-to-wrong-address): which wrong-address and wrong-network mistakes are recoverable, which are not, and how recovery scams work" ;;
  token-not-showing-in-wallet)       echo "- [Token not showing in your wallet](https://www.swopme.co/blog/token-not-showing-in-wallet): why a token goes missing from a balance list, and how to confirm on a block explorer that it actually arrived" ;;
  crypto-transaction-still-pending)  echo "- [Why is my crypto transaction still pending?](https://www.swopme.co/blog/crypto-transaction-still-pending): what pending means, the three ways it can end, and what to do while it is undecided" ;;
  crypto-swap-failed)                echo "- [Crypto swap failed?](https://www.swopme.co/blog/crypto-swap-failed): why a same-chain swap does both legs or neither, where cross-chain genuinely differs, and how to confirm your input never moved" ;;
esac; }
# The query line each post targets, as it must read in QUERIES.md once promoted.
query_text() { case "$1" in
  sent-crypto-to-wrong-address)      echo "sent crypto to the wrong address" ;;
  token-not-showing-in-wallet)       echo "token not showing in wallet" ;;
  crypto-transaction-still-pending)  echo "why is my crypto transaction still pending" ;;
  crypto-swap-failed)                echo "crypto swap failed" ;;
esac; }

# Build the publish list (first COUNT slugs) and the held-back list.
PUBLISH=""; HELD=""; i=0
for s in $SLUGS; do
  i=$((i+1))
  if [ "$i" -le "$COUNT" ]; then PUBLISH="$PUBLISH $s"; else HELD="$HELD $s"; fi
done
PUBLISH="${PUBLISH# }"; HELD="${HELD# }"

# Featured post: the cluster hub (R3) if it is in this batch, else the last one.
# R3 triages and links out to the others, so it is the right front door.
FEATURED=""
for s in $PUBLISH; do FEATURED="$s"; done
case " $PUBLISH " in *" crypto-transaction-still-pending "*) FEATURED="crypto-transaction-still-pending" ;; esac
if [ -n "$FEATURED_OVERRIDE" ]; then
  case " $PUBLISH " in
    *" $FEATURED_OVERRIDE "*) FEATURED="$FEATURED_OVERRIDE" ;;
    *) die "--featured '$FEATURED_OVERRIDE' is not in this batch" ;;
  esac
fi

printf '\n\033[1m%s\033[0m — publishing %s post(s) dated %s\n' "$ME" "$COUNT" "$DATE"
[ "$APPLY" = 1 ] && warn "--apply given: this WILL modify the working tree." \
                 || warn "DRY RUN. Nothing will be modified. Add --apply to execute."

# ---------------------------------------------------------------- preflight
step "1/8  Preflight"

[ -f sitemap.xml ] && [ -f llms.txt ] && [ -d blog ] && [ -d editorial ] \
  || die "run this from the swop-website repo root (sitemap.xml, llms.txt, blog/, editorial/ must be here)"
ok "repo root"

# --- THE STALENESS GUARD. This is the check whose absence is the real bug. ---
# The four draft READMEs all say "update blog/index.html, sitemap.xml, llms.txt".
# Those three files are HAND-MAINTAINED, and on 2026-10-08 this working copy was
# THREE POSTS BEHIND main: settlement-is-the-product, banking-the-unbanked-self-custody
# and accept-crypto-payments-freelancer were live on prod and absent from all three
# files here. Editing them from a stale checkout and pushing would have DE-LISTED
# three live posts from the sitemap and the index. A push IS a production deploy
# (CLAUDE.md), so there is no staging step that would have caught it.
command -v git >/dev/null 2>&1 || die "git not found"
git rev-parse --is-inside-work-tree >/dev/null 2>&1 || die "not a git work tree"

BRANCH="$(git rev-parse --abbrev-ref HEAD 2>/dev/null)"
[ "$BRANCH" = "main" ] || die "on branch '$BRANCH'; publish from main (a push to main IS a production deploy)"
ok "on main"

if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
  git status --short
  die "working tree is dirty. Commit or stash first — this script edits tracked files and you want a clean diff to review."
fi
ok "working tree clean"

git fetch origin main --quiet 2>/dev/null || die "could not fetch origin/main — check the network before publishing"
LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse origin/main)"
if [ "$LOCAL" != "$REMOTE" ]; then
  BEHIND="$(git rev-list --count HEAD..origin/main 2>/dev/null || echo '?')"
  AHEAD="$(git rev-list --count origin/main..HEAD 2>/dev/null || echo '?')"
  printf '       local HEAD  %s\n       origin/main %s\n       behind by %s commit(s), ahead by %s\n' \
    "$LOCAL" "$REMOTE" "$BEHIND" "$AHEAD"
  die "this checkout is NOT level with origin/main. Run 'git pull --ff-only origin main' and re-run.
      sitemap.xml, blog/index.html and llms.txt are hand-maintained flat files; editing
      them from a stale checkout silently de-lists any post that landed on main since
      you last pulled. This exact condition was true on 2026-10-08 (3 posts behind)."
fi
ok "level with origin/main (sitemap/index/llms.txt are current)"

# --- QUERIES.md promotion gate. QUILL must not publish to an unpromoted query. ---
# QUERIES.md line 4: "Travis curates; the agent may APPEND candidate queries ...
# but never writes to them until they are moved up." Promotion is Travis's call,
# so this script verifies it rather than performing it.
PROPOSED_LINE="$(grep -n '^## Proposed' editorial/QUERIES.md | head -1 | cut -d: -f1)"
[ -n "$PROPOSED_LINE" ] || die "could not find a '## Proposed' heading in editorial/QUERIES.md"
for s in $PUBLISH; do
  q="$(query_text "$s")"
  if head -n "$((PROPOSED_LINE - 1))" editorial/QUERIES.md | grep -qiF -- "$q"; then
    ok "query promoted: \"$q\""
  else
    die "query NOT promoted: \"$q\"
      It must appear ABOVE the '## Proposed' heading in editorial/QUERIES.md
      (line $PROPOSED_LINE) before $s can be published. That promotion is Travis's
      editorial call and this script will not make it for him. Add, under
      '## SEO keywords':
          - $q  <!-- promoted $DATE -->"
  fi
done

for s in $PUBLISH; do
  [ -f "editorial/drafts/$s/index.html" ] || die "missing editorial/drafts/$s/index.html"
  [ -f "editorial/drafts/$s/og.html" ]    || die "missing editorial/drafts/$s/og.html"
  [ -e "blog/$s" ] && die "blog/$s already exists — refusing to overwrite a published post"
done
ok "all $COUNT draft folder(s) present, no destination collisions"

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
[ -x "$CHROME" ] || die "headless Chrome not found at:
      $CHROME
      Banners cannot be rendered without it. All four og.png files must be
      (re-)rendered: R1's and R2's committed PNGs are off-brand system-font
      fallbacks from 2026-10-06, and R3/R4 have none at all."
ok "headless Chrome present"

grep -q '<span class="eyebrow count mono">[0-9]* posts</span>' blog/index.html \
  || die "could not find the post-count label in blog/index.html — its markup changed; update this script"
grep -q '<loc>https://www.swopme.co/blog</loc>' sitemap.xml \
  || die "could not find the blog index <loc> anchor in sitemap.xml — update this script"
grep -q '^- \[Support\](https://support.swop.id)' llms.txt \
  || die "could not find the Support line anchor in llms.txt — update this script"
ok "all three index files have the anchors this script edits"

printf '\n       publishing : %s\n' "$PUBLISH"
printf '       holding    : %s\n' "${HELD:-(none)}"
printf '       featured   : %s\n' "$FEATURED"

# ---------------------------------------------------------------- move
step "2/8  Move drafts into blog/"
for s in $PUBLISH; do
  run mv "editorial/drafts/$s" "blog/$s"
  ok "blog/$s"
done

# ---------------------------------------------------------------- prune links
step "3/8  Unwrap cross-links to held-back posts"
if [ -z "$HELD" ]; then
  ok "whole cluster shipping — no links to prune"
else
  for s in $PUBLISH; do
    f="blog/$s/index.html"
    for h in $HELD; do
      if [ "$APPLY" = 1 ]; then
        [ -f "$f" ] || die "expected $f after the move"
        # Replace <a class="link" href="/blog/HELD">text</a> with just: text
        # All cluster cross-links use exactly this one-line shape (verified
        # 2026-10-08: R2 L159, R3 L174/L177, R4 L166/L178/L197).
        perl -0777 -pi -e "s{<a class=\"link\" href=\"/blog/\Q$h\E\">(.*?)</a>}{\$1}gs" "$f" \
          || die "link prune failed in $f for $h"
      else
        n="$(grep -c "href=\"/blog/$h\"" "editorial/drafts/$s/index.html" 2>/dev/null || echo 0)"
        [ "$n" != "0" ] && printf '       would unwrap %s link(s) to %s in %s\n' "$n" "$h" "$s"
      fi
    done
    if [ "$APPLY" = 1 ]; then
      for h in $HELD; do
        grep -q "href=\"/blog/$h\"" "$f" && die "a link to held-back $h survived in $f — would ship a 404"
      done
      ok "$s has no links to held-back posts"
    fi
  done
fi

# ---------------------------------------------------------------- dates
step "4/8  Rewrite dates to $DATE"
# `%-d` (unpadded day) is a GNU extension that BSD date happens to honour on this
# Mac — confirmed by a real execution logged in issue-93.HANDOFF.md ("date +'%b %-d'
# ... returns Oct 4 on this Mac"). The shape check below is what catches it if that
# ever stops being true, rather than writing "Oct %-d, 2026" into six places.
HUMAN="$(date -j -f %Y-%m-%d "$DATE" "+%b %-d, %Y" 2>/dev/null)"
case "$HUMAN" in
  [A-Z][a-z][a-z]" "[0-9]", "[0-9][0-9][0-9][0-9]|[A-Z][a-z][a-z]" "[0-9][0-9]", "[0-9][0-9][0-9][0-9]) ;;
  *) die "date formatting produced '$HUMAN', which is not 'Mon D, YYYY'.
      Your date(1) does not support the %-d specifier. Pass the human date yourself
      by editing the HUMAN= line, or install coreutils." ;;
esac
ok "human date: $HUMAN"
for s in $PUBLISH; do
  f="blog/$s/index.html"
  ad="$(authored_date "$s")"; ah="$(authored_human "$s")"
  if [ "$ad" = "$DATE" ]; then
    ok "$s already dated $DATE"
    continue
  fi
  if [ "$APPLY" = 1 ]; then
    # Machine dates: article:published_time, article:modified_time, JSON-LD
    # datePublished + dateModified. Visible: the two art-meta spans.
    sed -i '' -e "s|$ad|$DATE|g" -e "s|$ah|$HUMAN|g" "$f" || die "date rewrite failed in $f"
    # grep -E, not "a\|b": \| as alternation is a GNU BRE extension and this has
    # to be right on BSD grep. -F would be safer still but cannot express the OR.
    left="$(grep -Ec -- "$ad|$ah" "$f" || true)"
    [ "$left" = "0" ] || die "$left stale date string(s) left in $f"
    ok "$s: $ad -> $DATE, \"$ah\" -> \"$HUMAN\""
  else
    n="$(grep -Ec -- "$ad|$ah" "editorial/drafts/$s/index.html" 2>/dev/null || echo 0)"
    printf '       would rewrite %s date string(s) in %s (%s -> %s)\n' "$n" "$s" "$ad" "$DATE"
  fi
done

# ---------------------------------------------------------------- banners
step "5/8  Render banners"
for s in $PUBLISH; do
  if [ "$APPLY" = 1 ]; then
    d="blog/$s"
    "$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
      --window-size=1200,630 --screenshot="$d/og.png" "file://$(cd "$d" && pwd)/og.html" \
      >/dev/null 2>&1 || die "Chrome failed rendering $s"
    [ -f "$d/og.png" ] || die "no og.png produced for $s"
    sz="$(wc -c < "$d/og.png" | tr -d ' ')"
    [ "$sz" -gt 40000 ] || die "og.png for $s is only ${sz} bytes — suspiciously small, check it by eye"
    ok "$s/og.png (${sz} bytes)"
  else
    printf '       would render blog/%s/og.png\n' "$s"
  fi
done
warn "EYEBALL EACH BANNER: the SWOP logo, eyebrow and URL must be MONOSPACED"
warn "(JetBrains Mono) and the headline Inter Tight Black. If they look like plain"
warn "system sans, the @font-face paths did not resolve — that is the 2026-10-06 bug"
warn "that shipped two off-brand PNGs. Compare against blog/usdc-vs-usdce/og.png."

# ---------------------------------------------------------------- sitemap
step "6/8  sitemap.xml"
SITEMAP_ADD="$(mktemp -t swop-sitemap)" || die "mktemp failed"
for s in $PUBLISH; do
  printf '  <url><loc>https://www.swopme.co/blog/%s</loc><lastmod>%s</lastmod></url>\n' "$s" "$DATE" >> "$SITEMAP_ADD"
done
printf '       new entries:\n'; sed 's/^/       /' "$SITEMAP_ADD"
if [ "$APPLY" = 1 ]; then
  awk -v add="$SITEMAP_ADD" -v d="$DATE" '
    /<loc>https:\/\/www\.swopme\.co\/blog<\/loc>/ && !inserted {
      sub(/<lastmod>[0-9-]*<\/lastmod>/, "<lastmod>" d "</lastmod>")
      print
      while ((getline line < add) > 0) print line
      close(add)
      inserted = 1
      next
    }
    { print }
    END { if (!inserted) exit 3 }
  ' sitemap.xml > sitemap.xml.new
  rc=$?
  [ "$rc" = 3 ] && { rm -f sitemap.xml.new; die "sitemap.xml anchor never matched — nothing inserted"; }
  [ "$rc" = 0 ] || { rm -f sitemap.xml.new; die "awk failed on sitemap.xml (rc=$rc)"; }
  for s in $PUBLISH; do
    grep -q "blog/$s</loc>" sitemap.xml.new || die "sitemap insert verification failed for $s"
  done
  grep -q '</urlset>' sitemap.xml.new || die "sitemap.xml.new looks truncated"
  mv sitemap.xml.new sitemap.xml || die "could not replace sitemap.xml"
  ok "$COUNT entry/entries added, blog index lastmod bumped to $DATE"
fi
rm -f "$SITEMAP_ADD"

# ---------------------------------------------------------------- llms.txt
step "7/8  llms.txt"
LLMS_ADD="$(mktemp -t swop-llms)" || die "mktemp failed"
for s in $PUBLISH; do llms_line "$s" >> "$LLMS_ADD"; done
printf '       new entries:\n'; sed 's/^/       /' "$LLMS_ADD"
if [ "$APPLY" = 1 ]; then
  awk -v add="$LLMS_ADD" '
    /^- \[Support\]\(https:\/\/support\.swop\.id\)/ && !inserted {
      while ((getline line < add) > 0) print line
      close(add); inserted = 1
    }
    { print }
    END { if (!inserted) exit 3 }
  ' llms.txt > llms.txt.new
  rc=$?
  [ "$rc" = 3 ] && { rm -f llms.txt.new; die "llms.txt anchor never matched — nothing inserted"; }
  [ "$rc" = 0 ] || { rm -f llms.txt.new; die "awk failed on llms.txt (rc=$rc)"; }
  for s in $PUBLISH; do
    grep -q "blog/$s)" llms.txt.new || die "llms.txt insert verification failed for $s"
  done
  mv llms.txt.new llms.txt || die "could not replace llms.txt"
  ok "$COUNT cornerstone line(s) added"
fi
rm -f "$LLMS_ADD"

# ---------------------------------------------------------------- index rows
step "8/8  blog/index.html rows + count"
ROWS_ADD="$(mktemp -t swop-rows)" || die "mktemp failed"
SHORTDATE="$(date -j -f %Y-%m-%d "$DATE" "+%b %-d" 2>/dev/null)"
[ -n "$SHORTDATE" ] || die "could not format short date from '$DATE'"
# Newest-first within the batch: reverse prefix order, minus whatever is featured.
REV=""
for s in $PUBLISH; do REV="$s $REV"; done
for s in $REV; do
  [ "$s" = "$FEATURED" ] && continue
  printf '<a class="row" href="/blog/%s"><span class="date mono">%s</span><span class="tag mono">Guides</span><span class="row-main"><span class="t tight">%s</span><span class="d">%s</span></span><span class="rt mono">%s</span></a>\n' \
    "$s" "$SHORTDATE" "$(post_title "$s")" "$(row_dek "$s")" "$(read_time "$s")" >> "$ROWS_ADD"
done
NROWS="$(wc -l < "$ROWS_ADD" | tr -d ' ')"
printf '       %s row(s) to insert at the top of .list (%s goes in the featured slot)\n' "$NROWS" "$FEATURED"

if [ "$APPLY" = 1 ]; then
  if [ "$NROWS" -gt 0 ]; then
    awk -v add="$ROWS_ADD" '
      /<div class="list">/ && !inserted {
        print
        while ((getline line < add) > 0) print line
        close(add); inserted = 1
        next
      }
      { print }
      END { if (!inserted) exit 3 }
    ' blog/index.html > blog/index.html.new
    rc=$?
    [ "$rc" = 3 ] && { rm -f blog/index.html.new; die '<div class="list"> anchor never matched in blog/index.html'; }
    [ "$rc" = 0 ] || { rm -f blog/index.html.new; die "awk failed on blog/index.html (rc=$rc)"; }
    grep -q '<div class="list">' blog/index.html.new || die "index.html.new lost its .list container"
    for s in $PUBLISH; do
      [ "$s" = "$FEATURED" ] && continue
      grep -q "class=\"row\" href=\"/blog/$s\"" blog/index.html.new || die "row insert verification failed for $s"
    done
    mv blog/index.html.new blog/index.html || die "could not replace blog/index.html"
  fi
  # Count is recomputed from the file, never by arithmetic on the old label — the old
  # label said "26 posts" while prod had 30.
  #
  # The "+ 2" is deliberate and is NOT the file's usual rows+1 convention. At this
  # point the index is mid-swap: the featured post this run selected is not yet a row
  # (it is going into the featured slot by hand) and the post being demoted is still
  # in the featured slot rather than in the list. So two real posts are absent from
  # the row count, and the correct FINAL total is rows + 2.
  #
  # This means the label is right the moment the two pastes are done, and reads one
  # too high until then. That is the better failure direction: a label that disagrees
  # with a half-finished page is a visible nudge to finish it, whereas rows + 1 would
  # look correct now and silently ship "29 posts" on a page listing 30.
  ROW_COUNT="$(grep -c '<a class="row" href="/blog/' blog/index.html)"
  NEW_COUNT="$(( ROW_COUNT + 2 ))"
  sed -i '' "s|<span class=\"eyebrow count mono\">[0-9]* posts</span>|<span class=\"eyebrow count mono\">${NEW_COUNT} posts</span>|" blog/index.html \
    || die "count bump failed"
  ok "$NROWS row(s) inserted; count set to ${NEW_COUNT} posts (${ROW_COUNT} rows + the 2 posts in the featured swap)"
  warn "That label is correct ONLY once you finish the two pastes below."
fi
rm -f "$ROWS_ADD"

# ------------------------------------------------- featured block (manual paste)
# Written OUTSIDE the repo on purpose. This is a plain static site with no build
# step, so anything committed under editorial/ is reachable over HTTP. A stray HTML
# fragment in the repo is a page; in /tmp it is a scratch file.
FEAT_OUT="/tmp/swop-featured-${FEATURED}.html"
{
  printf '<!-- PASTE 1 of 2 — replace the whole existing <a class="feat" ...>...</a>\n'
  printf '     block in blog/index.html (the <section class="feature"> child) with this. -->\n'
  printf '<a class="feat" href="/blog/%s">\n' "$FEATURED"
  printf '<div class="kicker"><span class="pulse"></span>Latest &mdash; Guides</div>\n'
  printf '<div class="feat-l">\n'
  printf '<h2 class="tight">%s</h2>\n' "$(post_title "$FEATURED")"
  printf '<p class="dek">%s</p>\n' "$(row_dek "$FEATURED")"
  printf '<div class="by"><span class="ini">ST</span><span class="nm">Swop Team</span><span class="sep"></span><span class="mono">%s</span><span class="sep"></span><span class="mono">%s</span></div>\n' "$HUMAN" "$(read_time "$FEATURED")"
  printf '</div>\n'
  printf '<div class="feat-r">\n'
  printf '<div class="stat-row"><span class="k">Filed</span><span class="v mono">Guides</span></div>\n'
  printf '<div class="stat-row"><span class="k">Reading</span><span class="v mono">%s</span></div>\n' "$(read_time "$FEATURED")"
  printf '<div class="stat-row"><span class="k">Format</span><span class="v mono">Explainer &middot; FAQ</span></div>\n'
  printf '<span class="read">Read the post <span class="arw">&rarr;</span></span>\n'
  printf '</div>\n'
  printf '</a>\n\n'
  printf '<!-- PASTE 2 of 2 — the post you just demoted. Build its .row from the block\n'
  printf '     you replaced above and put it at the TOP of <div class="list">, i.e.\n'
  printf '     copy its href, <h2> title, <p class="dek">, date and reading time into:\n'
  printf '<a class="row" href="/blog/OLD-SLUG"><span class="date mono">MMM D</span><span class="tag mono">Guides</span><span class="row-main"><span class="t tight">OLD TITLE</span><span class="d">OLD DEK</span></span><span class="rt mono">N min</span></a>\n'
  printf '     The "N posts" label is ALREADY set to the correct final total and needs\n'
  printf '     no further edit once both pastes are in. -->\n'
} > "$FEAT_OUT" 2>/dev/null || warn "could not write $FEAT_OUT"

step "Featured slot — the one manual edit"
warn "Written to: $FEAT_OUT"
cat <<'EOF'
       This script does NOT touch the <a class="feat"> block, on purpose. Which post
       is featured depends on what landed on main since the last pull, so it cannot be
       known when this script was written, and parsing it out of live HTML is exactly
       where an untested script would corrupt the page. The file above contains the
       ready-made replacement block plus the shape of the row for the post you demote.
       Two pastes, one file, about a minute.
EOF

# ---------------------------------------------------------------- housekeeping
step "Housekeeping"
run mkdir -p editorial/distribution
for s in $PUBLISH; do
  run mv "blog/$s/distribution.md" "editorial/distribution/$s.md"
  run rm -f "blog/$s/README.md"
done
ok "distribution kits moved to editorial/distribution/, draft READMEs removed"
warn "Distribution kits are posted by a HUMAN, never auto-published (CLAUDE.md)."

step "Still yours to do by hand"
cat <<EOF
       1. The two pastes above, in blog/index.html.
       2. editorial/TOPICS.md — move the published topic lines into
          "Drafted (in review)" -> "Published", and delete the "Up next is empty"
          warning block. Editorial prose; not safely scriptable.
       3. Run editorial/fact-drift.sh over the published files if it covers blog/.
       4. Review the diff:  git diff --stat && git diff -- sitemap.xml llms.txt
       5. Commit and push. A PUSH IS A PRODUCTION DEPLOY (CLAUDE.md) — then VERIFY
          the deploy actually ran; pushes have silently produced zero deployments:
            curl -sI https://www.swopme.co/blog/$FEATURED | head -1
EOF

if [ "$APPLY" = 1 ]; then
  printf '\n\033[32mDONE\033[0m  %s post(s) staged in the working tree, uncommitted. Review, then push.\n\n' "$COUNT"
else
  printf '\n\033[33mDRY RUN COMPLETE\033[0m  nothing was modified. Re-run with --apply to execute.\n\n'
fi
