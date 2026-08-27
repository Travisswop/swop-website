#!/usr/bin/env python3
"""Generate a 1200x630 Open Graph banner for a Swop Journal post.

Usage: python3 editorial/make-og.py <slug> "<title>" "<KICKER>"
Writes blog/<slug>/og.png (slug "index" writes blog/og.png).
Requires Pillow. Fonts are committed in editorial/fonts/.
"""
import io, re, base64, sys, os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W, H = 1200, 630
INK = (10, 10, 12)
PAPER = (245, 245, 243)
MUT = (255, 255, 255, 140)
ACCENT = (46, 194, 126)

def font(path, size, weight=None):
    f = ImageFont.truetype(os.path.join(ROOT, 'editorial/fonts', path), size)
    if weight is not None:
        try:
            f.set_variation_by_axes([weight])
        except Exception:
            pass
    return f

def white_logo(height):
    """Extract the wordmark from index.html's embedded logo, tinted white."""
    html = open(os.path.join(ROOT, 'index.html')).read()
    m = re.search(r'src="data:image/(?:png|jpeg|jpg);base64,([A-Za-z0-9+/=]+)"', html)
    src = Image.open(io.BytesIO(base64.b64decode(m.group(1)))).convert('L')
    out = Image.new('RGBA', src.size, (255, 255, 255, 0))
    out.putalpha(src.point(lambda v: v))
    bbox = src.point(lambda v: 255 if v > 20 else 0).getbbox()
    out = out.crop(bbox)
    w = int(out.width * height / out.height)
    return out.resize((w, height), Image.LANCZOS)

def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ''
    for w_ in words:
        t = (cur + ' ' + w_).strip()
        if draw.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w_
    if cur:
        lines.append(cur)
    return lines

def main(slug, title, kicker):
    img = Image.new('RGB', (W, H), INK)
    d = ImageDraw.Draw(img, 'RGBA')

    M = 80  # margin
    # logo top-left
    logo = white_logo(34)
    img.paste(logo, (M, M - 4), logo)

    # kicker: pulse dot + mono uppercase
    kf = font('JetBrainsMono.ttf', 22, 500)
    ky = M + 92
    d.ellipse([M, ky + 6, M + 14, ky + 20], fill=ACCENT)
    d.text((M + 30, ky), kicker.upper(), font=kf, fill=ACCENT)
    # letterspace approximation: JetBrains mono already spaced; skip manual tracking

    # title: Inter Tight ExtraBold, auto-sized to fit
    size = 84
    while size > 40:
        tf = font('InterTight.ttf', size, 800)
        lines = wrap(d, title, tf, W - 2 * M)
        line_h = int(size * 1.06)
        if len(lines) <= 3 and ky + 60 + len(lines) * line_h < H - 130:
            break
        size -= 6
    ty = ky + 64
    for ln in lines:
        d.text((M - 4, ty), ln, font=tf, fill=PAPER)
        ty += line_h

    # bottom rule + url
    d.line([M, H - 92, W - M, H - 92], fill=(255, 255, 255, 36), width=1)
    uf = font('JetBrainsMono.ttf', 22, 500)
    d.text((M, H - 68), 'swopme.co/blog', font=uf, fill=MUT)
    d.text((W - M - d.textlength('SWOP JOURNAL', font=uf), H - 68), 'SWOP JOURNAL', font=uf, fill=MUT)

    out = os.path.join(ROOT, 'blog', 'og.png') if slug == 'index' \
        else os.path.join(ROOT, 'blog', slug, 'og.png')
    img.save(out, optimize=True)
    print('wrote', out, f'({os.path.getsize(out)//1024}KB)')

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2], sys.argv[3])
