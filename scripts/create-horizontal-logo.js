const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function createHorizontalLogo() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/blossom-luxe-logo.png', { waitUntil: 'networkidle2' });

  const result = await page.evaluate(async () => {
    const img = document.querySelector('img');
    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // In blossom-luxe-logo.png:
    // Emblem is roughly from y=0 to y=520
    // Text "BLOSSOM LUXE" is roughly from y=560 to y=730
    // Tagline "UNFOLDING THE ART OF LUXURY" is roughly from y=750 to y=840

    // Let's crop Emblem tightly
    // Center of emblem is around x=w/2
    const cEmblem = document.createElement('canvas');
    const emblemW = 560;
    const emblemH = 500;
    const emblemX = Math.floor((w - emblemW) / 2);
    const emblemY = 10;
    cEmblem.width = emblemW;
    cEmblem.height = emblemH;
    cEmblem.getContext('2d').drawImage(c, emblemX, emblemY, emblemW, emblemH, 0, 0, emblemW, emblemH);

    // Crop Text block
    const cText = document.createElement('canvas');
    const textW = w - 40;
    const textH = 280;
    const textX = 20;
    const textY = 560;
    cText.width = textW;
    cText.height = textH;
    cText.getContext('2d').drawImage(c, textX, textY, textW, textH, 0, 0, textW, textH);

    // Compose Horizontal Lockup:
    // [ Emblem ]  [ BLOSSOM LUXE / Tagline ]
    // Target height: 260px
    const targetH = 260;
    const scaledEmblemW = Math.floor((emblemW / emblemH) * targetH); // ~291px
    const scaledTextW = Math.floor((textW / textH) * (targetH * 0.95)); // ~1200px
    const gap = 35;

    const totalW = scaledEmblemW + gap + scaledTextW;
    const cHoriz = document.createElement('canvas');
    cHoriz.width = totalW;
    cHoriz.height = targetH;
    const ctxHoriz = cHoriz.getContext('2d');

    // Draw Emblem vertically centered
    ctxHoriz.drawImage(cEmblem, 0, 0, scaledEmblemW, targetH);
    // Draw Text vertically centered
    const textTargetY = Math.floor((targetH - targetH * 0.95) / 2);
    ctxHoriz.drawImage(cText, scaledEmblemW + gap, textTargetY, scaledTextW, Math.floor(targetH * 0.95));

    // Also generate white version of horizontal logo
    const cHorizWhite = document.createElement('canvas');
    cHorizWhite.width = totalW;
    cHorizWhite.height = targetH;
    const ctxHorizWhite = cHorizWhite.getContext('2d');
    ctxHorizWhite.drawImage(cHoriz, 0, 0);

    const imgDataWhite = ctxHorizWhite.getImageData(0, 0, totalW, targetH);
    const dW = imgDataWhite.data;
    for (let i = 0; i < dW.length; i += 4) {
      if (dW[i+3] > 10) {
        dW[i] = 255;
        dW[i+1] = 255;
        dW[i+2] = 255;
      }
    }
    ctxHorizWhite.putImageData(imgDataWhite, 0, 0);

    return {
      horizontal: cHoriz.toDataURL('image/png'),
      horizontalWhite: cHorizWhite.toDataURL('image/png'),
      totalW,
      targetH
    };
  });

  const saveB64 = (dataUrl, filePath) => {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(filePath, base64Data, 'base64');
  };

  saveB64(result.horizontal, 'public/blossom-luxe-horizontal.png');
  saveB64(result.horizontalWhite, 'public/blossom-luxe-horizontal-white.png');

  console.log(`Saved horizontal logo: ${result.totalW}x${result.targetH}`);
  await browser.close();
}

createHorizontalLogo();

