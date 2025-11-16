# 🧪 Roblox Clothing MCP - Quick Start

## What We've Built

A full MCP server for AI-powered Roblox clothing generation with:
- ✅ Template management system
- ✅ Roblox-spec shirt templates (585x559px)
- ✅ Image compositing with Sharp
- ✅ AI integration stubs (DALL-E, Stability, Local SD)
- ✅ 4 MCP tools ready to use

## Installation

```bash
npm install
npm run build
```

## MCP Setup

Run the setup script to see your config:
```bash
./setup-mcp.sh
```

Or manually add to your MCP settings:

**Claude Code** (`~/.config/claude-code/mcp_settings.json`):
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

Restart Claude Code to load the server.

## Available MCP Tools

### 1. `list_templates`
List all Roblox clothing templates
```typescript
// AI can call this:
list_templates({ type: "shirt" })
```

### 2. `create_blank_template`
Create new blank templates
```typescript
create_blank_template({
  type: "shirt",
  name: "my_template",
  background_color: "#FFFFFF"
})
```

### 3. `generate_shirt_design` (stub)
AI design generation hook
```typescript
generate_shirt_design({
  prompt: "cyberpunk neon design",
  style: "pixel art"
})
```

### 4. `composite_design`
Merge designs onto templates
```typescript
composite_design({
  template_name: "roblox_shirt_template_blank",
  design_path: "./my_design.png",
  output_name: "final_shirt"
})
```

## Quick Test

Ask Claude:
```
List all available Roblox shirt templates
```

You should see:
- roblox_shirt_template_guides (with white guide regions)
- roblox_shirt_template_blank (solid Roblox blue)
- roblox_shirt_canvas (transparent)

## Next Steps: AI Integration

1. **Get an API key** from OpenAI, Stability AI, or set up local Stable Diffusion
2. **Copy `.env.sample` to `.env`** and add your keys
3. **Uncomment integration code** in `src/ai-integrations.ts`
4. **Install additional packages**:
   ```bash
   npm install openai  # For DALL-E
   ```
5. **Rebuild**: `npm run build`

## Example Workflow

```
You: "Generate a cool dragon-themed Roblox shirt in pixel art style"

Claude (using MCP):
1. Calls generate_shirt_design() → generates image via AI
2. Calls composite_design() → merges onto template
3. Returns: "Saved to output/dragon_shirt.png"

You: Upload to Roblox Studio → Profit! 🐉👕
```

## Template Regions

Our generated templates match official Roblox specs:
- **Front torso**: Center main design area
- **Back torso**: Upper center
- **Left/Right sleeves**: Side panels
- **Bottom front**: Lower center extension

## Files Generated

- `templates/roblox_shirt_template_guides.png` - Visual guide
- `templates/roblox_shirt_template_blank.png` - Blank blue
- `templates/roblox_shirt_canvas.png` - Transparent base

## Mad Science Tips

- Use the guides template to understand region placement
- Generate 100s of designs in batch mode
- Hook up to Inventorium dashboard for visual browsing
- Integrate with Auth0 if you want user uploads

---

**Ready to grift Roblox with AI-generated drip!** 🧪🎨👕

See `examples/usage-example.md` for more detailed workflows.
