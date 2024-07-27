const express = require('express');
const axios = require('axios');
const router = express.Router();
const Order = require('../models/order');
const Payment = require('../models/payment');
const Product = require('../models/product');
const User = require('../models/user');
const cashfreeConfig = require('../cashfreeConfig');

router.post('/create-order', async (req, res) => {
    const { userId, products, shippingAddress, paymentMethod } = req.body;

    try {
        // Calculate total amount
        let totalAmount = 0;
        const orderProducts = await Promise.all(products.map(async item => {
            const product = await Product.findById(item.productId);
            totalAmount += product.sellingPrice * item.quantity;
            return {
                product: item.productId,
                quantity: item.quantity,
                price: product.sellingPrice
            };
        }));

        // Create order
        const order = new Order({
            user: userId,
            products: orderProducts,
            totalAmount,
            shippingAddress,
            paymentMethod
        });

        await order.save();

        // Create payment
        const payment = new Payment({
            order: order._id,
            user: userId,
            amount: totalAmount,
            method: paymentMethod,
            status: 'pending' // Initially set status to pending
        });

        await payment.save();

        // Create Cashfree order
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
                return_url: `http://localhost:3000/payment/success?order_id=${order._id}` // Replace with your return URL
            }
        };

        const response = await axios.post('https://api.cashfree.com/pg/orders', request, {
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
