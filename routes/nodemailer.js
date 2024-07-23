const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const forgotPasswordController = require('../controllers/forgotPasswordController');

// Route to render forgot password page
router.get('/forgot', forgotPasswordController.renderForgotPassword);

// Route to handle forgot password logic
router.post('/forgot', wrapAsync(forgotPasswordController.handleForgotPassword));

// Route to render reset password page
router.get('/reset/:token', wrapAsync(forgotPasswordController.renderResetPassword));

// Route to handle reset password logic
router.post('/reset/:token', wrapAsync(forgotPasswordController.handleResetPassword));

module.exports = router;
