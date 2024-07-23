const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const cartController = require('../controllers/cartController');

// Route to add a product to the cart
router.post('/add', isLoggedIn, cartController.addToCart);

// Route to view cart items
router.get('/view', isLoggedIn, cartController.viewCart);

// Route to update cart item quantity
router.post('/update', isLoggedIn, cartController.updateCart);

// Route to remove item from cart
router.post('/remove', isLoggedIn, cartController.removeFromCart);

// Route to get total cart quantity
router.get('/quantity', isLoggedIn, cartController.getCartQuantity);

// Route to checkout cart
router.post('/cart-checkout', isLoggedIn, cartController.checkoutCart);

// Route to save an item for later
router.post('/save-for-later/:itemId', isLoggedIn, cartController.saveForLater);

module.exports = router;
