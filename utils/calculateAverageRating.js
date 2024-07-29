const Review = require('../models/review'); // Ensure to require the review model

async function calculateAverageRating(productId) {
  const reviews = await Review.find({ product: productId });
  if (reviews.length === 0) return 0;

  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return totalRating / reviews.length;
}

module.exports = calculateAverageRating;
