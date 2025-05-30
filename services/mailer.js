
const nodemailer = require("nodemailer");

// Configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD, // Use App Password here
  },
});

// Function to send mail
const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Aarav Poudel" <poudelaarav@gmail.com>',
      to: to,
      subject: subject,
      html: html,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email", err);
  }
};

module.exports = sendMail;



