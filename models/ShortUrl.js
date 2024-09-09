// models/ShortUrl.js
const mongoose = require('mongoose');

// Use dynamic import for `nanoid`
async function loadNanoid() {
  const { nanoid } = await import('nanoid');
  return nanoid;
}

// Define the schema for Short URLs
const shortUrlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Create and export the ShortUrl model
const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);

// Export a function to generate a short URL
module.exports = {
  ShortUrl,
  generateShortCode: async function () {
    const nanoid = await loadNanoid();
    return nanoid(6); // Generate a short code with length 6
  },
};
