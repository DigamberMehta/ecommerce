const express = require('express');
const router = express.Router();
const passport = require('passport');

// Route to initiate Google authentication
router.get('/google', (req, res, next) => {
  console.log('Initiating Google Authentication');
  next();
}, passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback route after Google authentication
router.get('/google/callback', 
  (req, res, next) => {
    console.log('Google Authentication Callback');
    next();
  },
  passport.authenticate('google', { 
    failureRedirect: '/login', 
    failureFlash: true 
  }),
  (req, res) => {
    if (req.flash('error').length > 0) {
      console.log('Authentication Failed:', req.flash('error'));
      res.redirect('/login');
    } else {
      console.log('Authentication Successful');
      res.redirect('/home');
    }
  }
);

module.exports = router;
