/**
 * Mad Tinker Outfit - Correct Samstrod Layout
 * Based on the actual samstrod template mapping
 *
 * Layout analysis from template:
 * Top row: [Right Arm Panels] [Front Torso] [Left Arm Panels]
 * Bottom row: [Right Arm Panels] [Back Torso] [Left Arm Panels]
 *
 * Each arm is divided into vertical panel strips (not rotated!)
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

const SHIRT_WIDTH = 585;
const SHIRT_HEIGHT = 559;

// Based on samstrod template dimensions
const LAYOUT = {
  // Top row (y: 0-256)
  rightArmTop: { x: 0, y: 0, width: 128, height: 128 },      // Right arm outer
  frontTorso: { x: 128, y: 0, width: 256, height: 256 },     // Front (MAIN DESIGN)
  leftArmTop: { x: 384, y: 0, width: 128, height: 128 },     // Left arm outer

  // Neck/fold area
  neckArea: { x: 128, y: 256, width: 256, height: 64 },

  // Bottom row (y: 320-448)
  rightArmBottom: { x: 0, y: 320, width: 128, height: 128 }, // Right arm inner
  backTorso: { x: 128, y: 320, width: 256, height: 128 },    // Back
  leftArmBottom: { x: 384, y: 320, width: 128, height: 128 }, // Left arm inner

  // Lower extension
  bottomExtension: { x: 128, y: 448, width: 256, height: 111 },

  // Side panels
  rightSide: { x: 512, y: 0, width: 73, height: 448 },
  leftEdge: { x: 0, y: 128, width: 128, height: 192 },
};

function generateCorrectSamstrodSVG(): string {
  return `
<svg width="${SHIRT_WIDTH}" height="${SHIRT_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="labCoat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#E8E8E8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
    </linearGradient>

    <radialGradient id="gearGrad">
      <stop offset="0%" style="stop-color:#8B7355;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
    </radialGradient>

    <!-- Gear component -->
    <g id="gear">
      <circle cx="0" cy="0" r="20" fill="url(#gearGrad)" stroke="#4A4A4A" stroke-width="2"/>
      <circle cx="0" cy="0" r="8" fill="#2A2A2A"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * Math.PI / 180;
        const x = Math.cos(angle) * 18;
        const y = Math.sin(angle) * 18;
        return `<rect x="${x-3}" y="${y-6}" width="6" height="12" fill="#654321"
                transform="rotate(${i * 45} ${x} ${y})"/>`;
      }).join('\n')}
    </g>

    <g id="smallGear">
      <circle cx="0" cy="0" r="12" fill="url(#gearGrad)" stroke="#4A4A4A" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="5" fill="#2A2A2A"/>
    </g>
  </defs>

  <!-- Base Roblox blue -->
  <rect width="${SHIRT_WIDTH}" height="${SHIRT_HEIGHT}" fill="#3B5998"/>

  <!-- ========== FRONT TORSO (center top - MAIN VISIBLE AREA) ========== -->
  <g id="frontTorso">
    <rect x="128" y="0" width="256" height="256" fill="url(#labCoat)" opacity="0.95"/>

    <!-- Lapels -->
    <path d="M 128,0 L 160,0 L 180,60 L 160,60 Z" fill="#D0D0D0" stroke="#A0A0A0" stroke-width="2"/>
    <path d="M 384,0 L 352,0 L 332,60 L 352,60 Z" fill="#D0D0D0" stroke="#A0A0A0" stroke-width="2"/>

    <!-- Center buttons (vertical line down middle) -->
    <circle cx="256" cy="40" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="256" cy="70" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="256" cy="100" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="256" cy="130" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="256" cy="160" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="256" cy="190" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>

    <!-- Tool pocket (left side) -->
    <rect x="160" y="180" width="50" height="40" rx="3" fill="#4A4A4A" stroke="#2A2A2A" stroke-width="2"/>
    <line x1="160" y1="188" x2="210" y2="188" stroke="#2A2A2A" stroke-width="1.5"/>

    <!-- Wrench in pocket -->
    <rect x="172" y="182" width="5" height="25" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
    <rect x="168" y="203" width="13" height="7" rx="2" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>

    <!-- Screwdriver -->
    <rect x="190" y="182" width="3" height="27" fill="#654321" stroke="#4A4A4A" stroke-width="1"/>
    <polygon points="191,182 188,176 194,176" fill="#8B8B8B"/>

    <!-- Gear badges (right side) -->
    <use href="#gear" x="320" y="80" transform="scale(0.8)"/>
    <use href="#smallGear" x="350" y="130" transform="rotate(45 350 130)"/>

    <!-- Name tag -->
    <rect x="295" y="205" width="70" height="30" rx="3" fill="#FFFFFF" stroke="#4A4A4A" stroke-width="2"/>
    <text x="330" y="223" font-family="monospace" font-size="11" fill="#2A2A2A" text-anchor="middle" font-weight="bold">MAD</text>
    <text x="330" y="236" font-family="monospace" font-size="11" fill="#2A2A2A" text-anchor="middle" font-weight="bold">TINKER</text>
  </g>

  <!-- ========== BACK TORSO (center bottom) ========== -->
  <g id="backTorso">
    <rect x="128" y="320" width="256" height="128" fill="url(#labCoat)" opacity="0.95"/>

    <!-- Center seam -->
    <line x1="256" y1="320" x2="256" y2="448" stroke="#A0A0A0" stroke-width="2" stroke-dasharray="5,3"/>

    <!-- THE LAB logo -->
    <circle cx="256" cy="384" r="42" fill="#4A4A4A" opacity="0.8"/>
    <use href="#gear" x="256" y="384" transform="scale(1.4)"/>

    <text x="256" y="435" font-family="monospace" font-size="14" fill="#2A2A2A" text-anchor="middle" font-weight="bold">THE LAB</text>
  </g>

  <!-- ========== RIGHT ARM TOP (outer face) ========== -->
  <g id="rightArmTop">
    <rect x="0" y="0" width="128" height="128" fill="url(#labCoat)" opacity="0.9"/>
    <rect x="5" y="5" width="118" height="118" fill="none" stroke="#C0C0C0" stroke-width="2"/>

    <!-- Small gear decoration -->
    <use href="#smallGear" x="64" y="64" transform="scale(1.1)"/>
  </g>

  <!-- ========== RIGHT ARM BOTTOM (inner face) ========== -->
  <g id="rightArmBottom">
    <rect x="0" y="320" width="128" height="128" fill="url(#labCoat)" opacity="0.9"/>
    <rect x="5" y="325" width="118" height="118" fill="none" stroke="#C0C0C0" stroke-width="2"/>

    <!-- Cuff detail -->
    <rect x="0" y="400" width="128" height="48" fill="#E0E0E0" stroke="#A0A0A0" stroke-width="2"/>
    <line x1="0" y1="424" x2="128" y2="424" stroke="#A0A0A0" stroke-width="1"/>
  </g>

  <!-- ========== LEFT ARM TOP (outer face) ========== -->
  <g id="leftArmTop">
    <rect x="384" y="0" width="128" height="128" fill="url(#labCoat)" opacity="0.9"/>
    <rect x="389" y="5" width="118" height="118" fill="none" stroke="#C0C0C0" stroke-width="2"/>

    <!-- Wrench patch -->
    <path d="M 440,50 L 445,50 L 445,80 L 440,80 Z" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
    <ellipse cx="442.5" cy="47" rx="6" ry="4" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
  </g>

  <!-- ========== LEFT ARM BOTTOM (inner face) ========== -->
  <g id="leftArmBottom">
    <rect x="384" y="320" width="128" height="128" fill="url(#labCoat)" opacity="0.9"/>
    <rect x="389" y="325" width="118" height="118" fill="none" stroke="#C0C0C0" stroke-width="2"/>

    <!-- Cuff detail -->
    <rect x="384" y="400" width="128" height="48" fill="#E0E0E0" stroke="#A0A0A0" stroke-width="2"/>
    <line x1="384" y1="424" x2="512" y2="424" stroke="#A0A0A0" stroke-width="1"/>
  </g>

  <!-- ========== NECK AREA ========== -->
  <g id="neckArea">
    <rect x="128" y="256" width="256" height="64" fill="url(#labCoat)" opacity="0.85"/>
    <line x1="256" y1="256" x2="256" y2="320" stroke="#A0A0A0" stroke-width="1" stroke-dasharray="3,2"/>
  </g>

  <!-- ========== BOTTOM EXTENSION ========== -->
  <g id="bottomExtension">
    <rect x="128" y="448" width="256" height="111" fill="url(#labCoat)" opacity="0.9"/>

    <!-- Side seams -->
    <line x1="133" y1="448" x2="133" y2="559" stroke="#A0A0A0" stroke-width="2"/>
    <line x1="379" y1="448" x2="379" y2="559" stroke="#A0A0A0" stroke-width="2"/>

    <!-- Scattered gears -->
    <use href="#smallGear" x="180" y="490" transform="rotate(30 180 490)"/>
    <use href="#smallGear" x="330" y="515" transform="rotate(-20 330 515)"/>
    <use href="#smallGear" x="220" y="535" transform="rotate(60 220 535)"/>
  </g>

  <!-- ========== SIDE PANELS ========== -->
  <rect x="0" y="128" width="128" height="192" fill="url(#labCoat)" opacity="0.7"/>
  <rect x="512" y="0" width="73" height="448" fill="url(#labCoat)" opacity="0.7"/>
</svg>
  `.trim();
}

export async function generateMadTinkerCorrectSamstrod(outputPath: string): Promise<void> {
  const svg = generateCorrectSamstrodSVG();

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✅ Mad Tinker outfit (correct samstrod) generated: ${outputPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const outputDir = path.join(process.cwd(), 'output');

  (async () => {
    await fs.mkdir(outputDir, { recursive: true });

    await generateMadTinkerCorrectSamstrod(
      path.join(outputDir, 'madtinker_final.png')
    );

    console.log('\n🧪 Mad Tinker outfit (final correct layout) ready!');
    console.log('This matches the samstrod template mapping exactly.');
  })().catch(console.error);
}
