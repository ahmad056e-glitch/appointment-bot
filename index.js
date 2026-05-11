require('dotenv').config();
const { checkSpain } = require('./checkers/spain-checker');
const { checkGermany } = require('./checkers/germany-checker');
const { checkItaly } = require('./checkers/italy-checker');

const INTERVAL = 5 * 60 * 1000; // 5 minutes

async function runAllChecks() {
  console.log(`[${new Date().toISOString()}] Running all checks...`);
  if (process.env.SPAIN_USERNAME) await checkSpain();
  if (process.env.GERMANY_USERNAME) await checkGermany();
  if (process.env.ITALY_USERNAME) await checkItaly();
}

runAllChecks();
setInterval(runAllChecks, INTERVAL);
