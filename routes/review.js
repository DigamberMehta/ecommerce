const express = require('express');
const router = express.Router();
const { isLoggedIn, isReviewAuthor } = require('../middleware');
const multer = require('multer');
const { cloudinary, storage } = require('../cloudinary');
const upload = multer({ storage: storage });
const reviewController = require('../controllers/reviewController');

// Create a new review
router.post('/products/:productId/:productSlug/reviews', isLoggedIn, upload.array('images', 5), reviewController.createReview);

// Edit review form
router.get('/products/:productId/reviews/:reviewId/edit', isLoggedIn, isReviewAuthor, reviewController.editReviewForm);

// Update a review
router.put('/products/:productId/reviews/:reviewId', isLoggedIn, isReviewAuthor, upload.array('images', 5), reviewController.updateReview);

// Delete a review
router.delete('/products/:productId/:productSlug/reviews/:reviewId', isLoggedIn, isReviewAuthor, reviewController.deleteReview);

module.exports = router;
