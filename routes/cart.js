// routes/cart.js
const express = require('express');
const router = express.Router();
const CartItem = require('../models/cartItem');
const Product = require('../models/product');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');

router.post('/add', isLoggedIn, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  console.log('Product ID:', productId);
  console.log('User ID:', userId);

  try {
    const product = await Product.findById(productId);

    if (!product) {
      console.log('Product not found');
      return res.json({ success: false, message: 'Product not found' });
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

    console.log('Product added to cart successfully');
    return res.json({ success: true, message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

router.get('/view', isLoggedIn, async (req, res) => {
  const userId = req.user._id;

  try {
    const cartItems = await CartItem.find({ user: userId }).populate('product');

    res.render('home/cart', { cartItems });
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('back');
  }
});

module.exports = router;
