const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  action: { type: String, enum: ['view', 'search', 'add_to_cart', 'wishlist_add', 'review'] },
  timestamp: { type: Date, default: Date.now },
  category: String,
  entryTime: { type: Date }, // Add entryTime to log when the user views the product
  exitTime: { type: Date },  // Add exitTime to log when the user leaves the product page
  duration: { type: Number } // Add duration to store the time spent in seconds
});

module.exports = mongoose.model('UserInteraction', userInteractionSchema);
