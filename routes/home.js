const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Route to handle rendering the home page and product recommendations
router.get('/home', async (req, res) => {
  try {
    const products = await Product.find();
    
    // If you still want to recommend products, you can implement a different logic here
    let recommendedProducts = []; // Empty array or any other logic you want to use

    res.render('home/home', { products, recommendedProducts });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
