# Roblox Clothing MCP - Usage Examples

## Setup

1. Build the project:
```bash
npm install
npm run build
```

2. Add to your MCP settings (e.g., Claude Code or other MCP client):
```json
{
  "mcpServers": {
    "roblox-clothing": {
      "command": "node",
      "args": ["/Users/d.edens/lab/roblox_grifting/dist/index.js"]
    }
  }
}
```

3. Restart your MCP client to load the server

## Example Workflows

### 1. Create a Custom Shirt Template

Ask your AI:
```
Use the roblox-clothing MCP to create a blank shirt template called "my_custom_shirt"
with a white background color (#FFFFFF)
```

The AI will call:
```typescript
create_blank_template({
  type: "shirt",
  name: "my_custom_shirt",
  background_color: "#FFFFFF"
})
```

### 2. List Available Templates

```
Show me all available Roblox shirt templates
```

The AI will call:
```typescript
list_templates({ type: "shirt" })
```

### 3. Generate a Design (AI Integration Point)

```
Generate a cool cyberpunk-themed Roblox shirt with neon accents in pixel art style
```

The AI will call:
```typescript
generate_shirt_design({
  prompt: "cyberpunk themed shirt with neon accents, futuristic design",
  style: "pixel art",
  template_name: "roblox_shirt_template_guides"
})
```

**Note**: Currently returns instructions for integrating an AI image generator.
Next steps: Connect to DALL-E, Stability AI, or other image generation API.

### 4. Composite a Design onto Template

If you already have a design image:

```
Composite the design from ./designs/my_design.png onto the roblox_shirt_template_blank
template and save it as "final_shirt"
```

The AI will call:
```typescript
composite_design({
  template_name: "roblox_shirt_template_blank",
  design_path: "./designs/my_design.png",
  output_name: "final_shirt"
})
```

## Integration with AI Image Generation

### Option 1: OpenAI DALL-E

```typescript
// In src/index.ts, modify handleGenerateShirtDesign:
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: `Roblox shirt design: ${prompt}. Style: ${style}.
           Make it fit a cross-shaped template with transparent background.`,
  size: "1024x1024",
  quality: "standard",
});

// Download the image and composite onto template
```

### Option 2: Stability AI

```typescript
import fetch from 'node-fetch';

const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
  },
  body: JSON.stringify({
    text_prompts: [{ text: prompt }],
    cfg_scale: 7,
    height: 1024,
    width: 1024,
    samples: 1,
  }),
});
```

### Option 3: Local Stable Diffusion

Use ComfyUI or Automatic1111 API:
```typescript
const response = await fetch('http://127.0.0.1:7860/sdapi/v1/txt2img', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: prompt,
    width: 585,
    height: 559,
    // ... other parameters
  }),
});
```

## Template Resources

The MCP server exposes templates as resources:

```
template:///roblox_shirt_template_guides
template:///roblox_shirt_template_blank
template:///roblox_shirt_canvas
```

AI can read these directly to understand template structure.

## Output Files

Generated designs are saved to `./output/` directory:
- `output/final_shirt.png`
- `output/custom_design_v1.png`
- etc.

Upload these to Roblox Studio to use in your game!

## Tips for Best Results

1. **Design Placement**: The front torso is the most visible part. Focus main design there.
2. **Color Background**: Use Roblox blue (#3B5998) for traditional look, or white for modern designs
3. **Resolution**: Keep designs crisp at 585x559px for shirts
4. **Testing**: Preview in Roblox Studio before publishing
5. **Sleeves**: Don't forget to design the sleeve areas (left/right panels)

## Mad Science Mode

Batch generate 100 shirt designs:
```typescript
for (let i = 0; i < 100; i++) {
  const themes = ['cyberpunk', 'fantasy', 'sports', 'abstract', 'retro'];
  const theme = themes[i % themes.length];

  // Generate design
  // Composite onto template
  // Save with unique name
}
```

Now go forth and flood Roblox with AI-generated drip! 🧪👕
