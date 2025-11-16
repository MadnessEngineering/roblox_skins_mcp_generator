/**
 * Mad Tinker Outfit - FIXED Front/Back Swap
 * The top center section shows on the BACK of the avatar
 * The bottom center section shows on the FRONT of the avatar
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

const SHIRT_WIDTH = 585;
const SHIRT_HEIGHT = 559;

function generateFixedMadTinkerSVG(): string {
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

  <!-- ========== TOP CENTER = BACK (appears on avatar's back!) ========== -->
  <g id="backSection">
    <rect x="128" y="0" width="256" height="256" fill="url(#labCoat)" opacity="0.95"/>

    <!-- Center seam -->
    <line x1="256" y1="0" x2="256" y2="256" stroke="#A0A0A0" stroke-width="2" stroke-dasharray="5,3"/>

    <!-- THE LAB logo -->
    <circle cx="256" cy="128" r="45" fill="#4A4A4A" opacity="0.8"/>
    <use href="#gear" x="256" y="128" transform="scale(1.5)"/>

    <text x="256" y="200" font-family="monospace" font-size="15" fill="#2A2A2A" text-anchor="middle" font-weight="bold">THE LAB</text>
  </g>

  <!-- ========== BOTTOM CENTER = FRONT (appears on avatar's chest!) ========== -->
  <g id="frontSection">
    <rect x="128" y="320" width="256" height="128" fill="url(#labCoat)" opacity="0.95"/>

    <!-- Lapels (smaller to fit) -->
    <path d="M 128,320 L 150,320 L 165,360 L 150,360 Z" fill="#D0D0D0" stroke="#A0A0A0" stroke-width="2"/>
    <path d="M 384,320 L 362,320 L 347,360 L 362,360 Z" fill="#D0D0D0" stroke="#A0A0A0" stroke-width="2"/>

    <!-- Center buttons -->
    <circle cx="256" cy="335" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="256" cy="360" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="256" cy="385" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="256" cy="410" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>
    <circle cx="256" cy="435" r="5" fill="#2A2A2A" stroke="#000" stroke-width="1"/>

    <!-- Tool pocket (left side) -->
    <rect x="165" y="390" width="45" height="35" rx="3" fill="#4A4A4A" stroke="#2A2A2A" stroke-width="2"/>
    <line x1="165" y1="397" x2="210" y2="397" stroke="#2A2A2A" stroke-width="1.5"/>

    <!-- Wrench in pocket -->
    <rect x="175" y="392" width="4" height="22" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
    <rect x="172" y="410" width="10" height="6" rx="2" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>

    <!-- Screwdriver -->
    <rect x="190" y="392" width="3" height="24" fill="#654321" stroke="#4A4A4A" stroke-width="1"/>
    <polygon points="191,392 189,387 193,387" fill="#8B8B8B"/>

    <!-- Gear badges (right side) -->
    <use href="#gear" x="310" y="360" transform="scale(0.7)"/>
    <use href="#smallGear" x="335" y="395" transform="rotate(45 335 395)"/>

    <!-- Name tag -->
    <rect x="300" y="400" width="65" height="28" rx="3" fill="#FFFFFF" stroke="#4A4A4A" stroke-width="2"/>
    <text x="332" y="417" font-family="monospace" font-size="10" fill="#2A2A2A" text-anchor="middle" font-weight="bold">MAD</text>
    <text x="332" y="428" font-family="monospace" font-size="10" fill="#2A2A2A" text-anchor="middle" font-weight="bold">TINKER</text>
  </g>

  <!-- ========== RIGHT ARM TOP (outer) ========== -->
  <g id="rightArmTop">
    <rect x="0" y="0" width="128" height="128" fill="url(#labCoat)" opacity="0.9"/>
    <rect x="5" y="5" width="118" height="118" fill="none" stroke="#C0C0C0" stroke-width="2"/>
    <use href="#smallGear" x="64" y="64" transform="scale(1.0)"/>
  </g>

  <!-- ========== RIGHT ARM BOTTOM (inner) ========== -->
  <g id="rightArmBottom">
    <rect x="0" y="320" width="128" height="128" fill="url(#labCoat)" opacity="0.9"/>
    <rect x="5" y="325" width="118" height="118" fill="none" stroke="#C0C0C0" stroke-width="2"/>
    <rect x="0" y="400" width="128" height="48" fill="#E0E0E0" stroke="#A0A0A0" stroke-width="2"/>
    <line x1="0" y1="424" x2="128" y2="424" stroke="#A0A0A0" stroke-width="1"/>
  </g>

  <!-- ========== LEFT ARM TOP (outer) ========== -->
  <g id="leftArmTop">
    <rect x="384" y="0" width="128" height="128" fill="url(#labCoat)" opacity="0.9"/>
    <rect x="389" y="5" width="118" height="118" fill="none" stroke="#C0C0C0" stroke-width="2"/>
    <!-- Wrench patch -->
    <path d="M 440,50 L 445,50 L 445,80 L 440,80 Z" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
    <ellipse cx="442.5" cy="47" rx="6" ry="4" fill="#8B8B8B" stroke="#4A4A4A" stroke-width="1"/>
  </g>

  <!-- ========== LEFT ARM BOTTOM (inner) ========== -->
  <g id="leftArmBottom">
    <rect x="384" y="320" width="128" height="128" fill="url(#labCoat)" opacity="0.9"/>
    <rect x="389" y="325" width="118" height="118" fill="none" stroke="#C0C0C0" stroke-width="2"/>
    <rect x="384" y="400" width="128" height="48" fill="#E0E0E0" stroke="#A0A0A0" stroke-width="2"/>
    <line x1="384" y1="424" x2="512" y2="424" stroke="#A0A0A0" stroke-width="1"/>
  </g>

  <!-- ========== NECK AREA (between front/back) ========== -->
  <rect x="128" y="256" width="256" height="64" fill="url(#labCoat)" opacity="0.85"/>
  <line x1="256" y1="256" x2="256" y2="320" stroke="#A0A0A0" stroke-width="1" stroke-dasharray="3,2"/>

  <!-- ========== BOTTOM EXTENSION ========== -->
  <g id="bottomExtension">
    <rect x="128" y="448" width="256" height="111" fill="url(#labCoat)" opacity="0.9"/>
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

export async function generateFixedMadTinker(outputPath: string): Promise<void> {
  const svg = generateFixedMadTinkerSVG();

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✅ Mad Tinker outfit (FIXED front/back) generated: ${outputPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const outputDir = path.join(process.cwd(), 'output');

  (async () => {
    await fs.mkdir(outputDir, { recursive: true });

    await generateFixedMadTinker(
      path.join(outputDir, 'madtinker_FIXED.png')
    );

    console.log('\n🧪 Mad Tinker outfit with CORRECTED front/back mapping!');
    console.log('Front design (buttons, pocket, name tag) is now in bottom center');
    console.log('Back design (THE LAB logo) is now in top center');
  })().catch(console.error);
}
