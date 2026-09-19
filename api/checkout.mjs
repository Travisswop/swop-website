// Create a Swop checkout for a cart assembled on THIS site, then hand the
// buyer a payment request they can pay without leaving.
//
// The merchant API key lives only here, in the function's environment. It is
// never sent to the browser: the browser posts a cart of SKUs and quantities
// and gets back a payment request. Prices are resolved by Swop from the
// catalogue — nothing this file sends can set a price, by design, and Swop
// rejects the attempt rather than ignoring it.
//
// Required env (server-side only, no NEXT_PUBLIC):
//   SWOP_MERCHANT_KEY   merchant API key secret, scope commerce.checkout
// Optional:
//   SWOP_API_BASE       defaults to https://apps.apiswop.co

// .mjs, not .js, and that matters: this repo is a static site with no
// package.json, so Vercel treats a bare .js function as CommonJS and an
// `export default` handler fails to build — the route then 404s with no error
// anywhere. Renaming it back would break checkout silently.
const API_BASE = process.env.SWOP_API_BASE || 'https://apps.apiswop.co';

const ALLOWED_CALLERS = new Set([
  'https://swopme.co',
  'https://www.swopme.co',
  'http://localhost:4173',
]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST.' });
  }
  const caller = req.headers.origin || '';
  if (caller && !ALLOWED_CALLERS.has(caller)) {
    return res.status(403).json({ error: 'Not an allowed caller.' });
  }

  const key = process.env.SWOP_MERCHANT_KEY;
  if (!key) {
    return res.status(503).json({ error: 'Checkout is not configured on this site.' });
  }

  const items = Array.isArray(req.body?.items) ? req.body.items : [];
  if (items.length === 0) return res.status(400).json({ error: 'Your cart is empty.' });

  // Forward only what Swop accepts. Anything resembling a price is dropped
  // here as well as refused there — a cart in a browser is not a source of
  // truth about what something costs.
  const clean = items.slice(0, 50).map((i) => ({
    productId: String(i?.productId || i?.sku || ''),
    quantity: Math.max(1, Math.min(99, parseInt(i?.quantity, 10) || 1)),
    ...(i?.selectedOptions ? { selectedOptions: i.selectedOptions } : {}),
  }));
  if (clean.some((i) => !i.productId)) {
    return res.status(400).json({ error: 'Every cart item needs a product id.' });
  }

  try {
    const upstream = await fetch(`${API_BASE}/api/v5/merchant/checkout-intents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        items: clean,
        customerInfo: req.body?.buyer || undefined,
        description: req.body?.description || undefined,
      }),
    });
    const body = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      // Pass Swop's message through — 403 means the key lacks
      // commerce.checkout, 404 means a product is not ours. Both actionable.
      return res.status(upstream.status).json({
        error: body?.message || 'Swop could not create this checkout.',
      });
    }

    const d = body?.data || {};
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      intentId: d.intentId,
      total: d.fees?.totalDueAmount ?? d.amount?.value ?? null,
      currency: d.amount?.currency || 'USDC',
      // The Solana Pay request the buyer pays. Settlement is automatic: the
      // Helius webhook sees the transfer and creates the order, deriving the
      // payer from the chain. This page never needs to confirm anything.
      paymentRequest: d.paymentRequest || null,
      expiresAt: d.expiresAt || null,
    });
  } catch {
    return res.status(502).json({ error: 'Could not reach Swop.' });
  }
}
