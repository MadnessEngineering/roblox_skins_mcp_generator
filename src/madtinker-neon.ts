/**
 * Mad Tinker Outfit - NEON CYBERPUNK Edition!
 * Inspired by the Inventorium dashboard - vibrant pinks, cyans, greens!
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

const SHIRT_WIDTH = 585;
const SHIRT_HEIGHT = 559;

function generateNeonMadTinkerSVG(): string {
  return `
<svg width="${SHIRT_WIDTH}" height="${SHIRT_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Neon gradients -->
    <linearGradient id="neonCoat" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f0f1e;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="cyanGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00cccc;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="pinkGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ff00ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ff00aa;stop-opacity:1" />
    </linearGradient>

    <radialGradient id="neonGear">
      <stop offset="0%" style="stop-color:#00ffff;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#00aaaa;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#006666;stop-opacity:1" />
    </radialGradient>

    <radialGradient id="pinkGear">
      <stop offset="0%" style="stop-color:#ff00ff;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#aa00aa;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#660066;stop-opacity:1" />
    </radialGradient>

    <!-- Glowing gear -->
    <g id="neonGearShape">
      <circle cx="0" cy="0" r="22" fill="url(#neonGear)" stroke="#00ffff" stroke-width="3" opacity="0.9"/>
      <circle cx="0" cy="0" r="22" fill="none" stroke="#00ffff" stroke-width="1" opacity="0.5" filter="url(#glow)"/>
      <circle cx="0" cy="0" r="9" fill="#000"/>
      <circle cx="0" cy="0" r="9" fill="none" stroke="#00ffff" stroke-width="1"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * Math.PI / 180;
        const x = Math.cos(angle) * 20;
        const y = Math.sin(angle) * 20;
        return `<rect x="${x-3}" y="${y-6}" width="6" height="12" fill="#00aaaa" stroke="#00ffff" stroke-width="1"
                transform="rotate(${i * 45} ${x} ${y})"/>`;
      }).join('\n')}
    </g>

    <g id="pinkGearShape">
      <circle cx="0" cy="0" r="14" fill="url(#pinkGear)" stroke="#ff00ff" stroke-width="2" opacity="0.9"/>
      <circle cx="0" cy="0" r="6" fill="#000"/>
      ${Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45) * Math.PI / 180;
        const x = Math.cos(angle) * 13;
        const y = Math.sin(angle) * 13;
        return `<rect x="${x-2}" y="${y-4}" width="4" height="8" fill="#aa00aa" stroke="#ff00ff" stroke-width="0.5"
                transform="rotate(${i * 45} ${x} ${y})"/>`;
      }).join('\n')}
    </g>

    <!-- Glow filter -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Dark base -->
  <rect width="${SHIRT_WIDTH}" height="${SHIRT_HEIGHT}" fill="#0a0a14"/>

  <!-- ========== BACK (top center) ========== -->
  <g id="backSection">
    <rect x="128" y="0" width="256" height="256" fill="url(#neonCoat)" opacity="0.98"/>

    <!-- Neon grid lines -->
    <line x1="128" y1="50" x2="384" y2="50" stroke="#00ffff" stroke-width="1" opacity="0.3"/>
    <line x1="128" y1="128" x2="384" y2="128" stroke="#00ffff" stroke-width="1" opacity="0.3"/>
    <line x1="128" y1="206" x2="384" y2="206" stroke="#00ffff" stroke-width="1" opacity="0.3"/>
    <line x1="200" y1="0" x2="200" y2="256" stroke="#00ffff" stroke-width="1" opacity="0.3"/>
    <line x1="312" y1="0" x2="312" y2="256" stroke="#00ffff" stroke-width="1" opacity="0.3"/>

    <!-- THE LAB logo with neon glow -->
    <circle cx="256" cy="128" r="50" fill="#000" opacity="0.9"/>
    <circle cx="256" cy="128" r="50" fill="none" stroke="url(#cyanGlow)" stroke-width="4" filter="url(#glow)"/>
    <use href="#neonGearShape" x="256" y="128" transform="scale(1.6)"/>

    <text x="256" y="205" font-family="monospace" font-size="16" fill="#00ffff" text-anchor="middle" font-weight="bold" filter="url(#glow)">THE LAB</text>
    <text x="256" y="222" font-family="monospace" font-size="10" fill="#ff00ff" text-anchor="middle" font-weight="bold">MADNESS INTERACTIVE</text>
  </g>

  <!-- ========== FRONT (bottom center) ========== -->
  <g id="frontSection">
    <rect x="128" y="320" width="256" height="128" fill="url(#neonCoat)" opacity="0.98"/>

    <!-- Neon circuit traces -->
    <path d="M 140,330 L 160,330 L 160,350 L 180,350" stroke="#00ffff" stroke-width="2" fill="none" opacity="0.6"/>
    <path d="M 370,330 L 350,330 L 350,350 L 330,350" stroke="#ff00ff" stroke-width="2" fill="none" opacity="0.6"/>

    <!-- Glowing buttons -->
    <circle cx="256" cy="335" r="6" fill="#00ffff" stroke="#00ffff" stroke-width="2" opacity="0.8" filter="url(#glow)"/>
    <circle cx="256" cy="360" r="6" fill="#ff00ff" stroke="#ff00ff" stroke-width="2" opacity="0.8" filter="url(#glow)"/>
    <circle cx="256" cy="385" r="6" fill="#00ff00" stroke="#00ff00" stroke-width="2" opacity="0.8" filter="url(#glow)"/>
    <circle cx="256" cy="410" r="6" fill="#00ffff" stroke="#00ffff" stroke-width="2" opacity="0.8" filter="url(#glow)"/>
    <circle cx="256" cy="435" r="6" fill="#ff00ff" stroke="#ff00ff" stroke-width="2" opacity="0.8" filter="url(#glow)"/>

    <!-- Holographic tool pocket -->
    <rect x="165" y="390" width="50" height="40" rx="4" fill="#1a1a2e" stroke="url(#cyanGlow)" stroke-width="2" opacity="0.9"/>
    <rect x="165" y="390" width="50" height="40" rx="4" fill="none" stroke="#00ffff" stroke-width="1" opacity="0.4" filter="url(#glow)"/>

    <!-- Cyber tools -->
    <rect x="175" y="392" width="5" height="25" fill="#00ffff" stroke="#00cccc" stroke-width="1" opacity="0.8"/>
    <rect x="172" y="413" width="11" height="7" rx="2" fill="#00aaaa" stroke="#00ffff" stroke-width="1"/>
    <rect x="192" y="392" width="4" height="27" fill="#ff00ff" stroke="#aa00aa" stroke-width="1" opacity="0.8"/>
    <polygon points="194,392 191,386 197,386" fill="#ff00ff" opacity="0.9"/>

    <!-- Neon gear badges -->
    <use href="#neonGearShape" x="310" y="360" transform="scale(0.8)"/>
    <use href="#pinkGearShape" x="340" y="400" transform="rotate(45 340 400)"/>

    <!-- Holographic name tag -->
    <rect x="295" y="400" width="75" height="32" rx="4" fill="#000" stroke="url(#pinkGlow)" stroke-width="2"/>
    <rect x="295" y="400" width="75" height="32" rx="4" fill="none" stroke="#ff00ff" stroke-width="1" opacity="0.3" filter="url(#glow)"/>
    <text x="332" y="418" font-family="monospace" font-size="11" fill="#00ffff" text-anchor="middle" font-weight="bold" filter="url(#glow)">MAD</text>
    <text x="332" y="430" font-family="monospace" font-size="11" fill="#ff00ff" text-anchor="middle" font-weight="bold" filter="url(#glow)">TINKER</text>
  </g>

  <!-- ========== ARMS ========== -->
  <g id="rightArmTop">
    <rect x="0" y="0" width="128" height="128" fill="url(#neonCoat)" opacity="0.95"/>
    <rect x="5" y="5" width="118" height="118" fill="none" stroke="#00ffff" stroke-width="1" opacity="0.4"/>
    <use href="#pinkGearShape" x="64" y="64" transform="scale(1.2)"/>
  </g>

  <g id="rightArmBottom">
    <rect x="0" y="320" width="128" height="128" fill="url(#neonCoat)" opacity="0.95"/>
    <rect x="5" y="325" width="118" height="118" fill="none" stroke="#00ffff" stroke-width="1" opacity="0.4"/>
    <!-- Neon cuff -->
    <rect x="0" y="400" width="128" height="48" fill="#1a1a2e" stroke="url(#cyanGlow)" stroke-width="2"/>
    <line x1="0" y1="424" x2="128" y2="424" stroke="#00ffff" stroke-width="2" opacity="0.6" filter="url(#glow)"/>
  </g>

  <g id="leftArmTop">
    <rect x="384" y="0" width="128" height="128" fill="url(#neonCoat)" opacity="0.95"/>
    <rect x="389" y="5" width="118" height="118" fill="none" stroke="#ff00ff" stroke-width="1" opacity="0.4"/>
    <!-- Cyber wrench -->
    <path d="M 440,50 L 445,50 L 445,80 L 440,80 Z" fill="#00ffff" stroke="#00ffff" stroke-width="1" opacity="0.8" filter="url(#glow)"/>
    <ellipse cx="442.5" cy="47" rx="6" ry="4" fill="#00aaaa" stroke="#00ffff" stroke-width="1"/>
  </g>

  <g id="leftArmBottom">
    <rect x="384" y="320" width="128" height="128" fill="url(#neonCoat)" opacity="0.95"/>
    <rect x="389" y="325" width="118" height="118" fill="none" stroke="#ff00ff" stroke-width="1" opacity="0.4"/>
    <!-- Neon cuff -->
    <rect x="384" y="400" width="128" height="48" fill="#1a1a2e" stroke="url(#pinkGlow)" stroke-width="2"/>
    <line x1="384" y1="424" x2="512" y2="424" stroke="#ff00ff" stroke-width="2" opacity="0.6" filter="url(#glow)"/>
  </g>

  <!-- ========== NECK/TRANSITION ========== -->
  <rect x="128" y="256" width="256" height="64" fill="url(#neonCoat)" opacity="0.9"/>
  <line x1="256" y1="256" x2="256" y2="320" stroke="#00ff00" stroke-width="1" opacity="0.5" stroke-dasharray="4,2"/>

  <!-- ========== BOTTOM EXTENSION ========== -->
  <g id="bottomExtension">
    <rect x="128" y="448" width="256" height="111" fill="url(#neonCoat)" opacity="0.95"/>
    <line x1="133" y1="448" x2="133" y2="559" stroke="#00ffff" stroke-width="1" opacity="0.4"/>
    <line x1="379" y1="448" x2="379" y2="559" stroke="#ff00ff" stroke-width="1" opacity="0.4"/>

    <!-- Floating neon gears -->
    <use href="#pinkGearShape" x="180" y="490" transform="rotate(30 180 490) scale(1.1)"/>
    <use href="#neonGearShape" x="330" y="515" transform="rotate(-20 330 515) scale(0.6)"/>
    <use href="#pinkGearShape" x="220" y="535" transform="rotate(60 220 535) scale(0.9)"/>
  </g>

  <!-- ========== SIDE PANELS ========== -->
  <rect x="0" y="128" width="128" height="192" fill="url(#neonCoat)" opacity="0.8"/>
  <rect x="512" y="0" width="73" height="448" fill="url(#neonCoat)" opacity="0.8"/>
</svg>
  `.trim();
}

export async function generateNeonMadTinker(outputPath: string): Promise<void> {
  const svg = generateNeonMadTinkerSVG();

  await sharp(Buffer.from(svg))
    .png()
    .toFile(outputPath);

  console.log(`✅ NEON Mad Tinker outfit generated: ${outputPath}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const outputDir = path.join(process.cwd(), 'output');

  (async () => {
    await fs.mkdir(outputDir, { recursive: true });

    await generateNeonMadTinker(
      path.join(outputDir, 'madtinker_NEON.png')
    );

    console.log('\n🧪⚡ NEON CYBERPUNK Mad Tinker outfit ready!');
    console.log('Featuring:');
    console.log('  - Cyan & Magenta neon glow effects');
    console.log('  - Holographic name tag & pockets');
    console.log('  - Glowing circuit traces');
    console.log('  - RGB button array');
    console.log('  - "THE LAB - MADNESS INTERACTIVE" logo');
    console.log('\nMatching your Inventorium dashboard vibes! 🎨✨');
  })().catch(console.error);
}
