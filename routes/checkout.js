const express = require('express');
const router = express.Router();
const { isLoggedIn, setBackUrl } = require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const Payment = require('../models/payment');
const axios = require('axios');
const cashfreeConfig = require('../cashfreeConfig');

// Route to handle checkout
router.get('/', isLoggedIn, setBackUrl, async (req, res) => {
  if (req.query.productId) {
      req.session.cart = null;
  }
  let orderDetails = [];
  let totalCost = 0;
  let totalSavings = 0;

  try {
      if (req.session.cart) {
          for (let item of req.session.cart) {
              const subtotal = item.product.sellingPrice * item.quantity;
              const savings = (item.product.mrpPrice - item.product.sellingPrice) * item.quantity;
              totalCost += subtotal;
              totalSavings += savings;
              orderDetails.push({
                  _id: item.product._id,
                  title: item.product.title,
                  price: item.product.sellingPrice,
                  mrp: item.product.mrpPrice,
                  quantity: item.quantity,
                  subtotal: subtotal,
                  savings: savings,
                  imageUrl: item.product.images[0]
              });
          }
      } else {
          const { productId, quantity } = req.query;
          const product = await Product.findById(productId);
          if (!product) {
              return res.status(404).send('Product not found');
          }
          const subtotal = product.sellingPrice * quantity;
          const savings = (product.mrpPrice - product.sellingPrice) * quantity;
          totalCost = subtotal;
          totalSavings = savings;
          orderDetails.push({
              _id: product._id,
              title: product.title,
              price: product.sellingPrice,
              mrp: product.mrpPrice,
              quantity: quantity,
              subtotal: subtotal,
              savings: savings,
              imageUrl: product.images[0]
          });
      }

      const user = await User.findById(req.user._id);
      const addresses = user.address || [];

      res.render('checkout', { orderDetails, totalCost, totalSavings, addresses, backUrl: res.locals.backUrl });

  } catch (error) {
      console.error('Error during checkout:', error);
      res.status(500).send('An error occurred during checkout');
  }
});

router.post('/create-order', isLoggedIn, async (req, res) => {
  const { selectedAddressIndex, productId, quantity } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);

  if (!user || !user.address[selectedAddressIndex]) {
      return res.status(400).send('Invalid address selected');
  }

  const shippingAddress = user.address[selectedAddressIndex];
  let totalAmount = 0;
  let orderProducts = [];

  try {
      if (productId && quantity) {
          const product = await Product.findById(productId);
          if (!product) {
              return res.status(404).send('Product not found');
          }
          const subtotal = product.sellingPrice * quantity;
          totalAmount = subtotal;
          orderProducts.push({
              product: productId,
              quantity,
              price: product.sellingPrice
          });
      } else {
          if (req.session.cart) {
              orderProducts = await Promise.all(req.session.cart.map(async item => {
                  const product = await Product.findById(item.product._id);
                  const productAmount = product.sellingPrice * item.quantity;
                  totalAmount += productAmount;
                  return {
                      product: item.product._id,
                      quantity: item.quantity,
                      price: product.sellingPrice
                  };
              }));
          }
      }

      if (totalAmount <= 0) {
          console.error('Total amount calculated is zero or negative:', totalAmount);
          return res.status(400).send('Invalid total amount');
      }

      const order = new Order({
          user: userId,
          products: orderProducts,
          totalAmount,
          shippingAddress,
          paymentMethod: "card"
      });

      await order.save();

      const payment = new Payment({
          order: order._id,
          user: userId,
          amount: totalAmount,
          method: "card",
          status: 'pending'
      });

      await payment.save();

      // Store order ID in session
      req.session.orderId = order._id.toString();

      const request = {
          order_amount: totalAmount,
          order_currency: "INR",
          order_id: order._id.toString(),
          customer_details: {
              customer_id: userId,
              customer_phone: shippingAddress.phone,
              customer_name: shippingAddress.name,
              customer_email: req.user.email
          },
          order_meta: {
              return_url: `http://localhost:3000/payment/callback` // No need to pass order_id here
          }
      };

      const response = await axios.post(`${cashfreeConfig.apiUrl}/orders`, request, {
          headers: {
              'x-client-id': cashfreeConfig.clientId,
              'x-client-secret': cashfreeConfig.clientSecret,
              'x-api-version': cashfreeConfig.apiVersion,
              'Content-Type': 'application/json'
          }
      });

      res.json({ paymentSessionId: response.data.payment_session_id, orderId: order._id });

  } catch (error) {
      console.error('Error:', error.response ? error.response.data.message : error.message);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
