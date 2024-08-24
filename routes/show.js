const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const Wishlist = require('../models/wishlist');
const UserInteraction = require('../models/UserInteraction');

router.get('/products/:id/:slug', async (req, res) => {
    try {
        const { id, slug } = req.params;
        const product = await Product.findOne({ _id: id, slug: slug })
            .populate({
                path: 'reviews',
                populate: {
                    path: 'user',
                    select: 'name'
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

            // Handle user interaction for product view
            const existingInteraction = await UserInteraction.findOne({
                user: req.user._id,
                product: product._id,
                action: 'view'
            });

            const currentTime = new Date();

            if (existingInteraction) {
                // Update entryTime if the user returns to the page
                existingInteraction.entryTime = currentTime; // Set entryTime to current time for new session
                existingInteraction.exitTime = null; // Reset exitTime for a new session

                console.log(`Updating existing interaction entry time:`, existingInteraction); // Debugging

                await existingInteraction.save();
            } else {
                // Create a new interaction if none exists
                const newInteraction = await UserInteraction.create({
                    user: req.user._id,
                    product: product._id,
                    action: 'view',
                    entryTime: currentTime, // Set entry time to current time
                    exitTime: null, // No exit time yet
                    duration: 0 // Initial duration is 0
                });

                console.log(`Created new interaction for product view:`, newInteraction); // Debugging
            }
        }

        res.render('home/show', { 
            product, 
            isInWishlist,
            request: req,
            camelCaseToTitleCase: (str) => str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); })
        });
    } catch (error) {
        console.error('Error in product view route:', error);
        req.flash('error', 'An error occurred. Please try again.');
        res.redirect('/');
    }
});

router.post('/products/entry', isLoggedIn, async (req, res) => {
    const { productId, entryTime } = req.body;

    try {
        const userId = req.user._id;
        const interaction = await UserInteraction.findOne({
            user: userId,
            product: productId,
            action: 'view'
        });

        if (interaction) {
            interaction.entryTime = new Date(entryTime); // Update entry time to the current time

            console.log(`Updating interaction with new entry time:`, interaction); // Debugging

            await interaction.save();
        }

        res.status(200).json({ success: true, message: 'Entry time updated successfully.' });
    } catch (error) {
        console.error('Error recording entry time:', error);
        res.status(500).json({ success: false, message: 'An error occurred while recording entry time.' });
    }
});
router.post('/products/exit', isLoggedIn, async (req, res) => {
    const { productId, exitTime } = req.body;

    try {
        const userId = req.user._id;
        const interaction = await UserInteraction.findOne({
            user: userId,
            product: productId,
            action: 'view'
        });

        if (interaction) {
            const exitDate = new Date(exitTime);

            if (interaction.entryTime) {
                const viewingDuration = (exitDate - interaction.entryTime) / 1000; // Duration in seconds
                interaction.duration += viewingDuration; // Accumulate total viewing duration
            }

            interaction.exitTime = exitDate; // Set exit time to the current time

            console.log(`Updating interaction with exit time:`, interaction); // Debugging

            await interaction.save();
        }

        res.status(200).json({ success: true, message: 'Exit time recorded successfully.' });
    } catch (error) {
        console.error('Error recording exit time:', error);
        res.status(500).json({ success: false, message: 'An error occurred while recording exit time.' });
    }
});



module.exports = router;
