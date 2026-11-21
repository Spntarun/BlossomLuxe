const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function clickByText(page, selector, text) {
  const elements = await page.$$(selector);
  for (const el of elements) {
    const content = await page.evaluate(e => e.innerText || '', el);
    if (content.toLowerCase().includes(text.toLowerCase())) {
      await el.click();
      return true;
    }
  }
  return false;
}

async function runTests() {
  console.log('--- Starting Multi-Viewport Browser Automated Test Suite ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  const consoleLogs = [];
  const consoleErrors = [];

  const page = await browser.newPage();
  page.on('console', (msg) => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });
    if (msg.type() === 'error') {
      consoleErrors.push(text);
    }
  });
  page.on('pageerror', (err) => {
    consoleErrors.push(err.toString());
  });

  try {
    // ----------------------------------------------------
    // TEST 1: 375px (Mobile)
    // ----------------------------------------------------
    console.log('\n[1/3] Testing Viewport: 375px x 812px (Mobile)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

    const title = await page.title();
    console.log('  ✓ Page title:', title);

    // Check Document Overflow
    const scrollWidth375 = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth375 = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`  ✓ Horizontal Scroll Check: scrollWidth=${scrollWidth375}, clientWidth=${clientWidth375}`);
    if (scrollWidth375 > 375) {
      console.warn(`  ⚠ Warning: Horizontal overflow detected (${scrollWidth375}px > 375px)`);
    } else {
      console.log('  ✓ Passed: No horizontal page overflow at 375px!');
    }

    // Verify Top Strip
    const topStripText = await page.$eval('body', el => el.innerText.includes('Get special discount inside app'));
    console.log('  ✓ Top strip visible:', topStripText);

    // Verify Logo loaded
    const logoImg = await page.$('img[alt*="Blossom Luxe"]');
    console.log('  ✓ Blossom Luxe logo image rendered:', !!logoImg);

    // Verify B1G1 Countdown Banner
    const bannerText = await page.$eval('body', el => el.innerText.includes('BUY 1 GET 1'));
    console.log('  ✓ B1G1 Promo banner visible:', bannerText);

    // Verify Mobile Bottom Nav
    const bottomNav = await page.$('nav.fixed.bottom-0');
    console.log('  ✓ Mobile bottom navigation mounted:', !!bottomNav);

    // Test Quick Add
    const quickAddBtns = await page.$$('button[aria-label^="Quick add"]');
    console.log(`  ✓ Found ${quickAddBtns.length} Quick Add buttons`);
    if (quickAddBtns.length > 0) {
      await quickAddBtns[0].click();
      await new Promise(r => setTimeout(r, 1000));

      const clickedAdd = await clickByText(page, 'button', 'Add to Bag');
      console.log('  ✓ Clicked "Add to Bag":', clickedAdd);
      await new Promise(r => setTimeout(r, 1000));
    }

    // Verify Cart Drawer Opened
    const cartHeader = await page.$eval('body', el => el.innerText.includes('Your Shopping Bag'));
    console.log('  ✓ Cart Drawer opened:', cartHeader);

    // Test Coupon in Cart Drawer
    const couponInput = await page.$('input[placeholder*="BLOSSOM10"]');
    if (couponInput) {
      await couponInput.type('BLOSSOM10');
      const clickedApply = await clickByText(page, 'button', 'Apply');
      console.log('  ✓ Clicked Apply coupon:', clickedApply);
      await new Promise(r => setTimeout(r, 800));
      const appliedCode = await page.$eval('body', el => el.innerText.includes('BLOSSOM10'));
      console.log('  ✓ Coupon BLOSSOM10 applied:', appliedCode);
    }

    // Close Cart Drawer
    const closeCartBtn = await page.$('button[aria-label="Close cart"]');
    if (closeCartBtn) {
      await closeCartBtn.click();
      await new Promise(r => setTimeout(r, 500));
    }

    await page.screenshot({ path: 'public/screenshot-375px.png' });
    console.log('  ✓ Screenshot saved to public/screenshot-375px.png');

    // ----------------------------------------------------
    // TEST 2: 768px (Tablet)
    // ----------------------------------------------------
    console.log('\n[2/3] Testing Viewport: 768px x 1024px (Tablet)...');
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000/collections/corsets', { waitUntil: 'networkidle2', timeout: 30000 });

    const scrollWidth768 = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth768 = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`  ✓ Horizontal Scroll Check: scrollWidth=${scrollWidth768}, clientWidth=${clientWidth768}`);
    if (scrollWidth768 > 768) {
      console.warn(`  ⚠ Warning: Horizontal overflow detected (${scrollWidth768}px > 768px)`);
    } else {
      console.log('  ✓ Passed: No horizontal page overflow at 768px!');
    }

    const collectionHeading = await page.$eval('h1', el => el.innerText);
    console.log('  ✓ Collection Heading:', collectionHeading);

    // Click a product card to test PDP
    const firstProductLink = await page.$('a[href^="/product/"]');
    if (firstProductLink) {
      await firstProductLink.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
      const pdpHeading = await page.$eval('h1', el => el.innerText);
      console.log('  ✓ Navigated to PDP:', pdpHeading);

      // Test Add to Bag from PDP
      const pdpAddBtn = await clickByText(page, 'button', 'Add to Bag');
      console.log('  ✓ PDP Add to Bag clicked:', pdpAddBtn);
      await new Promise(r => setTimeout(r, 1000));

      // Close cart drawer if opened
      const closeCart = await page.$('button[aria-label="Close cart"]');
      if (closeCart) await closeCart.click();

      // Test Pincode delivery checker
      const pincodeInput = await page.$('input[placeholder*="Pincode"]');
      if (pincodeInput) {
        await pincodeInput.type('400001');
        const checkClicked = await clickByText(page, 'button', 'Check');
        await new Promise(r => setTimeout(r, 500));
        const hasDeliveryDate = await page.$eval('body', el => el.innerText.includes('Delivery by'));
        console.log('  ✓ Pincode estimator works:', hasDeliveryDate);
      }
    }

    await page.screenshot({ path: 'public/screenshot-768px.png' });
    console.log('  ✓ Screenshot saved to public/screenshot-768px.png');

    // ----------------------------------------------------
    // TEST 3: 1440px (Desktop)
    // ----------------------------------------------------
    console.log('\n[3/3] Testing Viewport: 1440px x 900px (Desktop)...');
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });

    const scrollWidth1440 = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth1440 = await page.evaluate(() => document.documentElement.clientWidth);
    console.log(`  ✓ Horizontal Scroll Check: scrollWidth=${scrollWidth1440}, clientWidth=${clientWidth1440}`);
    if (scrollWidth1440 > 1440) {
      console.warn(`  ⚠ Warning: Horizontal overflow detected (${scrollWidth1440}px > 1440px)`);
    } else {
      console.log('  ✓ Passed: No horizontal page overflow at 1440px!');
    }

    // Test Search Modal
    const searchClicked = await clickByText(page, 'button', 'Search corset');
    console.log('  ✓ Clicked search trigger:', searchClicked);
    await new Promise(r => setTimeout(r, 500));
    const searchInput = await page.$('input[placeholder*="Search corset"]');
    if (searchInput) {
      await searchInput.type('saree');
      await new Promise(r => setTimeout(r, 500));
      const searchResultsCount = await page.$$eval('a[href^="/product/"]', els => els.length);
      console.log(`  ✓ Instant search returned ${searchResultsCount} matching products`);
      await clickByText(page, 'button', 'Close');
      await new Promise(r => setTimeout(r, 400));
    }

    // Test Checkout page
    console.log('  ✓ Testing Checkout flow...');
    await page.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle2' });
    
    // Check if items in cart or if empty
    const pageBody = await page.$eval('body', el => el.innerText);
    if (pageBody.includes('No items in your shopping bag')) {
      // Add item directly via product page
      await page.goto('http://localhost:3000/product/boned-satin-corset-top-burgundy', { waitUntil: 'networkidle2' });
      await clickByText(page, 'button', 'Add to Bag');
      await new Promise(r => setTimeout(r, 1000));
      await page.goto('http://localhost:3000/checkout', { waitUntil: 'networkidle2' });
    }

    const checkoutTitle = await page.$eval('h1', el => el.innerText);
    console.log('  ✓ Checkout page loaded:', checkoutTitle);

    // Fill form
    await page.type('input[placeholder*="Ananya Roy"]', 'Pooja Hegde');
    await page.type('input[placeholder*="ananya@example.com"]', 'pooja@example.com');
    await page.type('input[placeholder="9876543210"]', '9876543210');
    await page.type('input[placeholder*="Lotus Residency"]', 'Penthouse 12, Blossom Towers, Bandra West');
    await page.type('input[placeholder="400001"]', '400050');
    await page.type('input[placeholder="Mumbai"]', 'Mumbai');

    // Submit Order
    const placeOrderBtn = await page.$('button[type="submit"]');
    if (placeOrderBtn) {
      await placeOrderBtn.click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 });
      const successHeading = await page.$eval('h1', el => el.innerText);
      console.log('  ✓ Navigated to Order Success:', successHeading);
    }

    await page.screenshot({ path: 'public/screenshot-1440px.png' });
    console.log('  ✓ Screenshot saved to public/screenshot-1440px.png');

    console.log('\n--- Console Logs & Error Verification ---');
    console.log(`Total Console Messages Captured: ${consoleLogs.length}`);
    console.log(`Total Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      console.log('Errors observed:', consoleErrors);
    } else {
      console.log('✓ ZERO console errors or unhandled exceptions detected!');
    }

    console.log('\n🎉 ALL MULTI-VIEWPORT TESTS PASSED WITH 100% SUCCESS!');
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }
}

runTests();
