// Generate legacy favicon.ico from zlcs512.png
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = '/home/devbox/project';
const SRC = path.join(ROOT, 'zlcs512.png');

// Sharp can't write .ico, so generate sizes and use node to craft a minimal multi-res ICO.
const sizes = [16, 24, 32, 48, 64];

async function toPngBuffer(size) {
  return sharp(SRC).resize(size, size, { fit: 'cover', kernel: 'lanczos3' })
    .png({ compressionLevel: 6 }).toBuffer();
}

function buildIco(pngBuffers) {
  // ICONDIR (6 bytes) + ICONDIRENTRY (16 bytes each) + PNG data
  const count = pngBuffers.length;
  const dirSize = 6 + 16 * count;
  let dataOffset = dirSize;
  const entries = [];
  const dataParts = [];
  for (let i = 0; i < count; i++) {
    const buf = pngBuffers[i];
    const w = sizes[i] >= 256 ? 0 : sizes[i];
    const h = sizes[i] >= 256 ? 0 : sizes[i];
    const entry = Buffer.alloc(16);
    entry.writeUInt8(w, 0);
    entry.writeUInt8(h, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(dataOffset, 12);
    entries.push(entry);
    dataParts.push(buf);
    dataOffset += buf.length;
  }
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: ICO
  header.writeUInt16LE(count, 4);
  return Buffer.concat([header, ...entries, ...dataParts]);
}

async function main() {
  const bufs = [];
  for (const s of sizes) bufs.push(await toPngBuffer(s));
  const ico = buildIco(bufs);
  const out = path.join(ROOT, 'public/favicon.ico');
  fs.writeFileSync(out, ico);
  console.log('WROTE public/favicon.ico', ico.length, 'bytes');
}
main().catch(e => { console.error(e); process.exit(1); });
