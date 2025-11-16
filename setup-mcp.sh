#!/bin/bash
# Setup script for adding Roblox Clothing MCP to your Claude Code config

PROJECT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
DIST_PATH="${PROJECT_DIR}/dist/index.js"

echo "🧪 Roblox Clothing MCP Setup"
echo "================================"
echo ""
echo "Project directory: $PROJECT_DIR"
echo "MCP entry point: $DIST_PATH"
echo ""
echo "Add this to your MCP configuration:"
echo ""
echo "For Claude Code (~/.config/claude-code/mcp_settings.json):"
echo ""
cat << EOF
{
  "mcpServers": {
    "roblox-clothing": {
      "command": "node",
      "args": ["$DIST_PATH"],
      "env": {}
    }
  }
}
EOF
echo ""
echo "For Claude Desktop (~/.config/claude/config.json):"
echo ""
cat << EOF
{
  "mcpServers": {
    "roblox-clothing": {
      "command": "node",
      "args": ["$DIST_PATH"]
    }
  }
}
EOF
echo ""
echo "After adding, restart your Claude client!"
echo ""
echo "🎨 Quick Start:"
echo "  1. Copy .env.sample to .env and add your API keys"
echo "  2. Ask Claude: 'List available Roblox templates'"
echo "  3. Generate designs with AI!"
echo ""
