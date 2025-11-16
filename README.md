# Roblox Clothing MCP Server

Mad scientist's toolkit for generating Roblox clothing with AI! This MCP server provides tools for creating, manipulating, and generating Roblox shirt, pants, and t-shirt templates.

## Features

- 🎨 **Template Management** - Store and manage Roblox clothing templates
- 🤖 **AI Design Generation** - Hook for AI-powered design generation
- 🖼️ **Image Compositing** - Composite designs onto Roblox templates
- 📐 **Blank Template Creation** - Generate blank templates with proper Roblox dimensions

## Installation

```bash
npm install
npm run build
```

## MCP Configuration

Add to your MCP settings (e.g., `~/.config/claude/mcp.json` or Claude Code settings):

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

## Available Tools

### `list_templates`
List all available Roblox clothing templates.

**Parameters:**
- `type` (optional): Filter by type ('shirt', 'pants', 'tshirt', or 'all')

### `create_blank_template`
Create a blank Roblox clothing template with proper dimensions.

**Parameters:**
- `type` (required): Template type ('shirt', 'pants', or 'tshirt')
- `name` (required): Name for the template file
- `background_color` (optional): Hex color (default: #3B5998 - Roblox blue)

### `generate_shirt_design`
Generate a design using AI (integration point for image generation APIs).

**Parameters:**
- `prompt` (required): Description of the design
- `style` (optional): Art style (default: 'pixel art')
- `template_name` (optional): Template to use

### `composite_design`
Composite a design image onto a Roblox template.

**Parameters:**
- `template_name` (required): Name of the template
- `design_path` (required): Path to design image
- `output_name` (required): Output filename

## Template Specifications

- **Shirt**: 585x559px
- **Pants**: 585x559px
- **T-Shirt**: 128x128px

## Directory Structure

```
roblox_grifting/
├── src/           # TypeScript source
├── dist/          # Compiled JavaScript
├── templates/     # Template storage
├── output/        # Generated designs
└── shirts/        # Design assets
```

## Integration Notes

The `generate_shirt_design` tool is currently a placeholder. Integrate with:
- OpenAI DALL-E
- Stability AI
- Midjourney
- Local Stable Diffusion

The server handles template management and compositing - you just need to plug in your preferred image generation backend!

## License

Mad Science License - Use responsibly in the Lab! 🧪
