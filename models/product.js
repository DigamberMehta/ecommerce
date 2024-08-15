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
  mrpPrice: Number,
  categories: [String],
  brand: String,
  stock: Number,
  images: [String], 
  colors: [colorSchema], 
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  rating: Number,
  specifications: mongoose.Schema.Types.Mixed,
  tags: [String],
  additionalImages: [String], 
  slug: { type: String, required: true, unique: true },
  discount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add text index with weights for full-text search
productSchema.index({
  title: 'text',
  brand: 'text',
  description: 'text',
  categories: 'text'
}, {
  weights: {
    title: 5,
    brand: 3,
    description: 2,
    categories: 1
  },
  name: 'TextIndex'
});


module.exports = mongoose.model('Product', productSchema);
