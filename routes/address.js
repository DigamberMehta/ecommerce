const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');

// Show form to add new address
router.get('/user/address/new', isLoggedIn, (req, res) => {
  res.render('user/newAddress');
});

// Handle adding new address
router.post('/user/address', isLoggedIn, async (req, res) => {
  const { name, phone, houseNumber, street, city, state, pincode, country } = req.body;
  
  try {
    const user = await User.findById(req.user._id);
    const newAddress = {
      name,
      phone,
      houseNumber,
      street,
      city,
      state,
      pincode,
      country
    };
    
    user.address.push(newAddress);
    await user.save();
    
    req.flash('success', 'New address added successfully!');
    res.redirect('/home'); // Redirect to user profile or any other page
  } catch (error) {
    console.error('Error adding address:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/user/address/new');
  }
});

module.exports = router;
