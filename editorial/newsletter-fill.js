/* Fill a Swop Daily issue template with live numbers. Part of the flow in
   editorial/NEWSLETTER.md.

   The point of this script: QUILL writes prose, the fetcher writes numbers, and
   the two never mix. An issue template (editorial/issues/issue-<N>.template.html)
   is a complete issue with every number replaced by a %%TOKEN%%. Nobody hand-types
   a price, so issue #78's "ETH $12,507" and #83-#84's stale $0.01 token price
   cannot recur — a missed token is a hard failure, not a silently stale value.

   Step 1 — fetch once, inspect the token-of-the-day candidate:
     node editorial/newsletter-fill.js --inspect
   Writes editorial/issues/.market-<YYYY-MM-DD>.json and prints the candidate.
   NEWSLETTER.md requires an editorial check here: the fetcher sorts trending
   non-majors by ABSOLUTE 24h move and applies no filter at all, so it will hand
   you a crash or (2026-09-10) a politically charged memecoin. Look at the name
   before you pass --totd-ok.

   Step 2 — build the issue from that same fetch:
     cd ../swop-app-backend && node ../swop-website/editorial/newsletter-audience-sync.js --dry-run > /tmp/swop-stats.json
     node editorial/newsletter-fill.js --build \
       --template editorial/issues/issue-90.template.html \
       --market editorial/issues/.market-2026-09-27.json \
       --stats /tmp/swop-stats.json \
       --totd-ok \
       [--why editorial/issues/issue-90.why.txt] \
       --out "$HOME/Library/Mobile Documents/com~apple~CloudDocs/Documents/Claude/Projects/Swop/Swop_Daily_Newsletter_2026-09-27.html"

   Both steps use the SAME market file on purpose: two fetches would let the
   tiles and the prose disagree.

   Then send (editorial/NEWSLETTER.md step 3):
     node editorial/newsletter-send.js --html <out> --subject "..." --test travis@swopme.co
     node editorial/newsletter-send.js --html <out> --subject "..." --send   # after approval
*/
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const HERE = __dirname;
const ISSUES = path.join(HERE, 'issues');
const BASE = path.join(HERE, 'newsletter-base.html');

const arg = (name) => {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
};
const has = (name) => process.argv.includes(name);

const GREEN_PILL = 'background-color:#0c2818;color:#22c55e;';
const RED_PILL = 'background-color:#2a0c0c;color:#ef4444;';
const GREEN = '#22c55e';
const RED = '#ef4444';
const down = (chg) => String(chg).trim().startsWith('-');
const pill = (chg) => (down(chg) ? RED_PILL : GREEN_PILL);
const money = (n) => '$' + Math.round(n).toLocaleString('en-US');

function die(msg) {
  console.error('FAIL: ' + msg);
  process.exit(1);
}

function fetchMarket() {
  const out = execFileSync(process.execPath, [path.join(HERE, 'newsletter-market-data.js')], {
    encoding: 'utf8', timeout: 120000,
  });
  return JSON.parse(out);
}

function inspect() {
  const market = fetchMarket();
  if (!fs.existsSync(ISSUES)) fs.mkdirSync(ISSUES, { recursive: true });
  const day = market.fetchedAt.slice(0, 10);
  const file = path.join(ISSUES, `.market-${day}.json`);
  fs.writeFileSync(file, JSON.stringify(market, null, 2) + '\n');

  console.log(JSON.stringify(market, null, 2));
  console.log('\nmarket file: ' + file);
  const t = market.tokenOfTheDay;
  console.log('\n=== EDITORIAL CHECK (NEWSLETTER.md "Token of the day") ===');
  if (!t) {
    console.log('No token-of-the-day candidate came back. The card cannot be filled;');
    console.log('re-run --inspect, or pick a candidate by hand from CoinGecko trending.');
  } else {
    console.log(`  candidate : ${t.symbol} — ${t.name}`);
    console.log(`  move      : ${t.change} at ${t.price} (rank ${t.rank ?? 'n/a'})`);
    console.log(`  turnover  : ${t.vol24h} vol on ${t.mcap} mcap (${t.volOverMcap})`);
    console.log('  Is the NAME politically charged, partisan or offensive? If yes, do NOT ship it');
    console.log('  (2026-09-10: the fetcher returned "Hunter Biden\'s Laptop", -63%). Take the next');
    console.log('  viable candidate instead. Is the move DOWN? Then frame it honestly as a faller.');
    console.log('  Pass --totd-ok on --build to record that a human made this call.');
  }
}

function build() {
  const templatePath = arg('--template') || die('--template required');
  const marketPath = arg('--market') || die('--market required (run --inspect first)');
  const statsPath = arg('--stats') || die('--stats required (audience-sync --dry-run output)');
  const outPath = arg('--out') || die('--out required');
  const maxAgeH = Number(arg('--max-age-hours') || 6);

  const template = fs.readFileSync(templatePath, 'utf8');
  const market = JSON.parse(fs.readFileSync(marketPath, 'utf8'));
  const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));

  // A stale market file is how the token price silently shipped wrong for two
  // issues (#83-#84). Refuse rather than warn.
  const ageH = (Date.now() - Date.parse(market.fetchedAt)) / 3600000;
  if (!(ageH >= 0) || ageH > maxAgeH) {
    die(`market file is ${ageH.toFixed(1)}h old (limit ${maxAgeH}h). Re-run --inspect.`);
  }

  const c = market.crypto || die('market file has no crypto block');
  const ix = market.indices || die('market file has no indices block');
  const mv = market.mover || die('market file has no mover block');
  const need = (o, k, where) => (o && o[k] != null ? o[k] : die(`${where} missing "${k}"`));

  const map = {};
  for (const [sym, key] of [['BTC', 'BTC'], ['ETH', 'ETH'], ['SOL', 'SOL'], ['BNB', 'BNB']]) {
    const co = c[key] || die(`crypto block missing ${key}`);
    map[`${sym}_PRICE`] = need(co, 'price', `crypto.${key}`);
    map[`${sym}_CHG`] = need(co, 'change', `crypto.${key}`);
    map[`${sym}_PILL`] = pill(co.change);
  }
  for (const [tok, label] of [['SPX', 'S&P 500'], ['NDX', 'Nasdaq'], ['DJI', 'Dow'], ['RUT', 'Russell 2K']]) {
    const i = ix[label] || die(`indices block missing "${label}"`);
    map[`${tok}_CLOSE`] = need(i, 'close', `indices["${label}"]`);
    map[`${tok}_CHG`] = need(i, 'change', `indices["${label}"]`);
    map[`${tok}_PILL`] = pill(i.change);
  }
  map.MOVER_SYM = need(mv, 'symbol', 'mover');
  map.MOVER_CHIP = `${need(mv, 'change', 'mover')} &middot; ${need(mv, 'price', 'mover')}`;
  map.MOVER_PILL = pill(mv.change);

  // Bento: only ledgers that are actually written. No hand-typed platform stats,
  // no literal [TBD] (sends are automatic — NEWSLETTER.md step 2).
  for (const k of ['winnings_paid_7d_usd', 'winners_7d', 'winnings_paid_24h_usd']) {
    if (stats[k] == null) die(`stats file missing "${k}" — run audience-sync --dry-run, not a hand-written file`);
  }
  map.WINNINGS_7D = money(stats.winnings_paid_7d_usd);
  map.WINNERS_7D = String(stats.winners_7d);
  map.WINNINGS_7D_CHIP = stats.winnings_paid_24h_usd > 0
    ? `${money(stats.winnings_paid_24h_usd)} paid out &middot; last 24h`
    : 'none settled &middot; last 24h';

  // Token of the day. The editorial call is a human's (see --inspect).
  const t = market.tokenOfTheDay;
  if (template.includes('%%TOTD_')) {
    if (!t) die('template has a token-of-the-day card but the market file has no candidate');
    if (!has('--totd-ok')) {
      die(`--totd-ok required: confirm "${t.symbol} — ${t.name}" passes the editorial check `
        + '(not politically charged/partisan/offensive; a faller framed as a faller). '
        + 'Run --inspect to see it.');
    }
    map.TOTD_PAIR = `${need(t, 'symbol', 'tokenOfTheDay')} / USDC`;
    map.TOTD_SUBTITLE = `${need(t, 'name', 'tokenOfTheDay')} &middot; trending non-major &middot; illustrative`;
    map.TOTD_CHG = need(t, 'change', 'tokenOfTheDay');
    map.TOTD_CHG_COLOR = down(t.change) ? RED : GREEN;
    map.TOTD_PRICE = need(t, 'price', 'tokenOfTheDay');
    map.TOTD_MCAP = need(t, 'mcap', 'tokenOfTheDay');
    map.TOTD_VOL = need(t, 'vol24h', 'tokenOfTheDay');
    map.TOTD_VOLMCAP = need(t, 'volOverMcap', 'tokenOfTheDay');
    map.TOTD_RANK = t.rank != null ? `#${t.rank}` : 'unranked';

    const whyPath = arg('--why');
    if (whyPath) {
      map.TOTD_WHY = fs.readFileSync(whyPath, 'utf8').trim();
      if (!/not advice/i.test(map.TOTD_WHY)) {
        die('--why text must end with the "Illustrative only, not advice." line (NEWSLETTER.md).');
      }
    } else {
      // Fallback: derived entirely from the fetched numbers, so it makes no
      // causal claim we haven't sourced. A researched --why paragraph is better;
      // this is the version that is never wrong.
      const dir = down(t.change) ? 'fell' : 'gained';
      map.TOTD_WHY = `${t.symbol} is today&rsquo;s most-moved trending non-major: it ${dir} `
        + `${t.change.replace(/^[+-]/, '')} to ${t.price}, with ${t.vol24h} traded against a `
        + `${t.mcap} market cap &mdash; ${t.volOverMcap} of its own size turning over in a day. `
        + 'Turnover at that ratio is flow, not a re-rate, and flow-driven moves retrace as fast '
        + 'as they run. Illustrative only, not advice.';
    }
  }

  // Substitute.
  let html = template;
  const unused = [];
  for (const [k, v] of Object.entries(map)) {
    const tok = `%%${k}%%`;
    if (!html.includes(tok)) { unused.push(k); continue; }
    html = html.split(tok).join(String(v));
  }

  // --- Verification (NEWSLETTER.md "Verify before sending") ---
  const problems = [];

  const leftover = [...new Set((html.match(/%%[A-Z0-9_]+%%/g) || []))];
  if (leftover.length) problems.push('unfilled tokens: ' + leftover.join(', '));

  const open = (html.match(/<div/g) || []).length;
  const close = (html.match(/<\/div>/g) || []).length;
  if (open !== close) problems.push(`div imbalance: ${open} <div vs ${close} </div>`);

  let baseOpen = null;
  try {
    const base = fs.readFileSync(BASE, 'utf8');
    baseOpen = (base.match(/<div/g) || []).length;
    const baseClose = (base.match(/<\/div>/g) || []).length;
    if (open !== baseOpen || close !== baseClose) {
      problems.push(`div count ${open}/${close} differs from newsletter-base.html ${baseOpen}/${baseClose}`
        + ' — intended structural change? re-check for orphaned wrappers, then update the base.');
    }
  } catch { /* base missing: the imbalance check above still applies */ }

  if (!html.includes('{{{RESEND_UNSUBSCRIBE_URL}}}')) {
    problems.push('no {{{RESEND_UNSUBSCRIBE_URL}}} — newsletter-send.js would inject a bare footer');
  }

  // Every number we substituted must survive into the output verbatim.
  for (const [k, v] of Object.entries(map)) {
    if (unused.includes(k)) continue;
    if (!html.includes(String(v))) problems.push(`value for ${k} not present in output: ${v}`);
  }

  console.log('--- filled ---');
  for (const [k, v] of Object.entries(map)) {
    if (unused.includes(k)) continue;
    if (k.endsWith('_PILL') || k === 'TOTD_CHG_COLOR' || k === 'TOTD_WHY') continue;
    console.log(`  ${k.padEnd(18)} ${v}`);
  }
  if (unused.length) console.log('  (template has no slot for: ' + unused.join(', ') + ')');
  console.log(`--- checks ---\n  divs ${open}/${close}` + (baseOpen != null ? ` (base ${baseOpen})` : '')
    + `\n  market fetched ${market.fetchedAt} (${ageH.toFixed(1)}h ago)`);

  if (problems.length) {
    console.error('\nNOT WRITTEN — ' + problems.length + ' problem(s):');
    for (const p of problems) console.error('  • ' + p);
    process.exit(1);
  }

  fs.writeFileSync(outPath, html);
  console.log('\nwrote ' + outPath + ` (${html.length} bytes)`);
  console.log('next: node editorial/newsletter-send.js --html "' + outPath + '" --subject "..." --test travis@swopme.co');
}

if (has('--inspect')) inspect();
else if (has('--build')) build();
else {
  console.error('usage: newsletter-fill.js --inspect');
  console.error('       newsletter-fill.js --build --template <f> --market <f> --stats <f> --out <f> [--totd-ok] [--why <f>]');
  process.exit(2);
}
