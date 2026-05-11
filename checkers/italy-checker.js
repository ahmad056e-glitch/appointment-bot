const { chromium } = require('playwright');
const { sendAlert } = require('../utils/alert');

async function checkItaly() {
  console.log('Checking Italy...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://www.intianaitalyvisa.com/');
    await page.fill('#email', process.env.ITALY_USERNAME);
    await page.fill('#password', process.env.ITALY_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    const slots = await page.$$('.slot-available');

    if (slots.length > 0) {
      const text = await slots[0].innerText();
      await sendAlert(`🇮🇹 ITALY SLOT AVAILABLE: ${text} — https://www.intianaitalyvisa.com/`);
    } else {
      console.log('Italy: No slots available');
    }
  } catch (err) {
    console.error('Italy check failed:', err.message);
  } finally {
    await browser.close();
  }
}

module.exports = { checkItaly };
