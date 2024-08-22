const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Correct path to your Product model
const { recommendProducts, saveRecommendations } = require('../recommendation');

// Route to generate and display recommendations
router.get('/recommendations', async (req, res) => {
    try {
        const userId = req.user._id; // Assuming the user is authenticated
        const recommendedProductIds = await recommendProducts(userId);

        console.log('Recommended Product IDs:', recommendedProductIds);

        // Save the recommendations in the database
        await saveRecommendations(userId, recommendedProductIds);

        // Fetch the recommended products from the database for display
        const recommendedProducts = await Product.find({ _id: { $in: recommendedProductIds } });

        console.log('Recommended Products:', recommendedProducts);

        res.render('recommendations', { products: recommendedProducts });
    } catch (error) {
        console.error('Error generating recommendations:', error);
        res.status(500).send('An error occurred while generating recommendations.');
    }
});

module.exports = router;
