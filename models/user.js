const mongoose = require('mongoose');
const passLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: String,
  address: [
    {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String
    }
  ],
  phone: String,
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
  roles: { type: [String], default: ['user'] },
  preferences: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  preferences: {
    viewedCategories: [String],
    searchedCategories: [String],
    addedToCartCategories: [String]
  },
  browsingHistory: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      viewedAt: { type: Date, default: Date.now }
    }
  ]
});

userSchema.plugin(passLocalMongoose);

module.exports = mongoose.model('User', userSchema);
