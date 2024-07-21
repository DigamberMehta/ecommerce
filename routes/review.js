const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const { isLoggedIn, isReviewAuthor } = require('../middleware');
const Review = mongoose.model('Review');
const Product = mongoose.model('Product');
const User = mongoose.model('User');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // File name
    }
});

const upload = multer({ storage: storage });

// Create a new review
router.post('/products/:productId/:productSlug/reviews', isLoggedIn, upload.single('image'), async (req, res) => {
    try {
        console.log('Request Body:', req.body);

        if (!req.body.review) {
            console.error('Review data is missing from request body');
            return res.status(400).send('Review data is missing');
        }

        const { productId } = req.params;
        const { rating, comment } = req.body.review;
        const user = req.user._id;

        if (rating === undefined || comment === undefined) {
            console.error('Rating or comment is missing');
            return res.status(400).send('Rating or comment is missing');
        }

        const review = new Review({ user, product: productId, rating, comment });

        if (req.file) {
            review.image = req.file.path;
        }

        await review.save();

        // Update the product with the new review
        const product = await Product.findById(productId);
        if (!product) {
            console.error('Product not found');
            return res.status(404).send('Product not found');
        }
        product.reviews.push(review._id);
        await product.save();

        // Update the user's reviews array
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
});


// routes/reviews.js
router.get('/products/:productId/reviews/:reviewId/edit', isLoggedIn, isReviewAuthor, async (req, res) => {
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
});

router.put('/products/:productId/reviews/:reviewId', isLoggedIn, isReviewAuthor, upload.single('image'), async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Log the request body
        console.log('Uploaded File:', req.file); // Log the uploaded file

        if (!req.body.review) {
            console.error('Review data is missing');
            return res.redirect(`/products/${req.params.productId}`);
        }

        const { comment, rating } = req.body.review;
        if (comment === undefined || rating === undefined) {
            console.error('Comment or rating is missing');
            return res.redirect(`/products/${req.params.productId}`);
        }

        // Update the review
        const review = await Review.findByIdAndUpdate(req.params.reviewId, { comment, rating });

        if (!review) {
            console.error('Review not found');
            return res.redirect(`/products/${req.params.productId}`);
        }

        // Fetch the product to get the slug
        const product = await Product.findById(req.params.productId);
        if (!product) {
            console.error('Product not found');
            return res.redirect(`/products/${req.params.productId}`);
        }

        // Redirect to the product page with the slug
        res.redirect(`/products/${product._id}/${product.slug}`);
    } catch (err) {
        console.error('Error updating review:', err);
        res.status(500).send('Internal Server Error');
    }
});


// routes/reviews.js
router.delete('/products/:productId/:productSlug/reviews/:reviewId', isLoggedIn, isReviewAuthor, async (req, res) => {
    try {
        const { reviewId, productId } = req.params;

        const deletedReview = await Review.findByIdAndDelete(reviewId);
        if (!deletedReview) {
            console.error('Review not found');
            return res.status(404).send('Review not found');
        }

        // Update product to remove reference to deleted review
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
});


module.exports = router;
