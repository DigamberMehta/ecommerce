const mongoose = require('mongoose');

const shippingSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  carrier: String,
  trackingNumber: String,
  status: { type: String, default: 'pending' },
  estimatedDeliveryDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shipping', shippingSchema);