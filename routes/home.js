const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Route to handle rendering the home page and product recommendations
router.get('/home', homeController.renderHomePage);

module.exports = router;
