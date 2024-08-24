const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist');
const CartItem = require('../models/cartItem');
const { isLoggedIn } = require('../middleware');
const UserInteraction = require('../models/UserInteraction');
const Product = require('../models/product');
// Add product to wishlist
router.post('/wishlist/add', isLoggedIn, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'You must be logged in to add items to your wishlist.' });
    }

    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id });
        if (!wishlist) {
            wishlist = new Wishlist({ user: req.user._id, products: [] });
        }

        // Check if the product already exists in the wishlist (ignoring attributes)
        const productExists = wishlist.products.some(item => item.product.toString() === req.body.productId);

        if (!productExists) {
            // Add the product to the wishlist
            wishlist.products.push({
                product: req.body.productId,
                price: req.body.price // Assuming the price is sent in the request body
            });
            await wishlist.save();

            // Fetch the product details
            const product = await Product.findById(req.body.productId);

            // Update the 'view' interaction to 'wishlist' if it exists
            await UserInteraction.findOneAndUpdate(
                { user: req.user._id, product: req.body.productId, action: 'view' },
                { 
                    action: 'wishlist',
                    category: product.categories[0]
                },
                { upsert: true, new: true }
            );
        }

        res.json({ success: true, message: 'Product added to your wishlist.' });
    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        res.status(500).json({ success: false, message: 'An error occurred while adding the product to your wishlist.' });
    }
});



// Remove product from wishlist
// Remove product from wishlist
router.post('/wishlist/remove', isLoggedIn, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'You must be logged in to remove items from your wishlist.' });
    }

    try {
        let wishlist = await Wishlist.findOne({ user: req.user._id });
        if (wishlist) {
            // Filter out the product that matches the provided productId
            wishlist.products = wishlist.products.filter(item => item.product.toString() !== req.body.productId);
            await wishlist.save();
        }
        res.json({ success: true, message: 'Product removed from your wishlist.' });
    } catch (error) {
        console.error('Error removing product from wishlist:', error);
        res.status(500).json({ success: false, message: 'An error occurred while removing the product from your wishlist.' });
    }
});



// Get user's wishlist products
router.get('/wishlist', isLoggedIn, async (req, res) => {
  if (!req.user) {
      return res.status(401).send('You must be logged in to view your wishlist.');
  }

  try {
      const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products.product');
      if (!wishlist) {
          return res.render('user/wishlist', { products: [] }); // Handle case where there is no wishlist yet
      }

      // Pass the products with attributes and price to the frontend
      res.render('user/wishlist', { products: wishlist.products });
  } catch (error) {
      res.status(500).send('An error occurred while retrieving the wishlist.');
  }
});

// Move product from wishlist to cart
// Move product from wishlist to cart
router.post('/wishlist/move-to-cart', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'You must be logged in to move items to your cart.' });
    }

    try {
        const productId = req.body.productId;
        const { color, ram, storage, size } = req.body;

        // Find the wishlist for the user
        let wishlist = await Wishlist.findOne({ user: req.user._id });

        // Construct the query for finding a cart item with the matching attributes
        let cartQuery = {
            user: req.user._id,
            product: productId
        };

        if (color) cartQuery['attributes.color'] = color;
        if (ram) cartQuery['attributes.ram'] = ram;
        if (storage) cartQuery['attributes.storage'] = storage;
        if (size) cartQuery['attributes.size'] = size;

        let cartItem = await CartItem.findOne(cartQuery);

        if (wishlist) {
            // Remove the specific product from the wishlist, checking only the relevant attributes
            wishlist.products = wishlist.products.filter(item => {
                return item.product.toString() !== productId || 
                       (color && item.attributes?.color !== color) ||
                       (ram && item.attributes?.ram !== ram) ||
                       (storage && item.attributes?.storage !== storage) ||
                       (size && item.attributes?.size !== size);
            });
            await wishlist.save(); // Save the wishlist after removing the item
        }

        if (cartItem) {
            // If the item with the same attributes is already in the cart, increase the quantity
            cartItem.quantity += 1;
            await cartItem.save();
        } else {
            // If the item is not in the cart, add it with the correct attributes and price
            await CartItem.create({
                user: req.user._id,
                product: productId,
                quantity: 1,
                attributes: { color, ram, storage, size },
                price: req.body.price // Use the price passed in the request
            });
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred while moving the product to your cart.' });
    }
});



module.exports = router;