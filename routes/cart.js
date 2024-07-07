const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/product');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');

router.post('/add', isLoggedIn, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    let cartItem = await CartItem.findOne({ user: userId, product: productId });

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = new CartItem({
        user: userId,
        product: productId,
        quantity: 1
      });
    }

    await cartItem.save();

    await User.findByIdAndUpdate(userId, { $addToSet: { cart: cartItem._id } });

    res.json({ success: true, message: 'Product added to cart successfully!' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ success: false, message: 'Failed to add product to cart.' });
  }
});

module.exports = router;
