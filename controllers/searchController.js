const Product = require('../models/product');
const User = require('../models/user');
const Fuse = require('fuse.js');

// Handle search functionality
exports.search = async (req, res) => {
  try {
    const searchTerm = req.query.query || '';
    const suggestions = req.query.suggestions === 'true';

    if (suggestions) {
      if (searchTerm.length < 0) {
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

      if (req.isAuthenticated()) {
        const userId = req.user._id;
        const user = await User.findById(userId);

        results.forEach(async (product) => {
          const productExists = user.browsingHistory.some(
            history => history.product.toString() === product._id.toString()
          );

          if (!productExists) {
            user.browsingHistory.push({
              product: product._id,
              viewedAt: new Date()
            });
          }
        });

        await user.save();
      }

      return res.render('home/searchResult', { products: results, query: searchTerm });
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
};
