const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

// Route to handle "Cash on Delivery"
router.post('/checkout/cash-on-delivery', isLoggedIn, async (req, res) => {
    const { selectedAddressIndex, productId, quantity, attributes } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user || !user.address[selectedAddressIndex]) {
        return res.status(400).send('Invalid address selected');
    }

    const shippingAddress = user.address[selectedAddressIndex];
    let totalAmount = 0;
    let orderProducts = [];

    try {
        if (productId && quantity) { // Handle single product
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).send('Product not found');
            }

            let price = product.sellingPrice;
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
                price,
                attributes // Store the selected attributes in the order
            });
        } else { // Handle multiple products in cart
            if (req.session.cart) {
                orderProducts = await Promise.all(req.session.cart.map(async item => {
                    const product = await Product.findById(item.product._id);
                    let price = item.price || product.sellingPrice;

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

        // Create the order
        const order = new Order({
            user: userId,
            products: orderProducts,
            totalAmount,
            shippingAddress,
            paymentMethod: "Cash on Delivery",
            paymentStatus: "pending"
        });

        await order.save();

        // Store order ID in session (if needed for further processing)
        req.session.orderId = order._id.toString();

        res.json({ success: true, orderId: order._id });

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
