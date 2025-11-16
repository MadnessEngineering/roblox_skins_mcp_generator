# 🧪 How to Upload Your Mad Tinker Outfit to Roblox

## Your Design is Ready!

The Mad Tinker outfit has been generated at:
```
output/madtinker_outfit.png
```

## Features of Your Outfit

- **White Lab Coat** - Classic mad scientist vibes
- **Tool Pocket** - With wrench and screwdriver
- **Gear Badges** - Bronze steampunk gears
- **MAD TINKER Name Tag** - Let everyone know who you are
- **THE LAB Logo** - On the back
- **Rolled Sleeves** - Ready for tinkering
- **Button Details** - Professional lab coat buttons
- **Stitching Details** - Proper seam work

## Upload to Roblox Studio

### Step 1: Open Roblox Studio
1. Launch Roblox Studio
2. Open your game/project

### Step 2: Create a Shirt
1. In the Explorer panel, right-click **Workspace**
2. Select **Insert Object** → **Shirt**
3. The shirt will appear in Workspace

### Step 3: Upload the Template
1. Select the Shirt object
2. In Properties, find **ShirtTemplate**
3. Click the button next to ShirtTemplate
4. Click **Choose File**
5. Navigate to: `/Users/d.edens/lab/roblox_grifting/output/madtinker_outfit.png`
6. Upload and wait for moderation (usually quick)

### Step 4: Apply to Your Avatar
1. Once approved, the template URL will appear
2. You can now equip it to your character
3. Or sell it in your game!

## Alternative: Upload via Website

1. Go to https://create.roblox.com/
2. Navigate to **Development Items** → **Shirts**
3. Click **Create Shirt**
4. Upload `madtinker_outfit.png`
5. Name it "Mad Tinker Lab Coat"
6. Set your price (or make it free)
7. Submit for moderation

## Customization

Want to tweak the design? Edit `src/madtinker-generator.ts`:

- **Change colors**: Modify the SVG fill/stroke colors
- **Add more tools**: Add pocket items or badges
- **Different text**: Change "MAD TINKER" to your name
- **More gears**: Add additional gear decorations
- **Styles**: Implement 'dark' or 'steampunk' variants

Then rebuild:
```bash
npm run build
node dist/madtinker-generator.js
```

## Tips

- **Preview First**: View the PNG before uploading to ensure it looks right
- **Moderation**: Roblox reviews all uploads - usually takes minutes to hours
- **Resolution**: The 585x559 template is perfect - don't resize!
- **File Size**: Keep under 1MB for faster uploads
- **Guidelines**: Follow Roblox community guidelines

## Troubleshooting

**Design looks wrong in-game?**
- Make sure you uploaded as a Shirt (not T-Shirt)
- Check that the template wasn't resized
- Verify the file is exactly 585x559px

**Upload rejected?**
- Ensure design follows Roblox community standards
- Remove any copyrighted elements
- Check for inappropriate text/images

## Next Steps

Now that you have your Mad Tinker outfit:
1. Create matching pants
2. Add accessories (goggles, tool belt)
3. Generate variants (Dark Mad Tinker, Steampunk Tinker)
4. Create a whole workshop clothing line!

The lab is open for business! 🧪⚙️👕
