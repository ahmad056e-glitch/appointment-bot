const { chromium } = require('playwright');
const { sendAlert } = require('../utils/alert');

async function checkGermany() {
  console.log('Checking Germany...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://visa.vfsglobal.com/pak/en/deu');
    await page.fill('#email', process.env.GERMANY_USERNAME);
    await page.fill('#password', process.env.GERMANY_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    const slots = await page.$$('.slot-available');

    if (slots.length > 0) {
      const text = await slots[0].innerText();
      await sendAlert(`🇩🇪 GERMANY SLOT AVAILABLE: ${text} — https://visa.vfsglobal.com/pak/en/deu`);
    } else {
      console.log('Germany: No slots available');
    }
  } catch (err) {
    console.error('Germany check failed:', err.message);
  } finally {
    await browser.close();
  }
}

module.exports = { checkGermany };
