/* Hand-rolled multipart/form-data body builder — no deps, matches the house
   rule (post-to-x.js does the same). Used by any platform whose API takes a
   direct binary upload (Facebook photo posts, LinkedIn asset PUTs, etc). */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MIME = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif',
  webp: 'image/webp', mp4: 'video/mp4', mov: 'video/quicktime', m4v: 'video/x-m4v',
};

function mimeFor(filePath) {
  const ext = path.extname(filePath).slice(1).toLowerCase();
  return MIME[ext] || 'application/octet-stream';
}

// fields: [{ name, value }] for plain text fields, or [{ name, filePath, mime? }] for files.
function buildMultipart(fields) {
  const boundary = 'SwopBoundary' + crypto.randomBytes(12).toString('hex');
  const parts = [];
  for (const f of fields) {
    if (f.filePath) {
      const data = fs.readFileSync(f.filePath);
      parts.push(Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="${f.name}"; filename="${path.basename(f.filePath)}"\r\nContent-Type: ${f.mime || mimeFor(f.filePath)}\r\n\r\n`,
        'utf8',
      ));
      parts.push(data);
      parts.push(Buffer.from('\r\n', 'utf8'));
    } else {
      parts.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${f.name}"\r\n\r\n${f.value}\r\n`, 'utf8'));
    }
  }
  parts.push(Buffer.from(`--${boundary}--\r\n`, 'utf8'));
  return { body: Buffer.concat(parts), contentType: `multipart/form-data; boundary=${boundary}` };
}

module.exports = { buildMultipart, mimeFor };
