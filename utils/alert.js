const nodemailer = require('nodemailer');

async function sendAlert(message) {
  console.log('ALERT:', message);
  await sendEmail(message);
}

async function sendEmail(message) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: process.env.ALERT_EMAIL,
    subject: '🚨 URGENT: Visa Slot Available!',
    text: message,
  });

  console.log('Email sent!');
}

module.exports = { sendAlert };
