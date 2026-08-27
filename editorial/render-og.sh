#!/bin/bash
# Render a banner og.html to og.png (1200x630) with headless Chrome.
# Usage: editorial/render-og.sh blog/<slug>
# Run locally (macOS with Chrome) — the cloud drafting sandbox has no Chrome;
# the drafter authors og.html and a reviewer renders it before merge.
set -euo pipefail
DIR="$1"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --screenshot="$DIR/og.png" "file://$(cd "$DIR" && pwd)/og.html"
echo "wrote $DIR/og.png"
