const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const CartItem = require('../models/cartItem');

const Product = require('../models/product');
const User = require('../models/user');
const Wishlist = require('../models/wishlist');

// Route to add a product to the cart
router.post('/add', isLoggedIn, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let cartItem = await CartItem.findOne({ user: userId, product: productId });
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItem = new CartItem({
        user: userId,
        product: productId,
        quantity: parseInt(quantity, 10) || 1
      });
    }

    await cartItem.save();

    const user = await User.findById(userId);
    if (!user.cart.includes(cartItem._id)) {
      user.cart.push(cartItem._id);
      await user.save();
    }

    return res.redirect(req.get('referer'));
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

// Route to view cart items
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

// Route to update cart item quantity
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

// Route to remove item from cart
router.post('/remove', isLoggedIn, async (req, res) => {
  const { cartItemId } = req.body;

  try {
    const result = await CartItem.deleteOne({ _id: cartItemId });
    if (result.deletedCount === 0) {
      return res.json({ success: false, message: 'Cart item not found' });
    }

    const userId = req.user._id;
    await User.updateOne({ _id: userId }, { $pull: { cart: cartItemId } });

    const cartItems = await CartItem.find({ user: userId }).populate('product');
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);

    res.json({ success: true, newSubtotal });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

// Route to get total cart quantity
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

// Route to checkout cart
router.post('/cart-checkout', isLoggedIn, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id }).populate('product');
    req.session.cart = cartItems;
    res.redirect('/checkout');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred fetching cart items');
  }
});

// Route to save an item for later
router.post('/save-for-later/:itemId', isLoggedIn, async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user._id;

    const cartItem = await CartItem.findById(itemId);
    if (cartItem) {
      await CartItem.findByIdAndDelete(itemId);

      const wishlist = await Wishlist.findOne({ user: userId });
      if (wishlist) {
        wishlist.products.push(cartItem.product);
        await wishlist.save();
      } else {
        const newWishlist = new Wishlist({
          user: userId,
          products: [cartItem.product]
        });
        await newWishlist.save();
      }

      res.redirect('/cart/view');
    } else {
      res.status(404).send('Item not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
