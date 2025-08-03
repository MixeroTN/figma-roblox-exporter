# Roblox Image Exporter - Figma Plugin

A Figma plugin that exports images optimized for Roblox with chipng-like processing to prevent pixel artifacts and edge bleeding.

## Features

- **Smart Selection Detection**: Automatically detects exportable layers (frames, components, instances, shapes, etc.)
- **Multiple Scale Options**: Export at 1x, 2x, or 4x scale like Figma's native export
- **Roblox Optimization**: 
  - Adds transparent border to prevent compression artifacts
  - Extends edge pixels for smooth blending
  - Optimizes alpha channel for Roblox's texture system
  - Maintains image quality at all scales
- **Real-time Preview**: Shows selected items with type and dimensions
- **Batch Export**: Export multiple selected items at once

## Installation

### Method 1: Development Installation (Recommended for testing)

1. **Download the Plugin Files**
   - Download or clone this repository
   - Ensure you have these files in a folder:
     - `manifest.json`
     - `code.js`
     - `ui.html`

2. **Install in Figma Desktop**
   - Open Figma Desktop application
   - Go to `Plugins` → `Development` → `Import plugin from manifest...`
   - Select the `manifest.json` file from your plugin folder
   - The plugin will be installed and available in your plugins menu

3. **Install in Figma Web (Alternative)**
   - Open Figma in your browser
   - Go to `Plugins` → `Development` → `Import plugin from manifest...`
   - Select the `manifest.json` file
   - Note: Some features may be limited in the web version

### Method 2: Manual Installation

1. Create a new folder for the plugin
2. Copy the three plugin files (`manifest.json`, `code.js`, `ui.html`) into the folder
3. In Figma, go to `Plugins` → `Development` → `Import plugin from manifest...`
4. Navigate to your plugin folder and select `manifest.json`

## Usage

### Basic Usage

1. **Open the Plugin**
   - In Figma, go to `Plugins` → `Roblox Image Exporter`
   - The plugin panel will open on the right side

2. **Select Layers**
   - Select one or more layers in your Figma file
   - Supported layer types: Frames, Components, Instances, Groups, Shapes, Vectors, Text
   - The plugin will automatically detect and display your selection

3. **Choose Export Scale**
   - Click one of the scale buttons:
     - **1x**: Original size
     - **2x**: Double size (recommended for high-DPI displays)
     - **4x**: Quadruple size (for very high resolution needs)

4. **Download**
   - The plugin will process your images with Roblox optimization
   - Processed images will automatically download to your default download folder
   - Files are named: `layername_Nx_roblox.png` (where N is the scale)

### Advanced Features

#### Batch Export
- Select multiple layers at once
- All selected layers will be exported with the chosen scale
- Each layer gets its own optimized file

#### Roblox Optimization Details
The plugin applies several optimizations specifically for Roblox:

1. **Border Addition**: Adds a 2-pixel transparent border around images
2. **Edge Extension**: Extends edge pixels into the border area to prevent artifacts
3. **Alpha Optimization**: Ensures proper alpha channel handling for Roblox's compression
4. **Scale Preservation**: Maintains crisp edges at all export scales

## Supported Layer Types

- ✅ **Frames**: Perfect for UI elements and layouts
- ✅ **Components**: Reusable design elements
- ✅ **Instances**: Component instances
- ✅ **Groups**: Grouped elements
- ✅ **Rectangles**: Basic shapes
- ✅ **Ellipses**: Circular shapes
- ✅ **Polygons**: Custom shapes
- ✅ **Stars**: Star shapes
- ✅ **Vectors**: Custom vector graphics
- ✅ **Text**: Text layers (exported as images)

## File Naming Convention

Exported files follow this pattern:
```
{layer_name}_{scale}x_roblox.png
```

Examples:
- `button_1x_roblox.png`
- `icon_2x_roblox.png`
- `background_4x_roblox.png`

## Troubleshooting

### Plugin Not Appearing
- Make sure you're using Figma Desktop (recommended)
- Verify all three files (`manifest.json`, `code.js`, `ui.html`) are in the same folder
- Try reimporting the plugin

### Export Not Working
- Ensure you have layers selected
- Check that selected layers are supported types
- Try with a single layer first to test

### Download Issues
- Check your browser's download settings
- Ensure downloads are not being blocked
- Try with a different browser if using Figma Web

### Image Quality Issues
- Use higher scales (2x or 4x) for better quality
- Ensure your original Figma layers are high quality
- Check that layers don't have excessive effects that might interfere

## Technical Details

### Image Processing
The plugin uses HTML5 Canvas for image processing since external libraries like Sharp cannot be used in the Figma plugin environment. The processing includes:

1. **Border Creation**: Creates a transparent border around the original image
2. **Edge Pixel Extension**: Analyzes edge pixels and extends them into the border area
3. **Alpha Channel Optimization**: Ensures proper transparency handling

### Performance
- Processing time depends on image size and complexity
- Larger images and higher scales take longer to process
- The plugin processes images sequentially for stability

## Development

### Plugin Structure
```
├── manifest.json     # Plugin configuration
├── code.js          # Main plugin logic (Figma API)
└── ui.html          # Plugin interface and image processing
```

### Key Technologies
- **Figma Plugin API**: For layer detection and export
- **HTML5 Canvas**: For image processing
- **JavaScript**: Core functionality

## Changelog

### Version 1.0.0
- Initial release
- Basic export functionality with 1x, 2x, 4x scales
- Roblox optimization with border processing
- Support for all major layer types
- Batch export capability

## Support

For issues, feature requests, or questions:
1. Check the troubleshooting section above
2. Ensure you're using the latest version
3. Test with simple layers first to isolate issues
