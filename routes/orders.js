// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { isLoggedIn } = require('../middleware');

// Route to display all orders of a user
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.render('orders/index', { orders });
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred while fetching your orders');
    res.redirect('/');
  }
});

// Route to display details of a specific order
router.get('/:orderId', isLoggedIn, async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('user')
      .populate('products.product');

    if (!order) {
      req.flash('error', 'Order not found');
      return res.redirect('/orders');
    }

    res.render('orders/show', { order });
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred while fetching the order');
    res.redirect('/orders');
  }
});

module.exports = router;
