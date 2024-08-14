const mongoose = require('mongoose');

// Define the schema for product variants (e.g., RAM + storage, size + price)
const variantSchema = new mongoose.Schema({
  ram: String, // Optional: RAM size (e.g., 6GB, 8GB)
  storage: String, // Optional: Storage size (e.g., 128GB, 256GB)
  size: String, // Optional: Size for clothing, footwear, etc. (e.g., M, L, XL)
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
});

// Define the schema for color variants
const colorSchema = new mongoose.Schema({
  color: { type: String, required: true },
  images: [String], // Images specific to this color
  variants: [variantSchema], // Array of product variants for this color
});

// Define the main product schema
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  sellingPrice: { type: Number, required: true },
  mrpPrice: { type: Number },
  categories: [String],
  brand: String,
  stock: Number,
  images: [String], // General product images
  colors: [colorSchema], // Array of color variants
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  rating: Number,
  specifications: mongoose.Schema.Types.Mixed,
  tags: [String],
  additionalImages: [String], // Additional general images
  slug: { type: String, required: true, unique: true },
  discount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
