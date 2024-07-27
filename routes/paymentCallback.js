const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Payment = require('../models/payment');
const axios = require('axios');
const cashfreeConfig = require('../cashfreeConfig');

// Route to handle payment callback
router.get('/callback', async (req, res) => {
    const orderId = req.session.orderId;
    if (!orderId) {
        return res.status(400).send('Order ID not found in session');
    }

    try {
        // Fetch order and payment details
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).send('Order not found');
        }

        const payment = await Payment.findOne({ order: orderId });
        if (!payment) {
            return res.status(404).send('Payment not found');
        }

        // Fetch payment status from Cashfree
        const response = await axios.get(`${cashfreeConfig.apiUrl}/orders/${orderId}/payments`, {
            headers: {
                'x-client-id': cashfreeConfig.clientId,
                'x-client-secret': cashfreeConfig.clientSecret,
                'x-api-version': cashfreeConfig.apiVersion,
                'Content-Type': 'application/json'
            }
        });

        const paymentData = response.data[0]; // Assuming the response is an array
        const paymentStatus = paymentData.payment_status;
        const paymentMethod = Object.keys(paymentData.payment_method)[0]; // Extracting the payment method

        // Update payment details in the Payment schema
        payment.status = paymentStatus;
        payment.method = paymentMethod;
        payment.transactionId = paymentData.cf_payment_id;
        payment.bankReference = paymentData.bank_reference;
        payment.cfPaymentId = paymentData.cf_payment_id;
        payment.paymentCompletionTime = new Date(paymentData.payment_completion_time);
        payment.paymentGatewayDetails = {
            gatewayName: paymentData.payment_gateway_details.gateway_name,
            gatewayOrderId: paymentData.payment_gateway_details.gateway_order_id,
            gatewayPaymentId: paymentData.payment_gateway_details.gateway_payment_id,
            gatewayStatusCode: paymentData.payment_gateway_details.gateway_status_code,
            gatewaySettlement: paymentData.payment_gateway_details.gateway_settlement
        };
        payment.paymentTime = new Date(paymentData.payment_time);
        await payment.save();

        // Update paymentStatus and paymentMethod fields in the Order schema
        order.paymentStatus = paymentStatus;
        order.paymentMethod = paymentMethod;
        await order.save();

        // Clear the session orderId
        req.session.orderId = null;

        // Render a simple success page
        res.render('paymentSuccess', { paymentStatus });

    } catch (error) {
        console.error('Error handling payment callback:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
