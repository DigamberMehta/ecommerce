const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review'); // Import the Review model
const UserInteraction = require('../models/userInteraction');
const { isLoggedIn } = require('../middleware');

function camelCaseToTitleCase(camelCase) {
    return camelCase
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, function(str) { return str.toUpperCase(); }); // Capitalize the first letter
}

router.get('/products/:id/:slug', async (req, res) => {
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

        // Log product view
        if (req.user) {
            await UserInteraction.create({
                user: req.user._id,
                product: product._id,
                action: 'view',
                category: product.categories[0]
            });
        }

        let recommendedProducts = [];

        if (req.isAuthenticated()) {
            const userId = req.user._id;
            const interactions = await UserInteraction.find({ user: userId });

            const viewedCategories = interactions
                .filter(interaction => interaction.action === 'view')
                .map(interaction => interaction.category);

            const searchedCategories = interactions
                .filter(interaction => interaction.action === 'search')
                .map(interaction => interaction.category);

            const addedToCartCategories = interactions
                .filter(interaction => interaction.action === 'add_to_cart')
                .map(interaction => interaction.category);

            const allCategories = [...viewedCategories, ...searchedCategories, ...addedToCartCategories];
            const uniqueCategories = [...new Set(allCategories)];

            recommendedProducts = await Product.find({ categories: { $in: uniqueCategories } });
        }

        res.render('home/show', { product, recommendedProducts, camelCaseToTitleCase });
    } catch (error) {
        console.error(error);
        req.flash('error', 'An error occurred. Please try again.');
        res.redirect('/'); // Redirect to a safe page on error
    }
});

router.post('/buy-now', isLoggedIn, async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        // Redirect to checkout page with product details
        res.redirect(`/checkout?productId=${productId}&quantity=${quantity}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});





module.exports = router;
