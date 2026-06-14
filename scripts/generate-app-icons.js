const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = path.join(__dirname, '..');
const iosSvgPath = path.join(rootDir, 'src/assets/blue.svg');
const iosSvgBuffer = fs.readFileSync(iosSvgPath);

const iosDir = path.join(
  rootDir,
  'ios/bluemonitor/Images.xcassets/AppIcon.appiconset',
);

const ICON_COLOR = '#55ACEE';

const iosIcons = [
  { filename: 'Icon-App-20x20@2x.png', size: 40 },
  { filename: 'Icon-App-20x20@3x.png', size: 60 },
  { filename: 'Icon-App-29x29@2x.png', size: 58 },
  { filename: 'Icon-App-29x29@3x.png', size: 87 },
  { filename: 'Icon-App-40x40@2x.png', size: 80 },
  { filename: 'Icon-App-40x40@3x.png', size: 120 },
  { filename: 'Icon-App-60x60@2x.png', size: 120 },
  { filename: 'Icon-App-60x60@3x.png', size: 180 },
  { filename: 'Icon-App-1024x1024@1x.png', size: 1024 },
];

// Legacy fallback icons for Android API < 26
const androidLegacyIcons = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

async function renderIosIcon(size, outputPath) {
  await sharp(iosSvgBuffer)
    .resize(size, size, {
      fit: 'contain',
      background: ICON_COLOR,
    })
    .png()
    .toFile(outputPath);
}

async function renderAndroidSquareIcon(size, outputPath) {
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: ICON_COLOR,
    },
  })
    .png()
    .toFile(outputPath);
}

async function renderAndroidRoundIcon(size, outputPath) {
  const radius = size / 2;
  const circleSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <circle cx="${radius}" cy="${radius}" r="${radius}" fill="${ICON_COLOR}" />
  </svg>`;

  await sharp(Buffer.from(circleSvg)).png().toFile(outputPath);
}

async function generateIcons() {
  for (const icon of iosIcons) {
    const outputPath = path.join(iosDir, icon.filename);
    await renderIosIcon(icon.size, outputPath);
    console.log(`iOS: ${icon.filename} (${icon.size}px)`);
  }

  for (const icon of androidLegacyIcons) {
    const resDir = path.join(rootDir, 'android/app/src/main/res', icon.folder);

    const squarePath = path.join(resDir, 'ic_launcher.png');
    await renderAndroidSquareIcon(icon.size, squarePath);
    console.log(`Android legacy: ${icon.folder}/ic_launcher.png (${icon.size}px)`);

    const roundPath = path.join(resDir, 'ic_launcher_round.png');
    await renderAndroidRoundIcon(icon.size, roundPath);
    console.log(`Android legacy: ${icon.folder}/ic_launcher_round.png (${icon.size}px)`);
  }

  console.log(
    'Android API 26+: adaptive icons in mipmap-anydpi-v26/ (no PNG regen needed)',
  );
}

generateIcons().catch(error => {
  console.error(error);
  process.exit(1);
});
