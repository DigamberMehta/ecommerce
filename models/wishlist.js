const mongoose = require('mongoose');

// Define a schema for each wishlist item
const wishlistItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  attributes: {
    color: String,
    ram: String,
    storage: String,
    size: String
  },
  price: { type: Number } // Save the price that was selected based on the variant
});

// Define the main wishlist schema
const wishlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [wishlistItemSchema], // Array of wishlist items with attributes and price
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
