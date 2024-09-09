const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const Product = require('../models/product');
const Wishlist = require('../models/wishlist');
const UserInteraction = require('../models/UserInteraction');
const { getRatingDistribution } = require('../utils/getRatingDistribution');
const { ShortUrl, generateShortCode } = require('../models/ShortUrl'); // Import the ShortUrl model and generateShortCode function

router.get('/products/:id/:slug', async (req, res) => {
  try {
    const { id, slug } = req.params;

    const product = await Product.findOne({ _id: id, slug: slug })
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name'
        }
      });

    if (!product) {
      console.log('Product not found:', { id, slug }); // Debugging log
      return res.status(404).send('Product not found');
    }

    // Get rating distribution
    const ratings = await getRatingDistribution(id);
    let isInWishlist = false;

    // Check if the product is in the user's wishlist
    if (req.isAuthenticated()) {
      const wishlist = await Wishlist.findOne({ user: req.user._id });
      if (wishlist) {
        isInWishlist = wishlist.products.some(item => item.product.toString() === product._id.toString());
      }

      // Handle user interaction for product view
      const existingInteraction = await UserInteraction.findOne({
        user: req.user._id,
        product: product._id,
        action: 'view'
      });

      const currentTime = new Date();

      if (existingInteraction) {
        existingInteraction.entryTime = currentTime; // Set entryTime to current time for new session
        existingInteraction.exitTime = null; // Reset exitTime for a new session
        await existingInteraction.save();
      } else {
        await UserInteraction.create({
          user: req.user._id,
          product: product._id,
          action: 'view',
          entryTime: currentTime, // Set entry time to current time
          exitTime: null, // No exit time yet
          duration: 0 // Initial duration is 0
        });
      }
    }

    // Generate or fetch the short URL for the product
    const originalUrl = `${req.protocol}://${req.get('host')}/products/${id}/${slug}`;
    let shortUrlDoc = await ShortUrl.findOne({ originalUrl });

    if (!shortUrlDoc) {
      const shortCode = await generateShortCode(); // Use the generateShortCode function to get a new short code
      shortUrlDoc = new ShortUrl({ originalUrl, shortCode });
      await shortUrlDoc.save();
    }

    const shortCode = shortUrlDoc.shortCode; // Only store the short code, not the full URL

    // Render the product page with all necessary information
    res.render('home/show', { 
      product, 
      ratings,
      request: req,
      isInWishlist,
      shortCode, // Pass the short code to the template
      camelCaseToTitleCase: (str) => str.replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); })
    });
  } catch (error) {
    console.error('Error in product view route:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/');
  }
});

router.post('/products/entry', async (req, res) => {
  if (!req.isAuthenticated()) {
    console.log('Unauthenticated access to /products/entry');
    return res.status(200).json({ success: true, message: 'Request ignored due to unauthenticated access.' });
  }

  const { productId, entryTime } = req.body;

  try {
    const userId = req.user._id;
    const interaction = await UserInteraction.findOne({
      user: userId,
      product: productId,
      action: 'view'
    });

    if (interaction) {
      interaction.entryTime = new Date(entryTime); // Update entry time to the current time

      await interaction.save();
    }

    res.status(200).json({ success: true, message: 'Entry time updated successfully.' });
  } catch (error) {
    console.error('Error recording entry time:', error);
    res.status(500).json({ success: false, message: 'An error occurred while recording entry time.' });
  }
});

router.post('/products/exit', async (req, res) => {
  if (!req.isAuthenticated()) {
    console.log('Unauthenticated access to /products/exit');
    return res.status(200).json({ success: true, message: 'Request ignored due to unauthenticated access.' });
  }

  const { productId, exitTime } = req.body;

  try {
    const userId = req.user._id;
    const interaction = await UserInteraction.findOne({
      user: userId,
      product: productId,
      action: 'view'
    });

    if (interaction) {
      const exitDate = new Date(exitTime);

      if (interaction.entryTime) {
        const viewingDuration = (exitDate - interaction.entryTime) / 1000; // Duration in seconds
        interaction.duration += viewingDuration; // Accumulate total viewing duration
      }

      interaction.exitTime = exitDate; // Set exit time to the current time

      await interaction.save();
    }

    res.status(200).json({ success: true, message: 'Exit time recorded successfully.' });
  } catch (error) {
    console.error('Error recording exit time:', error);
    res.status(500).json({ success: false, message: 'An error occurred while recording exit time.' });
  }
});

module.exports = router;
