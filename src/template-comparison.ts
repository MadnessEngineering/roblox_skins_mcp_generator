/**
 * Template Comparison Tool
 * Overlay the original template guides onto a design to verify alignment
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function overlayTemplateGuides(
  designPath: string,
  outputPath: string
): Promise<void> {
  // Create semi-transparent red guides overlay
  const guideSVG = `
<svg width="585" height="559" xmlns="http://www.w3.org/2000/svg">
  <!-- Front torso -->
  <rect x="195" y="195" width="195" height="169" fill="none" stroke="red" stroke-width="3" stroke-dasharray="5,5"/>
  <text x="292" y="280" fill="red" font-size="12" text-anchor="middle" font-weight="bold">FRONT TORSO</text>

  <!-- Back torso -->
  <rect x="195" y="73" width="195" height="122" fill="none" stroke="red" stroke-width="3" stroke-dasharray="5,5"/>
  <text x="292" y="135" fill="red" font-size="12" text-anchor="middle" font-weight="bold">BACK</text>

  <!-- Left sleeve -->
  <rect x="20" y="354" width="146" height="122" fill="none" stroke="red" stroke-width="3" stroke-dasharray="5,5"/>
  <text x="93" y="415" fill="red" font-size="12" text-anchor="middle" font-weight="bold">LEFT SLEEVE</text>

  <!-- Right sleeve -->
  <rect x="419" y="354" width="146" height="122" fill="none" stroke="red" stroke-width="3" stroke-dasharray="5,5"/>
  <text x="492" y="415" fill="red" font-size="12" text-anchor="middle" font-weight="bold">RIGHT SLEEVE</text>

  <!-- Bottom front -->
  <rect x="195" y="364" width="195" height="195" fill="none" stroke="red" stroke-width="3" stroke-dasharray="5,5"/>
  <text x="292" y="460" fill="red" font-size="12" text-anchor="middle" font-weight="bold">BOTTOM</text>

  <!-- Top fold -->
  <rect x="231" y="7" width="123" height="66" fill="none" stroke="orange" stroke-width="2"/>
  <text x="292" y="43" fill="orange" font-size="10" text-anchor="middle">TOP FOLD</text>

  <!-- Left fold -->
  <rect x="166" y="73" width="29" height="486" fill="none" stroke="orange" stroke-width="2"/>

  <!-- Right fold -->
  <rect x="390" y="73" width="29" height="486" fill="none" stroke="orange" stroke-width="2"/>
</svg>
  `;

  const design = await sharp(designPath).toBuffer();
  const guides = Buffer.from(guideSVG);

  await sharp(design)
    .composite([{
      input: guides,
      blend: 'over'
    }])
    .png()
    .toFile(outputPath);

  console.log(`✅ Comparison created: ${outputPath}`);
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const designPath = process.argv[2] || path.join(process.cwd(), 'output', 'madtinker_outfit.png');
    const outputPath = path.join(process.cwd(), 'output', 'madtinker_with_guides.png');

    await overlayTemplateGuides(designPath, outputPath);
    console.log('\n🔍 Check the output to verify template alignment!');
  })().catch(console.error);
}
