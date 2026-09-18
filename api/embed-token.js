// Mints a short-lived Swop embed token so this site may frame Swop checkout.
//
// WHY THIS FILE EXISTS AT ALL: minting requires a merchant API key, and this is
// otherwise a static site. A key in static HTML is a published key, and this
// one mints framing permission — so the key lives only here, in a Vercel
// Function, and the browser never sees it. The browser gets a token that is
// good for one origin, one subject, and a few minutes.
//
// Required env (Vercel project settings, server-side only — no NEXT_PUBLIC):
//   SWOP_MERCHANT_KEY   the merchant API key secret, scope commerce.embed
//   SWOP_STORE_HANDLE   e.g. travis.swop.id
// Optional:
//   SWOP_API_BASE       defaults to https://apps.apiswop.co
//   SWOP_EMBED_ORIGIN   the origin to request; defaults to this deployment's
//
// The origin must ALSO be registered on the Swop account. That is the point of
// the registration gate: if this key leaked, it still could not frame checkout
// anywhere the merchant had not deliberately allowed.

const API_BASE = process.env.SWOP_API_BASE || 'https://apps.apiswop.co';

// Only these may call this function. A token minted for swopme.co is useless
// elsewhere, but there is no reason to mint one for a stranger either.
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
  const handle = process.env.SWOP_STORE_HANDLE;
  if (!key || !handle) {
    // Fail closed and say so plainly: an unconfigured deployment should not
    // look like a broken Swop, it should look like a missing setting.
    return res.status(503).json({ error: 'Embedded checkout is not configured on this site.' });
  }

  const origin = process.env.SWOP_EMBED_ORIGIN || caller || 'https://swopme.co';

  try {
    const upstream = await fetch(`${API_BASE}/api/v5/merchant/embed-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({ scope: 'store', storeHandle: handle, origin }),
    });

    const body = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      // Pass the status through — 403 here almost always means the origin is
      // not registered on the Swop account yet, which is actionable.
      return res.status(upstream.status).json({
        error: body?.message || 'Swop refused to mint a token.',
      });
    }

    const data = body?.data || {};
    if (!data.token) return res.status(502).json({ error: 'No token came back from Swop.' });

    // Never cache a credential.
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      token: data.token,
      handle,
      expiresIn: data.expiresIn ?? null,
    });
  } catch (e) {
    return res.status(502).json({ error: 'Could not reach Swop.' });
  }
}
