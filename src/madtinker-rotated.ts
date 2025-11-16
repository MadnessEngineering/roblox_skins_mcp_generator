/**
 * Mad Tinker Outfit - Samstrod with Rotated Arms
 * Generate design elements naturally, then rotate to fit horizontal layout
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

const SHIRT_WIDTH = 585;
const SHIRT_HEIGHT = 559;

/**
 * Generate individual components and composite them with rotation
 */
async function generateMadTinkerRotated(outputPath: string): Promise<void> {
  // Start with base
  const base = sharp({
    create: {
      width: SHIRT_WIDTH,
      height: SHIRT_HEIGHT,
      channels: 4,
      background: { r: 59, g: 89, b: 152, alpha: 1 } // Roblox blue
    }
  });

  // Front torso SVG (center top)
  const frontTorsoSVG = `
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="labCoat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
    </linearGradient>
    <radialGradient id="gear">
      <stop offset="0%" style="stop-color:#8B7355;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
    </radialGradient>
  </defs>

  <rect width="256" height="256" fill="url(#labCoat)" opacity="0.95"/>

  <!-- Lapels -->
  <path d="M 0,0 L 32,0 L 52,60 L 32,60 Z" fill="#D0D0D0" stroke="#A0A0A0" stroke-width="2"/>
  <path d="M 256,0 L 224,0 L 204,60 L 224,60 Z" fill="#D0D0D0" stroke="#A0A0A0" stroke-width="2"/>

  <!-- Center buttons -->
  <circle cx="128" cy="40" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
  <circle cx="128" cy="70" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
  <circle cx="128" cy="100" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
  <circle cx="128" cy="130" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
  <circle cx="128" cy="160" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>

  <!-- Tool pocket -->
  <rect x="32" y="180" width="50" height="40" rx="3" fill="#4A4A4A" stroke="#2A2A2A" stroke-width="2"/>
  <line x1="32" y1="188" x2="82" y2="188" stroke="#2A2A2A" stroke-width="1.5"/>

  <!-- Wrench -->
  <rect x="44" y="182" width="5" height="25" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
  <rect x="40" y="203" width="13" height="7" rx="2" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>

  <!-- Screwdriver -->
  <rect x="62" y="182" width="3" height="27" fill="#654321" stroke="#4A4A4A" stroke-width="1"/>
  <polygon points="63,182 60,176 66,176" fill="#8B8B8B"/>

  <!-- Gear badges -->
  <circle cx="192" cy="80" r="16" fill="url(#gear)" stroke="#4A4A4A" stroke-width="2"/>
  <circle cx="192" cy="80" r="6" fill="#2A2A2A"/>
  <circle cx="222" cy="120" r="10" fill="url(#gear)" stroke="#4A4A4A" stroke-width="1.5"/>
  <circle cx="222" cy="120" r="4" fill="#2A2A2A"/>

  <!-- Name tag -->
  <rect x="162" y="200" width="70" height="28" rx="3" fill="#FFFFFF" stroke="#4A4A4A" stroke-width="2"/>
  <text x="197" y="218" font-family="monospace" font-size="11" fill="#2A2A2A" text-anchor="middle" font-weight="bold">MAD</text>
  <text x="197" y="230" font-family="monospace" font-size="11" fill="#2A2A2A" text-anchor="middle" font-weight="bold">TINKER</text>
</svg>`;

  // Back torso SVG
  const backTorsoSVG = `
<svg width="256" height="128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="labCoat2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
    </linearGradient>
  </defs>

  <rect width="256" height="128" fill="url(#labCoat2)" opacity="0.95"/>

  <!-- Center seam -->
  <line x1="128" y1="0" x2="128" y2="128" stroke="#A0A0A0" stroke-width="2" stroke-dasharray="5,3"/>

  <!-- THE LAB logo -->
  <circle cx="128" cy="64" r="40" fill="#4A4A4A" opacity="0.8"/>
  <circle cx="128" cy="64" r="26" fill="#654321" stroke="#4A4A4A" stroke-width="2"/>
  <circle cx="128" cy="64" r="10" fill="#2A2A2A"/>

  <text x="128" y="115" font-family="monospace" font-size="13" fill="#2A2A2A" text-anchor="middle" font-weight="bold">THE LAB</text>
</svg>`;

  // Left arm (will be rotated 90° clockwise for right side of template)
  const leftArmSVG = `
<svg width="128" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="labCoat3" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
    </linearGradient>
  </defs>

  <rect width="128" height="256" fill="url(#labCoat3)" opacity="0.9"/>
  <rect x="5" y="5" width="118" height="246" fill="none" stroke="#C0C0C0" stroke-width="2"/>

  <!-- Wrench patch on upper arm -->
  <path d="M 58,60 L 63,60 L 63,90 L 58,90 Z" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
  <ellipse cx="60.5" cy="57" rx="6" ry="4" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>

  <!-- Rolled cuff at bottom -->
  <rect x="0" y="210" width="128" height="46" fill="#E0E0E0" stroke="#A0A0A0" stroke-width="2"/>
  <line x1="0" y1="233" x2="128" y2="233" stroke="#A0A0A0" stroke-width="1"/>
</svg>`;

  // Right arm (will be rotated 90° counter-clockwise for left side of template)
  const rightArmSVG = `
<svg width="128" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="labCoat4" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
    </linearGradient>
  </defs>

  <rect width="128" height="256" fill="url(#labCoat4)" opacity="0.9"/>
  <rect x="5" y="5" width="118" height="246" fill="none" stroke="#C0C0C0" stroke-width="2"/>

  <!-- Small gear on upper arm -->
  <circle cx="64" cy="80" r="12" fill="#654321" stroke="#4A4A4A" stroke-width="1.5"/>
  <circle cx="64" cy="80" r="5" fill="#2A2A2A"/>

  <!-- Rolled cuff at bottom -->
  <rect x="0" y="210" width="128" height="46" fill="#E0E0E0" stroke="#A0A0A0" stroke-width="2"/>
  <line x1="0" y1="233" x2="128" y2="233" stroke="#A0A0A0" stroke-width="1"/>
</svg>`;

  // Bottom torso extension
  const bottomSVG = `
<svg width="256" height="111" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="labCoat5" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
    </linearGradient>
  </defs>

  <rect width="256" height="111" fill="url(#labCoat5)" opacity="0.9"/>
  <line x1="5" y1="0" x2="5" y2="111" stroke="#A0A0A0" stroke-width="2"/>
  <line x1="251" y1="0" x2="251" y2="111" stroke="#A0A0A0" stroke-width="2"/>

  <!-- Scattered gears -->
  <circle cx="52" cy="42" r="10" fill="#654321" stroke="#4A4A4A" stroke-width="1"/>
  <circle cx="204" cy="67" r="12" fill="#654321" stroke="#4A4A4A" stroke-width="1"/>
  <circle cx="92" cy="87" r="9" fill="#654321" stroke="#4A4A4A" stroke-width="1"/>
</svg>`;

  // Generate buffers from SVG
  const frontBuffer = await sharp(Buffer.from(frontTorsoSVG)).png().toBuffer();
  const backBuffer = await sharp(Buffer.from(backTorsoSVG)).png().toBuffer();
  const leftArmBuffer = await sharp(Buffer.from(leftArmSVG)).png().toBuffer();
  const rightArmBuffer = await sharp(Buffer.from(rightArmSVG)).png().toBuffer();
  const bottomBuffer = await sharp(Buffer.from(bottomSVG)).png().toBuffer();

  // Rotate arms to horizontal
  const leftArmRotated = await sharp(leftArmBuffer).rotate(-90).toBuffer(); // Rotate CCW for left side
  const rightArmRotated = await sharp(rightArmBuffer).rotate(90).toBuffer(); // Rotate CW for right side

  // Composite everything onto base
  await base
    .composite([
      // Front torso (center top)
      { input: frontBuffer, top: 0, left: 128 },

      // Back torso (center middle)
      { input: backBuffer, top: 320, left: 128 },

      // Left arm rotated (right side of template) - split into outer/inner
      { input: leftArmRotated, top: 0, left: 384 },

      // Right arm rotated (left side of template) - split into outer/inner
      { input: rightArmRotated, top: 0, left: 0 },

      // Bottom torso
      { input: bottomBuffer, top: 448, left: 128 },
    ])
    .png()
    .toFile(outputPath);

  console.log(`✅ Mad Tinker outfit (rotated arms) generated: ${outputPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const outputDir = path.join(process.cwd(), 'output');

  (async () => {
    await fs.mkdir(outputDir, { recursive: true });

    await generateMadTinkerRotated(
      path.join(outputDir, 'madtinker_rotated.png')
    );

    console.log('\n🧪 Mad Tinker outfit with rotated arms ready!');
  })().catch(console.error);
}
