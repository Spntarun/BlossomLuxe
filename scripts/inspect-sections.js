const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function inspectSections() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/logo.png', { waitUntil: 'networkidle2' });

  // Let's crop into public/logo-cropped.png (transparent background and tight bounds)
  await page.evaluate(() => {
    const img = document.querySelector('img');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const bgR = 249, bgG = 166, bgB = 194;
    const imgData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
    const d = imgData.data;

    // Create transparent version: make pink background transparent!
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i+1], b = d[i+2];
      const diff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
      if (diff < 45) {
        // background pink -> transparent
        d[i+3] = 0;
      } else if (diff < 80) {
        // smooth anti-aliased edge
        d[i+3] = Math.min(255, Math.floor(((diff - 45) / 35) * 255));
      }
    }
    ctx.putImageData(imgData, 0, 0);

    // Now crop tight bounding box (72, 118, 1298, 800)
    const cropCanvas = document.createElement('canvas');
    cropCanvas.id = 'cropped';
    cropCanvas.width = 1320;
    cropCanvas.height = 820;
    const cropCtx = cropCanvas.getContext('2d');
    cropCtx.drawImage(c, 60, 108, 1320, 820, 0, 0, 1320, 820);
    document.body.appendChild(cropCanvas);
  });

  const croppedEl = await page.$('#cropped');
  if (croppedEl) {
    await croppedEl.screenshot({ path: 'public/logo-transparent.png', omitBackground: true });
    console.log('Saved public/logo-transparent.png');
  }

  await browser.close();
}

inspectSections();

