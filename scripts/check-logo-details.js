const puppeteer = require('puppeteer-core');

async function checkLogoDetails() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/logo.png', { waitUntil: 'networkidle2' });
  
  const details = await page.evaluate(async () => {
    const img = document.querySelector('img');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const pTopLeft = ctx.getImageData(5, 5, 1, 1).data;
    const pCenter = ctx.getImageData(Math.floor(img.naturalWidth/2), Math.floor(img.naturalHeight/2), 1, 1).data;

    const imgData = ctx.getImageData(0, 0, img.naturalWidth, img.naturalHeight);
    const d = imgData.data;
    let minX = img.naturalWidth, minY = img.naturalHeight, maxX = 0, maxY = 0;
    
    for (let y = 0; y < img.naturalHeight; y++) {
      for (let x = 0; x < img.naturalWidth; x++) {
        const i = (y * img.naturalWidth + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2], a = d[i+3];
        if (a > 20 && (r < 240 || g < 240 || b < 240)) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    return {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      aspectRatio: img.naturalWidth / img.naturalHeight,
      cornerColor: [pTopLeft[0], pTopLeft[1], pTopLeft[2], pTopLeft[3]],
      centerColor: [pCenter[0], pCenter[1], pCenter[2], pCenter[3]],
      contentBoundingBox: { minX, minY, maxX, maxY, contentWidth: maxX - minX, contentHeight: maxY - minY }
    };
  });

  console.log(JSON.stringify(details, null, 2));
  await browser.close();
}

checkLogoDetails();
