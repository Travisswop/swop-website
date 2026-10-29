#!/usr/bin/env python3
"""Stamp Vercel Web Analytics into every public page of swopme.co.

Web Analytics is enabled on the Vercel project (swop-website). A static site has to load the script itself:

    python3 tools/stamp-analytics.py

Run it after adding a page (new blog posts included). Idempotent: the tags sit between
<!-- va:start --> and <!-- va:end --> markers just before </head> and are replaced in place.
Skips assets/ (render templates, not pages) and editorial/ (not deployed).
"""
import glob
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
START, END = '<!-- va:start -->', '<!-- va:end -->'
TAGS = (START + '<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};</script>'
        '<script defer src="/_vercel/insights/script.js"></script>' + END)
SKIP = ('assets/', 'editorial/', 'node_modules/')


def stamp(path):
    with open(path, encoding='utf-8') as f:
        html = f.read()
    if START in html:
        new = html[:html.index(START)] + TAGS + html[html.index(END) + len(END):]
    elif '</head>' in html:
        new = html.replace('</head>', TAGS + '\n</head>', 1)
    else:
        return False
    if new != html:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new)
    return True


if __name__ == '__main__':
    pages = [p for p in glob.glob(os.path.join(ROOT, '**', '*.html'), recursive=True)
             if not os.path.relpath(p, ROOT).startswith(SKIP)]
    done = [p for p in pages if stamp(p)]
    missed = sorted(set(pages) - set(done))
    print(f'{len(done)} pages stamped')
    for p in missed:
        print('no </head>:', os.path.relpath(p, ROOT))
