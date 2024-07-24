const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const showController = require('../controllers/showController');

// Show product details
router.get('/products/:id/:slug', showController.showProduct);

// Handle buy now functionality


module.exports = router;
