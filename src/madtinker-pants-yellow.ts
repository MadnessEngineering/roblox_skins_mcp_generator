/**
 * Mad Tinker Pants - YELLOW LIGHTNING Edition!
 * Matching pants with yellow/orange glow
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

const PANTS_WIDTH = 585;
const PANTS_HEIGHT = 559;

function generateYellowMadTinkerPantsSVG(): string {
  return `
<svg width="${PANTS_WIDTH}" height="${PANTS_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Yellow/Lightning gradients -->
    <linearGradient id="neonPants" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a0e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f0f08;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="yellowGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ffff00;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ffcc00;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="orangeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff8800;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff6600;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#aa00ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8800cc;stop-opacity:1" />
    </linearGradient>

    <radialGradient id="yellowGear">
      <stop offset="0%" style="stop-color:#ffff00;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#cccc00;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#888800;stop-opacity:1" />
    </radialGradient>

    <radialGradient id="orangeGear">
      <stop offset="0%" style="stop-color:#ff8800;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#cc6600;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#884400;stop-opacity:1" />
    </radialGradient>

    <!-- Glow filter -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Small yellow gear -->
    <g id="smallGear">
      <circle cx="0" cy="0" r="10" fill="url(#yellowGear)" stroke="#ffff00" stroke-width="1.5" opacity="0.9"/>
      <circle cx="0" cy="0" r="4" fill="#000"/>
      ${Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60) * Math.PI / 180;
        const x = Math.cos(angle) * 9;
        const y = Math.sin(angle) * 9;
        return `<rect x="${x-2}" y="${y-3}" width="4" height="6" fill="#cccc00" stroke="#ffff00" stroke-width="0.5"
                transform="rotate(${i * 60} ${x} ${y})"/>`;
      }).join('\n')}
    </g>

    <!-- Orange gear -->
    <g id="orangeGearSmall">
      <circle cx="0" cy="0" r="8" fill="url(#orangeGear)" stroke="#ff8800" stroke-width="1.5" opacity="0.9"/>
      <circle cx="0" cy="0" r="3" fill="#000"/>
    </g>
  </defs>

  <!-- Dark base -->
  <rect width="${PANTS_WIDTH}" height="${PANTS_HEIGHT}" fill="#0a0a08"/>

  <!-- ========== TORSO (top center) ========== -->
  <g id="torsoFront">
    <rect x="128" y="0" width="256" height="64" fill="url(#neonPants)" opacity="0.98"/>

    <!-- Lightning belt buckle area -->
    <rect x="128" y="0" width="256" height="64" fill="none" stroke="#ffff00" stroke-width="1" opacity="0.3"/>
    <line x1="256" y1="0" x2="256" y2="64" stroke="#ffff00" stroke-width="2" opacity="0.5" stroke-dasharray="4,2"/>

    <!-- Belt buckle -->
    <rect x="236" y="20" width="40" height="24" rx="3" fill="#000" stroke="url(#yellowGlow)" stroke-width="2"/>
    <circle cx="256" cy="32" r="6" fill="#ffff00" stroke="#ffff00" stroke-width="1" opacity="0.8" filter="url(#glow)"/>

    <!-- Side details -->
    <use href="#smallGear" x="160" y="32" transform="scale(0.8)"/>
    <use href="#orangeGearSmall" x="352" y="32" transform="scale(0.9)"/>
  </g>

  <!-- ========== RIGHT LEG FRONT (left side panels) ========== -->
  <g id="rightLegFront">
    <!-- Outer face -->
    <rect x="0" y="64" width="128" height="192" fill="url(#neonPants)" opacity="0.98"/>
    <rect x="5" y="69" width="118" height="182" fill="none" stroke="#ffff00" stroke-width="1" opacity="0.4"/>

    <!-- Vertical yellow lightning stripe -->
    <line x1="64" y1="64" x2="64" y2="256" stroke="url(#yellowGlow)" stroke-width="3" opacity="0.7" filter="url(#glow)"/>
    <line x1="20" y1="64" x2="20" y2="256" stroke="#ffff00" stroke-width="1" opacity="0.3"/>

    <!-- Circuit pattern -->
    <path d="M 30,90 L 50,90 L 50,110 L 70,110" stroke="#ffff00" stroke-width="1.5" fill="none" opacity="0.5"/>
    <path d="M 30,160 L 50,160 L 50,180 L 70,180" stroke="#ff8800" stroke-width="1.5" fill="none" opacity="0.5"/>

    <!-- Knee reinforcement -->
    <ellipse cx="64" cy="160" rx="35" ry="25" fill="none" stroke="url(#yellowGlow)" stroke-width="2" opacity="0.6"/>
    <use href="#smallGear" x="64" y="160" transform="scale(1.1)"/>
  </g>

  <!-- ========== LEFT LEG FRONT (right side panels) ========== -->
  <g id="leftLegFront">
    <!-- Outer face -->
    <rect x="384" y="64" width="128" height="192" fill="url(#neonPants)" opacity="0.98"/>
    <rect x="389" y="69" width="118" height="182" fill="none" stroke="#ff8800" stroke-width="1" opacity="0.4"/>

    <!-- Vertical orange stripe -->
    <line x1="448" y1="64" x2="448" y2="256" stroke="url(#orangeGlow)" stroke-width="3" opacity="0.7" filter="url(#glow)"/>
    <line x1="492" y1="64" x2="492" y2="256" stroke="#ff8800" stroke-width="1" opacity="0.3"/>

    <!-- Circuit pattern (mirrored) -->
    <path d="M 482,90 L 462,90 L 462,110 L 442,110" stroke="#ff8800" stroke-width="1.5" fill="none" opacity="0.5"/>
    <path d="M 482,160 L 462,160 L 462,180 L 442,180" stroke="#ffff00" stroke-width="1.5" fill="none" opacity="0.5"/>

    <!-- Knee reinforcement -->
    <ellipse cx="448" cy="160" rx="35" ry="25" fill="none" stroke="url(#orangeGlow)" stroke-width="2" opacity="0.6"/>
    <use href="#orangeGearSmall" x="448" y="160" transform="scale(1.3)"/>
  </g>

  <!-- ========== CENTER FRONT (crotch/connection) ========== -->
  <g id="centerFront">
    <rect x="128" y="64" width="128" height="192" fill="url(#neonPants)" opacity="0.98"/>

    <!-- Center seam with glow -->
    <line x1="192" y1="64" x2="192" y2="256" stroke="#aa00ff" stroke-width="2" opacity="0.5" stroke-dasharray="6,3" filter="url(#glow)"/>

    <!-- Utility pockets -->
    <rect x="145" y="90" width="35" height="30" rx="3" fill="#1a1a0e" stroke="url(#yellowGlow)" stroke-width="1.5" opacity="0.8"/>
    <rect x="145" y="90" width="35" height="30" rx="3" fill="none" stroke="#ffff00" stroke-width="0.5" opacity="0.3" filter="url(#glow)"/>

    <rect x="205" y="90" width="35" height="30" rx="3" fill="#1a1a0e" stroke="url(#orangeGlow)" stroke-width="1.5" opacity="0.8"/>
    <rect x="205" y="90" width="35" height="30" rx="3" fill="none" stroke="#ff8800" stroke-width="0.5" opacity="0.3" filter="url(#glow)"/>

    <!-- Grid lines -->
    <line x1="128" y1="140" x2="256" y2="140" stroke="#ffff00" stroke-width="0.5" opacity="0.3"/>
    <line x1="128" y1="200" x2="256" y2="200" stroke="#ff8800" stroke-width="0.5" opacity="0.3"/>
  </g>

  <!-- ========== CENTER BACK ========== -->
  <g id="centerBack">
    <rect x="256" y="64" width="128" height="192" fill="url(#neonPants)" opacity="0.98"/>

    <!-- Back seam -->
    <line x1="320" y1="64" x2="320" y2="256" stroke="#ff8800" stroke-width="2" opacity="0.5" stroke-dasharray="6,3" filter="url(#glow)"/>

    <!-- Back pocket detail -->
    <rect x="275" y="110" width="40" height="35" rx="2" fill="none" stroke="url(#yellowGlow)" stroke-width="1.5" opacity="0.7"/>
    <line x1="275" y1="110" x2="315" y2="110" stroke="#ffff00" stroke-width="1" opacity="0.5"/>

    <rect x="325" y="110" width="40" height="35" rx="2" fill="none" stroke="url(#orangeGlow)" stroke-width="1.5" opacity="0.7"/>
    <line x1="325" y1="110" x2="365" y2="110" stroke="#ff8800" stroke-width="1" opacity="0.5"/>
  </g>

  <!-- ========== RIGHT LEG ANKLES ========== -->
  <g id="rightLegAnkles">
    <!-- Right leg bottom outer -->
    <rect x="0" y="256" width="64" height="149" fill="url(#neonPants)" opacity="0.98"/>
    <rect x="5" y="261" width="54" height="139" fill="none" stroke="#ffff00" stroke-width="1" opacity="0.4"/>

    <!-- Ankle cuff with yellow glow -->
    <rect x="0" y="360" width="64" height="45" fill="#1a1a0e" stroke="url(#yellowGlow)" stroke-width="2"/>
    <line x1="0" y1="382" x2="64" y2="382" stroke="#ffff00" stroke-width="2" opacity="0.7" filter="url(#glow)"/>
    <use href="#smallGear" x="32" y="382" transform="scale(0.7)"/>

    <!-- Right leg bottom inner -->
    <rect x="64" y="256" width="64" height="149" fill="url(#neonPants)" opacity="0.98"/>
    <rect x="69" y="261" width="54" height="139" fill="none" stroke="#ffff00" stroke-width="1" opacity="0.4"/>

    <!-- Inner ankle cuff -->
    <rect x="64" y="360" width="64" height="45" fill="#1a1a0e" stroke="url(#yellowGlow)" stroke-width="2"/>
    <line x1="64" y1="382" x2="128" y2="382" stroke="#ffff00" stroke-width="2" opacity="0.7" filter="url(#glow)"/>
  </g>

  <!-- ========== LEFT LEG ANKLES ========== -->
  <g id="leftLegAnkles">
    <!-- Left leg bottom outer -->
    <rect x="384" y="256" width="64" height="149" fill="url(#neonPants)" opacity="0.98"/>
    <rect x="389" y="261" width="54" height="139" fill="none" stroke="#ff8800" stroke-width="1" opacity="0.4"/>

    <!-- Ankle cuff with orange glow -->
    <rect x="384" y="360" width="64" height="45" fill="#1a1a0e" stroke="url(#orangeGlow)" stroke-width="2"/>
    <line x1="384" y1="382" x2="448" y2="382" stroke="#ff8800" stroke-width="2" opacity="0.7" filter="url(#glow)"/>
    <use href="#orangeGearSmall" x="416" y="382" transform="scale(0.9)"/>

    <!-- Left leg bottom inner -->
    <rect x="448" y="256" width="64" height="149" fill="url(#neonPants)" opacity="0.98"/>
    <rect x="453" y="261" width="54" height="139" fill="none" stroke="#ff8800" stroke-width="1" opacity="0.4"/>

    <!-- Inner ankle cuff -->
    <rect x="448" y="360" width="64" height="45" fill="#1a1a0e" stroke="url(#orangeGlow)" stroke-width="2"/>
    <line x1="448" y1="382" x2="512" y2="382" stroke="#ff8800" stroke-width="2" opacity="0.7" filter="url(#glow)"/>
  </g>

  <!-- ========== CENTER LEG SECTIONS ========== -->
  <g id="centerLegs">
    <!-- Right leg center -->
    <rect x="128" y="256" width="64" height="149" fill="url(#neonPants)" opacity="0.98"/>
    <line x1="160" y1="256" x2="160" y2="405" stroke="#ffff00" stroke-width="1" opacity="0.3" stroke-dasharray="3,2"/>

    <!-- Right ankle -->
    <rect x="128" y="360" width="64" height="45" fill="#1a1a0e" stroke="url(#yellowGlow)" stroke-width="1.5"/>

    <!-- Left leg center -->
    <rect x="192" y="256" width="64" height="149" fill="url(#neonPants)" opacity="0.98"/>
    <line x1="224" y1="256" x2="224" y2="405" stroke="#ff8800" stroke-width="1" opacity="0.3" stroke-dasharray="3,2"/>

    <!-- Left ankle -->
    <rect x="192" y="360" width="64" height="45" fill="#1a1a0e" stroke="url(#orangeGlow)" stroke-width="1.5"/>
  </g>

  <!-- ========== BACK LEG SECTIONS ========== -->
  <g id="backLegs">
    <!-- Right leg back -->
    <rect x="256" y="256" width="64" height="149" fill="url(#neonPants)" opacity="0.98"/>
    <rect x="261" y="261" width="54" height="139" fill="none" stroke="#ffff00" stroke-width="1" opacity="0.4"/>
    <rect x="256" y="360" width="64" height="45" fill="#1a1a0e" stroke="url(#yellowGlow)" stroke-width="1.5"/>

    <!-- Left leg back -->
    <rect x="320" y="256" width="64" height="149" fill="url(#neonPants)" opacity="0.98"/>
    <rect x="325" y="261" width="54" height="139" fill="none" stroke="#ff8800" stroke-width="1" opacity="0.4"/>
    <rect x="320" y="360" width="64" height="45" fill="#1a1a0e" stroke="url(#orangeGlow)" stroke-width="1.5"/>
  </g>

  <!-- ========== BOTTOM FEET SECTIONS ========== -->
  <g id="feet">
    <!-- Bottom panels for feet/shoes -->
    <rect x="0" y="405" width="128" height="154" fill="url(#neonPants)" opacity="0.95"/>
    <rect x="5" y="410" width="118" height="144" fill="none" stroke="#ffff00" stroke-width="1" opacity="0.3"/>

    <rect x="128" y="405" width="128" height="154" fill="url(#neonPants)" opacity="0.95"/>
    <rect x="133" y="410" width="118" height="144" fill="none" stroke="#ffff00" stroke-width="1" opacity="0.3"/>

    <rect x="256" y="405" width="128" height="154" fill="url(#neonPants)" opacity="0.95"/>
    <rect x="261" y="410" width="118" height="144" fill="none" stroke="#ff8800" stroke-width="1" opacity="0.3"/>

    <rect x="384" y="405" width="128" height="154" fill="url(#neonPants)" opacity="0.95"/>
    <rect x="389" y="410" width="118" height="144" fill="none" stroke="#ff8800" stroke-width="1" opacity="0.3"/>
  </g>

  <!-- ========== SIDE PANELS ========== -->
  <rect x="512" y="0" width="73" height="559" fill="url(#neonPants)" opacity="0.8"/>
</svg>
  `.trim();
}

export async function generateYellowMadTinkerPants(outputPath: string): Promise<void> {
  const svg = generateYellowMadTinkerPantsSVG();

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✅ YELLOW Lightning Mad Tinker PANTS generated: ${outputPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const outputDir = path.join(process.cwd(), 'output');

  (async () => {
    await fs.mkdir(outputDir, { recursive: true });

    await generateYellowMadTinkerPants(
      path.join(outputDir, 'madtinker_pants_YELLOW.png')
    );

    console.log('\n🧪⚡ YELLOW LIGHTNING Mad Tinker PANTS ready!');
    console.log('Matching features:');
    console.log('  - Yellow stripe on right leg, Orange stripe on left leg');
    console.log('  - Glowing ankle cuffs (yellow/orange)');
    console.log('  - Lightning belt buckle');
    console.log('  - Circuit traces and grid lines');
    console.log('  - Utility pockets');
    console.log('  - Knee reinforcements with gears');
  })().catch(console.error);
}
