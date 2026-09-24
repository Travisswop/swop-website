// Drive a Swop checkout this site created: pick a rail, start a card payment,
// or read where it stands. One function, three actions, so the page never
// talks to Swop directly and the merchant key never leaves this file.
//
//   { intentId, action: 'card'   }  -> Stripe client secret for the Payment Element
//   { intentId, action: 'crypto' }  -> the buyer chose USDC; publishes the Solana Pay request
//   { intentId, action: 'status' }  -> intent status (+ card state), used to show "paid"
//
// 'card' and 'crypto' hit public capability URLs on Swop keyed by the
// unguessable intent id — whoever holds the id pays — so they need no key.
// 'status' reads the intent with the merchant key (scope commerce.read).
//
// .mjs on purpose: this repo has no package.json (see api/checkout.mjs).
const API_BASE = process.env.SWOP_API_BASE || 'https://apps.apiswop.co';

const ALLOWED_CALLERS = new Set([
  'https://swopme.co',
  'https://www.swopme.co',
  'http://localhost:4173',
]);
const INTENT_ID = /^co_[A-Za-z0-9_-]{4,40}$/;
const NO_BODY_POST = { method: 'POST', headers: { 'Content-Type': 'application/json' } };

async function swop(path, init) {
  const r = await fetch(`${API_BASE}${path}`, init);
  const body = await r.json().catch(() => ({}));
  return { ok: r.ok, status: r.status, body };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST.' });
  }
  const caller = req.headers.origin || '';
  if (caller && !ALLOWED_CALLERS.has(caller)) {
    return res.status(403).json({ error: 'Not an allowed caller.' });
  }
  const intentId = String(req.body?.intentId || '');
  const action = String(req.body?.action || '');
  if (!INTENT_ID.test(intentId)) return res.status(400).json({ error: 'Unknown checkout.' });
  res.setHeader('Cache-Control', 'no-store');

  try {
    if (action === 'card') {
      const r = await swop(`/api/v5/checkout-intents/${intentId}/card-payment-intents`, NO_BODY_POST);
      if (!r.ok) return res.status(r.status).json({ error: r.body?.message || 'Card is unavailable for this checkout.' });
      const d = r.body?.data || {};
      return res.status(200).json({
        clientSecret: d.clientSecret || null,
        publishableKey: d.publishableKey || null,
        state: d.state || null,
      });
    }

    if (action === 'crypto') {
      const r = await swop(`/api/v5/checkout-intents/${intentId}/select-crypto`, NO_BODY_POST);
      if (!r.ok) return res.status(r.status).json({ error: r.body?.message || 'Could not switch to USDC.' });
      // The request now lives on the intent; fall through and read it back.
    } else if (action !== 'status') {
      return res.status(400).json({ error: 'Unknown action.' });
    }

    const key = process.env.SWOP_MERCHANT_KEY;
    if (!key) return res.status(503).json({ error: 'Checkout is not configured on this site.' });
    const r = await swop(`/api/v5/merchant/checkout-intents/${intentId}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!r.ok) {
      if (r.status === 401 || r.status === 403) {
        console.error('[pay] merchant key rejected by Swop', JSON.stringify({ status: r.status, code: r.body?.code || null, message: r.body?.message || null }));
        return res.status(503).json({ error: 'Checkout is temporarily unavailable.' });
      }
      return res.status(r.status).json({ error: r.body?.message || 'Could not read this checkout.' });
    }
    const d = r.body?.data || {};
    let cardState = null;
    if (d.cardUseCase) {
      // Public read of the card payment, if one was started. 404 = none yet.
      const c = await swop(`/api/v5/checkout-intents/${intentId}/card-payment`, {});
      if (c.ok) cardState = c.body?.data?.state || null;
    }
    return res.status(200).json({
      status: d.status || null,
      paymentRequest: d.paymentRequest || null,
      total: d.fees?.totalDueAmount ?? d.amount?.value ?? null,
      cardState,
    });
  } catch {
    return res.status(502).json({ error: 'Could not reach Swop.' });
  }
}
