const express = require('express');
const axios = require('axios');
const router = express.Router();
const Order = require('../models/order');
const Payment = require('../models/payment');
const Product = require('../models/product');
const User = require('../models/user');
const cashfreeConfig = require('../cashfreeConfig');

router.post('/create-order', async (req, res) => {
    const { selectedAddressIndex, productId, quantity, attributes } = req.body; // Capture attributes from the request body
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

            let price = product.sellingPrice;

            // Handle attribute-based pricing
            if (attributes && attributes.color) {
                const colorVariant = product.colors.find(c => c.color === attributes.color);
                if (colorVariant) {
                    const variant = colorVariant.variants.find(v => 
                        (!attributes.ram || v.ram === attributes.ram) &&
                        (!attributes.storage || v.storage === attributes.storage) &&
                        (!attributes.size || v.size === attributes.size)
                    );
                    if (variant) {
                        price = variant.price;
                    }
                }
            }

            const subtotal = price * quantity;
            totalAmount = subtotal;
            orderProducts.push({
                product: productId,
                quantity,
                price: price,
                attributes // Store the selected attributes in the order
            });
        } else {
            if (req.session.cart) {
                orderProducts = await Promise.all(req.session.cart.map(async item => {
                    const product = await Product.findById(item.product._id);
                    let price = product.sellingPrice;

                    // Handle attribute-based pricing
                    if (item.attributes && item.attributes.color) {
                        const colorVariant = product.colors.find(c => c.color === item.attributes.color);
                        if (colorVariant) {
                            const variant = colorVariant.variants.find(v => 
                                (!item.attributes.ram || v.ram === item.attributes.ram) &&
                                (!item.attributes.storage || v.storage === item.attributes.storage) &&
                                (!item.attributes.size || v.size === item.attributes.size)
                            );
                            if (variant) {
                                price = variant.price;
                            }
                        }
                    }

                    const productAmount = price * item.quantity;
                    totalAmount += productAmount;
                    return {
                        product: item.product._id,
                        quantity: item.quantity,
                        price: price,
                        attributes: item.attributes // Store the selected attributes in the order
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
            method: "card", // Default to card, will be updated based on actual method used
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
                return_url: `https://urbanmart.live/payment/callback`
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

