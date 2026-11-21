const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function processLogoAssets() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/logo.png', { waitUntil: 'networkidle2' });

  const result = await page.evaluate(async () => {
    const img = document.querySelector('img');
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    // Pink background color is roughly (249, 166, 194)
    // Burgundy artwork is roughly (68, 0, 15) to (80, 20, 35)
    // Let's create an alpha mask based on color distance from pink vs burgundy
    const bgR = 249, bgG = 166, bgB = 194;
    const fgR = 74, fgG = 26, fgB = 44; // brand burgundy #4A1A2C

    // 1. Transparent Burgundy Logo
    const transData = ctx.createImageData(w, h);
    const whiteData = ctx.createImageData(w, h);

    let minX = w, minY = h, maxX = 0, maxY = 0;
    // Also track emblem bounding box (the lotus above the text)
    // Looking at the image, emblem is in top ~60% of height, text is in bottom 40%

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];

        // Distance from background pink
        const distBg = Math.sqrt((r - bgR)**2 + (g - bgG)**2 + (b - bgB)**2);
        
        // Luminance / darkness factor: burgundy is dark, pink is bright
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
        // Pink brightness ~ 185, Burgundy brightness ~ 35
        let alpha = 0;
        if (brightness < 120) {
          alpha = 255;
        } else if (brightness < 175) {
          alpha = Math.floor(((175 - brightness) / 55) * 255);
        }

        if (alpha > 15) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;

          // Burgundy output
          transData.data[i] = fgR;
          transData.data[i+1] = fgG;
          transData.data[i+2] = fgB;
          transData.data[i+3] = alpha;

          // White output
          whiteData.data[i] = 255;
          whiteData.data[i+1] = 255;
          whiteData.data[i+2] = 255;
          whiteData.data[i+3] = alpha;
        }
      }
    }

    // Tight cropped bounding box
    const pad = 20;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(w - cropX, (maxX - minX) + pad * 2);
    const cropH = Math.min(h - cropY, (maxY - minY) + pad * 2);

    // Save full transparent logo cropped
    const cFull = document.createElement('canvas');
    cFull.width = cropW;
    cFull.height = cropH;
    const ctxFull = cFull.getContext('2d');
    
    // Put temp transparent data
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = w;
    tempCanvas.height = h;
    tempCanvas.getContext('2d').putImageData(transData, 0, 0);
    ctxFull.drawImage(tempCanvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    // White full
    const cWhite = document.createElement('canvas');
    cWhite.width = cropW;
    cWhite.height = cropH;
    const ctxWhite = cWhite.getContext('2d');
    const tempWhite = document.createElement('canvas');
    tempWhite.width = w;
    tempWhite.height = h;
    tempWhite.getContext('2d').putImageData(whiteData, 0, 0);
    ctxWhite.drawImage(tempWhite, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    // Emblem only (top part, roughly from minY to ~580)
    // Find where the gap between emblem and BLOSSOM LUXE text is
    // Let's sample horizontal density to find the exact separator line
    let emblemMaxY = 570;
    for (let y = 500; y < 650; y++) {
      let count = 0;
      for (let x = minX; x < maxX; x++) {
        if (transData.data[(y * w + x) * 4 + 3] > 50) count++;
      }
      if (count === 0) {
        emblemMaxY = y;
        break;
      }
    }

    const emblemW = (maxX - minX) + pad * 2;
    const emblemH = (emblemMaxY - minY) + pad * 2;
    const cEmblem = document.createElement('canvas');
    cEmblem.width = emblemW;
    cEmblem.height = emblemH;
    cEmblem.getContext('2d').drawImage(tempCanvas, cropX, cropY, emblemW, emblemH, 0, 0, emblemW, emblemH);

    const cEmblemWhite = document.createElement('canvas');
    cEmblemWhite.width = emblemW;
    cEmblemWhite.height = emblemH;
    cEmblemWhite.getContext('2d').drawImage(tempWhite, cropX, cropY, emblemW, emblemH, 0, 0, emblemW, emblemH);

    return {
      bounds: { minX, minY, maxX, maxY, cropW, cropH, emblemMaxY },
      fullBurgundy: cFull.toDataURL('image/png'),
      fullWhite: cWhite.toDataURL('image/png'),
      emblemBurgundy: cEmblem.toDataURL('image/png'),
      emblemWhite: cEmblemWhite.toDataURL('image/png'),
    };
  });

  // Write base64 PNGs to files
  const saveB64 = (dataUrl, filePath) => {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(filePath, base64Data, 'base64');
  };

  saveB64(result.fullBurgundy, 'public/blossom-luxe-logo.png');
  saveB64(result.fullWhite, 'public/blossom-luxe-logo-white.png');
  saveB64(result.emblemBurgundy, 'public/blossom-luxe-emblem.png');
  saveB64(result.emblemWhite, 'public/blossom-luxe-emblem-white.png');

  console.log('Saved assets:');
  console.log(' - public/blossom-luxe-logo.png (Clean transparent brand logo)');
  console.log(' - public/blossom-luxe-logo-white.png (Clean white transparent logo for dark backgrounds)');
  console.log(' - public/blossom-luxe-emblem.png (Clean lotus emblem mark)');
  console.log(' - public/blossom-luxe-emblem-white.png (White lotus emblem mark)');
  console.log('Bounds:', result.bounds);

  await browser.close();
}

processLogoAssets();

