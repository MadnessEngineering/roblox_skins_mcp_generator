/**
 * Roblox Template Generator
 * Creates authentic Roblox clothing templates with proper layout regions
 */

import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

// Roblox shirt template specifications (Classic R15/R6)
const SHIRT_TEMPLATE = {
  width: 585,
  height: 559,
  backgroundColor: '#3B5998', // Roblox blue
  regions: {
    // Front torso
    front: { x: 195, y: 195, width: 195, height: 169 },
    // Back torso
    back: { x: 195, y: 73, width: 195, height: 122 },
    // Left sleeve
    leftSleeve: { x: 20, y: 354, width: 146, height: 122 },
    // Right sleeve
    rightSleeve: { x: 419, y: 354, width: 146, height: 122 },
    // Bottom front
    bottomFront: { x: 195, y: 364, width: 195, height: 195 },
    // Top fold
    topFold: { x: 231, y: 7, width: 123, height: 66 },
    // Left fold
    leftFold: { x: 166, y: 73, width: 29, height: 486 },
    // Right fold
    rightFold: { x: 390, y: 73, width: 29, height: 486 },
    // Small top regions
    topLeft: { x: 166, y: 73, width: 64, height: 61 },
    topRight: { x: 355, y: 73, width: 64, height: 61 },
  }
};

export async function generateShirtTemplate(outputPath: string, withGuides: boolean = true): Promise<void> {
  const { width, height, backgroundColor } = SHIRT_TEMPLATE;

  // Parse background color
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Create base blue background
  let image = sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r, g, b, alpha: 1 }
    }
  });

  if (withGuides) {
    // Create white regions for the template layout
    const whiteRegions = Object.values(SHIRT_TEMPLATE.regions).map(region => ({
      input: Buffer.from(
        `<svg width="${region.width}" height="${region.height}">
          <rect x="0" y="0" width="${region.width}" height="${region.height}"
                fill="white" stroke="black" stroke-width="1"/>
        </svg>`
      ),
      top: region.y,
      left: region.x,
    }));

    image = image.composite(whiteRegions);
  }

  await image.png().toFile(outputPath);
  console.log(`Generated shirt template: ${outputPath}`);
}

export async function generateBlankShirt(outputPath: string): Promise<void> {
  const { width, height } = SHIRT_TEMPLATE;

  // Create completely transparent canvas for custom designs
  await sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .png()
    .toFile(outputPath);

  console.log(`Generated blank shirt canvas: ${outputPath}`);
}

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const outputDir = path.join(process.cwd(), 'templates');

  (async () => {
    await fs.mkdir(outputDir, { recursive: true });

    // Generate template with guides
    await generateShirtTemplate(
      path.join(outputDir, 'roblox_shirt_template_guides.png'),
      true
    );

    // Generate blank blue template (no guides)
    await generateShirtTemplate(
      path.join(outputDir, 'roblox_shirt_template_blank.png'),
      false
    );

    // Generate transparent canvas
    await generateBlankShirt(
      path.join(outputDir, 'roblox_shirt_canvas.png')
    );

    console.log('\n✅ All templates generated successfully!');
  })().catch(console.error);
}
