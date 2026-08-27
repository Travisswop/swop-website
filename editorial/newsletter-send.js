/* Send (or stage) the Swop Daily newsletter as a Resend Broadcast to the
   "Swop Daily" audience. Part of the daily flow in editorial/NEWSLETTER.md.

   Usage (any cwd; no deps beyond Node 18+ fetch):
     node newsletter-send.js --html <issue.html> --subject "Swop Daily #79 — ..." [flags]

   Flags:
     --dry-run          print what would happen, touch nothing
     --test <email>     send a single regular email to <email> instead (subject
                        gets a [TEST] prefix; unsubscribe link becomes inert)
     --send             create the broadcast AND send it now
     --at <ISO>         with --send: schedule instead (e.g. 2026-08-28T12:30:00Z)
     (no --send/--test) create the broadcast as a DRAFT and print its id/URL

   Every outgoing issue gets an unsubscribe footer: if the HTML doesn't already
   contain RESEND_UNSUBSCRIBE_URL, one is injected before </body>. Broadcasts
   without it would strand recipients with no way out — never bypass this.

   Key: RESEND_API_KEY env, or ~/.config/swop/resend.env. Audience/from/replyTo:
   editorial/resend.config.json (written by newsletter-audience-sync.js). */
const fs = require('fs');
const os = require('os');
const path = require('path');

const RESEND = 'https://api.resend.com';
const CONFIG_PATH = path.join(__dirname, 'resend.config.json');

function arg(name) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : undefined;
}
const has = (name) => process.argv.includes(name);

function apiKey() {
  if (process.env.RESEND_API_KEY) return process.env.RESEND_API_KEY;
  const p = path.join(os.homedir(), '.config/swop/resend.env');
  if (fs.existsSync(p)) {
    const m = fs.readFileSync(p, 'utf8').match(/^RESEND_API_KEY=(.+)$/m);
    if (m) return m[1].trim();
  }
  throw new Error('RESEND_API_KEY not set (env or ~/.config/swop/resend.env)');
}

async function resend(key, method, p, body) {
  const r = await fetch(RESEND + p, {
    method,
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await r.text();
  if (!r.ok) throw new Error(`${method} ${p} -> ${r.status}: ${text.slice(0, 300)}`);
  try { return JSON.parse(text); } catch { return { raw: text }; }
}

const UNSUB_FOOTER =
  '<p style="margin:28px 0 0;padding:16px 0 0;border-top:1px solid #26262b;' +
  'font:12px/1.6 -apple-system,Segoe UI,sans-serif;color:#8a8a93;text-align:center">' +
  "You're receiving Swop Daily because you have a Swop account. " +
  '<a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#8a8a93">Unsubscribe</a></p>';

(async () => {
  const htmlPath = arg('--html');
  const subject = arg('--subject');
  if (!htmlPath || !subject) {
    throw new Error('usage: newsletter-send.js --html <file> --subject "..." [--dry-run|--test <email>|--send [--at <ISO>]]');
  }
  const key = apiKey();
  const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  if (!cfg.audienceId) throw new Error('resend.config.json has no audienceId — run newsletter-audience-sync.js first');

  let html = fs.readFileSync(path.resolve(htmlPath), 'utf8');
  if (!html.includes('RESEND_UNSUBSCRIBE_URL')) {
    html = html.includes('</body>')
      ? html.replace('</body>', `${UNSUB_FOOTER}\n</body>`)
      : html + UNSUB_FOOTER;
  }

  const testTo = arg('--test');
  if (has('--dry-run')) {
    console.log(JSON.stringify({
      dryRun: true, subject, htmlBytes: html.length, audienceId: cfg.audienceId,
      from: cfg.from, mode: testTo ? `test->${testTo}` : has('--send') ? 'send' : 'draft',
    }, null, 2));
    return;
  }

  if (testTo) {
    const res = await resend(key, 'POST', '/emails', {
      from: cfg.from, to: [testTo], reply_to: cfg.replyTo,
      subject: `[TEST] ${subject}`,
      html: html.replaceAll('{{{RESEND_UNSUBSCRIBE_URL}}}', 'https://swopme.co'),
    });
    console.log(JSON.stringify({ test: true, to: testTo, id: res.id }));
    return;
  }

  const broadcast = await resend(key, 'POST', '/broadcasts', {
    audience_id: cfg.audienceId, from: cfg.from, reply_to: cfg.replyTo,
    subject, html, name: subject,
  });

  if (has('--send')) {
    const at = arg('--at');
    const sent = await resend(key, 'POST', `/broadcasts/${broadcast.id}/send`,
      at ? { scheduled_at: at } : {});
    console.log(JSON.stringify({ broadcastId: broadcast.id, sent: true, scheduledAt: at || 'now', res: sent }));
  } else {
    console.log(JSON.stringify({
      broadcastId: broadcast.id, sent: false,
      review: `https://resend.com/broadcasts/${broadcast.id}`,
    }));
  }
})().catch((e) => { console.error(e.message); process.exit(1); });
