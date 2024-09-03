const crypto = require('crypto');
const User = require('../models/user');
const { sendPasswordResetEmail } = require('../utils/nodemailer');

// Render forgot password page
exports.renderForgotPassword = (req, res) => {
  res.render('auth/forgot');
};

// Handle forgot password logic
exports.handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  const lowerCaseEmail = email.toLowerCase(); // Convert email to lowercase
  const user = await User.findOne({ email: lowerCaseEmail });

  if (!user) {
    req.flash('error', 'No account with that email found.');
    return res.redirect('/forgot');
  }

  const token = crypto.randomBytes(20).toString('hex');
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();
  await sendPasswordResetEmail(user.email, token);

  req.flash('success', 'An email has been sent with further instructions.');
  res.redirect('/forgot');
};

// Render reset password page
exports.renderResetPassword = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    req.flash('error', 'Password reset token is invalid or has expired.');
    return res.redirect('/forgot');
  }

  res.render('auth/reset', { token });
};

// Handle reset password logic
exports.handleResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    req.flash('error', 'Password reset token is invalid or has expired.');
    return res.redirect('/forgot');
  }

  user.setPassword(password, async (err) => {
    if (err) {
      req.flash('error', 'Failed to reset password.');
      return res.redirect('/forgot');
    }

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    req.login(user, (err) => {
      if (err) {
        req.flash('error', 'Failed to login after password reset.');
        return res.redirect('/login');
      }

      req.flash('success', 'Password has been reset successfully!');
      res.redirect('/home');
    });
  });
};
