const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Fuse = require('fuse.js');

// Route to handle search suggestions
router.get('/search/suggestions', async (req, res) => {
    try {
        const searchTerm = req.query.query || '';

        if (searchTerm.length < 1) {
            return res.json([]);
        }
        const products = await Product.find({}, 'title slug images sellingPrice brand');
        const fuse = new Fuse(products, {
            keys: ['title', 'brand'],
            includeScore: true,
            threshold: 0.3
        });
        const results = fuse.search(searchTerm).map(result => result.item);
        return res.json(results.slice(0, 5));
    } catch (err) {
        return res.status(500).send('Server Error');
    }
});

// Route to handle search with filters
router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.query || '';
        const categoryFilters = Array.isArray(req.query.category) ? req.query.category : [req.query.category];
        const minPrice = parseInt(req.query.minPrice) || 0;
        const maxPrice = parseInt(req.query.maxPrice) || Number.MAX_SAFE_INTEGER;
        const sortBy = req.query.sort || 'relevance';
        const ratingFilters = Array.isArray(req.query.rating) ? req.query.rating : [req.query.rating];
        const brandFilters = Array.isArray(req.query.brand) ? req.query.brand : [req.query.brand];

        let filter = {
            sellingPrice: { $gte: minPrice, $lte: maxPrice }
        };

        if (categoryFilters.length > 0 && categoryFilters[0]) {
            filter.categories = { $in: categoryFilters };
        }

        if (ratingFilters.length > 0 && ratingFilters[0]) {
            filter.rating = { $in: ratingFilters };
        }

        if (brandFilters.length > 0 && brandFilters[0]) {
            filter.brand = { $in: brandFilters };
        }

        const products = await Product.find(filter);
        const fuse = new Fuse(products, {
            keys: ['title', 'brand'],
            includeScore: true,
            threshold: 0.3
        });

        let results = fuse.search(searchTerm).map(result => result.item);

        if (sortBy === 'price-asc') {
            results = results.sort((a, b) => a.sellingPrice - b.sellingPrice);
        } else if (sortBy === 'price-desc') {
            results = results.sort((a, b) => b.sellingPrice - a.sellingPrice);
        } else if (sortBy === 'popularity') {
            results = results.sort((a, b) => b.rating - a.rating);
        }

        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.render('partials/productList', { products: results });
        } else {
            return res.render('home/searchResult', { 
                products: results, 
                query: searchTerm,
                categoryFilters,
                minPrice,
                maxPrice,
                sortBy,
                ratingFilters,
                brandFilters
            });
        }
    } catch (err) {
        return res.status(500).send('Server Error');
    }
});

module.exports = router;
