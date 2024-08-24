const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  action: { type: String, enum: ['view', 'search', 'add_to_cart', 'wishlist_add', 'review'] },
  timestamp: { type: Date, default: Date.now },
  category: String,
  entryTime: { type: Date }, // Logs when the user views the product
  exitTime: { type: Date },  // Logs when the user leaves the product page
  duration: { type: Number }, // Time spent viewing in seconds
  cartDuration: { type: Number, default: 0 }, // Duration before adding to cart
  wishlistDuration: { type: Number, default: 0 } // Duration before adding to wishlist
});

module.exports = mongoose.model('UserInteraction', userInteractionSchema);
