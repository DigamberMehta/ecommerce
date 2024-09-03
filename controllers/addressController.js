const User = require('../models/user');

// Display all addresses of the user
exports.viewAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('address').exec();
    res.render('user/allAddress', { addresses: user.address, backUrl: res.locals.backUrl });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

// Display form for adding a new address
exports.newAddressForm = (req, res) => {
  res.render('user/newAddress', { backUrl: res.locals.backUrl });
};

// Handle adding new address
exports.addAddress = async (req, res) => {
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
    res.redirect(backUrl || '/user/view-addresses');
  } catch (error) {
    console.error('Error adding address:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/user/address/new');
  }
};

// Handle updating an existing address
exports.updateAddress = async (req, res) => {
  const { index, name, phone, houseNumber, street, city, state, pincode, country, backUrl } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (user && user.address[index]) {
      user.address[index] = { name, phone, houseNumber, street, city, state, pincode, country };
      await user.save();
      req.flash('success', 'Address updated successfully!');
      res.redirect(backUrl || '/user/view-addresses');
    } else {
      req.flash('error', 'Address not found.');
      res.redirect(backUrl || '/user/view-addresses');
    }
  } catch (error) {
    console.error('Error updating address:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect(backUrl || '/user/view-addresses');
  }
};

// Display form for editing an existing address
exports.editAddressForm = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const address = user.address.id(req.params.id);
    res.render('edit-address', { address, backUrl: res.locals.backUrl });
  } catch (error) {
    res.status(500).send(error);
  }
};


// Handle editing an existing address
exports.editAddress = async (req, res) => {
  try {
    const { name, phone, houseNumber, street, city, state, pincode, country } = req.body;
    const user = await User.findById(req.user._id);
    const address = user.address.id(req.params.id);
    if (address) {
      address.name = name;
      address.phone = phone;
      address.houseNumber = houseNumber;
      address.street = street;
      address.city = city;
      address.state = state;
      address.pincode = pincode;
      address.country = country;
      await user.save();
      res.redirect('/user/view-addresses');
    } else {
      res.status(404).send('Address not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Handle deleting an address
exports.deleteAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.address.pull({ _id: req.params.id });
      await user.save();
      req.flash('success', 'Address deleted successfully!');
    } else {
      req.flash('error', 'User not found.');
    }
    res.redirect('/user/view-addresses');
  } catch (error) {
    console.error('Error deleting address:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('/user/view-addresses');
  }
};
