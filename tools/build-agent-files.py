#!/usr/bin/env python3
"""Build the agent-readable and SEO/AEO surfaces of swopme.co from the HTML pages.

    python3 tools/build-agent-files.py          # write everything
    python3 tools/build-agent-files.py --check  # exit 1 if anything is out of date

Run it after adding or editing a page (new blog posts included). Idempotent.

What it writes, all derived from the page HTML so the copies cannot drift:
  * <page>.md        a Markdown twin of every public page (/pay.md, /blog/<slug>.md, /index.md)
  * llms-full.txt    llms.txt followed by every Markdown twin
  * feed.xml         Atom feed of the blog
  * a head block between <!-- seo:start --> and <!-- seo:end --> on every page:
      - canonical link (only where the page has none)
      - <link rel="alternate"> to the Markdown twin, llms.txt and the feed
      - JSON-LD the page lacks: FAQPage (built from the visible questions),
        BreadcrumbList, and Organization + WebSite on the homepage and About

No dependencies beyond the standard library.
"""
import glob
import html
import json
import os
import re
import sys
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://www.swopme.co'
START, END = '<!-- seo:start -->', '<!-- seo:end -->'

# file -> (public path, breadcrumb name or None)
ROOT_PAGES = {
    'index.html': ('/', None),
    'swopid.html': ('/swopid', 'swop.id & SmartSite'),
    'pay.html': ('/pay', 'Swop Pay'),
    'geobucks.html': ('/geobucks', 'Geo Bucks & Drops'),
    'trade.html': ('/trade', 'Trading'),
    'live.html': ('/live', 'Swop Live'),
    'token.html': ('/token', 'SWOP'),
    'ovi.html': ('/ovi', 'Ovi'),
    'mcp.html': ('/mcp', 'Swop MCP'),
    'eldorado.html': ('/eldorado', 'El Dorado'),
    'decentrabet.html': ('/decentrabet', 'Decentrabet'),
    'swivy.html': ('/swivy', 'Swivy'),
    'shop.html': ('/shop', 'Shop'),
    'swop_fee_calculator.html': ('/swop_fee_calculator.html', 'Fee calculator'),
    'about.html': ('/about.html', 'About'),
    'support.html': ('/support.html', 'Support'),
}

ORG = {
    '@type': 'Organization',
    '@id': SITE + '/#org',
    'name': 'Swop',
    'url': SITE + '/',
    'logo': SITE + '/icon-512.png',
    'sameAs': [
        'https://x.com/swoplabs',
        'https://www.instagram.com/swop.labs',
        'https://github.com/Travisswop',
        'https://discord.com/invite/axxx4mHePf',
        'https://apps.apple.com/us/app/swop-connecting-the-world/id1593201322',
        'https://play.google.com/store/apps/details?id=com.travisheron.swopapp',
    ],
}
ABOUT_DESC = ('Swop is the social network where people, businesses and AI agents own their '
              'identity and move value. Meet the team building it.')

EMOJI = re.compile('[\U0001F000-\U0001FAFF☀-➿⬀-⯿️‍]+')


def read(path):
    with open(os.path.join(ROOT, path), encoding='utf-8') as f:
        return f.read()


def meta(doc, pattern):
    m = re.search(pattern, doc, re.I | re.S)
    return html.unescape(re.sub(r'<[^>]+>', ' ', m.group(1))).strip() if m else None


def clean(text):
    return re.sub(r'\s+', ' ', EMOJI.sub('', text)).strip()


# ---------------------------------------------------------------- HTML -> Markdown

SKIP_TAGS = {'script', 'style', 'svg', 'canvas', 'nav', 'footer', 'noscript', 'form', 'template',
             'button', 'input', 'select', 'textarea', 'iframe', 'video', 'audio', 'picture', 'head'}
VOID = {'br', 'img', 'hr', 'meta', 'link', 'input', 'source', 'wbr', 'area', 'col', 'embed', 'track'}
BLOCK = {'p', 'div', 'section', 'article', 'main', 'header', 'aside', 'ul', 'ol', 'table', 'tr',
         'figure', 'figcaption', 'blockquote', 'details', 'dl', 'dt', 'dd', 'pre', 'address'}
HEAD = {'h1': '# ', 'h2': '## ', 'h3': '### ', 'h4': '#### ', 'h5': '#### ', 'h6': '#### '}
# Decorative or mock-UI containers: animation layers and phone screens with example data.
# Inline tags that sit side by side as separate chips or labels: keep a space between them.
INLINE_GAP = {'span', 'small', 'i', 'em', 'label', 'kbd', 'time', 'mark', 'sup', 'sub'}
SKIP_CLASS = re.compile(r'\b(device|phone|grain|pbar|kin|mq|wires|toast|ticker|rain)\b')


class Markdown(HTMLParser):
    def __init__(self, base):
        super().__init__(convert_charrefs=True)
        self.base = base
        self.out = []          # finished blocks
        self.buf = []          # inline text of the current block
        self.prefix = ''
        self.skip = 0          # depth inside a skipped subtree
        self.stack = []        # (tag, skipped?)
        self.href = None
        self.link_text = []
        self.in_pre = False

    def flush(self):
        text = ''.join(self.buf)
        text = text if self.in_pre else re.sub(r'[ \t\r\n]+', ' ', text).strip()
        if text.strip():
            self.out.append(self.prefix + text)
        self.buf, self.prefix = [], ''

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in VOID:
            if tag == 'br' and not self.skip:
                self.buf.append(' ')
            return
        skipped = bool(self.skip) or tag in SKIP_TAGS or a.get('aria-hidden') == 'true' \
            or 'hidden' in a or bool(SKIP_CLASS.search(a.get('class') or ''))
        self.stack.append((tag, skipped))
        if skipped:
            self.skip += 1
            return
        if tag in HEAD:
            self.flush()
            self.prefix = HEAD[tag]
        elif tag == 'summary':
            self.flush()
            self.prefix = '### '
        elif tag == 'li':
            self.flush()
            self.prefix = '- '
        elif tag in ('td', 'th'):
            self.buf.append(' | ')
        elif tag == 'pre':
            self.flush()
            self.in_pre = True
            self.prefix = '```\n'
        elif tag in BLOCK:
            self.flush()
        elif tag == 'a' and a.get('href') and not a['href'].startswith(('#', 'javascript:')):
            self.href, self.link_text = a['href'], []
        elif tag in ('strong', 'b'):
            self.buf.append(' **')
        elif tag == 'code' and not self.in_pre:
            self.buf.append('`')
        elif tag in INLINE_GAP:
            self.add(' ')

    def add(self, text):
        (self.link_text if self.href is not None else self.buf).append(text)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        while self.stack:
            t, skipped = self.stack.pop()
            if skipped:
                self.skip -= 1
            if t == tag:
                break
        if self.skip:
            return
        if tag == 'pre':
            self.buf.append('\n```')
            self.flush()
            self.in_pre = False
        elif tag in HEAD or tag in BLOCK or tag in ('summary', 'li'):
            self.flush()
        elif tag == 'a' and self.href is not None:
            text = clean(''.join(self.link_text)).replace('↗', '').replace('→', '').strip()
            href = self.href if not self.href.startswith('/') else SITE + self.href
            if text:
                self.buf.append(f' [{text}]({href}) ')
            self.href = None
        elif tag in ('strong', 'b'):
            self.buf.append('** ')
        elif tag == 'code' and not self.in_pre:
            self.buf.append('`')
        elif tag in INLINE_GAP:
            self.add(' ')

    def handle_data(self, data):
        if self.skip:
            return
        if self.href is not None:
            self.link_text.append(data)
        else:
            self.buf.append(data)

    def result(self):
        self.flush()
        blocks, seen_last = [], None
        for b in self.out:
            b = b if b.startswith('```') else clean(b).replace('****', '')
            b = re.sub(r'\*\*\s*\*\*', '', b)
            b = re.sub(r'\*\* ([^*]+?) \*\*', r'**\1**', b)
            b = re.sub(r'\s+([.,;:!?)])', r'\1', b).strip()
            if not b or b in ('-', '#', '##', '###', '|') or b == seen_last:
                continue
            blocks.append(b)
            seen_last = b
        lines = []
        for i, b in enumerate(blocks):
            if i and not (b.startswith('- ') and blocks[i - 1].startswith('- ')):
                lines.append('')
            lines.append(b)
        return '\n'.join(lines)


def to_markdown(doc, url):
    body = doc[doc.lower().find('<body'):]
    p = Markdown(url)
    p.feed(body)
    return p.result()


# ---------------------------------------------------------------- page facts

def faq_pairs(doc):
    """Visible question/answer pairs: <details> whose summary is a question, or the homepage QA list."""
    pairs = []
    for m in re.finditer(r'<details[^>]*>\s*<summary[^>]*>(.*?)</summary>(.*?)</details>', doc, re.S | re.I):
        q = clean(html.unescape(re.sub(r'<[^>]+>', ' ', m.group(1))))
        a = clean(html.unescape(re.sub(r'<[^>]+>', ' ', m.group(2))))
        if q.endswith('?') and a:
            pairs.append((q, a))
    m = re.search(r'const QA=(\[\[.*?\]\]);', doc, re.S)
    if m:
        for q, a in re.findall(r"\['((?:[^'\\]|\\.)*)','((?:[^'\\]|\\.)*)'\]", m.group(1)):
            pairs.append((clean(q.replace("\\'", "'")), clean(a.replace("\\'", "'"))))
    return pairs


def jsonld_types(doc):
    types = set()
    for block in re.findall(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', strip_block(doc), re.S | re.I):
        types.update(re.findall(r'"@type"\s*:\s*"([^"]+)"', block))
    return types


def strip_block(doc):
    if START in doc:
        return doc[:doc.index(START)] + doc[doc.index(END) + len(END):]
    return doc


def ld(obj):
    obj = {'@context': 'https://schema.org', **obj}
    return '<script type="application/ld+json">' + json.dumps(obj, ensure_ascii=False).replace('</', '<\\/') + '</script>'


def pages():
    """Yield (file, public path, md file, md public path, breadcrumb trail)."""
    for f, (path, crumb) in ROOT_PAGES.items():
        if not os.path.exists(os.path.join(ROOT, f)):
            continue
        md = 'index.md' if f == 'index.html' else f[:-5] + '.md'
        yield f, path, md, '/' + md, ([(crumb, path)] if crumb else [])
    if os.path.exists(os.path.join(ROOT, 'blog/index.html')):
        yield 'blog/index.html', '/blog', 'blog.md', '/blog.md', [('Blog', '/blog')]
    for f in sorted(glob.glob(os.path.join(ROOT, 'blog', '*', 'index.html'))):
        slug = os.path.basename(os.path.dirname(f))
        if slug in ('assets', 'authors'):
            continue
        rel = f'blog/{slug}/index.html'
        yield rel, f'/blog/{slug}', f'blog/{slug}.md', f'/blog/{slug}.md', [('Blog', '/blog'), (None, f'/blog/{slug}')]


def build_page(f, path, md_file, md_path, trail):
    doc = read(f)
    base = strip_block(doc)
    url = SITE + path
    title = meta(base, r'<title>(.*?)</title>') or 'Swop'
    h1 = meta(base, r'<h1[^>]*>(.*?)</h1>')
    desc = meta(base, r'<meta[^>]*name=["\']description["\'][^>]*content="(.*?)"') or (ABOUT_DESC if f == 'about.html' else '')
    published = meta(base, r'"datePublished"\s*:\s*"([^"]+)"')
    modified = meta(base, r'"dateModified"\s*:\s*"([^"]+)"') or published
    faqs = faq_pairs(base)
    types = jsonld_types(doc)

    # ---- head block
    tags = []
    if not re.search(r'<link[^>]*rel=["\']canonical["\']', base, re.I):
        tags.append(f'<link rel="canonical" href="{url}">')
    if f == 'about.html' and 'name="description"' not in base:
        tags.append(f'<meta name="description" content="{html.escape(ABOUT_DESC)}">')
    tags.append(f'<link rel="alternate" type="text/markdown" href="{md_path}" title="This page as Markdown">')
    tags.append('<link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt: Swop for AI agents (MCP server, x402 checkout, page index)">')
    if f == 'index.html' or f.startswith('blog/'):
        tags.append('<link rel="alternate" type="application/atom+xml" href="/feed.xml" title="Swop Journal">')
    if f == 'index.html':
        tags.append(ld({'@graph': [ORG, {
            '@type': 'WebSite', '@id': SITE + '/#site', 'url': SITE + '/', 'name': 'Swop',
            'description': desc, 'publisher': {'@id': SITE + '/#org'}, 'inLanguage': 'en'}]}))
    if f == 'about.html':
        tags.append(ld({'@type': 'AboutPage', 'url': url, 'name': 'About Swop', 'description': ABOUT_DESC,
                        'mainEntity': ORG}))
    if faqs and 'FAQPage' not in types:
        tags.append(ld({'@type': 'FAQPage', 'mainEntity': [
            {'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in faqs]}))
    if trail and 'BreadcrumbList' not in types:
        items = [('Swop', '/')] + [(name or h1 or title, p) for name, p in trail]
        tags.append(ld({'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': SITE + p} for i, (n, p) in enumerate(items)]}))
    block = START + '\n' + '\n'.join(tags) + '\n' + END
    if START in doc:
        new_doc = doc[:doc.index(START)] + block + doc[doc.index(END) + len(END):]
    else:
        new_doc = doc.replace('</head>', block + '\n</head>', 1)

    # ---- Markdown twin
    front = ['---', f'title: {json.dumps(title, ensure_ascii=False)}', f'url: {url}']
    if desc:
        front.append(f'description: {json.dumps(desc, ensure_ascii=False)}')
    if published:
        front.append(f'published: {published}')
    if modified:
        front.append(f'updated: {modified}')
    front.append('---')
    md = '\n'.join(front) + '\n\n' + to_markdown(base, url)
    if f == 'index.html' and faqs:   # the homepage FAQ is drawn by script, so the HTML walk misses it
        md += '\n\n## Questions\n\n' + '\n\n'.join(f'### {q}\n\n{a}' for q, a in faqs)
    md += '\n'
    info = {'file': f, 'url': url, 'title': title, 'h1': h1, 'desc': desc, 'published': published,
            'modified': modified, 'md': md}
    return new_doc, md, info


def atom(posts):
    esc = lambda s: html.escape(s or '', quote=False)
    stamp = lambda d: d if 'T' in d else d + 'T00:00:00Z'
    posts = sorted(posts, key=lambda p: p['published'], reverse=True)
    out = ['<?xml version="1.0" encoding="UTF-8"?>', '<feed xmlns="http://www.w3.org/2005/Atom">',
           '  <title>Swop Journal</title>', '  <subtitle>Product, markets and engineering notes from Swop.</subtitle>',
           f'  <id>{SITE}/blog</id>', f'  <link href="{SITE}/blog"/>',
           f'  <link rel="self" type="application/atom+xml" href="{SITE}/feed.xml"/>',
           f'  <updated>{stamp(max(p["modified"] for p in posts))}</updated>',
           '  <author><name>Swop Team</name></author>']
    for p in posts:
        out += ['  <entry>', f'    <title>{esc(p["h1"] or p["title"])}</title>', f'    <id>{p["url"]}</id>',
                f'    <link href="{p["url"]}"/>', f'    <published>{stamp(p["published"])}</published>',
                f'    <updated>{stamp(p["modified"])}</updated>', f'    <summary>{esc(p["desc"])}</summary>', '  </entry>']
    return '\n'.join(out + ['</feed>']) + '\n'


def main():
    check = '--check' in sys.argv
    outputs, infos = {}, []
    for f, path, md_file, md_path, trail in pages():
        new_doc, md, info = build_page(f, path, md_file, md_path, trail)
        outputs[f] = new_doc
        outputs[md_file] = md
        infos.append(info)
    posts = [i for i in infos if i['file'].startswith('blog/') and i['file'] != 'blog/index.html' and i['published']]
    undated = [i['file'] for i in infos if i['file'].startswith('blog/') and i['file'] != 'blog/index.html' and not i['published']]
    outputs['feed.xml'] = atom(posts)
    full = [read('llms.txt').rstrip(), '', '---', '', '# Full page content', '',
            'Every public page of swopme.co as Markdown, product pages first, then the blog (newest first).']
    ordered = [i for i in infos if not i['file'].startswith('blog/')] + \
        sorted(posts, key=lambda p: p['published'], reverse=True)
    for i in ordered:
        body = i['md'].split('---\n', 2)[2].strip()
        full += ['', '---', '', f'Source: {i["url"]}', '', body]
    outputs['llms-full.txt'] = '\n'.join(full) + '\n'

    stale = []
    for rel, content in outputs.items():
        full_path = os.path.join(ROOT, rel)
        old = read(rel) if os.path.exists(full_path) else None
        if old != content:
            stale.append(rel)
            if not check:
                with open(full_path, 'w', encoding='utf-8') as fh:
                    fh.write(content)
    print(f'{len(infos)} pages, {len(posts)} posts in feed, llms-full.txt {len(outputs["llms-full.txt"]) // 1024} KB')
    for u in undated:
        print('no datePublished, left out of feed:', u)
    if check and stale:
        print('out of date:', *stale, sep='\n  ')
        sys.exit(1)
    print(('would change' if check else 'wrote'), len(stale), 'files')


if __name__ == '__main__':
    main()
