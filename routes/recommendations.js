const express = require('express');
const router = express.Router();
const { recommendCollaborativeProducts, saveCollaborativeRecommendations } = require('../services/collaborative'); // Adjust path as necessary
const { recommendContentBasedProducts, saveContentBasedRecommendations } = require('../services/content-based'); // Adjust path as necessary
const { isLoggedIn } = require('../middleware'); // Middleware for checking if user is logged in

// Collaborative Filtering Recommendations Route
router.get('/collaborative', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is stored in req.user
    const recommendedProductIds = await recommendCollaborativeProducts(userId);
    
    // Optionally save recommendations to the database
    await saveCollaborativeRecommendations(userId, recommendedProductIds);

    // Render the EJS template for collaborative recommendations
    res.render('recommendations/collaborative', { recommendedProducts: recommendedProductIds });
  } catch (error) {
    console.error('Error generating collaborative recommendations:', error);
    req.flash('error', 'Failed to generate collaborative recommendations.');
    res.redirect('/');
  }
});

// Content-Based Filtering Recommendations Route
router.get('/content-based', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user is stored in req.user
    const recommendedProductIds = await recommendContentBasedProducts(userId);
    
    // Optionally save recommendations to the database
    await saveContentBasedRecommendations(userId, recommendedProductIds);

    // Render the EJS template for content-based recommendations
    res.render('recommendations/content-based', { recommendedProducts: recommendedProductIds });
  } catch (error) {
    console.error('Error generating content-based recommendations:', error);
    req.flash('error', 'Failed to generate content-based recommendations.');
    res.redirect('/');
  }
});

module.exports = router;
