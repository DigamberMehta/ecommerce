const express = require('express');
const router = express.Router();
const browsingHistoryController = require('../controllers/browsingHistoryController');

// Route to get browsing history for the logged-in user
router.get('/browsing-history', browsingHistoryController.getBrowsingHistory);

module.exports = router;
