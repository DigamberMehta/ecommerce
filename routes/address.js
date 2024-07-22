const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');



// Route to display all addresses of the user
router.get('/user/view-addresses', async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect('/login'); // Redirect if user is not authenticated
    }

    const user = await User.findById(req.user.id).populate('address').exec();
    res.render('user/allAddress', { addresses: user.address });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});




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

// Handle updating an existing address
router.post('/user/address/update', isLoggedIn, async (req, res) => {
  const { index, name, phone, houseNumber, street, city, state, pincode, country } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (user && user.address[index]) {
      user.address[index] = { name, phone, houseNumber, street, city, state, pincode, country };
      await user.save();
      req.flash('success', 'Address updated successfully!');
      res.redirect('/checkout'); // Redirect to the checkout page or any other page
    } else {
      req.flash('error', 'Address not found.');
      res.redirect('/checkout');
    }
  } catch (error) {
    console.error('Error updating address:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/checkout');
  }
});

module.exports = router;
