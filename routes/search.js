const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const User = require('../models/user'); // Import User model
const Fuse = require('fuse.js');
const UserInteraction = require('../models/UserInteraction');

// Function to expand search terms using a synonym map
function expandSearchTerm(term) {
    const synonymMap = {
        'smartphone': ['mobile', 'cellphone'],
        'mobile': ['smartphone', 'cellphone'],
        'cellphone': ['mobile', 'smartphone'],
        'laptop': ['notebook', 'computer'],
    };
    let terms = [term];
    for (const [key, synonyms] of Object.entries(synonymMap)) {
        if (key === term.toLowerCase() || synonyms.includes(term.toLowerCase())) {
            terms = terms.concat([key, ...synonyms]);
            break;
        }
    }
    return terms.join(' ');
}

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
        console.error('Error fetching search suggestions:', err);
        return res.status(500).send('Server Error');
    }
});

// Main search route
router.get('/search', async (req, res) => {
    try {
        const searchTerm = req.query.query || '';
        const expandedTerm = expandSearchTerm(searchTerm);

        // Perform the initial full-text search
        let products = await Product.find({
            $text: { $search: expandedTerm }
        }, { score: { $meta: "textScore" } })
        .sort({ score: { $meta: "textScore" } });

        console.log(`Initial products found: ${products.length}`);

        // Save the top 3-5 most relevant products for the user's browsing history
        const numberOfProductsToSave = Math.min(products.length, 5); // Save up to 5 products, or fewer if less are available
        const topProducts = products.slice(0, numberOfProductsToSave); // Select top relevant products
        const topProductIds = topProducts.map(product => product._id); // Get IDs of top products

        // Debugging: Check if user and products are valid before saving
        console.log('User ID:', req.user ? req.user._id : 'No user');
        console.log('Search term:', searchTerm);
        console.log('Top product IDs:', topProductIds);

        // Save search term and top product IDs to user's browsing history if user is authenticated
        if (req.user) {
            try {
                await User.findByIdAndUpdate(req.user._id, {
                    $push: { 
                        browsingHistory: { 
                            term: searchTerm, 
                            products: topProductIds, 
                            timestamp: new Date() 
                        } 
                    }
                });
                console.log('Search history saved successfully.');

                // Add UserInteraction tracking for search
                await UserInteraction.create({
                    user: req.user._id,
                    action: 'search',
                    searchQuery: searchTerm, // Only store search query
                    timestamp: new Date()
                });

                console.log('User interaction for search saved successfully.');
            } catch (saveErr) {
                console.error('Error saving search history or user interaction:', saveErr);
            }
        } else {
            console.log('Search history not saved. User not authenticated.');
        }

        // Extract the maximum price for slider range
        const maxProductPrice = products.reduce((max, product) => Math.max(max, product.sellingPrice), 0);

        // Filter by Category if provided
        if (req.query.category) {
            products = products.filter(product => product.categories.includes(req.query.category));
            console.log(`Products after category filter: ${products.length}`);
        }

        // Ensure price range values are valid numbers and filter by Price Range
        const minPrice = parseFloat(req.query.minPrice) || 0;
        const maxPrice = parseFloat(req.query.maxPrice) || maxProductPrice;

        products = products.filter(product => 
            product.sellingPrice >= minPrice && product.sellingPrice <= maxPrice
        );
        console.log(`Products after price filter (minPrice: ${minPrice}, maxPrice: ${maxPrice}): ${products.length}`);

        // Filter by Rating
        const rating = Math.min(Math.max(parseInt(req.query.rating), 1), 5) || 0;
        if (rating > 0) {
            products = products.filter(product => product.rating >= rating);
            console.log(`Products after rating filter: ${products.length}`);
        }

        // Filter by Brand if provided
        if (req.query.brand) {
            const selectedBrands = Array.isArray(req.query.brand) ? req.query.brand : [req.query.brand];
            products = products.filter(product => selectedBrands.includes(product.brand));
            console.log(`Products after brand filter: ${products.length}`);
        }

        // Filter by Color if provided
        if (req.query.color) {
            products = products.filter(product => 
                product.colors.some(color => color.color === req.query.color)
            );
            console.log(`Products after color filter: ${products.length}`);
        }

        // Filter by Size, RAM, Storage if provided
        if (req.query.size) {
            products = products.filter(product => 
                product.colors.some(color => 
                    color.variants.some(variant => variant.size === req.query.size)
                )
            );
            console.log(`Products after size filter: ${products.length}`);
        }

        if (req.query.ram) {
            products = products.filter(product => 
                product.colors.some(color => 
                    color.variants.some(variant => variant.ram === req.query.ram)
                )
            );
            console.log(`Products after RAM filter: ${products.length}`);
        }

        if (req.query.storage) {
            products = products.filter(product => 
                product.colors.some(color => 
                    color.variants.some(variant => variant.storage === req.query.storage)
                )
            );
            console.log(`Products after storage filter: ${products.length}`);
        }

        // Sort by Price
        if (req.query.sort === 'price-asc') {
            products.sort((a, b) => a.sellingPrice - b.sellingPrice);
        } else if (req.query.sort === 'price-desc') {
            products.sort((a, b) => b.sellingPrice - a.sellingPrice);
        }
        console.log(`Products after sorting: ${products.length}`);

        // Extract unique categories, brands, colors, sizes, RAM, and storage for the filters
        const categories = [...new Set(products.flatMap(product => product.categories))];
        const brands = [...new Set(products.map(product => product.brand))];
        const colors = [...new Set(products.flatMap(product => product.colors.map(color => color.color)))];
        const sizes = [...new Set(products.flatMap(product => product.colors.flatMap(color => color.variants.map(variant => variant.size))))];
        const rams = [...new Set(products.flatMap(product => product.colors.flatMap(color => color.variants.map(variant => variant.ram))))];
        const storages = [...new Set(products.flatMap(product => product.colors.flatMap(color => color.variants.map(variant => variant.storage))))];

        // Render the results with the available filters
        res.render('home/searchResult', {
            products,
            categories,
            brands,
            colors,
            sizes,
            rams,
            storages,
            query: searchTerm,
            minPrice: req.query.minPrice || 0,
            maxPrice: req.query.maxPrice || maxProductPrice,
            maxProductPrice,
            selectedCategory: req.query.category || '',
            selectedBrand: req.query.brand || [],
            selectedColor: req.query.color || '',
            selectedSize: req.query.size || '',
            selectedRAM: req.query.ram || '',
            selectedStorage: req.query.storage || '',
            selectedRating: req.query.rating || 0,
            selectedSort: req.query.sort || ''
        });
    } catch (err) {
        console.error('Error during search:', err);
        return res.status(500).send('Server Error');
    }
});



// Route to fetch the last 10 search terms from the browsing history
router.get('/search/history', async (req, res) => {
    try {
        if (!req.user) {
            return res.json([]); // If the user is not authenticated, return an empty array
        }

        const user = await User.findById(req.user._id, 'browsingHistory');
        if (user && user.browsingHistory) {
            // Get the last 10 unique search terms
            const uniqueTerms = [...new Set(user.browsingHistory.map(item => item.term))];
            const last10Terms = uniqueTerms.slice(-10).reverse();
            return res.json(last10Terms);
        }

        return res.json([]);
    } catch (err) {
        console.error('Error fetching browsing history:', err);
        return res.status(500).send('Server Error');
    }
});

// Route to remove a search term from browsing history
router.delete('/search/history/remove', async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' }); // If the user is not authenticated
        }

        const { term } = req.body;

        // Remove the search term from the user's browsing history
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { browsingHistory: { term: term } }
        });

        return res.json({ message: 'Search term removed successfully.' });
    } catch (err) {
        console.error('Error removing search term:', err);
        return res.status(500).send('Server Error');
    }
});


module.exports = router;
