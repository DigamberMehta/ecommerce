const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');

// Add product to wishlist
router.post('/wishlist/add', wishlistController.addProductToWishlist);

// Remove product from wishlist
router.post('/wishlist/remove', wishlistController.removeProductFromWishlist);

// Get user's wishlist products
router.get('/wishlist', wishlistController.getWishlist);

// Move product from wishlist to cart
router.post('/wishlist/move-to-cart', wishlistController.moveProductToCart);

module.exports = router;
