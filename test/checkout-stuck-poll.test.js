/**
 * Checkout poll: every terminal status must END the poll.
 *
 * Run:  node -e ' require("./test/checkout-stuck-poll.test.js")'
 * (this repo has no package.json, so there is no jest - see api/checkout.mjs)
 *
 * The suite does not copy shop.html logic, it EXTRACTS the shipped block from
 * shop.html and executes it against a stubbed page. If anyone moves the markers
 * the suite fails loudly instead of silently testing a stale copy.
 *
 * It then applies four MUTANTS to that same extracted source and asserts each one
 * turns a specific case red, which is what proves the assertions actually bite.
 */
const fs = require('fs');
const path = require('path');

const SHOP = path.join(__dirname, '..', 'shop.html');
const START = '  var PAID_STATUS = { paid: 1, settled: 1 };';
const END = '  function paymentHtml(b) {';
const ESC_LINE = '  var esc = function (v) {';

// The ten CheckoutIntent.status values, verbatim from
// swop-app-backend/src/models/CheckoutIntent.js:484-498. Kept here so a new
// status added upstream shows up as an unclassified case below, not as silence.
const ALL_STATUS = [
  'active', 'pending_payment', 'paid', 'conversion_failed', 'settlement_failed',
  'settled', 'refunding', 'refunded', 'expired', 'cancelled',
];

const INTENT = 'co_tRyz9WZ4hxa5';

function readShop() {
  return fs.readFileSync(SHOP, 'utf8');
}

function extractBlock(src) {
  const a = src.indexOf(START);
  const b = src.indexOf(END);
  if (a < 0) throw new Error('EXTRACT FAILED: PAID_STATUS marker moved in shop.html');
  if (b < 0 || b < a) throw new Error('EXTRACT FAILED: paymentHtml marker moved in shop.html');
  return src.slice(a, b);
}

function extractEsc(src) {
  const i = src.indexOf(ESC_LINE);
  if (i < 0) throw new Error('EXTRACT FAILED: esc helper moved in shop.html');
  const end = src.indexOf('\n', i);
  const line = src.slice(i, end);
  // eslint-disable-next-line no-new-func
  return new Function(line + '; return esc;')();
}

// --- the harness: run the extracted block against a stubbed page -------------

function runPoll(block, esc, reply, seed) {
  const state = {
    cart: (seed && seed.cart) || [{ id: 'sku1', qty: 1 }],
    step: 'pay',
    payment: {
      intentId: INTENT,
      rail: 'crypto',
      paymentRequest: { url: 'solana:abc', amount: 1, recipient: 'Rcpt', rail: 'solana_pay' },
    },
    stripeEls: { mounted: true },
  };
  const box = { innerHTML: '<p class="cdesc">Waiting for your payment...</p>' };
  const calls = { badge: 0, stopPolling: 0, setTimeout: 0, paymentHtml: 0 };

  const wrapper = [
    'var cart = __s.cart, step = __s.step, payment = __s.payment, stripeEls = __s.stripeEls;',
    'var pollTimer = null;',
    block,
    'return {',
    '  pollStatus: pollStatus,',
    '  stuck: STUCK_STATUS,',
    '  read: function () {',
    '    return { cart: cart, step: step, payment: payment, stripeEls: stripeEls, pollTimer: pollTimer };',
    '  },',
    '};',
  ].join('\n');

  // eslint-disable-next-line no-new-func
  const make = new Function(
    '__s', 'money', 'esc', 'buyer', '$', 'stopPolling', 'api',
    'badge', 'setTimeout', 'paymentHtml', 'clearTimeout',
    wrapper
  );

  const mod = make(
    state,
    function money(v) { return '' + v; },
    esc,
    { email: 'buyer@example.com' },
    function (id) { return id === 'cdPayBox' ? box : null; },
    function stopPolling() { calls.stopPolling += 1; },
    async function api() {
      if (reply instanceof Error) throw reply;
      return reply;
    },
    function badge() { calls.badge += 1; },
    function setTimeoutStub() { calls.setTimeout += 1; return 99; },
    function paymentHtml() { calls.paymentHtml += 1; },
    function clearTimeoutStub() {}
  );

  return mod.pollStatus().then(function () {
    return { html: box.innerHTML, calls: calls, after: mod.read(), stuck: mod.stuck };
  });
}

// --- the suite ----------------------------------------------------------------

// Copy we must never ship on a terminal-failure screen. s.funded proves only that
// a payment is ON FILE; the record is written after the fact and the card rail
// stamps txHash with the Stripe paymentRef, so false means 'no record yet' on
// either rail. Denying a charge we cannot see is the one wrong thing to say.
const FORBIDDEN_COPY = /not\s+(been\s+)?charged|no\s+charge|nothing\s+was\s+taken|you\s+were\s+not\s+billed/i;

// The MIRROR of the rule above, required by CRITIC 2026-10-07. This suite forbade
// falsely DENYING a charge and permitted falsely ASSERTING one - a mutant that always
// took the funded branch passed every assertion. A buyer with no payment on file who
// is told there is nothing more to pay stops, never pays, and waits for an outcome
// nobody owes them. Same cost as the denial, opposite direction.
const FORBIDDEN_FUNDED_CLAIM = /nothing more to pay|we can see this/i;

// And the third direction: a buyer whose money IS on file must never be invited to
// send it again. That is the double-pay this whole patch exists to close.
const RETRY_INVITE = /go back to your cart and try again/i;

const WAITING = /Waiting for your payment/;
const SUPPORT = 'support@swopme.co';

async function suite(block, esc) {
  const fails = [];
  let pass = 0;
  function check(name, cond, detail) {
    if (cond) { pass += 1; return; }
    fails.push(name + (detail ? ' :: ' + detail : ''));
  }

  // 1. THE INVARIANT, over every one of the ten CheckoutIntent statuses:
  //    only active / pending_payment may schedule another poll.
  const KEEP_POLLING = { active: 1, pending_payment: 1 };
  for (const status of ALL_STATUS) {
    const r = await runPoll(block, esc, { status: status, funded: true, cardState: null });
    const polled = r.calls.setTimeout > 0 || r.after.pollTimer !== null;
    if (KEEP_POLLING[status]) {
      check('polls on ' + status, polled, 'expected another poll, got none');
      check('no false claim on ' + status, WAITING.test(r.html), 'wait copy was replaced');
    } else {
      check('ENDS the poll on ' + status, !polled, 'still re-polling - buyer sees Waiting forever');
      check('leaves the wait copy on ' + status, !WAITING.test(r.html), 'still says Waiting for your payment');
    }
  }

  // 2. An unknown future status keeps polling - neutral, never a wrong answer.
  const unknown = await runPoll(block, esc, { status: 'quantum_pending', funded: false, cardState: null });
  check('unknown status keeps polling', unknown.calls.setTimeout > 0);
  check('unknown status claims nothing', WAITING.test(unknown.html));

  // 3. The two statuses that strand a paid buyer today.
  for (const status of ['conversion_failed', 'settlement_failed', 'refunding', 'refunded']) {
    const paid = await runPoll(block, esc, { status: status, funded: true, cardState: null });
    check(status + ' funded: quotes the reference', paid.html.indexOf(INTENT) >= 0, 'no reference for support to search on');
    check(status + ' funded: names support', paid.html.indexOf(SUPPORT) >= 0);
    check(status + ' funded: clears the cart', paid.after.cart.length === 0, 'buyer can pay a second time');
    check(status + ' funded: no false denial', !FORBIDDEN_COPY.test(paid.html), 'denies a charge it cannot see');
    check(status + ' funded: never invites a second payment', !RETRY_INVITE.test(paid.html), 'tells a buyer whose money is already on file to pay again');

    const unfunded = await runPoll(block, esc, { status: status, funded: false, cardState: null });
    check(status + ' unfunded: quotes the reference', unfunded.html.indexOf(INTENT) >= 0);
    check(status + ' unfunded: KEEPS the cart', unfunded.after.cart.length === 1, 'cart wiped though retrying is the right move');
    check(status + ' unfunded: no false denial', !FORBIDDEN_COPY.test(unfunded.html), 'denies a charge it cannot see');
    check(status + ' unfunded: no false CLAIM of payment', !FORBIDDEN_FUNDED_CLAIM.test(unfunded.html), 'asserts a charge it cannot see - the buyer stops and never pays');
  }

  // 4. The happy paths still work.
  for (const status of ['paid', 'settled']) {
    const r = await runPoll(block, esc, { status: status, funded: true, cardState: null });
    check(status + ' shows Payment received', r.html.indexOf('Payment received') >= 0);
    check(status + ' clears the cart', r.after.cart.length === 0);
  }
  const card = await runPoll(block, esc, { status: 'active', funded: true, cardState: 'transferred' });
  check('card transferred shows Payment received', card.html.indexOf('Payment received') >= 0);

  // 5. expired / cancelled keep their own copy. Asserted ONLY for funded: false -
  //    the retry invitation is correct when no payment is on file and dangerous when
  //    one is, so whoever later covers the funded case must NOT delete this, only
  //    scope it. See CRITIC 2026-10-07 note 1 (the late-Helius-match race).
  for (const status of ['expired', 'cancelled']) {
    const r = await runPoll(block, esc, { status: status, funded: false, cardState: null });
    check(status + ' unfunded: tells the buyer to retry', r.html.indexOf('Go back to your cart') >= 0);
  }

  // 6. A transient /api/pay failure must keep waiting, not strand the buyer.
  const boom = await runPoll(block, esc, new Error('network'));
  check('transient error keeps polling', boom.calls.setTimeout > 0);

  return { pass: pass, fails: fails };
}

// --- mutants: proof the assertions above actually bite ------------------------

function mutate(block, name) {
  if (name === 'M1 no terminal branch (pre-patch baseline)') {
    const a = block.indexOf('      var stuck = STUCK_STATUS[s.status];');
    const b = block.indexOf('      if (s.status === ' + QUOTE + 'expired' + QUOTE + '');
    if (a < 0 || b < 0 || b < a) throw new Error('MUTANT M1 ANCHOR MISS');
    return block.slice(0, a) + block.slice(b);
  }
  if (name === 'M2 refund statuses dropped') {
    const lines = [
      '    refunding: ' + QUOTE + 'This checkout is being refunded.' + QUOTE + ',',
      '    refunded: ' + QUOTE + 'This checkout has been refunded.' + QUOTE + ',',
    ].join('\n');
    if (block.indexOf(lines) < 0) throw new Error('MUTANT M2 ANCHOR MISS');
    return block.split(lines).join('');
  }
  if (name === 'M3 cart cleared unconditionally') {
    const a = 'if (s.funded) { cart = []';
    if (block.indexOf(a) < 0) throw new Error('MUTANT M3 ANCHOR MISS');
    return block.split(a).join('if (true) { cart = []');
  }
  if (name === 'M4 denies the charge') {
    const a = 'If your wallet shows the payment left';
    if (block.indexOf(a) < 0) throw new Error('MUTANT M4 ANCHOR MISS');
    const i = block.indexOf(a);
    const j = block.indexOf(QUOTE, i);
    return block.slice(0, i) + 'You were not charged.' + block.slice(j);
  }
  if (name === 'M5 cart-clear guard inverted') {
    const a = 'if (s.funded) { cart = []';
    if (block.indexOf(a) < 0) throw new Error('MUTANT M5 ANCHOR MISS');
    return block.split(a).join('if (!s.funded) { cart = []');
  }
  if (name === 'M6 copy always takes the funded branch') {
    const a = '+ (s.funded';
    if (block.indexOf(a) < 0) throw new Error('MUTANT M6 ANCHOR MISS');
    return block.split(a).join('+ (true');
  }
  if (name === 'M7 funded/unfunded copy swapped') {
    const A = 'There is nothing more to pay. We can see this and will finish your order or refund you.';
    const B = 'If your wallet shows the payment left, nothing is lost - quote the reference below. If it does not, go back to your cart and try again.';
    if (block.indexOf(A) < 0 || block.indexOf(B) < 0) throw new Error('MUTANT M7 ANCHOR MISS');
    return block.split(A).join('@@SWAP@@').split(B).join(A).split('@@SWAP@@').join(B);
  }
  throw new Error('unknown mutant ' + name);
}

const QUOTE = String.fromCharCode(39);

const MUTANTS = [
  'M1 no terminal branch (pre-patch baseline)',
  'M2 refund statuses dropped',
  'M3 cart cleared unconditionally',
  'M4 denies the charge',
  'M5 cart-clear guard inverted',
  'M6 copy always takes the funded branch',
  'M7 funded/unfunded copy swapped',
];

// --- main ---------------------------------------------------------------------

async function main() {
  const src = readShop();
  const block = extractBlock(src);
  const esc = extractEsc(src);

  const green = await suite(block, esc);
  console.log('shop.html as shipped: ' + green.pass + '/' + (green.pass + green.fails.length) + ' passed');
  green.fails.forEach(function (f) { console.log('  FAIL  ' + f); });

  let mutantsRed = 0;
  for (const name of MUTANTS) {
    const red = await suite(mutate(block, name), esc);
    const ok = red.fails.length > 0;
    if (ok) mutantsRed += 1;
    console.log(
      (ok ? '  RED  ' : '  GREEN(BAD) ') + name + ' -> ' + red.fails.length + ' failing' +
      (ok ? ', first: ' + red.fails[0] : ' - THIS MUTANT WENT UNDETECTED')
    );
  }

  const ok = green.fails.length === 0 && mutantsRed === MUTANTS.length;
  console.log(ok
    ? 'PASS - shipped source green, all ' + MUTANTS.length + ' mutants red'
    : 'FAIL - see above');
  if (!ok) process.exitCode = 1;
}

main().catch(function (e) { console.error('SUITE CRASHED: ' + (e && e.stack || e)); process.exitCode = 1; });

