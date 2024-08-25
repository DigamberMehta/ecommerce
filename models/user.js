const mongoose = require('mongoose');
const passLocalMongoose = require('passport-local-mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  googleId: String,
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  name: String,
  address: [
    {
      name: String,
      phone: String,
      houseNumber : String,
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String
    }
  ],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
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
      term: String,  // Store search terms
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], // Array of product IDs matching the search term
      timestamp: { type: Date, default: Date.now }
    }
  ],
  resetPasswordToken: String, // For password reset token
  resetPasswordExpires: Date, // For password reset token expiration
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add passport-local-mongoose plugin to handle hashing and salting of passwords and to handle user authentication with email
userSchema.plugin(passLocalMongoose, { usernameField: 'email' });

// Custom serialize and deserialize functions for Passport
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
