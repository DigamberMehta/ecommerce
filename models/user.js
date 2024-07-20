const mongoose = require('mongoose');
const passLocalMongoose = require('passport-local-mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  googleId: String,
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
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
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
  roles: { type: [String], default: ['user'] },
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
  ],
  resetPasswordToken: String, // For password reset token
  resetPasswordExpires: Date, // For password reset token expiration
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

userSchema.plugin(passLocalMongoose, { usernameField: 'email' });

userSchema.statics.serializeUser = function() {
  return function(user, done) {
    done(null, user.id);
  };
};

userSchema.statics.deserializeUser = function() {
  return async function(id, done) {
    try {
      const user = await mongoose.model('User').findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  };
};

module.exports = mongoose.model('User', userSchema);
