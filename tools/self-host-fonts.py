#!/usr/bin/env python3
"""Point pages at the self-hosted fonts (assets/fonts/fonts.css) instead of fonts.googleapis.com.
Only replaces Google Fonts links whose families are all self-hosted; preloads Figtree and Inter. Safe to re-run.
Usage: python3 tools/self-host-fonts.py [page.html ...]   (default: every .html page except those listed in SKIP env)"""
import glob, os, re, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOSTED = {'Figtree', 'Inter', 'JetBrains Mono', 'Space Mono'}
css = open(os.path.join(ROOT, 'assets/fonts/fonts.css')).read()
fig = re.search(r'/assets/fonts/figtree-[a-f0-9]+\.woff2', css).group(0)
inter = re.search(r'/assets/fonts/inter-[a-f0-9]+\.woff2', css).group(0)
TAGS = (f'<link rel="preload" href="{fig}" as="font" type="font/woff2" crossorigin>\n'
        f'<link rel="preload" href="{inter}" as="font" type="font/woff2" crossorigin>\n'
        '<link rel="stylesheet" href="/assets/fonts/fonts.css">')
LINK = re.compile(r'<link\b[^>]*href="https://fonts\.googleapis\.com/css2\?([^"]+)"[^>]*>\s*')
PRECONNECT = re.compile(r'<link\b[^>]*rel="preconnect"[^>]*href="https://fonts\.(googleapis|gstatic)\.com"[^>]*>\s*')
skip = set(filter(None, os.environ.get('SKIP', '').split(',')))
pages = sys.argv[1:] or [os.path.relpath(p, ROOT) for p in glob.glob(os.path.join(ROOT, '**/*.html'), recursive=True)
                         if '/node_modules/' not in p and '/editorial/' not in p and '/assets/og/' not in p]
for rel in pages:
    if rel in skip: continue
    p = os.path.join(ROOT, rel); s = open(p, encoding='utf-8').read(); s0 = s
    def repl(m):
        fams = {f.split(':')[0].replace('+', ' ') for f in re.findall(r'family=([^&]+)', m.group(1))}
        return (TAGS + '\n') if fams <= HOSTED else m.group(0)
    s = LINK.sub(repl, s)
    if '/assets/fonts/fonts.css' in s:
        s = PRECONNECT.sub('', s)
        # keep exactly one copy of the tags
        while s.count('/assets/fonts/fonts.css') > 1:
            i = s.rindex(TAGS); s = s[:i] + s[i + len(TAGS):]
    if s != s0: open(p, 'w', encoding='utf-8').write(s); print('fonts ->', rel)
