const puppeteer = require('puppeteer-core');

async function analyzeLayout() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/logo-transparent.png', { waitUntil: 'networkidle2' });

  const stats = await page.evaluate(() => {
    const img = document.querySelector('img');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const d = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data;
    
    // Divide into horizontal slices: top, middle, bottom
    // and vertical slices: left, center, right
    const rowCounts = new Array(img.naturalHeight).fill(0);
    const colCounts = new Array(img.naturalWidth).fill(0);

    for (let y = 0; y < img.naturalHeight; y++) {
      for (let x = 0; x < img.naturalWidth; x++) {
        const a = d[(y * img.naturalWidth + x) * 4 + 3];
        if (a > 30) {
          rowCounts[y]++;
          colCounts[x]++;
        }
      }
    }

    // Find row ranges where content is dense
    let activeY = [];
    let inBlock = false;
    let startY = 0;
    for (let y = 0; y < img.naturalHeight; y++) {
      if (rowCounts[y] > 5) {
        if (!inBlock) { inBlock = true; startY = y; }
      } else {
        if (inBlock) { inBlock = false; activeY.push({ startY, endY: y, height: y - startY }); }
      }
    }

    return {
      width: img.naturalWidth,
      height: img.naturalHeight,
      horizontalDensityBlocks: activeY
    };
  });

  console.log(JSON.stringify(stats, null, 2));
  await browser.close();
}

analyzeLayout();

