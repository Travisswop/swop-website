#!/usr/bin/env python3
"""Stamp the one site footer into every public page of swopme.co.

The footer markup lives here (FOOTER); its styles live in assets/footer.css. Re-run after editing either:

    python3 tools/stamp-footer.py

Idempotent: the footer sits between <!-- site-footer:start --> and <!-- site-footer:end --> markers and is
replaced in place. On first run it removes the page's old footer (the homepage/product-page footer, the
/shop footer, the blog footer, the old "footer-bento" block and the fee calculator's footer).
"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
START, END = '<!-- site-footer:start -->', '<!-- site-footer:end -->'
CSS = '<link rel="stylesheet" href="/assets/footer.css">'
FONTS = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Figtree:wght@700;800;900&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap">'

WORDMARK = ('<g fill="currentColor"><path d="M13.1545 1.08794V2.99327C13.1545 2.99327 13.1291 3.54142 12.1374 3.54142H4.07153C4.07153 3.54142 3.2625 3.48963 3.2625 4.37683V6.83029C3.2625 6.83029 3.41883 7.48299 4.35879 7.48299H10.832C10.832 7.48299 13.6245 7.71749 13.6245 10.6937V14.8952C13.6245 14.8952 13.5981 18.0004 9.37028 18.0004H1.33079C1.33079 18.0004 0 17.9505 0 16.8269V15.5743C0 15.5743 0.026381 14.7134 1.22625 14.7134H10.3132C10.3132 14.7134 11.4857 13.2253 10.4167 10.5628H3.23612C3.23612 10.5628 0.417216 10.3019 0.287263 7.79566C0.157311 5.28943 -0.260883 0.539798 3.00161 0.539798H12.0377C12.7608 0.528073 13.1594 0.654116 13.1594 1.08794"/>'
            '<path d="M20.2764 0.0283394H22.0038C22.0038 0.0283394 22.7699 -0.0693711 22.9692 0.680056C23.1685 1.42948 26.7671 13.6753 26.7671 13.6753L30.7224 1.28976C30.7224 1.28976 31.0224 0.019543 31.975 0.019543C32.9277 0.019543 33.9849 -0.202257 34.363 0.946799C34.7412 2.09585 38.2391 13.6577 38.2391 13.6577L42.5139 0.639998C42.5139 0.639998 42.7416 0 43.2838 0H45.2683C45.3465 0.0156607 45.4205 0.0479048 45.4851 0.09456C45.5498 0.141215 45.6038 0.201201 45.6433 0.270465C45.6828 0.339728 45.7071 0.416662 45.7143 0.496082C45.7216 0.575503 45.7118 0.655564 45.6855 0.730866C45.5292 1.34448 40.6047 16.1181 40.6047 16.1181C40.6047 16.1181 40.0038 17.9579 38.2685 17.9579C36.5331 17.9579 35.6059 15.5699 35.6059 15.5699L32.5769 5.3906L29.2636 15.8777C29.2636 15.8777 28.7086 17.8319 26.7124 17.8319C24.7162 17.8319 24.0235 15.1038 24.0235 15.1038L19.6774 0.869611C19.6774 0.869611 19.4488 0.0166143 20.2764 0.0283394Z"/>'
            '<path fill-rule="evenodd" d="M53.4917 3.24393H59.5496C59.5496 3.24393 61.5038 3.0876 61.5038 5.14926V12.4833C61.5038 12.4833 61.6083 14.5195 59.6473 14.5195H53.2806C53.2806 14.5195 52.0016 14.6495 52.0016 12.6631V4.70273C52.0016 4.70273 52.0016 3.26738 53.4897 3.23709L53.4917 3.24393ZM53.4633 0H60.2238C60.2238 0 64.3999 0.522741 64.3999 4.25522V13.2337C64.3999 13.2337 64.4263 17.6189 59.6757 17.6189H53.4116C53.4116 17.6189 49.0264 17.5407 49.0264 12.6357C49.0264 7.73072 49 4.07446 49 4.07446C49 4.07446 48.9971 0.0566749 53.4633 0.00391217V0Z"/>'
            '<path d="M74.0749 0.308594H83.4706C83.4706 0.308594 86.3305 0.455156 87.1512 3.5193C87.1512 3.5193 88.2212 10.5143 84.2542 10.5143H76.0584V17.0266C76.0584 17.0266 75.8883 17.9402 75.0666 17.9402H73.7485C73.7485 17.9402 72.874 17.9265 72.874 16.7256V8.36664C72.874 8.36664 72.9649 7.66216 73.983 7.66216H82.6156C82.6156 7.66216 84.3255 7.78625 84.3255 5.84185V4.2785C84.3255 4.2785 84.4301 3.43039 82.4202 3.43039H73.7153C73.7153 3.43039 72.8672 3.44309 72.8672 1.99505C72.8672 0.547004 74.0749 0.311522 74.0749 0.311522"/></g>')

COLS = [  # (heading, [(label, href, status tag or None)])
    ('Products', [('Web app', 'https://swopme.app/wallet', None), ('swop.id', '/swopid', None), ('Swop Pay', '/pay', None),
                  ('Geo Bucks', '/geobucks', None), ('Trading', '/trade', None), ('Swop Live', '/live', None),
                  ('SWOP token', '/token', None), ('Decentrabet', '/decentrabet', 'Beta'), ('Swivy', '/swivy', 'Soon'),
                  ('Shop', '/shop', None)]),
    ('AI &amp; worlds', [('Ovi', '/ovi', 'Beta'), ('Swop MCP', '/mcp', None), ('El Dorado', '/eldorado', 'Beta')]),
    ('Company', [('Blog', '/blog/', None), ('About', '/about.html', None), ('Support', 'https://support.swop.id', None),
                 ('Contact', 'mailto:support@swopme.co', None), ('Fee calculator', '/swop_fee_calculator.html', None)]),
    ('Legal', [('Privacy', '/privacy.html', None), ('Terms', '/terms.html', None), ('Legal', '/legal.html', None)]),
]
DEV = [('Quickstart', 'https://docs.swopme.co/payments/quickstart'), ('API reference', 'https://docs.swopme.co/api-reference'),
       ('MCP setup', 'https://docs.swopme.co/mcp/quickstart'), ('Swivy docs', 'https://docs.swopme.co/swivy'), ('Troubleshooting', 'https://docs.swopme.co/troubleshooting')]

APPLE = '<svg width="20" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.7-1-2.7-4.1zM13.9 4.9c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"/></svg>'
PLAY = '<svg width="19" height="21" viewBox="0 0 24 24" aria-hidden="true"><path fill="#00A0FF" d="M3.6 1.8L13.5 12 3.6 22.2c-.4-.2-.6-.6-.6-1.1V2.9c0-.5.2-.9.6-1.1z"/><path fill="#00F076" d="M17 8.4L13.5 12 3.6 1.8c.2-.1.5-.1.8.1z"/><path fill="#FF3A44" d="M17 15.6L4.4 22.1c-.3.2-.6.2-.8.1L13.5 12z"/><path fill="#FFD500" d="M20.4 10.4c.8.5.8 1.7 0 2.2L17 15.6 13.5 12 17 8.4z"/></svg>'
SOCIAL = [
    ('https://x.com/swoplabs', 'Swop on X', '<path d="M4 4l16 16M20 4L4 20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'),
    ('https://www.instagram.com/swop.labs', 'Swop on Instagram', '<rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.9"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/>'),
    ('https://discord.com/invite/axxx4mHePf', 'Swop on Discord', '<path d="M7.5 7.5c3-1.4 6-1.4 9 0M7.5 16.5c3 1.4 6 1.4 9 0M6 17c-1.4-2.6-1.8-5.6-.9-9 1-1 2.4-1.7 3.9-2l.6 1.2M18 17c1.4-2.6 1.8-5.6.9-9-1-1-2.4-1.7-3.9-2l-.6 1.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="9.5" cy="12" r="1.3" fill="currentColor"/><circle cx="14.5" cy="12" r="1.3" fill="currentColor"/>'),
    ('https://github.com/Travisswop', 'Swop on GitHub', '<path d="M9 19c-4 1.3-4-2-5.5-2.5M14.5 21v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.6-1.4 5.6-6.1a4.7 4.7 0 0 0-1.3-3.3 4.4 4.4 0 0 0-.1-3.3s-1.1-.3-3.5 1.3a12 12 0 0 0-6.3 0C5.9 2.6 4.9 2.9 4.9 2.9a4.4 4.4 0 0 0-.1 3.3 4.7 4.7 0 0 0-1.3 3.3c0 4.7 2.8 5.8 5.6 6.1-.6.6-.6 1.2-.5 2V21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>'),
]

cols = ''.join(f'<div class="sf-col"><h4>{h}</h4><ul>' + ''.join(
    f'<li><a href="{u}">{t}' + (f'<em class="sf-tag{" sf-soon" if tag == "Soon" else ""}">{tag}</em>' if tag else '') + '</a></li>'
    for t, u, tag in links) + '</ul></div>' for h, links in COLS)
dev = ''.join(f'<a href="{u}">{t}</a>' for t, u in DEV)
socs = ''.join(f'<a href="{u}" aria-label="{l}"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">{p}</svg></a>' for u, l, p in SOCIAL)
FOOTER = f'''{START}
<footer class="sf" aria-label="Site footer"><svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="sf-swop" viewBox="0 0 88 18">{WORDMARK}</symbol></svg><div class="sf-wrap">
  <div class="sf-top">
    <div class="sf-brand">
      <a href="/" class="sf-wm" aria-label="Swop home"><svg role="img" aria-label="Swop" viewBox="0 0 88 18"><use href="#sf-swop"/></svg></a>
      <p>Own your identity. Own your data. <span>Earn from it.</span></p>
      <div class="sf-apps"><a href="https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322">{APPLE}<span><small>Download on the</small><b>App Store</b></span></a><a href="https://play.google.com/store/apps/details?id=com.travisheron.swopapp">{PLAY}<span><small>Get it on</small><b>Google Play</b></span></a></div>
    </div>
    <div class="sf-dev">
      <span class="sf-kicker">Developers</span>
      <h3>Build on Swop.</h3>
      <p>Take payments from people and AI agents, get signed webhooks, and put Swop inside any AI. Explained simply, with code you can copy.</p>
      <a class="sf-docs" href="https://docs.swopme.co">Read the docs <span aria-hidden="true">→</span></a>
      <div class="sf-devlinks">{dev}<a href="/llms.txt" class="sf-mono">llms.txt</a></div>
    </div>
  </div>
  <div class="sf-cols" role="navigation" aria-label="Footer">{cols}</div>
  <div class="sf-bar"><div class="sf-socs">{socs}</div><span class="sf-note">Example names and amounts are illustrative. Status tags show what is live today.</span><span class="sf-c">© 2026 Swop</span></div>
</div>
<div class="sf-giant" aria-hidden="true"><svg viewBox="0 0 88 18"><use href="#sf-swop"/></svg></div>
</footer>
{END}'''


def drop_balanced(html, open_re, tag):
    """Remove the first element matching open_re (an opening tag) together with its balanced closing tag."""
    m = re.search(open_re, html)
    if not m:
        return html, False
    depth, i = 0, m.start()
    for t in re.finditer(rf'<(/?){tag}\b[^>]*>', html[m.start():]):
        depth += -1 if t.group(1) else 1
        if depth == 0:
            end = m.start() + t.end()
            return html[:i] + html[end:], True
    return html, False


OLD = [  # (opening tag pattern, tag) for each footer style found on the site before this script existed
    (r'<footer class="ft gut">', 'footer'),
    (r'<footer class="ft">', 'footer'),
    (r'<footer class="foot">', 'footer'),
    (r'<section class="footer-bento">', 'section'),
    (r'<footer>', 'footer'),
]

PAGES = (['index.html', 'shop.html', 'about.html', 'legal.html', 'privacy.html', 'terms.html', 'support.html', 'swop_fee_calculator.html',
          'ovi.html', 'eldorado.html', 'decentrabet.html', 'mcp.html', 'swivy.html', 'swopid.html', 'pay.html', 'geobucks.html',
          'trade.html', 'live.html', 'token.html']
         + sorted(os.path.relpath(p, ROOT) for p in glob.glob(os.path.join(ROOT, 'blog', '**', 'index.html'), recursive=True)))


def stamp(rel):
    path = os.path.join(ROOT, rel)
    html = open(path, encoding='utf-8').read()
    if START in html:
        html = re.sub(re.escape(START) + r'.*?' + re.escape(END), lambda _: FOOTER, html, flags=re.S)
    else:
        for pat, tag in OLD:
            html, done = drop_balanced(html, pat, tag)
            if done:
                break
        # the fee calculator's footer sits after </html>; put the new one inside <body>
        html = html.replace('</body>', FOOTER + '\n</body>', 1) if '</body>' in html else html + FOOTER
    if CSS not in html:
        html = html.replace('</head>', CSS + '\n</head>', 1)
    if 'family=Figtree' not in html:  # older pages (legal, blog, calculator) don't load the footer's type
        html = html.replace(CSS, FONTS + '\n' + CSS, 1)
    open(path, 'w', encoding='utf-8').write(html)


if __name__ == '__main__':
    for rel in PAGES:
        stamp(rel)
    print(f'stamped {len(PAGES)} pages')
