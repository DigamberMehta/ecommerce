const nodemailer = require('nodemailer');
require('dotenv').config();
console.log("GMAIL_USER", process.env.GMAIL_USER);
console.log("GMAIL_PASS", process.env.GMAIL_PASS);
const transporter = nodemailer.createTransport({

  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const sendPasswordResetEmail = async (to, token) => {
  const resetUrl = `http://localhost:3000/reset/${token}`;
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: 'Password Reset',
    text: `You requested a password reset. Click the following link to reset your password: ${resetUrl}`,
    html: `<p>You requested a password reset. Click the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    if (error.response) {
      console.error('SMTP response:', error.response);
    }
    if (error.message) {
      console.error('Error message:', error.message);
    }
    if (error.code) {
      console.error('Error code:', error.code);
    }
  }
};

module.exports = { sendPasswordResetEmail };
