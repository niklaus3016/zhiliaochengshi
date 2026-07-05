// Replace all app icons with zlcs512.png resized appropriately
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = '/home/devbox/project';
const SRC = path.join(ROOT, 'zlcs512.png');

// Ensure src is a clean valid PNG by reading and writing through sharp once.
// Android mipmap targets (sizes are standard launcher sizes per DPI bucket):
//   mdpi      : 48x48
//   hdpi      : 72x72
//   xhdpi     : 96x96
//   xxhdpi    : 144x144
//   xxxhdpi   : 192x192
// adaptive-icon foreground files should be 108dp * 1.0 baseline = 108dp => pixel sizes:
//   mdpi  108 / hdpi 162 / xhdpi 216 / xxhdpi 324 / xxxhdpi 432
// However existing project's foreground sizes were:
//   mdpi 108, hdpi 162(corrupt), xhdpi 216(corrupt), xxhdpi 324, xxxhdpi 432(corrupt)
// We'll use these standard sizes.

const targets = [
  // ic_launcher.png, ic_launcher_round.png - legacy square/round
  { file: 'android/app/src/main/res/mipmap-mdpi/ic_launcher.png',           w: 48,  h: 48  },
  { file: 'android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png',     w: 48,  h: 48  },
  { file: 'android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png',w: 108, h: 108 },
  { file: 'android/app/src/main/res/mipmap-hdpi/ic_launcher.png',           w: 72,  h: 72  },
  { file: 'android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png',     w: 72,  h: 72  },
  { file: 'android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png',w: 162, h: 162 },
  { file: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher.png',          w: 96,  h: 96  },
  { file: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png',    w: 96,  h: 96  },
  { file: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png', w: 216, h: 216 },
  { file: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png',         w: 144, h: 144 },
  { file: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png',   w: 144, h: 144 },
  { file: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png', w: 324, h: 324 },
  { file: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png',        w: 192, h: 192 },
  { file: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png',  w: 192, h: 192 },
  { file: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png', w: 432, h: 432 },

  // Android splash images - standard sizes per DPI/orientation
  // drawable/splash.png fallback
  { file: 'android/app/src/main/res/drawable/splash.png',                  w: 495, h: 320 }, // approx mdpi port
  // landscape
  { file: 'android/app/src/main/res/drawable-land-mdpi/splash.png',        w: 495, h: 320 },
  { file: 'android/app/src/main/res/drawable-land-hdpi/splash.png',        w: 800, h: 480 },
  { file: 'android/app/src/main/res/drawable-land-xhdpi/splash.png',       w: 1280, h: 720 },
  { file: 'android/app/src/main/res/drawable-land-xxhdpi/splash.png',      w: 1600, h: 960 },
  { file: 'android/app/src/main/res/drawable-land-xxxhdpi/splash.png',     w: 2048, h: 1280 },
  // portrait
  { file: 'android/app/src/main/res/drawable-port-mdpi/splash.png',        w: 320, h: 495 },
  { file: 'android/app/src/main/res/drawable-port-hdpi/splash.png',        w: 480, h: 800 },
  { file: 'android/app/src/main/res/drawable-port-xhdpi/splash.png',       w: 720, h: 1280 },
  { file: 'android/app/src/main/res/drawable-port-xxhdpi/splash.png',      w: 960, h: 1600 },
  { file: 'android/app/src/main/res/drawable-port-xxxhdpi/splash.png',     w: 1280, h: 2048 },

  // Web public assets (favicon + large)
  { file: 'public/favicon.png',        w: 64,  h: 64  },
  { file: 'public/favicon-180.png',    w: 180, h: 180 },
  { file: 'public/apple-touch-icon.png', w: 180, h: 180 },
  { file: 'public/icon-192.png',       w: 192, h: 192 },
  { file: 'public/icon-512.png',       w: 512, h: 512 },
];

async function main() {
  // Verify source
  const meta = await sharp(SRC).metadata();
  console.log('SOURCE', SRC, meta.width, 'x', meta.height, 'format', meta.format);

  // Ensure public dir
  const publicDir = path.join(ROOT, 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  for (const t of targets) {
    const out = path.join(ROOT, t.file);
    const dir = path.dirname(out);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await sharp(SRC)
      .resize(t.w, t.h, { fit: 'cover', kernel: 'lanczos3' })
      .png({ compressionLevel: 6, adaptiveFiltering: true })
      .toFile(out);
    // Verify
    const m = await sharp(out).metadata();
    console.log('WROTE', t.file, '=>', m.width, 'x', m.height, fs.statSync(out).size, 'bytes');
  }
  console.log('All icons replaced successfully.');
}

main().catch(err => { console.error(err); process.exit(1); });
