/* Pull the Swop Daily market rows from live sources — CoinGecko for crypto,
   Yahoo Finance for the index closes. Prints one JSON object; the newsletter
   build MUST use these values for the price tiles, pills (sign decides
   green/red), the market-mover tile, and any prose that quotes a price.
   Hand-typed market numbers have shipped wrong before (issue #78 had
   ETH $12,507) — never write a price the build didn't fetch.

   Usage (any cwd, Node 18+): node newsletter-market-data.js */
const CG = 'https://api.coingecko.com/api/v3/simple/price'
  + '?ids=bitcoin,ethereum,solana,binancecoin&vs_currencies=usd&include_24hr_change=true';
const YF = (sym) => `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=5d`;
const UA = { 'User-Agent': 'Mozilla/5.0 (newsletter-market-data)' };

const usd = (n) => n >= 1000
  ? '$' + Math.round(n).toLocaleString('en-US')
  : '$' + n.toFixed(2);
const pct = (n) => (n >= 0 ? '+' : '') + n.toFixed(n >= 10 || n <= -10 ? 1 : n >= 1 || n <= -1 ? 1 : 1) + '%';

(async () => {
  const crypto = await (await fetch(CG, { headers: UA })).json();
  const coins = {};
  for (const [id, label] of [['bitcoin', 'BTC'], ['ethereum', 'ETH'], ['solana', 'SOL'], ['binancecoin', 'BNB']]) {
    const c = crypto[id];
    coins[label] = { price: usd(c.usd), raw: c.usd, change: pct(c.usd_24h_change), rawChange: c.usd_24h_change };
  }
  const mover = Object.entries(coins).sort((a, b) => Math.abs(b[1].rawChange) - Math.abs(a[1].rawChange))[0];

  const indices = {};
  for (const [sym, label] of [['^GSPC', 'S&P 500'], ['^IXIC', 'Nasdaq'], ['^DJI', 'Dow'], ['^RUT', 'Russell 2K']]) {
    const r = await (await fetch(YF(sym), { headers: UA })).json();
    const m = r.chart.result[0];
    const closes = m.indicators.quote[0].close.filter((x) => x != null);
    const last = m.meta.regularMarketPrice;
    // After the close, the range's last bar IS the latest price — compare with
    // relative tolerance and step back one bar for the true previous close.
    const tail = closes[closes.length - 1];
    const prev = closes.length >= 2 && Math.abs(tail - last) / last < 1e-3
      ? closes[closes.length - 2] : tail;
    indices[label] = {
      close: last.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      change: pct(((last - prev) / prev) * 100),
    };
  }

  // Token of the day: hottest trending NON-major with real size ($50M+ mcap).
  // Feeds the "Token of the day" card — symbol, %, price, mcap, volume,
  // vol/mcap turnover, rank. The story ("why it moved") still needs WebSearch.
  const MAJORS = new Set(['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'DOGE', 'ADA']);
  let tokenOfTheDay = null;
  try {
    const trending = await (await fetch('https://api.coingecko.com/api/v3/search/trending', { headers: UA })).json();
    const parseUsd = (v) => typeof v === 'number' ? v : Number(String(v).replace(/[$,]/g, '')) || 0;
    const cands = (trending.coins || [])
      .map((c) => c.item)
      .filter((i) => i && !MAJORS.has(i.symbol?.toUpperCase()) && i.data)
      .map((i) => ({
        symbol: i.symbol?.toUpperCase(), name: i.name, rank: i.market_cap_rank,
        rawPrice: parseUsd(i.data.price),
        rawChange: i.data.price_change_percentage_24h?.usd ?? 0,
        rawMcap: parseUsd(i.data.market_cap), rawVol: parseUsd(i.data.total_volume),
      }))
      .filter((t) => t.rawMcap >= 50e6)
      .sort((a, b) => Math.abs(b.rawChange) - Math.abs(a.rawChange));
    const t = cands[0];
    if (t) {
      tokenOfTheDay = {
        symbol: t.symbol, name: t.name, rank: t.rank,
        price: usd(t.rawPrice), change: pct(t.rawChange),
        mcap: '$' + (t.rawMcap / 1e9 >= 1 ? (t.rawMcap / 1e9).toFixed(2) + 'B' : Math.round(t.rawMcap / 1e6) + 'M'),
        vol24h: '$' + (t.rawVol / 1e9 >= 1 ? (t.rawVol / 1e9).toFixed(2) + 'B' : Math.round(t.rawVol / 1e6) + 'M'),
        volOverMcap: (t.rawVol / t.rawMcap).toFixed(1) + 'x',
      };
    }
  } catch { /* card falls back to the biggest non-major move among the four majors' peers */ }

  console.log(JSON.stringify({
    fetchedAt: new Date().toISOString(),
    crypto: coins,
    mover: { symbol: mover[0], ...mover[1] },
    tokenOfTheDay,
    indices,
  }, null, 2));
})().catch((e) => { console.error(e.message); process.exit(1); });
