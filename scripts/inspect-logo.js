const puppeteer = require('puppeteer-core');
const fs = require('fs');

async function inspect() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1100 });
  await page.goto('http://localhost:3000/logo.png', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/logo-preview.png' });
  await browser.close();
  console.log('Saved public/logo-preview.png');
}
inspect();

