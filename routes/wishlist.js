const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');
const Product = require('../models/product');
const User = require('../models/user');

// Add product to wishlist
router.post('/wishlist/add', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'You must be logged in to add items to your wishlist.' });
    }

    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id });
        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user._id, products: [] });
        }

        if (!wishlist.products.includes(req.body.productId)) {
            wishlist.products.push(req.body.productId);
            await wishlist.save();
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while adding the product to your wishlist.' });
    }
});

// Remove product from wishlist
router.post('/wishlist/remove', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'You must be logged in to remove items from your wishlist.' });
    }

    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id });
        if (wishlist) {
            wishlist.products = wishlist.products.filter(productId => productId.toString() !== req.body.productId);
            await wishlist.save();
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while removing the product from your wishlist.' });
    }
});
// Get user's wishlist products
router.get('/wishlist', async (req, res) => {
    if (!req.user) {
        return res.status(401).send('You must be logged in to view your wishlist.');
    }

    try {
        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
        if (!wishlist) {
            return res.render('wishlist', { products: [] }); // Handle case where there is no wishlist yet
        }
        // console.log(wishlist.products);
        res.render('user/wishlist', { products: wishlist.products });
    } catch (error) {
        res.status(500).send('An error occurred while retrieving the wishlist.');
    }
});


module.exports = router;
