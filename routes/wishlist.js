const express = require('express');
const router = express.Router();
const Wishlist = require('../models/Wishlist');
const CartItem = require('../models/CartItem');
const { isLoggedIn } = require('../middleware');

// Add product to wishlist
router.post('/wishlist/add', async (req, res) => {
    if (!req.user) {
      req.flash('error', 'You must be logged in to add items to your wishlist.');
      return res.redirect('/login');
    }
  
    try {
      let wishlist = await Wishlist.findOne({ user: req.user._id });
      if (!wishlist) {
        wishlist = new Wishlist({ user: req.user._id, products: [] });
      }
  
      if (!wishlist.products.includes(req.body.productId)) {
        wishlist.products.push(req.body.productId);
        await wishlist.save();
      }
      req.flash('success', 'Product added to your wishlist.');
      res.redirect('back');
    } catch (error) {
      req.flash('error', 'An error occurred while adding the product to your wishlist.');
      res.redirect('back');
    }
  });
  
  
// Remove product from wishlist
router.post('/wishlist/remove', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'You must be logged in to remove items from your wishlist.' });
  }

  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(productId => productId.toString() !== req.body.productId);
      await wishlist.save();
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while removing the product from your wishlist.' });
  }
});

// Get user's wishlist products
router.get('/wishlist', isLoggedIn, async (req, res) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in to view your wishlist.');
  }

  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    if (!wishlist) {
      return res.render('user/wishlist', { products: [] }); // Handle case where there is no wishlist yet
    }
    res.render('user/wishlist', { products: wishlist.products });
  } catch (error) {
    res.status(500).send('An error occurred while retrieving the wishlist.');
  }
});

// Move product from wishlist to cart
router.post('/wishlist/move-to-cart', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'You must be logged in to move items to your cart.' });
  }

  try {
    const productId = req.body.productId;
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    let cartItem = await CartItem.findOne({ user: req.user._id, product: productId });

    if (wishlist) {
      // Remove from wishlist
      wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
      await wishlist.save();
    }

    if (cartItem) {
      // If the item is already in the cart, increase the quantity
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      // If the item is not in the cart, add it
      await CartItem.create({
        user: req.user._id,
        product: productId,
        quantity: 1
      });
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while moving the product to your cart.' });
  }
});

module.exports = router;
