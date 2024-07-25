const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const UserInteraction = require('../models/userInteraction');

// Route to handle rendering the home page and product recommendations
router.get('/home', async (req, res) => {
  try {
    const products = await Product.find();
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

    res.render('home/home', { products, recommendedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
