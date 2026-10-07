/**
 * api/pay.mjs: the status response must expose exactly five fields, and `funded`
 * must be a BOOLEAN - never the payment subdocument, which carries the payer
 * wallet and has no business on a public shop page.
 *
 * Run:  node -e ' require("./test/pay-funded-field.test.js")'
 */
const assert = require('assert');

const EXPECTED_KEYS = ['status', 'paymentRequest', 'total', 'cardState', 'funded'].sort();
const INTENT = 'co_tRyz9WZ4hxa5';

// The payer-identifying fields that live on the real payment subdocument
// (swop-app-backend/src/models/CheckoutIntent.js checkoutTransactionSchema) and
// must never appear in the response body.
const PAYMENT_DOC = {
  rail: 'solana',
  txHash: '5xDEADBEEFsignature',
  destinationTxHash: '0xabc',
  status: 'completed',
  sourceChain: 'solana',
  tokenAmount: 1,
  receivedAmount: 1,
};

function res() {
  const out = { code: null, body: null, headers: {} };
  return {
    out: out,
    setHeader: function (k, v) { out.headers[k] = v; },
    status: function (c) { out.code = c; return this; },
    json: function (b) { out.body = b; return this; },
  };
}

function stubFetch(intentData) {
  globalThis.fetch = async function (url) {
    if (String(url).indexOf('/merchant/checkout-intents/') >= 0) {
      return { ok: true, status: 200, json: async function () { return { data: intentData }; } };
    }
    return { ok: false, status: 404, json: async function () { return {}; } };
  };
}

async function statusBody(intentData) {
  const { default: handler } = await import('../api/pay.mjs');
  stubFetch(intentData);
  const r = res();
  await handler({ method: 'POST', headers: {}, body: { intentId: INTENT, action: 'status' } }, r);
  return r.out;
}

async function main() {
  process.env.SWOP_MERCHANT_KEY = process.env.SWOP_MERCHANT_KEY || 'test-key';
  let pass = 0;
  const fails = [];
  function check(name, fn) {
    try { fn(); pass += 1; } catch (e) { fails.push(name + ' :: ' + e.message); }
  }

  const funded = await statusBody({
    status: 'conversion_failed',
    paymentRequest: null,
    fees: { totalDueAmount: 1 },
    payment: PAYMENT_DOC,
    payer: { id: 'u1', name: 'Buyer', email: 'b@e.com', wallet: { address: 'WALLET' } },
  });

  check('200 on a terminal status', function () { assert.strictEqual(funded.code, 200); });
  check('exposes exactly five fields', function () {
    assert.deepStrictEqual(Object.keys(funded.body).sort(), EXPECTED_KEYS);
  });
  check('funded is a boolean, not the subdocument', function () {
    assert.strictEqual(typeof funded.body.funded, 'boolean');
    assert.strictEqual(funded.body.funded, true);
  });
  check('no txHash reaches the page', function () {
    assert.strictEqual(JSON.stringify(funded.body).indexOf(PAYMENT_DOC.txHash), -1);
  });
  check('no payer wallet reaches the page', function () {
    assert.strictEqual(JSON.stringify(funded.body).indexOf('WALLET'), -1);
  });
  check('no payer email reaches the page', function () {
    assert.strictEqual(JSON.stringify(funded.body).indexOf('b@e.com'), -1);
  });
  check('no-store is still set', function () {
    assert.strictEqual(funded.headers['Cache-Control'], 'no-store');
  });

  // The card rail stamps txHash with the Stripe paymentRef, so funded is TRUE
  // there too. This is why the shop copy must never read funded as 'crypto paid'.
  const cardFunded = await statusBody({
    status: 'settlement_failed',
    fees: { totalDueAmount: 1 },
    payment: { rail: 'stripe_connect_card', txHash: 'pi_123', status: 'completed' },
  });
  check('card rail also reports funded', function () {
    assert.strictEqual(cardFunded.body.funded, true);
  });

  for (const [label, payment] of [['missing payment', undefined], ['null txHash', { rail: 'solana', txHash: null }], ['empty txHash', { rail: 'solana', txHash: '' }]]) {
    // eslint-disable-next-line no-await-in-loop
    const r = await statusBody({ status: 'conversion_failed', fees: { totalDueAmount: 1 }, payment: payment });
    check(label + ' -> funded false', function () { assert.strictEqual(r.body.funded, false); });
  }

  console.log('api/pay.mjs: ' + pass + '/' + (pass + fails.length) + ' passed');
  fails.forEach(function (f) { console.log('  FAIL  ' + f); });
  console.log(fails.length === 0 ? 'PASS' : 'FAIL');
  if (fails.length) process.exitCode = 1;
}

main().catch(function (e) { console.error('SUITE CRASHED: ' + (e && e.stack || e)); process.exitCode = 1; });

