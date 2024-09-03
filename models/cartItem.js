const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  attributes: { 
    type: Map, 
    of: String 
  }, // This will store attributes like color, RAM, storage, size, etc.
  price: { type: Number, required: true } // Store the price of the selected variant
});

module.exports = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);
