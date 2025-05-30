// mailer.js or inside your route/controller
const nodemailer = require("nodemailer");

// Configure transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'poudelaarav@gmail.com',
    pass: 'ggg', // Use App Password here
  },
});

// Function to send mail
const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Your Name" <yourgmail@gmail.com>',
      to: to,
      subject: subject,
      html: html,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email", err);
  }
};

sendMail('aaravpoudel.pinnov@gmail.com',"Hello From AARAV","HELLO FROM THIS")

module.exports = sendMail;