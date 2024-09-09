// routes/shortener.js
const express = require('express');
const router = express.Router();
const { ShortUrl, generateShortCode } = require('../models/ShortUrl');

// Endpoint to generate a short URL for a product
router.post('/shorten', async (req, res) => {
  try {
    const { productId, slug } = req.body;

    // Validate product ID and slug
    if (!productId || !slug) {
      return res.status(400).json({ error: 'Product ID and slug are required' });
    }

    // Construct the original URL for the product
    const originalUrl = `${req.protocol}://${req.get('host')}/products/${productId}/${slug}`;

    // Check if this URL already has a short version
    let shortUrlDoc = await ShortUrl.findOne({ originalUrl });

    if (!shortUrlDoc) {
      // If not, generate a unique short code
      const shortCode = await generateShortCode();

      // Save the new short URL mapping to the database
      shortUrlDoc = new ShortUrl({ originalUrl, shortCode });
      await shortUrlDoc.save();
    }

    // Return the existing or new shortened URL with the '/s/' prefix
    const shortUrlPath = `${req.protocol}://${req.get('host')}/s/${shortUrlDoc.shortCode}`;
    res.json({ originalUrl, shortUrl: shortUrlPath });
  } catch (error) {
    console.error('Error generating short URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Endpoint to resolve a short URL to the original product page
// routes/shortener.js

router.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params; // Extract the short code from the URL

    console.log('Received Short Code:', shortCode); // Debugging log

    // Find the original URL using the short code
    const shortUrl = await ShortUrl.findOne({ shortCode });

    if (!shortUrl) {
      console.log('Short URL not found:', shortCode); // Debugging log
      return res.status(404).send('Short URL not found');
    }

    console.log('Redirecting to Original URL:', shortUrl.originalUrl); // Debugging log

    // Redirect to the original URL
    res.redirect(shortUrl.originalUrl);
  } catch (error) {
    console.error('Error resolving short URL:', error);
    res.status(500).send('Internal Server Error');
  }
});
  
  module.exports = router;
  

// module.exports = router;
