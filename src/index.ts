#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '../templates');
const OUTPUT_DIR = path.join(__dirname, '../output');

interface RobloxTemplate {
  name: string;
  path: string;
  type: 'shirt' | 'pants' | 'tshirt';
  dimensions: {
    width: number;
    height: number;
  };
}

// Roblox clothing template specifications
const TEMPLATE_SPECS = {
  shirt: { width: 585, height: 559 },
  pants: { width: 585, height: 559 },
  tshirt: { width: 128, height: 128 },
};

class RobloxClothingServer {
  private server: Server;
  private templates: Map<string, RobloxTemplate> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: 'roblox-clothing-mcp',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupHandlers();
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'list_templates',
          description: 'List all available Roblox clothing templates',
          inputSchema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['shirt', 'pants', 'tshirt', 'all'],
                description: 'Filter templates by type',
                default: 'all',
              },
            },
          },
        },
        {
          name: 'generate_shirt_design',
          description: 'Generate a design for a Roblox shirt using AI image generation (placeholder for now)',
          inputSchema: {
            type: 'object',
            properties: {
              prompt: {
                type: 'string',
                description: 'Description of the shirt design to generate',
              },
              style: {
                type: 'string',
                description: 'Art style (e.g., "pixel art", "cartoon", "realistic")',
                default: 'pixel art',
              },
              template_name: {
                type: 'string',
                description: 'Name of the template to use',
                default: 'default_shirt',
              },
            },
            required: ['prompt'],
          },
        },
        {
          name: 'composite_design',
          description: 'Composite a design image onto a Roblox clothing template',
          inputSchema: {
            type: 'object',
            properties: {
              template_name: {
                type: 'string',
                description: 'Name of the template to use',
              },
              design_path: {
                type: 'string',
                description: 'Path to the design image to composite',
              },
              output_name: {
                type: 'string',
                description: 'Name for the output file',
              },
            },
            required: ['template_name', 'design_path', 'output_name'],
          },
        },
        {
          name: 'create_blank_template',
          description: 'Create a blank Roblox clothing template',
          inputSchema: {
            type: 'object',
            properties: {
              type: {
                type: 'string',
                enum: ['shirt', 'pants', 'tshirt'],
                description: 'Type of clothing template',
              },
              name: {
                type: 'string',
                description: 'Name for the template file',
              },
              background_color: {
                type: 'string',
                description: 'Background color in hex format (e.g., #3B5998)',
                default: '#3B5998',
              },
            },
            required: ['type', 'name'],
          },
        },
      ],
    }));

    // List resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const templates = await this.scanTemplates();
      return {
        resources: templates.map((template) => ({
          uri: `template:///${template.name}`,
          mimeType: 'image/png',
          name: template.name,
          description: `${template.type} template - ${template.dimensions.width}x${template.dimensions.height}`,
        })),
      };
    });

    // Read resource
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;
      if (!uri.startsWith('template:///')) {
        throw new Error('Invalid resource URI');
      }

      const templateName = uri.replace('template:///', '');
      const template = this.templates.get(templateName);

      if (!template) {
        throw new Error(`Template not found: ${templateName}`);
      }

      const imageData = await fs.readFile(template.path);
      const base64 = imageData.toString('base64');

      return {
        contents: [
          {
            uri,
            mimeType: 'image/png',
            blob: base64,
          },
        ],
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'list_templates':
            return await this.handleListTemplates(args);
          case 'generate_shirt_design':
            return await this.handleGenerateShirtDesign(args);
          case 'composite_design':
            return await this.handleCompositeDesign(args);
          case 'create_blank_template':
            return await this.handleCreateBlankTemplate(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${errorMessage}`,
            },
          ],
          isError: true,
        };
      }
    });
  }

  private async scanTemplates(): Promise<RobloxTemplate[]> {
    try {
      await fs.mkdir(TEMPLATES_DIR, { recursive: true });
      const files = await fs.readdir(TEMPLATES_DIR);
      const templates: RobloxTemplate[] = [];

      for (const file of files) {
        if (!file.endsWith('.png')) continue;

        const filePath = path.join(TEMPLATES_DIR, file);
        const stats = await fs.stat(filePath);

        if (stats.isFile()) {
          // Try to detect type from filename or default to shirt
          let type: 'shirt' | 'pants' | 'tshirt' = 'shirt';
          if (file.includes('pants')) type = 'pants';
          else if (file.includes('tshirt')) type = 'tshirt';

          const metadata = await sharp(filePath).metadata();

          const template: RobloxTemplate = {
            name: file.replace('.png', ''),
            path: filePath,
            type,
            dimensions: {
              width: metadata.width || TEMPLATE_SPECS[type].width,
              height: metadata.height || TEMPLATE_SPECS[type].height,
            },
          };

          templates.push(template);
          this.templates.set(template.name, template);
        }
      }

      return templates;
    } catch (error) {
      console.error('Error scanning templates:', error);
      return [];
    }
  }

  private async handleListTemplates(args: any) {
    const templates = await this.scanTemplates();
    const filterType = args?.type || 'all';

    const filtered = filterType === 'all'
      ? templates
      : templates.filter(t => t.type === filterType);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(filtered, null, 2),
        },
      ],
    };
  }

  private async handleGenerateShirtDesign(args: any) {
    const { prompt, style = 'pixel art', template_name = 'default_shirt' } = args;

    // For now, this is a placeholder that explains the process
    // In a real implementation, this would call an AI image generation API
    return {
      content: [
        {
          type: 'text',
          text: `Design generation requested:
Prompt: ${prompt}
Style: ${style}
Template: ${template_name}

NOTE: AI image generation integration pending.
You can integrate with:
- OpenAI DALL-E API
- Stability AI
- Midjourney API
- Local Stable Diffusion

The generated image should match Roblox template dimensions and be composited onto the template using the 'composite_design' tool.`,
        },
      ],
    };
  }

  private async handleCompositeDesign(args: any) {
    const { template_name, design_path, output_name } = args;

    const template = this.templates.get(template_name);
    if (!template) {
      throw new Error(`Template not found: ${template_name}`);
    }

    // Ensure output directory exists
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Load the template and design
    const templateBuffer = await fs.readFile(template.path);
    const designBuffer = await fs.readFile(design_path);

    // Composite the design onto the template
    // For Roblox shirts, we typically want to overlay the design
    const outputPath = path.join(OUTPUT_DIR, `${output_name}.png`);

    await sharp(templateBuffer)
      .composite([{
        input: await sharp(designBuffer)
          .resize(template.dimensions.width, template.dimensions.height, {
            fit: 'contain',
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          })
          .toBuffer(),
      }])
      .png()
      .toFile(outputPath);

    return {
      content: [
        {
          type: 'text',
          text: `Successfully composited design onto template!\nOutput saved to: ${outputPath}`,
        },
      ],
    };
  }

  private async handleCreateBlankTemplate(args: any) {
    const { type, name, background_color = '#3B5998' } = args;

    const specs = TEMPLATE_SPECS[type as keyof typeof TEMPLATE_SPECS];
    if (!specs) {
      throw new Error(`Invalid template type: ${type}`);
    }

    await fs.mkdir(TEMPLATES_DIR, { recursive: true });

    const outputPath = path.join(TEMPLATES_DIR, `${name}.png`);

    // Parse hex color
    const hex = background_color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Create a blank template with the Roblox background color
    await sharp({
      create: {
        width: specs.width,
        height: specs.height,
        channels: 4,
        background: { r, g, b, alpha: 1 }
      }
    })
      .png()
      .toFile(outputPath);

    return {
      content: [
        {
          type: 'text',
          text: `Created blank ${type} template: ${outputPath}\nDimensions: ${specs.width}x${specs.height}`,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Roblox Clothing MCP server running on stdio');
  }
}

const server = new RobloxClothingServer();
server.run().catch(console.error);
