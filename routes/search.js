const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Route to handle search functionality
router.get('/search', searchController.search);

module.exports = router;
