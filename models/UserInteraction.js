const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  action: { type: String, enum: ['view', 'search', 'add_to_cart', 'wishlist_add', 'review'] },
  timestamp: { type: Date, default: Date.now },
  category: String,
  entryTime: { type: Date },
  exitTime: { type: Date },
  duration: { type: Number },
  cartDuration: { type: Number, default: 0 },
  wishlistDuration: { type: Number, default: 0 },
  searchQuery: { type: String }, // Field to store the search query
});

module.exports = mongoose.model('UserInteraction', userInteractionSchema);
