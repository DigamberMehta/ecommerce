const express = require('express');
const router = express.Router();
const { isLoggedIn, setBackUrl } = require('../middleware');
const addressController = require('../controllers/addressController');

// Route to display all addresses of the user
router.get('/user/view-addresses', isLoggedIn, setBackUrl, addressController.viewAddresses);

// Route to display the form for adding a new address
router.get('/user/address/new', isLoggedIn, setBackUrl, addressController.newAddressForm);

// Handle adding new address
router.post('/user/address', isLoggedIn, addressController.addAddress);

// Handle updating an existing address
router.post('/user/address/update', isLoggedIn, addressController.updateAddress);

// Display form for editing an existing address
router.get('/user/address/edit/:id', isLoggedIn, addressController.editAddressForm);

// Handle editing an existing address
router.post('/user/address/edit/:id', isLoggedIn, addressController.editAddress);

// Handle deleting an address
router.post('/user/address/delete/:id', isLoggedIn, addressController.deleteAddress);

module.exports = router;
