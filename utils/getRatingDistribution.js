// utils/getRatingDistribution.js

const mongoose = require('mongoose');
const Review = require('../models/review');

// Function to get rating distribution for a product
const getRatingDistribution = async (productId) => {
  try {
    const ratingsDistribution = await Review.aggregate([
      { $match: { product: new mongoose.Types.ObjectId(productId) } }, // Use 'new' here
      { $group: { _id: "$rating", count: { $sum: 1 } } },
      { $sort: { _id: -1 } }
    ]);

    const ratings = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    ratingsDistribution.forEach((item) => {
      ratings[item._id] = item.count;
    });

    return ratings;
  } catch (error) {
    console.error('Error fetching rating distribution:', error);
    return null;
  }
};

module.exports = { getRatingDistribution };
