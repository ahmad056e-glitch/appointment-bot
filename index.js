require('dotenv').config();
const { checkSpain } = require('./checkers/spain-checker');
const { checkGermany } = require('./checkers/germany-checker');
const { checkItaly } = require('./checkers/italy-checker');

const INTERVAL = 5 * 60 * 1000; // 5 minutes

async function runAllChecks() {
  console.log(`[${new Date().toISOString()}] Running all checks...`);
  await checkSpain();
  await checkGermany();
  await checkItaly();
}

runAllChecks();
setInterval(runAllChecks, INTERVAL);
