const express = require('express');
const router = express.Router();
const { savedRedirectUrl } = require('../middleware');
const userController = require('../controllers/userController');

// Render signup page
router.get('/signup', userController.renderSignup);

// Handle signup logic
router.post('/signup', userController.signup);

// Render login page
router.get('/login', userController.renderLogin);

// Handle login logic
router.post('/login', savedRedirectUrl, userController.login);

// Render profile page
router.get('/profile', userController.renderProfile);

// Update user profile
router.post('/profile', userController.updateProfile);

// Reset password
router.post('/profile/reset-password', userController.resetPassword);

// Handle logout
router.get('/logout', userController.logout);

module.exports = router;
