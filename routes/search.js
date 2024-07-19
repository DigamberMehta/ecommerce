const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Fuse = require('fuse.js');

router.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.query || '';
    const suggestions = req.query.suggestions === 'true';

    if (suggestions) {
      if (searchTerm.length < 3) {
        return res.json([]);
      }
      const products = await Product.find({}, 'title slug images sellingPrice');
      const fuse = new Fuse(products, {
        keys: ['title'],
        includeScore: true,
        threshold: 0.3
      });
      const results = fuse.search(searchTerm).map(result => result.item);
      return res.json(results.slice(0, 5));
    } else {
      const products = await Product.find();
      const fuse = new Fuse(products, {
        keys: ['title'],
        includeScore: true,
        threshold: 0.3
      });
      const results = fuse.search(searchTerm).map(result => result.item);
      return res.render('home/searchResult', { products: results, query: searchTerm });
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
