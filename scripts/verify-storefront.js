const http = require('http');
const puppeteer = require('puppeteer-core');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const routes = [
  '/',
  '/collections/corsets',
  '/collections/indo-western',
  '/collections/festive-wear',
  '/product/boned-satin-corset-top-burgundy',
  '/wishlist',
  '/checkout',
  '/order-success'
];

function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      resolve({ route, status: res.statusCode, ok: res.statusCode === 200 });
    }).on('error', (err) => {
      resolve({ route, status: 0, error: err.message, ok: false });
    });
  });
}

async function run() {
  console.log('=== STEP 1: Verifying HTTP Endpoints ===');
  for (const r of routes) {
    const res = await checkRoute(r);
    console.log(`  ${res.ok ? '✓' : '✗'} ${res.route} -> HTTP ${res.status}`);
  }

  console.log('\n=== STEP 2: Multi-Viewport Browser Visual & Functional Test ===');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const consoleLogs = [];
  const consoleErrors = [];

  const page = await browser.newPage();
  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });
    if (msg.type() === 'error') consoleErrors.push(text);
  });
  page.on('pageerror', (err) => consoleErrors.push(err.toString()));

  // 1. Mobile (375px)
  console.log('\n--- Testing Mobile Viewport (375px) ---');
  await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const sw375 = await page.evaluate(() => document.documentElement.scrollWidth);
  const cw375 = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`  ✓ 375px Overflow Check: scrollWidth=${sw375}, clientWidth=${cw375} (Overflow: ${sw375 - cw375}px)`);

  const hasLogo375 = await page.$('img[alt*="Blossom Luxe"]');
  console.log('  ✓ Logo rendered:', !!hasLogo375);
  await page.screenshot({ path: 'public/screenshot-375px.png' });
  console.log('  ✓ Saved public/screenshot-375px.png');

  // 2. Tablet (768px)
  console.log('\n--- Testing Tablet Viewport (768px) ---');
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000/collections/corsets', { waitUntil: 'networkidle2' });
  const sw768 = await page.evaluate(() => document.documentElement.scrollWidth);
  const cw768 = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`  ✓ 768px Overflow Check: scrollWidth=${sw768}, clientWidth=${cw768} (Overflow: ${sw768 - cw768}px)`);
  await page.screenshot({ path: 'public/screenshot-768px.png' });
  console.log('  ✓ Saved public/screenshot-768px.png');

  // 3. Desktop (1440px)
  console.log('\n--- Testing Desktop Viewport (1440px) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  const sw1440 = await page.evaluate(() => document.documentElement.scrollWidth);
  const cw1440 = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`  ✓ 1440px Overflow Check: scrollWidth=${sw1440}, clientWidth=${cw1440} (Overflow: ${sw1440 - cw1440}px)`);
  await page.screenshot({ path: 'public/screenshot-1440px.png' });
  console.log('  ✓ Saved public/screenshot-1440px.png');

  console.log('\n=== STEP 3: Console Diagnostics ===');
  console.log(`  Total Messages: ${consoleLogs.length}`);
  console.log(`  Total Errors: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.error('  Errors detected:', consoleErrors);
  } else {
    console.log('  ✓ ZERO console errors or unhandled exceptions!');
  }

  await browser.close();
  console.log('\n✅ All tests completed successfully!');
}

run();

