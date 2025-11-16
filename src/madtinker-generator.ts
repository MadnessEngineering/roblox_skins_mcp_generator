/**
 * Mad Tinker Outfit Generator
 * Creates a mad scientist/workshop themed Roblox shirt
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

const SHIRT_WIDTH = 585;
const SHIRT_HEIGHT = 559;

/**
 * Generate SVG for Mad Tinker shirt design
 */
function generateMadTinkerSVG(): string {
  return `
<svg width="${SHIRT_WIDTH}" height="${SHIRT_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Gradients for depth -->
    <linearGradient id="labCoatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
    </linearGradient>

    <radialGradient id="gearGradient">
      <stop offset="0%" style="stop-color:#8B7355;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
    </radialGradient>

    <!-- Gear shape -->
    <g id="gear">
      <circle cx="0" cy="0" r="20" fill="url(#gearGradient)" stroke="#4A4A4A" stroke-width="2"/>
      <circle cx="0" cy="0" r="8" fill="#2A2A2A"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * Math.PI / 180;
        const x = Math.cos(angle) * 18;
        const y = Math.sin(angle) * 18;
        return `<rect x="${x-3}" y="${y-6}" width="6" height="12" fill="#654321"
                transform="rotate(${i * 45} ${x} ${y})"/>`;
      }).join('\n')}
    </g>

    <!-- Tool pocket -->
    <g id="pocket">
      <rect x="0" y="0" width="60" height="50" rx="3" fill="#4A4A4A" stroke="#2A2A2A" stroke-width="2"/>
      <line x1="0" y1="10" x2="60" y2="10" stroke="#2A2A2A" stroke-width="1.5"/>
    </g>
  </defs>

  <!-- Base - Roblox blue background -->
  <rect width="${SHIRT_WIDTH}" height="${SHIRT_HEIGHT}" fill="#3B5998"/>

  <!-- Front torso area (main design) -->
  <g id="frontTorso">
    <!-- Lab coat white overlay -->
    <rect x="195" y="195" width="195" height="169" fill="url(#labCoatGradient)" opacity="0.95"/>

    <!-- Lapels -->
    <path d="M 195,195 L 220,195 L 240,250 L 220,250 Z" fill="#D0D0D0" stroke="#A0A0A0" stroke-width="2"/>
    <path d="M 390,195 L 365,195 L 345,250 L 365,250 Z" fill="#D0D0D0" stroke="#A0A0A0" stroke-width="2"/>

    <!-- Center buttons -->
    <circle cx="292" cy="220" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="292" cy="250" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="292" cy="280" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="292" cy="310" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>

    <!-- Tool pocket on left -->
    <use href="#pocket" x="210" y="300"/>

    <!-- Wrench in pocket -->
    <rect x="225" y="302" width="6" height="30" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
    <rect x="220" y="328" width="16" height="8" rx="2" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>

    <!-- Screwdriver in pocket -->
    <rect x="245" y="302" width="4" height="32" fill="#654321" stroke="#4A4A4A" stroke-width="1"/>
    <polygon points="247,302 243,295 251,295" fill="#8B8B8B"/>

    <!-- Gear badges -->
    <use href="#gear" x="330" y="230" transform="scale(0.8)"/>
    <use href="#gear" x="355" y="260" transform="scale(0.6) rotate(45 355 260)"/>

    <!-- Name tag area -->
    <rect x="310" y="320" width="65" height="25" rx="3" fill="#FFFFFF" stroke="#4A4A4A" stroke-width="2"/>
    <text x="342" y="337" font-family="monospace" font-size="10" fill="#2A2A2A" text-anchor="middle" font-weight="bold">MAD TINKER</text>
  </g>

  <!-- Sleeves -->
  <g id="leftSleeve">
    <!-- Left sleeve - lab coat white -->
    <rect x="20" y="354" width="146" height="122" fill="url(#labCoatGradient)" opacity="0.9"/>
    <rect x="25" y="359" width="136" height="112" fill="none" stroke="#C0C0C0" stroke-width="2"/>

    <!-- Rolled up sleeve cuff -->
    <rect x="20" y="450" width="146" height="26" fill="#E0E0E0" stroke="#A0A0A0" stroke-width="2"/>
    <line x1="20" y1="463" x2="166" y2="463" stroke="#A0A0A0" stroke-width="1"/>

    <!-- Small gear on sleeve -->
    <use href="#gear" x="90" y="410" transform="scale(0.7)"/>
  </g>

  <g id="rightSleeve">
    <!-- Right sleeve - lab coat white -->
    <rect x="419" y="354" width="146" height="122" fill="url(#labCoatGradient)" opacity="0.9"/>
    <rect x="424" y="359" width="136" height="112" fill="none" stroke="#C0C0C0" stroke-width="2"/>

    <!-- Rolled up sleeve cuff -->
    <rect x="419" y="450" width="146" height="26" fill="#E0E0E0" stroke="#A0A0A0" stroke-width="2"/>
    <line x1="419" y1="463" x2="565" y2="463" stroke="#A0A0A0" stroke-width="1"/>

    <!-- Wrench patch on sleeve -->
    <path d="M 480,390 L 485,390 L 485,420 L 480,420 Z" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
    <ellipse cx="482.5" cy="387" rx="6" ry="4" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
  </g>

  <!-- Back torso -->
  <g id="backTorso">
    <rect x="195" y="73" width="195" height="122" fill="url(#labCoatGradient)" opacity="0.9"/>

    <!-- Back seam detail -->
    <line x1="292" y1="73" x2="292" y2="195" stroke="#A0A0A0" stroke-width="2" stroke-dasharray="5,3"/>

    <!-- Workshop logo on back -->
    <circle cx="292" cy="130" r="35" fill="#4A4A4A" opacity="0.8"/>
    <use href="#gear" x="292" y="130" transform="scale(1.2)"/>
    <text x="292" y="175" font-family="monospace" font-size="11" fill="#2A2A2A" text-anchor="middle" font-weight="bold">THE LAB</text>
  </g>

  <!-- Bottom front extension -->
  <g id="bottomFront">
    <rect x="195" y="364" width="195" height="195" fill="url(#labCoatGradient)" opacity="0.9"/>

    <!-- Side seams -->
    <line x1="200" y1="364" x2="200" y2="559" stroke="#A0A0A0" stroke-width="2"/>
    <line x1="385" y1="364" x2="385" y2="559" stroke="#A0A0A0" stroke-width="2"/>

    <!-- Scattered gear decorations -->
    <use href="#gear" x="230" y="420" transform="scale(0.5) rotate(30 230 420)"/>
    <use href="#gear" x="350" y="480" transform="scale(0.6) rotate(-20 350 480)"/>
    <use href="#gear" x="270" y="520" transform="scale(0.45) rotate(60 270 520)"/>
  </g>

  <!-- Top fold sections -->
  <g id="topFolds">
    <!-- Top center -->
    <rect x="231" y="7" width="123" height="66" fill="url(#labCoatGradient)" opacity="0.85"/>

    <!-- Side folds -->
    <rect x="166" y="73" width="29" height="486" fill="url(#labCoatGradient)" opacity="0.85"/>
    <rect x="390" y="73" width="29" height="486" fill="url(#labCoatGradient)" opacity="0.85"/>

    <!-- Fold stitching details -->
    <line x1="170" y1="73" x2="170" y2="559" stroke="#A0A0A0" stroke-width="1" stroke-dasharray="3,2"/>
    <line x1="394" y1="73" x2="394" y2="559" stroke="#A0A0A0" stroke-width="1" stroke-dasharray="3,2"/>
  </g>
</svg>
  `.trim();
}

/**
 * Generate the Mad Tinker outfit
 */
export async function generateMadTinkerOutfit(
  outputPath: string,
  style: 'default' | 'dark' | 'steampunk' = 'default'
): Promise<void> {
  const svg = generateMadTinkerSVG();

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✅ Mad Tinker outfit generated: ${outputPath}`);
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const outputDir = path.join(process.cwd(), 'output');

  (async () => {
    await fs.mkdir(outputDir, { recursive: true });

    await generateMadTinkerOutfit(
      path.join(outputDir, 'madtinker_outfit.png'),
      'default'
    );

    console.log('\n🧪 Mad Tinker outfit ready for Roblox!');
    console.log('Upload to Roblox Studio as a Shirt template.');
  })().catch(console.error);
}
