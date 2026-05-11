const { chromium } = require('playwright');
const { sendAlert } = require('../utils/alert');

async function checkSpain() {
  console.log('Checking Spain...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto('https://thespainvisa.com/');
    await page.fill('#email', process.env.SPAIN_USERNAME);
    await page.fill('#password', process.env.SPAIN_PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);

    // Check available slots
    const slots = await page.$$('.appointment-slot.available');
    
    if (slots.length > 0) {
      const text = await slots[0].innerText();
      await sendAlert(`🇪🇸 SPAIN SLOT AVAILABLE: ${text} — https://thespainvisa.com/`);
    } else {
      console.log('Spain: No slots available');
    }
  } catch (err) {
    console.error('Spain check failed:', err.message);
  } finally {
    await browser.close();
  }
}

module.exports = { checkSpain };
