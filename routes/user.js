const express = require('express');
const router = express.Router();
const { savedRedirectUrl } = require('../middleware');
const User = require('../models/user');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');

// Render signup page
router.get("/signup", (req, res) => {
    res.render("auth/signup");
  });
  router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
      // Extract data from the request body
      let { email, name, phone, password } = req.body;
  
      // Debugging: Log original data
      console.log("Original data:", { email, name, phone, password });
  
      // Convert email to lowercase and trim extra spaces
      email = email.toLowerCase().trim();
      name = name.trim();
      phone = phone.trim();
  
      // Debugging: Log processed data
      console.log("Processed data:", { email, name, phone });
  
      // Create a new User instance
      const user = new User({ email, name, phone });
      console.log("Created user instance:", user);
  
      // Register the user
      const registeredUser = await User.register(user, password);
      console.log("Registered user:", registeredUser);
  
      // Log in the user
      req.login(registeredUser, err => {
        if (err) {
          console.error("Login error:", err);
          return next(err);
        }
        console.log("User logged in successfully");
        res.redirect("/home");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }));
  
  
  router.get("/login", (req, res) => {
    res.render("auth/login");
  });
  
  router.post(
    "/login", savedRedirectUrl,
    passport.authenticate('custom', {
      failureRedirect: "/login",
      failureFlash: true // Ensure this is configured if using connect-flash for messages
      
    }),
    async (req, res) => {
      req.flash("success", `Welcome back, ${req.user.name}!`);
  
      // Check if the redirect URL is /cart/quantity
      if (res.locals.redirectUrl === "/cart/quantity") {
        res.redirect("/");
      } else {
        // If no specific redirect URL is set, redirect to the root
        res.redirect(res.locals.redirectUrl || "/");
      }
    }
  );
  
  
  
  
  router.get("/logout", (req, res, next) => {
    let user = req.user.name;
    req.logout((err) => {
      if (err) return next(err);
      req.flash("success", `Logout from, ${user}!`);
      res.redirect("/home");
    });
  });
// Render profile page
router.get('/profile', wrapAsync(async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You need to be logged in to view this page.');
    return res.redirect('/login');
  }
  const user = await User.findById(req.user._id);
  res.render('profile', { user }); 
}));

// Update user profile
router.post('/profile', wrapAsync(async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You need to be logged in to perform this action.');
    return res.redirect('/login');
  }
  const { name, phone, email, password } = req.body;
  const user = await User.findById(req.user._id);

  if (!password) {
    req.flash('error', 'Password is required to update profile.');
    return res.redirect('/profile');
  }

  user.authenticate(password, async (err, authenticatedUser, passwordErr) => {
    if (passwordErr || !authenticatedUser) {
      req.flash('error', 'Incorrect password.');
      return res.redirect('/profile');
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (email) user.email = email;

    await user.save();
    req.flash('success', 'Profile updated successfully.');
    res.redirect('/profile');
  });
}));

// Reset password
router.post('/profile/reset-password', wrapAsync(async (req, res) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You need to be logged in to perform this action.');
    return res.redirect('/login');
  }

  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);

  user.authenticate(oldPassword, async (err, thisModel, passwordErr) => {
    if (passwordErr) {
      req.flash('error', 'Incorrect old password.');
      return res.redirect('/profile');
    }

    user.setPassword(newPassword, async (err) => {
      if (err) {
        req.flash('error', 'Error resetting password.');
        return res.redirect('/profile');
      }

      await user.save();
      req.flash('success', 'Password reset successfully.');
      res.redirect('/profile');
    });
  });
}));

// Handle logout


module.exports = router;
