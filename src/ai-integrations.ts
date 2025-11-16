/**
 * AI Image Generation Integrations
 * Plug in your preferred AI image generation service here
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import sharp from 'sharp';

export interface ImageGenerationOptions {
  prompt: string;
  style?: string;
  width?: number;
  height?: number;
  templateType?: 'shirt' | 'pants' | 'tshirt';
}

export interface ImageGenerationResult {
  imagePath: string;
  metadata?: Record<string, any>;
}

/**
 * Base class for AI image generators
 * Extend this to implement specific providers
 */
export abstract class AIImageGenerator {
  abstract generate(options: ImageGenerationOptions): Promise<ImageGenerationResult>;

  /**
   * Download image from URL and save locally
   */
  protected async downloadImage(url: string, savePath: string): Promise<string> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    await fs.writeFile(savePath, Buffer.from(buffer));
    return savePath;
  }

  /**
   * Resize image to fit Roblox template dimensions
   */
  protected async resizeForTemplate(
    imagePath: string,
    outputPath: string,
    templateType: 'shirt' | 'pants' | 'tshirt' = 'shirt'
  ): Promise<string> {
    const dimensions = {
      shirt: { width: 585, height: 559 },
      pants: { width: 585, height: 559 },
      tshirt: { width: 128, height: 128 },
    };

    const { width, height } = dimensions[templateType];

    await sharp(imagePath)
      .resize(width, height, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(outputPath);

    return outputPath;
  }
}

/**
 * OpenAI DALL-E Integration
 * Requires: npm install openai
 * Env var: OPENAI_API_KEY
 */
export class DallEGenerator extends AIImageGenerator {
  private apiKey: string;

  constructor(apiKey?: string) {
    super();
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY not set');
    }
  }

  async generate(options: ImageGenerationOptions): Promise<ImageGenerationResult> {
    // Uncomment when openai package is installed:
    /*
    const openai = new OpenAI({ apiKey: this.apiKey });

    const enhancedPrompt = `Roblox ${options.templateType || 'shirt'} design: ${options.prompt}.
    Style: ${options.style || 'pixel art'}.
    Design should work on a cross-shaped clothing template with transparent background.
    Focus on the front torso area (center). Include sleeve designs on the sides.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      size: "1024x1024",
      quality: "standard",
      n: 1,
    });

    const imageUrl = response.data[0].url;
    if (!imageUrl) throw new Error('No image URL returned');

    const tempPath = path.join(process.cwd(), 'output', `dalle_${Date.now()}.png`);
    await this.downloadImage(imageUrl, tempPath);

    const outputPath = path.join(
      process.cwd(),
      'output',
      `design_${Date.now()}.png`
    );

    await this.resizeForTemplate(tempPath, outputPath, options.templateType);

    return {
      imagePath: outputPath,
      metadata: {
        provider: 'dall-e-3',
        prompt: enhancedPrompt,
        originalUrl: imageUrl,
      },
    };
    */

    throw new Error('OpenAI integration not yet implemented. Install openai package and uncomment code.');
  }
}

/**
 * Stability AI Integration
 * Requires: npm install node-fetch
 * Env var: STABILITY_API_KEY
 */
export class StabilityGenerator extends AIImageGenerator {
  private apiKey: string;

  constructor(apiKey?: string) {
    super();
    this.apiKey = apiKey || process.env.STABILITY_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('STABILITY_API_KEY not set');
    }
  }

  async generate(options: ImageGenerationOptions): Promise<ImageGenerationResult> {
    throw new Error('Stability AI integration not yet implemented');
  }
}

/**
 * Local Stable Diffusion (ComfyUI/A1111) Integration
 * Requires: Local SD instance running on http://127.0.0.1:7860
 */
export class LocalSDGenerator extends AIImageGenerator {
  private apiUrl: string;

  constructor(apiUrl: string = 'http://127.0.0.1:7860') {
    super();
    this.apiUrl = apiUrl;
  }

  async generate(options: ImageGenerationOptions): Promise<ImageGenerationResult> {
    /*
    const response = await fetch(`${this.apiUrl}/sdapi/v1/txt2img`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: options.prompt,
        negative_prompt: 'blurry, low quality, distorted',
        width: options.width || 585,
        height: options.height || 559,
        steps: 30,
        cfg_scale: 7,
        sampler_name: 'Euler a',
      }),
    });

    const result = await response.json();
    const base64Image = result.images[0];

    const outputPath = path.join(
      process.cwd(),
      'output',
      `design_${Date.now()}.png`
    );

    await fs.writeFile(outputPath, Buffer.from(base64Image, 'base64'));

    return {
      imagePath: outputPath,
      metadata: {
        provider: 'local-sd',
        prompt: options.prompt,
      },
    };
    */

    throw new Error('Local SD integration not yet implemented');
  }
}

/**
 * Factory function to get the appropriate generator
 */
export function getGenerator(provider: 'dalle' | 'stability' | 'local-sd' = 'dalle'): AIImageGenerator {
  switch (provider) {
    case 'dalle':
      return new DallEGenerator();
    case 'stability':
      return new StabilityGenerator();
    case 'local-sd':
      return new LocalSDGenerator();
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
