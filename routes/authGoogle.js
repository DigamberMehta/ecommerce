const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

// Route to initiate Google authentication
router.get('/google', authController.initiateGoogleAuth, passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Callback route after Google authentication
router.get('/google/callback', 
  authController.googleAuthCallback,
  passport.authenticate('google', { 
    failureRedirect: '/login', 
    failureFlash: true 
  }),
  authController.handleAuthResult
);

module.exports = router;
