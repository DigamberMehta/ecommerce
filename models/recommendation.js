const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the recommended Product
      score: { type: Number, required: true }, // Score assigned by the recommendation algorithm
      recommendedAt: { type: Date, default: Date.now }, // Timestamp when the recommendation was generated
    }
  ],
  createdAt: { type: Date, default: Date.now }, // Timestamp when the record was created
  updatedAt: { type: Date, default: Date.now }, // Timestamp when the record was last updated
});

// Ensure recommendations are updated with a new timestamp on each save
recommendationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Check if the model already exists, if not, create it
module.exports = mongoose.models.Recommendation || mongoose.model('Recommendation', recommendationSchema);
