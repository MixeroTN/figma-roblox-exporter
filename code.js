// Figma Plugin - Roblox Image Exporter
// Main plugin code that runs in the Figma environment

// Show the plugin UI when the plugin is run
figma.showUI(__html__, { width: 320, height: 480 });

// Handle messages from the UI
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'export-roblox') {
    await exportSelectedForRoblox(msg.scale);
  } else if (msg.type === 'get-selection') {
    await sendSelectionToUI();
  } else if (msg.type === 'close-plugin') {
    figma.closePlugin();
  }
};

// Handle selection changes
figma.on('selectionchange', () => {
  sendSelectionToUI();
});

// Send current selection to UI
async function sendSelectionToUI() {
  const selection = figma.currentPage.selection;
  const exportableNodes = [];
  
  for (const node of selection) {
    if (isExportableNode(node)) {
      exportableNodes.push({
        id: node.id,
        name: node.name,
        type: node.type,
        width: node.width,
        height: node.height
      });
    }
  }
  
  figma.ui.postMessage({
    type: 'selection-changed',
    nodes: exportableNodes
  });
}

// Check if a node can be exported as an image
function isExportableNode(node) {
  return node.type === 'FRAME' || 
         node.type === 'COMPONENT' || 
         node.type === 'INSTANCE' || 
         node.type === 'GROUP' ||
         node.type === 'RECTANGLE' ||
         node.type === 'ELLIPSE' ||
         node.type === 'POLYGON' ||
         node.type === 'STAR' ||
         node.type === 'VECTOR' ||
         node.type === 'TEXT';
}

// Export selected nodes for Roblox
async function exportSelectedForRoblox(scale = 1) {
  const selection = figma.currentPage.selection;
  
  if (selection.length === 0) {
    figma.ui.postMessage({
      type: 'error',
      message: 'Please select at least one layer to export'
    });
    return;
  }
  
  try {
    figma.ui.postMessage({
      type: 'export-started',
      message: `Processing ${selection.length} item(s) at ${scale}x scale...`
    });
    
    for (const node of selection) {
      if (isExportableNode(node)) {
        await exportNodeForRoblox(node, scale);
      }
    }
    
    figma.ui.postMessage({
      type: 'export-completed',
      message: `Successfully exported ${selection.length} item(s) for Roblox!`
    });
    
  } catch (error) {
    console.error('Export error:', error);
    figma.ui.postMessage({
      type: 'error',
      message: `Export failed: ${error.message}`
    });
  }
}

// Export a single node for Roblox with processing
async function exportNodeForRoblox(node, scale) {
  try {
    // Export the node as PNG
    const exportSettings = {
      format: 'PNG',
      constraint: {
        type: 'SCALE',
        value: scale
      }
    };
    
    const imageBytes = await node.exportAsync(exportSettings);
    
    // Process the image for Roblox (add border, optimize for Roblox)
    const processedBytes = await processImageForRoblox(imageBytes, scale);
    
    // Generate filename
    const sanitizedName = node.name.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const filename = `${sanitizedName}_${scale}x_roblox.png`;
    
    // Send processed image to UI for download
    figma.ui.postMessage({
      type: 'download-image',
      imageData: Array.from(processedBytes),
      filename: filename,
      nodeName: node.name,
      scale: scale
    });
    
  } catch (error) {
    console.error(`Error exporting node ${node.name}:`, error);
    throw error;
  }
}

// Process image for Roblox (chipng-like functionality)
async function processImageForRoblox(imageBytes, scale) {
  // Since we can't use Sharp in the Figma plugin environment,
  // we'll implement basic border processing using canvas operations
  
  try {
    // Convert Uint8Array to base64 for processing
    const base64 = uint8ArrayToBase64(imageBytes);
    
    // Send to UI for processing (UI has access to canvas)
    return new Promise((resolve, reject) => {
      const messageHandler = (msg) => {
        if (msg.type === 'image-processed') {
          figma.ui.off('message', messageHandler);
          resolve(new Uint8Array(msg.processedData));
        } else if (msg.type === 'processing-error') {
          figma.ui.off('message', messageHandler);
          reject(new Error(msg.error));
        }
      };
      
      figma.ui.on('message', messageHandler);
      
      figma.ui.postMessage({
        type: 'process-image',
        imageData: base64,
        scale: scale,
        borderSize: 2
      });
    });
    
  } catch (error) {
    console.error('Error processing image:', error);
    // If processing fails, return original image
    return imageBytes;
  }
}

// Utility function to convert Uint8Array to base64
function uint8ArrayToBase64(uint8Array) {
  let binary = '';
  const len = uint8Array.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary);
}

// Initialize plugin
async function init() {
  // Send initial selection to UI
  await sendSelectionToUI();
  
  // Register context menu items (if supported in future Figma API)
  // For now, users will use the plugin panel
}

// Run initialization
init();