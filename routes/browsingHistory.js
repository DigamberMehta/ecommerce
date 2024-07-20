const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Product = require('../models/product');

// Route to get browsing history for the logged-in user
router.get('/browsing-history', async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const user = await User.findById(req.user._id).populate('browsingHistory.product');
        const browsingHistory = user.browsingHistory
            .sort((a, b) => b.viewedAt - a.viewedAt) // Sort by viewedAt descending
            .map(item => ({
                productId: item.product._id,
                title: item.product.title,
                image: item.product.images[0], // Assuming the first image is the main image
                description: item.product.description
            }));

        res.json(browsingHistory);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
