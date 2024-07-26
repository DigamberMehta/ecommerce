const mongoose = require('mongoose');
const Product = require('../models/product');
const { products } = require('./data');
require ('dotenv').config();
const dbUrl = process.env.ATLAS_URL || 'mongodb://localhost:27017/ecommerce';


mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const initializeData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany();

    // Insert sample data
    await Product.insertMany(products);

    console.log('Database initialized successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing database:', error);
    mongoose.connection.close();
  }
};

initializeData();
