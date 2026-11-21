const puppeteer = require('puppeteer-core');

async function testHeaderLogo() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  // Test 1: Desktop (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const headerDesktop = await page.$('header');
  if (headerDesktop) {
    await headerDesktop.screenshot({ path: 'public/header-1440px.png' });
    console.log('Saved public/header-1440px.png');
  }

  // Test 2: Mobile (375px)
  await page.setViewport({ width: 375, height: 812, isMobile: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const headerMobile = await page.$('header');
  if (headerMobile) {
    await headerMobile.screenshot({ path: 'public/header-375px.png' });
    console.log('Saved public/header-375px.png');
  }

  // Test 3: Footer (1440px)
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const footerDesktop = await page.$('footer');
  if (footerDesktop) {
    await footerDesktop.screenshot({ path: 'public/footer-1440px.png' });
    console.log('Saved public/footer-1440px.png');
  }

  await browser.close();
  console.log('Header & Footer screenshots captured successfully!');
}

testHeaderLogo();

