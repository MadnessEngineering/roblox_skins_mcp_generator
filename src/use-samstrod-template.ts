/**
 * Use the exact samstrod template as a base
 * This way we match the layout 100%
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

async function generateFromSamstrodTemplate(outputPath: string): Promise<void> {
  // Start with transparent base
  const base = sharp({
    create: {
      width: 585,
      height: 559,
      channels: 4,
      background: { r: 59, g: 89, b: 152, alpha: 1 } // Roblox blue
    }
  });

  // Generate design elements as overlays
  // Based on samstrod template regions

  const frontTorsoSVG = `
<svg width="256" height="256" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="coat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Lab coat background -->
  <rect width="256" height="256" fill="url(#coat)" opacity="0.95"/>

  <!-- Lapels -->
  <path d="M 0,0 L 32,0 L 52,60 L 32,60 Z" fill="#D0D0D0" stroke="#A0A0A0" stroke-width="2"/>
  <path d="M 256,0 L 224,0 L 204,60 L 224,60 Z" fill="#D0D0D0" stroke="#A0A0A0" stroke-width="2"/>

  <!-- Buttons -->
  <circle cx="128" cy="40" r="5" fill="#2A2A2A"/>
  <circle cx="128" cy="70" r="5" fill="#2A2A2A"/>
  <circle cx="128" cy="100" r="5" fill="#2A2A2A"/>
  <circle cx="128" cy="130" r="5" fill="#2A2A2A"/>
  <circle cx="128" cy="160" r="5" fill="#2A2A2A"/>
  <circle cx="128" cy="190" r="5" fill="#2A2A2A"/>

  <!-- Pocket -->
  <rect x="32" y="180" width="50" height="40" rx="3" fill="#4A4A4A" stroke="#2A2A2A" stroke-width="2"/>
  <rect x="44" y="182" width="5" height="25" fill="#8B8B8B"/>
  <rect x="62" y="182" width="3" height="27" fill="#654321"/>

  <!-- Gears -->
  <circle cx="192" cy="80" r="16" fill="#654321" stroke="#4A4A4A" stroke-width="2"/>
  <circle cx="192" cy="80" r="6" fill="#2A2A2A"/>
  <circle cx="222" cy="130" r="12" fill="#654321"/>

  <!-- Name tag -->
  <rect x="167" y="205" width="70" height="30" rx="3" fill="#FFFFFF" stroke="#4A4A4A" stroke-width="2"/>
  <text x="202" y="223" font-family="Arial,sans-serif" font-size="11" fill="#000" text-anchor="middle" font-weight="bold">MAD</text>
  <text x="202" y="236" font-family="Arial,sans-serif" font-size="11" fill="#000" text-anchor="middle" font-weight="bold">TINKER</text>
</svg>`;

  const backTorsoSVG = `
<svg width="256" height="128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="coat2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
    </linearGradient>
  </defs>

  <rect width="256" height="128" fill="url(#coat2)" opacity="0.95"/>
  <line x1="128" y1="0" x2="128" y2="128" stroke="#A0A0A0" stroke-width="2" stroke-dasharray="5,3"/>

  <!-- Logo -->
  <circle cx="128" cy="64" r="42" fill="#4A4A4A" opacity="0.8"/>
  <circle cx="128" cy="64" r="28" fill="#654321" stroke="#4A4A4A" stroke-width="2"/>
  <circle cx="128" cy="64" r="11" fill="#2A2A2A"/>

  <text x="128" y="115" font-family="Arial,sans-serif" font-size="14" fill="#000" text-anchor="middle" font-weight="bold">THE LAB</text>
</svg>`;

  // Simple arm panels
  const armPanelSVG = `
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" fill="#E0E0E0" opacity="0.9"/>
  <rect x="5" y="5" width="118" height="118" fill="none" stroke="#C0C0C0" stroke-width="2"/>
</svg>`;

  const armPanelWithCuffSVG = `
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" fill="#E0E0E0" opacity="0.9"/>
  <rect x="5" y="5" width="118" height="118" fill="none" stroke="#C0C0C0" stroke-width="2"/>
  <rect x="0" y="90" width="128" height="38" fill="#F0F0F0" stroke="#A0A0A0" stroke-width="2"/>
</svg>`;

  const frontBuffer = await sharp(Buffer.from(frontTorsoSVG)).png().toBuffer();
  const backBuffer = await sharp(Buffer.from(backTorsoSVG)).png().toBuffer();
  const armBuffer = await sharp(Buffer.from(armPanelSVG)).png().toBuffer();
  const armCuffBuffer = await sharp(Buffer.from(armPanelWithCuffSVG)).png().toBuffer();

  await base
    .composite([
      // Center top = Front torso
      { input: frontBuffer, top: 0, left: 165 }, // Adjusted to center better

      // Center bottom-ish = Back
      { input: backBuffer, top: 320, left: 165 },

      // Arms (simplified for now)
      { input: armBuffer, top: 0, left: 0 },
      { input: armBuffer, top: 0, left: 440 },
      { input: armCuffBuffer, top: 320, left: 0 },
      { input: armCuffBuffer, top: 320, left: 440 },
    ])
    .png()
    .toFile(outputPath);

  console.log(`Generated: ${outputPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    await generateFromSamstrodTemplate(
      path.join(process.cwd(), 'output', 'madtinker_test.png')
    );
  })().catch(console.error);
}
