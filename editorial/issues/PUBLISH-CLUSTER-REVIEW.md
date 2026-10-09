# Review — `editorial/publish-retention-cluster.sh` (QUILL, 2026-10-08)

**Read this before running the script with `--apply`.** I wrote it and I could not
execute it: `node`, `python3` with arguments, `bash -n`, `date` with arguments and
headless Chrome are all denied in the drafting sandbox. So this is a review by
reading, in the same form as the `newsletter-build.sh` review in
`issue-97.HANDOFF.md`. The script is **dry-run by default** for exactly this reason —
run it with no `--apply` first and read the output.

---

## Why this script exists

The four draft READMEs each carry a 7-step publish checklist. Across four posts that
is **28 manual steps**, and they are not independent: three of the files being edited
(`sitemap.xml`, `blog/index.html`, `llms.txt`) are hand-maintained flat files shared
by all four posts, and each post additionally needs **six date strings** rewritten if
it does not publish on the day it was authored.

Five consecutive permits asking Travis to promote the queries have expired unanswered.
I think the shape of the ask is part of why. "Promote four lines, then do 28 careful
steps across four shared files" is a work order, not a decision. This script is an
attempt to turn it back into a decision: promote the lines, run one command, make two
pastes.

## The defect this script was really written to fix

The checklists say *"update `blog/index.html`, `sitemap.xml`, `llms.txt`"*. On
2026-10-08 I checked what those files actually contain in this working copy:

| | count |
|---|---|
| Posts live on prod (per the live sitemap) | **30** |
| `<url>` blog entries in local `sitemap.xml` | **27** (+1 author page) |
| `.row` entries in local `blog/index.html` | **25** (+1 featured = 26) |
| The label `blog/index.html` prints | **"26 posts"** |

`settlement-is-the-product`, `banking-the-unbanked-self-custody` and
`accept-crypto-payments-freelancer` are **live on prod and absent from all three
local files** — not in the sitemap, not in the index, not in `llms.txt`, and with no
`blog/<slug>/` directory. Grep confirms they appear nowhere in the repo except inside
newsletter issue templates.

**So following the checklist literally, from this checkout, and pushing would have
de-listed three live posts from the sitemap and the blog index.** `CLAUDE.md` says a
push to `main` *is* a production deploy, so there is no staging step that would have
caught it. The checklist's own arithmetic was also wrong in a way that pointed at
this — it said to bump the count "27 → 28" against a file that says 26.

This is the same failure mode as the off-brand banners on 2026-10-06: a file that
exists was treated as a file that is current. The fix is the preflight guard — the
script refuses to run unless `HEAD` is level with `origin/main`.

## What the script will not do

| Guarantee | How it is enforced |
|---|---|
| Cannot publish to an unpromoted query | Preflight extracts the line number of the first `^## Proposed` in `QUERIES.md` (line 40 today) and requires each post's query to appear **above** it. Dies with the exact line to add otherwise. **It never edits `QUERIES.md`** — promotion is Travis's call per that file's line 4 |
| Cannot email, post or deploy | No `curl`, no `git push`, no `git commit`, no reference to any `newsletter-*.js`, `post-to-x.js`, `smartsite-publish.js` or `feed-*.js`. It stops at an uncommitted working tree |
| Cannot run from a stale checkout | Requires branch `main`, a clean `git status --porcelain`, a successful `git fetch`, and `HEAD == origin/main` |
| Cannot overwrite a published post | `[ -e "blog/$s" ] && die` before any move |
| Cannot half-run silently | Every mutating command is `|| die`. Each of the three file edits writes to `.new`, verifies its own insert by grep, and only then `mv`s over the original |
| Cannot ship a 404 into the cluster | After pruning, re-greps each published post for links to every held-back post and dies if one survived |
| Cannot ship a blank banner | Dies if `og.png` is missing or under 40 KB after rendering |
| Cannot invent a post count | Recomputes the label from the file on disk, never by arithmetic on the old label — the old label was wrong. Note it writes `rows + 2`, **not** the file's usual `rows + 1`: mid-swap, the featured post this run picked is not yet a row and the post being demoted is not yet a row either, so two real posts are missing from the row count. The label is therefore correct the moment both pastes are done, and reads one too high until then — chosen deliberately over `rows + 1`, which would look right immediately and silently ship "29 posts" on a page listing 30 |
| Cannot leave a stray page in the repo | The featured block is written to `/tmp`, not `editorial/`. This is a static site with no build step, so a committed HTML fragment under `editorial/` would be a reachable page |

## Checks performed by reading

| Claim | How it was checked |
|---|---|
| Cross-link pruning matches the real markup | All six in-cluster links were grepped and they are one uniform single-line shape: `<a class="link" href="/blog/<slug>">text</a>` — R2 L159, R3 L174 + L177, R4 L166 + L178 + L197. The perl substitution unwraps the anchor to its inner text. No nested `</a>`, so the non-greedy `(.*?)` cannot over-match |
| Pruning is a safety net, not load-bearing | The cluster links **backwards only** (R1→nothing, R2→R1, R3→R1+R2, R4→R1+R2+R3). For any valid prefix, no published post links to a held-back one, so the prune should always find **zero**. The post-prune grep is what proves that claim at run time instead of trusting it |
| Date rewriting hits exactly the intended strings | Counted per post: **4** occurrences of the ISO date (`article:published_time`, `article:modified_time`, JSON-LD `datePublished`, `dateModified`) and **2** of the human date (the two visible `art-meta` spans). 4 + 2 is exactly the set the READMEs say to bump. Verified on R1 and R4; R2 and R3 share the structure |
| The `sed` delimiters are safe | Both replacement values are dates. Neither `2026-10-05` nor `Oct 5, 2026` contains `|`, so `s|…|…|g` cannot break out |
| `%-d` works on this Mac | Unpadded-day is a GNU extension. `issue-93.HANDOFF.md` line 63 records `date +'%b %-d'` being **actually executed on this Mac**, returning `Oct 4`. The `-j -f` parsing form is standard BSD. A shape check on the result dies rather than writing `Oct %-d, 2026` into six places if that ever changes |
| Alternation is portable | Changed `grep "$ad\|$ah"` to `grep -Ec -- "$ad|$ah"`. `\|` as alternation in a BRE is a GNU extension and this runs on BSD grep. Both operands are dates, so ERE adds no metacharacter risk |
| The three anchors exist | Preflight greps all three before touching anything: the count label in `blog/index.html`, `<loc>…/blog</loc>` in `sitemap.xml`, and the `- [Support](https://support.swop.id)` line in `llms.txt`. Each `awk` additionally `exit 3`s from its `END` block if its anchor never matched, and the caller deletes the `.new` file and dies |
| The count arithmetic is right | `grep -c 'class="row" href="/blog/'` returns **25** today and the label says **26 posts**. So `rows + 1 featured` is the file's own convention, confirmed against the live file rather than assumed |
| `--featured` cannot point outside the batch | Checked against ` $PUBLISH ` and dies otherwise. Default is the hub R3 when present, else the last post in the batch |
| No `set -e` footguns | The script deliberately does **not** use `set -e`, because several intentional `[ … ] && …` and `grep -c` lines return non-zero in the normal path. Every command whose failure matters carries an explicit `|| die`, and `run()` wraps the mutating ones |
| `authors/swop-team` is not miscounted | It is a `<url>` in the sitemap and not an `<a class="row">`, so the row count is posts only |

## Not verified — needs execution

- **`bash -n` was never run.** Syntax checking is denied here. This is the single
  biggest residual risk, and the dry run is the mitigation: a syntax error surfaces
  immediately and before `--apply`.
- `mktemp -t` behaviour on this macOS (shared with `newsletter-build.sh`, which works).
- That `perl -0777 -pi -e` with `\Q…\E` interpolates as intended. Only exercised when
  a post is held back, which a full four-post run never triggers.
- That Chrome renders the fonts correctly from `blog/<slug>/`. The script checks the
  PNG's size, which catches a blank render but **not** a system-font fallback. That
  one still needs an eye — the SWOP logo must be monospaced. It is the check that was
  skipped on 2026-10-06 and it is why two off-brand banners were called publish-ready.

## Suggested first run

⚠️ **The file is not executable** — `chmod` is denied in the drafting sandbox. Either run it
through `bash` as below, or `chmod +x editorial/publish-retention-cluster.sh` once.

```
cd ~/Desktop/SwopLive/swop-website
git pull --ff-only origin main                                   # preflight refuses without this
bash editorial/publish-retention-cluster.sh 4 2026-10-09         # dry run, changes nothing
bash editorial/publish-retention-cluster.sh 4 2026-10-09 --apply
```

Publishing fewer than four is a prefix: `… 1 <date>` ships R1 only, `… 2 <date>` ships R1+R2.
Never R4 alone — the script will not let you, because R4 links backwards into the other three.

Then the two pastes from `/tmp/swop-featured-crypto-transaction-still-pending.html`,
the `TOPICS.md` bookkeeping, `git diff` review, and a push — followed by actually
verifying the deploy ran, per `CLAUDE.md`.
