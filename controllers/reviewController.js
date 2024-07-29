const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const Product = mongoose.model('Product');
const User = mongoose.model('User');
const { cloudinary } = require('../cloudinary');
const calculateAverageRating = require('../utils/calculateAverageRating');

// Create a new review
exports.createReview = async (req, res) => {
  try {
    console.log('Incoming Review Data:', req.body.review);
    console.log('Uploaded Files:', req.files);

    if (!req.body.review) {
      console.error('Review data is missing');
      return res.status(400).send('Review data is missing');
    }

    const { productId } = req.params;
    const { title, rating, comment } = req.body.review;
    const user = req.user._id;

    if (rating === undefined || comment === undefined) {
      console.error('Rating or comment is missing');
      return res.status(400).send('Rating or comment is missing');
    }

    const review = new Review({ user, product: productId, title, rating, comment });

    if (req.files) {
      review.image = req.files.map(file => file.path);
    }

    await review.save();

    const product = await Product.findById(productId);
    if (!product) {
      console.error('Product not found');
      return res.status(404).send('Product not found');
    }
    product.reviews.push(review._id);
    product.rating = await calculateAverageRating(productId); // Calculate and update the rating
    await product.save();

    const userUpdate = await User.findByIdAndUpdate(user, { $push: { reviews: review._id } });
    if (!userUpdate) {
      console.error('User not found');
      return res.status(404).send('User not found');
    }

    res.redirect(`/products/${productId}/${req.params.productSlug}`);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Edit a review
exports.editReviewForm = async (req, res) => {
  try {
    const { reviewId, productId } = req.params;
    const product = await Product.findById(productId).populate('reviews');
    const review = await Review.findById(reviewId);

    if (!product || !review) {
      req.flash('error', 'Product or review not found');
      return res.redirect(`/products/${productId}`);
    }

    res.render('edit', { product, review });
  } catch (err) {
    console.error('Error fetching review:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    console.log('Uploaded Files:', req.files);

    if (!req.body.review) {
      console.error('Review data is missing');
      return res.redirect(`/products/${req.params.productId}`);
    }

    const { title, comment, rating } = req.body.review;
    if (title === undefined || comment === undefined || rating === undefined) {
      console.error('Title, comment, or rating is missing');
      return res.redirect(`/products/${req.params.productId}`);
    }

    const review = await Review.findById(req.params.reviewId);
    if (!review) {
      console.error('Review not found');
      return res.redirect(`/products/${req.params.productId}`);
    }

    if (req.body.deleteImages) {
      for (let img of req.body.deleteImages) {
        try {
          await cloudinary.uploader.destroy(img);
          review.image = review.image.filter(image => image !== img);
        } catch (deleteErr) {
          console.error('Error deleting image from Cloudinary:', deleteErr);
        }
      }
    }

    if (req.files) {
      const newImages = req.files.map(file => file.path);
      review.image.push(...newImages);
    }

    review.title = title;
    review.comment = comment;
    review.rating = rating;

    await review.save();

    const product = await Product.findById(req.params.productId);
    if (!product) {
      console.error('Product not found');
      return res.redirect(`/products/${req.params.productId}`);
    }
    product.rating = await calculateAverageRating(product._id); // Calculate and update the rating
    await product.save();

    res.redirect(`/products/${product._id}/${product.slug}`);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).send('Internal Server Error');
  }
};
// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { reviewId, productId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(reviewId);
    if (!deletedReview) {
      console.error('Review not found');
      return res.status(404).send('Review not found');
    }

    const product = await Product.findById(productId);
    if (!product) {
      console.error('Product not found');
      return res.status(404).send('Product not found');
    }
    product.reviews.pull(reviewId);
    await product.save();

    res.redirect(`/products/${productId}/${req.params.productSlug}`);
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).send('Internal Server Error');
  }
};
