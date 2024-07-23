// const User = require('../models/user');
// const wrapAsync = require('../utils/wrapAsync');
// const passport = require('passport');

// // Render signup page
// exports.renderSignup = (req, res) => {
//   res.render('auth/signup');
// };

// // Handle signup logic
// exports.signup = wrapAsync(async (req, res, next) => {
//   try {
//     let { email, name, phone, password } = req.body;

//     email = email.toLowerCase().trim();
//     name = name.trim();
//     phone = phone.trim();

//     const user = new User({ email, name, phone });
//     const registeredUser = await User.register(user, password);

//     req.login(registeredUser, err => {
//       if (err) {
//         return next(err);
//       }
//       res.redirect('/home');
//     });
//   } catch (e) {
//     req.flash('error', e.message);
//     res.redirect('/signup');
//   }
// });

// // Render login page
// exports.renderLogin = (req, res) => {
//   res.render('auth/login');
// };

// // Handle login logic
// exports.login = [
//   passport.authenticate('custom', {
//     failureRedirect: '/login',
//     failureFlash: true
//   }),
//   async (req, res) => {
//     req.flash('success', `Welcome back, ${req.user.name}!`);

//     if (res.locals.redirectUrl === '/cart/quantity') {
//       res.redirect('/');
//     } else {
//       res.redirect(res.locals.redirectUrl || '/');
//     }
//   }
// ];

// // Render profile page
// exports.renderProfile = wrapAsync(async (req, res) => {
//   if (!req.isAuthenticated()) {
//     req.flash('error', 'You need to be logged in to view this page.');
//     return res.redirect('/login');
//   }

//   const user = await User.findById(req.user._id);
//   res.render('profile', { user });
// });

// // Update user profile
// exports.updateProfile = wrapAsync(async (req, res) => {
//   if (!req.isAuthenticated()) {
//     req.flash('error', 'You need to be logged in to perform this action.');
//     return res.redirect('/login');
//   }

//   const { name, phone, email, password } = req.body;
//   const user = await User.findById(req.user._id);

//   if (!password) {
//     req.flash('error', 'Password is required to update profile.');
//     return res.redirect('/profile');
//   }

//   user.authenticate(password, async (err, authenticatedUser, passwordErr) => {
//     if (passwordErr || !authenticatedUser) {
//       req.flash('error', 'Incorrect password.');
//       return res.redirect('/profile');
//     }

//     if (name) user.name = name;
//     if (phone) user.phone = phone;
//     if (email) user.email = email;

//     await user.save();
//     req.flash('success', 'Profile updated successfully.');
//     res.redirect('/profile');
//   });
// });

// // Reset password
// exports.resetPassword = wrapAsync(async (req, res) => {
//   if (!req.isAuthenticated()) {
//     req.flash('error', 'You need to be logged in to perform this action.');
//     return res.redirect('/login');
//   }

//   const { oldPassword, newPassword } = req.body;
//   const user = await User.findById(req.user._id);

//   user.authenticate(oldPassword, async (err, thisModel, passwordErr) => {
//     if (passwordErr) {
//       req.flash('error', 'Incorrect old password.');
//       return res.redirect('/profile');
//     }

//     user.setPassword(newPassword, async (err) => {
//       if (err) {
//         req.flash('error', 'Error resetting password.');
//         return res.redirect('/profile');
//       }

//       await user.save();
//       req.flash('success', 'Password reset successfully.');
//       res.redirect('/profile');
//     });
//   });
// });

// // Handle logout
// exports.logout = (req, res, next) => {
//   const user = req.user.name;
//   req.logout(err => {
//     if (err) return next(err);
//     req.flash('success', `Logout from, ${user}!`);
//     res.redirect('/home');
//   });
// };
