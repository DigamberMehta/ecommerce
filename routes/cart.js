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
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
          console.log('Product not found');
          return res.status(404).json({ success: false, message: 'Product not found' });
      }

      // Check if the cart item already exists
      let cartItem = await CartItem.findOne({ user: userId, product: productId });
      if (cartItem) {
          cartItem.quantity += 1; // Increase quantity if item already in cart
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
      return res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
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


router.post('/update', isLoggedIn, async (req, res) => {
  const { cartItemId, newQuantity } = req.body;

  try {
      const cartItem = await CartItem.findById(cartItemId);

      if (!cartItem) {
          return res.json({ success: false, message: 'Cart item not found' });
      }

      cartItem.quantity = newQuantity;
      await cartItem.save();

      const userId = req.user._id;
      const cartItems = await CartItem.find({ user: userId }).populate('product');
      const newSubtotal = cartItems.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);

      res.json({ success: true, newSubtotal });
  } catch (error) {
      console.error('Error updating cart item quantity:', error);
      res.json({ success: false, message: 'An error occurred. Please try again.' });
  }
});
router.post('/remove', isLoggedIn, async (req, res) => {
  const { cartItemId } = req.body;

  try {
      // Delete the cart item
      const result = await CartItem.deleteOne({ _id: cartItemId });

      if (result.deletedCount === 0) {
          return res.json({ success: false, message: 'Cart item not found' });
      }

      // Remove the item from the user's cart array
      const userId = req.user._id;
      await User.updateOne({ _id: userId }, { $pull: { cart: cartItemId } });

      // Calculate the new subtotal
      const cartItems = await CartItem.find({ user: userId }).populate('product');
      const newSubtotal = cartItems.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);

      res.json({ success: true, newSubtotal });
  } catch (error) {
      console.error('Error removing cart item:', error);
      res.json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

router.get('/quantity', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await CartItem.find({ user: userId });
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    res.json({ totalQuantity });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get cart quantity' });
  }
});

router.post('/cart-checkout', isLoggedIn, async (req, res) => {
  try {
      const cartItems = await CartItem.find({ user: req.user._id }).populate('product');
      req.session.cart = cartItems;  // Save cart items to session
      res.redirect('/checkout');
  } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred fetching cart items');
  }
});

module.exports = router;
