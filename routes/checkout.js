const express = require('express');
const router = express.Router();
const { isLoggedIn, setBackUrl } = require('../middleware');
const checkoutController = require('../controllers/checkoutController');

// Route to handle checkout
router.get('/checkout', isLoggedIn, setBackUrl, checkoutController.checkout);

module.exports = router;
