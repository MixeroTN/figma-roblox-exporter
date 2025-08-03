# Roblox Image Exporter for Figma

A powerful Figma plugin that exports images optimized for Roblox with chipng-like processing to prevent pixel artifacts and edge bleeding. Select any layer in Figma and export it with professional Roblox optimization at multiple scales.

## 🚀 Quick Start

1. **Download the plugin files**: `manifest.json`, `code.js`, `ui.html`
2. **Install in Figma**: Go to `Plugins` → `Development` → `Import plugin from manifest...`
3. **Select layers** in your Figma file
4. **Export with optimization** at 1x, 2x, or 4x scale

👉 **[See detailed installation guide →](README_PLUGIN.md)**

## ✨ Features

- **🎯 Smart Layer Detection**: Automatically detects exportable Figma layers
- **📏 Multiple Scales**: Export at 1x, 2x, or 4x like Figma's native export
- **🛡️ Roblox Optimization**: 
  - Adds transparent borders to prevent compression artifacts
  - Extends edge pixels for smooth blending
  - Optimizes alpha channels for Roblox's texture system
- **⚡ Batch Export**: Export multiple selected layers at once
- **🔄 Real-time Preview**: Shows selected items with dimensions

## 📁 Project Structure

- `manifest.json` - Plugin configuration
- `code.js` - Main plugin logic and Figma API integration
- `ui.html` - Plugin interface with image processing
- `README_PLUGIN.md` - Complete plugin documentation

## 📖 Documentation

- **[Plugin Installation & Usage Guide](README_PLUGIN.md)** - Complete guide for the Figma plugin

## 🎨 Supported Layer Types

- ✅ Frames, Components, Instances
- ✅ Groups, Rectangles, Ellipses
- ✅ Polygons, Stars, Vectors
- ✅ Text layers (exported as images)

## 🔧 Technical Details

### Image Processing
The plugin uses HTML5 Canvas for Roblox optimization:
1. **Border Addition**: 2px transparent border
2. **Edge Extension**: Extends edge pixels into border
3. **Alpha Optimization**: Proper transparency handling
4. **Scale Preservation**: Crisp edges at all scales

### File Naming
Exported files: `{layer_name}_{scale}x_roblox.png`
