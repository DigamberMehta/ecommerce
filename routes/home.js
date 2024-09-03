const express = require('express');
const router = express.Router();
const Product = require('../models/product');


// Route to handle rendering the home page at '/'
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    
    res.render('home/home', { products});
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



module.exports = router;
