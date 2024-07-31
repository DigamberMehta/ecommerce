const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Review = require('../models/review');
const Fuse = require('fuse.js');
const { upload } = require('../cloudinaryProduct'); // Import product upload middleware

// Fetch and display products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('admin/products', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Search products
router.get('/products/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const products = await Product.find({});

    const fuse = new Fuse(products, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'brand', weight: 0.3 },
        { name: 'description', weight: 0.1 },
        { name: 'categories', weight: 0.1 },
        { name: 'tags', weight: 0.1 }
      ]
    });

    const result = searchTerm ? fuse.search(searchTerm).map(res => res.item) : products;

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Preview a product
router.get('/preview/:id/:slug', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'name'
      }
    });

    res.render('admin/preview', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add a new product
router.post('/add/product', upload.fields([{ name: 'images', maxCount: 5 }, { name: 'additionalImages', maxCount: 5 }]), async (req, res) => {
  try {
    const { title, description, sellingPrice, mrpPrice, brand, stock } = req.body;

    // Convert categories and tags back to arrays
    const categories = req.body.categories ? req.body.categories.split(',').map(category => category.trim()) : [];
    const tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [];

    const images = req.files.images ? req.files.images.map(file => file.path) : [];
    const additionalImages = req.files.additionalImages ? req.files.additionalImages.map(file => file.path) : [];

    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    const newProduct = new Product({
      title,
      description,
      sellingPrice,
      mrpPrice,
      categories,
      brand,
      stock,
      images,
      additionalImages,
      tags,
      slug
    });

    await newProduct.save();
    req.flash('success', 'Product added successfully');
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

// Edit a product
router.post('/products/:id/edit', upload.fields([{ name: 'mainImages' }, { name: 'additionalImages' }]), async (req, res) => {
  try {
    console.log('Edit product route hit');
    console.log('Request body:', req.body);
    console.log('Files:', req.files);

    const productId = req.params.id;
    const updatedFields = req.body;

    // Fetch the existing product
    const product = await Product.findById(productId);
    if (!product) {
      console.error(`Product with ID ${productId} not found`);
      return res.status(404).send('Product not found');
    }

    // Handle main image uploads
    if (req.files.mainImages) {
      const mainImages = req.files.mainImages.map(file => file.path);
      updatedFields.images = [...product.images, ...mainImages];
    }

    // Handle additional image uploads
    if (req.files.additionalImages) {
      const additionalImages = req.files.additionalImages.map(file => file.path);
      updatedFields.additionalImages = [...(product.additionalImages || []), ...additionalImages];
    }

    // Handle image deletions
    if (updatedFields.deleteImages) {
      const deleteImages = updatedFields.deleteImages.split(',');
      updatedFields.images = product.images.filter(image => !deleteImages.includes(image));
      console.log(`Images to delete: ${deleteImages}`);
      console.log(`Remaining images: ${updatedFields.images}`);
    }

    if (updatedFields.deleteAdditionalImages) {
      const deleteAdditionalImages = updatedFields.deleteAdditionalImages.split(',');
      updatedFields.additionalImages = (product.additionalImages || []).filter(image => !deleteAdditionalImages.includes(image));
      console.log(`Additional images to delete: ${deleteAdditionalImages}`);
      console.log(`Remaining additional images: ${updatedFields.additionalImages}`);
    }

    if (updatedFields.deleteReviewImages) {
      const deleteReviewImages = updatedFields.deleteReviewImages.split(',');
      product.reviews.forEach(review => {
        review.image = review.image.filter(image => !deleteReviewImages.includes(image));
      });
      await product.save();
      console.log(`Review images to delete: ${deleteReviewImages}`);
    }

    // Merge the existing and new tags
    if (updatedFields.tags) {
      if (Array.isArray(updatedFields.tags)) {
        // Split tags string into an array and merge with existing tags
        const newTags = updatedFields.tags.map(tag => tag.trim());
        const existingTags = product.tags || [];
        updatedFields.tags = [...new Set([...existingTags, ...newTags])];
      } else {
        // Single tag case, merge it with existing tags
        const newTag = updatedFields.tags.trim();
        const existingTags = product.tags || [];
        updatedFields.tags = [...new Set([...existingTags, newTag])];
      }
    }

    // Convert categories back to arrays if they were edited
    if (updatedFields.categories) {
      updatedFields.categories = updatedFields.categories.split(',').map(category => category.trim());
    }

    // Find and update the product with new values
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedFields, { new: true });
    if (!updatedProduct) {
      console.error(`Failed to update product with ID ${productId}`);
      return res.status(500).send('Failed to update product');
    }

    console.log('Product updated successfully:', updatedProduct);
    req.flash('success', 'Product updated successfully');
    res.redirect(`/admin/preview/${productId}/${updatedFields.slug}`);
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send('Server Error');
  }
});


// Delete a review
router.delete('/reviews/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
      console.error(`Review with ID ${reviewId} not found`);
      return res.status(404).json({ message: 'Review not found' });
    }

    // Remove review from associated product
    const product = await Product.findByIdAndUpdate(review.product, {
      $pull: { reviews: reviewId }
    });
    if (!product) {
      console.error(`Failed to update product with ID ${review.product} for review deletion`);
      return res.status(500).json({ message: 'Failed to update product for review deletion' });
    }

    console.log('Review deleted successfully:', review);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
