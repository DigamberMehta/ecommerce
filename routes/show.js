const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const Wishlist = require('../models/wishlist');
const UserInteraction = require('../models/UserInteraction');

router.get('/products/:id/:slug', isLoggedIn, async (req, res) => {
    try {
        const { id, slug } = req.params;

        // Populate reviews and their user field
        const product = await Product.findOne({ _id: id, slug: slug })
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name' // Adjust this if you need more fields from the User model
                }
            });

        if (!product) {
            return res.status(404).send('Product not found');
        }


        // Check if the product is in the user's wishlist
        let isInWishlist = false;
        if (req.isAuthenticated()) {
            const wishlist = await Wishlist.findOne({ user: req.user._id });
            if (wishlist) {
                isInWishlist = wishlist.products.some(item => item.product.toString() === product._id.toString());
            }
        }

        // Render the product detail page
        res.render('home/show', { 
            product, 
            isInWishlist,
            request: req,
            camelCaseToTitleCase: (str) => str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); })
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred. Please try again.');
        res.redirect('/');
    }
});

module.exports = router;
