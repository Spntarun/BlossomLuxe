const puppeteer = require('puppeteer-core');

async function findDrawnElements() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/logo.png', { waitUntil: 'networkidle2' });
  
  const analysis = await page.evaluate(async () => {
    const img = document.querySelector('img');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const bgR = 249, bgG = 166, bgB = 194;
    const imgData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
    const d = imgData.data;

    let minX = img.naturalWidth, minY = img.naturalHeight, maxX = 0, maxY = 0;
    const colorCounts = {};

    for (let y = 0; y < img.naturalHeight; y++) {
      for (let x = 0; x < img.naturalWidth; x++) {
        const i = (y * img.naturalWidth + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        const diff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
        if (diff > 40) { // different from background pink
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;

          const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
          colorCounts[hex] = (colorCounts[hex] || 0) + 1;
        }
      }
    }

    const topColors = Object.entries(colorCounts).sort((a,b) => b[1] - a[1]).slice(0, 10);

    return {
      nonBgBoundingBox: { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY },
      topNonBgColors: topColors
    };
  });

  console.log(JSON.stringify(analysis, null, 2));
  await browser.close();
}

findDrawnElements();

