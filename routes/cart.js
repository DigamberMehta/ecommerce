const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItem');
const Product = require('../models/product');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');

router.post('/add', isLoggedIn, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      req.flash('error', 'Product not found');
      return res.redirect('back');
    }

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

    // Update the user's cart
    const user = await User.findById(userId);
    if (!user.cart.includes(cartItem._id)) {
      user.cart.push(cartItem._id);
      await user.save();
    }

    req.flash('success', 'Product added to cart successfully');
    res.redirect('back');
  } catch (error) {
    console.error('Error adding product to cart:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('back');
  }
});

module.exports = router;
