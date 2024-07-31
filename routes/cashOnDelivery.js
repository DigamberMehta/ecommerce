const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');

// Route to handle "Cash on Delivery"
router.post('/checkout/cash-on-delivery', isLoggedIn, async (req, res) => {
    try {
        const { selectedAddressIndex, products } = req.body;

        // Fetch the user and the selected address
        const user = await User.findById(req.user._id);
        const address = user.address[selectedAddressIndex];

        let totalAmount = 0;
        const orderProducts = [];

        // Fetch details for each product in the order
        for (const item of products) {
            const product = await Product.findById(item.productId);
            if (!product) {
                return res.status(400).json({ success: false, message: 'Invalid product ID' });
            }

            const productTotal = product.sellingPrice * item.quantity;
            totalAmount += productTotal;

            orderProducts.push({
                product: item.productId,
                quantity: item.quantity,
                price: product.sellingPrice
            });
        }

        // Create the order
        const order = new Order({
            user: req.user._id,
            products: orderProducts,
            totalAmount,
            shippingAddress: address,
            paymentMethod: 'Cash on Delivery',
            paymentStatus: 'pending'
        });

        await order.save();

        // Update the user's orders
        user.orders.push(order._id);
        await user.save();

        res.json({ success: true, orderId: order._id });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
