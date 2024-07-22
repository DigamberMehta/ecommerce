const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { isLoggedIn } = require('../middleware');

// Route to display all addresses of the user
router.get('/user/view-addresses', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('address').exec();
    const backUrl = req.originalUrl; // Capture the current URL
    res.render('user/allAddress', { addresses: user.address, backUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to display the form for adding a new address
router.get('/user/address/new', isLoggedIn, (req, res) => {
  const backUrl = req.query.backUrl || '/home'; // Default to home if no backUrl is provided
  res.render('user/newAddress', { backUrl });
});

// Handle adding new address
router.post('/user/address', isLoggedIn, async (req, res) => {
  const { name, phone, houseNumber, street, city, state, pincode, country, backUrl } = req.body;

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
    res.redirect(backUrl); // Redirect to the original page
  } catch (error) {
    console.error('Error adding address:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/user/address/new');
  }
});

// Handle updating an existing address
router.post('/user/address/update', isLoggedIn, async (req, res) => {
  const { index, name, phone, houseNumber, street, city, state, pincode, country, backUrl } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (user && user.address[index]) {
      user.address[index] = { name, phone, houseNumber, street, city, state, pincode, country };
      await user.save();
      req.flash('success', 'Address updated successfully!');
      res.redirect(backUrl || '/checkout'); // Redirect to the backUrl or checkout page
    } else {
      req.flash('error', 'Address not found.');
      res.redirect(backUrl || '/checkout');
    }
  } catch (error) {
    console.error('Error updating address:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect(backUrl || '/checkout');
  }
});

module.exports = router;
