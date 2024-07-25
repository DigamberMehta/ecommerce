// routes/contact.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/contact', (req, res) => {
    res.render('about/ContactUs');
    });

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Email to the admin
  const adminMailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New message from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    html: `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  // Confirmation email to the user
  const userMailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Your contact request has been received',
    text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nThe Team`,
    html: `
      <h2>Contact Request Received</h2>
      <p>Hi ${name},</p>
      <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
      <p>Best regards,<br>Urban Mart</p>
    `,
  };

  // Send email to the admin
  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.error(error);
      req.flash('error', 'Something went wrong. Please try again later.');
      return res.redirect('/contact');
    } else {
      // Send confirmation email to the user
      transporter.sendMail(userMailOptions, (error, info) => {
        if (error) {
          console.error(error);
          req.flash('error', 'Something went wrong. Please try again later.');
        } else {
          req.flash('success', 'Your message has been sent successfully!');
        }
        res.redirect('/contact');
      });
    }
  });
});

module.exports = router;
