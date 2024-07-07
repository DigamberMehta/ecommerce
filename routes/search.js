const express = require('express');
const router = express.Router();
const Product = require("../models/product");
const Fuse = require('fuse.js');

router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.q || '';
    const suggestions = req.query.suggestions === 'true';

    const products = await Product.find();
    const searchResults = searchProducts(products, searchTerm);

    if (suggestions) {
      res.json(searchResults.slice(0, 5));
    } else {
      res.render('home/searchResult', { products: searchResults, query: searchTerm });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error: Unable to search products');
  }
});

function searchProducts(products, searchTerm) {
  const fuse = new Fuse(products, {
    keys: ['title', 'slug', 'categories'],
    includeScore: true,
    threshold: 0.3
  });

  return fuse.search(searchTerm).map(result => result.item);
}

module.exports = router;