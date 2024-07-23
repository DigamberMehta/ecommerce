const User = require('../models/user');

// Get browsing history for the logged-in user
exports.getBrowsingHistory = async (req, res) => {
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
};
