const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');
const User = require('../models/user');
const Wishlist = require('../models/wishlist');

// Route to add a product to the cart
router.post('/add', isLoggedIn, async (req, res) => {
  const { productId, color, ram, storage, size, quantity } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Initialize the price with the product's sellingPrice as the fallback
    let selectedPrice = product.sellingPrice;

    // Find the color variant selected by the user
    const selectedColorVariant = product.colors.find(c => c.color === color);

    if (selectedColorVariant) {
      // Find the specific variant based on RAM, storage, and size
      const selectedVariant = selectedColorVariant.variants.find(variant =>
        (!variant.ram || variant.ram === ram) &&
        (!variant.storage || variant.storage === storage) &&
        (!variant.size || variant.size === size)
      );

      // If a specific variant is found, use its price
      if (selectedVariant) {
        selectedPrice = selectedVariant.price;
      }
    }

    // Create or update the cart item with the selected price
    let cartItem = await CartItem.findOne({ 
      user: userId, 
      product: productId, 
      'attributes.color': color, 
      'attributes.ram': ram, 
      'attributes.storage': storage, 
      'attributes.size': size 
    });

    if (cartItem) {
      cartItem.quantity += parseInt(quantity, 10);
    } else {
      cartItem = new CartItem({
        user: userId,
        product: productId,
        quantity: parseInt(quantity, 10) || 1,
        attributes: {
          color: color,
          ram: ram,
          storage: storage,
          size: size
        },
        price: selectedPrice
      });
    }

    await cartItem.save();

    const user = await User.findById(userId);
    if (!user.cart.includes(cartItem._id)) {
      user.cart.push(cartItem._id);
      await user.save();
    }

    return res.redirect(req.get('referer'));
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

// Route to view cart items
router.get('/view', isLoggedIn, async (req, res) => {
  const userId = req.user._id;

  try {
    const cartItems = await CartItem.find({ user: userId }).populate('product');
    // console.log('Cart Items:', cartItems); // Debugging line
    res.render('home/cart', { cartItems });
  } catch (error) {
    console.error('Error retrieving cart items:', error);
    req.flash('error', 'An error occurred. Please try again.');
    res.redirect('back');
  }
});

// Route to update cart item quantity
router.post('/update', isLoggedIn, async (req, res) => {
  const { cartItemId, newQuantity } = req.body;

  try {
    const cartItem = await CartItem.findById(cartItemId).populate('product');
    if (!cartItem) {
      return res.json({ success: false, message: 'Cart item not found' });
    }

    // Recalculate the price based on selected attributes
    let selectedPrice = cartItem.product.sellingPrice;
    const selectedColorVariant = cartItem.product.colors.find(c => c.color === cartItem.attributes.get('color'));

    if (selectedColorVariant) {
      const selectedVariant = selectedColorVariant.variants.find(variant =>
        (!variant.ram || variant.ram === cartItem.attributes.get('ram')) &&
        (!variant.storage || variant.storage === cartItem.attributes.get('storage')) &&
        (!variant.size || variant.size === cartItem.attributes.get('size'))
      );

      if (selectedVariant) {
        selectedPrice = selectedVariant.price;
      }
    }

    cartItem.quantity = newQuantity;
    cartItem.price = selectedPrice;  // Update price in the cart item
    await cartItem.save();

    const userId = req.user._id;
    const cartItems = await CartItem.find({ user: userId }).populate('product');
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.json({ success: true, newSubtotal });
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

// Route to remove item from cart
router.post('/remove', isLoggedIn, async (req, res) => {
  const { cartItemId } = req.body;

  try {
    const result = await CartItem.deleteOne({ _id: cartItemId });
    if (result.deletedCount === 0) {
      return res.json({ success: false, message: 'Cart item not found' });
    }

    const userId = req.user._id;
    const cartItems = await CartItem.find({ user: userId }).populate('product');

    // Recalculate the subtotal after removal
    const newSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    res.json({ success: true, newSubtotal });
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.json({ success: false, message: 'An error occurred. Please try again.' });
  }
});

// Route to get total cart quantity
router.get('/quantity', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await CartItem.find({ user: userId });
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
    res.json({ totalQuantity });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get cart quantity' });
  }
});

// Route to checkout cart
router.post('/cart-checkout', isLoggedIn, async (req, res) => {
  try {
    const cartItems = await CartItem.find({ user: req.user._id }).populate('product');
    
    // Ensure all prices are accurate before checkout
    cartItems.forEach(cartItem => {
      let selectedPrice = cartItem.product.sellingPrice;
      const selectedColorVariant = cartItem.product.colors.find(c => c.color === cartItem.attributes.get('color'));

      if (selectedColorVariant) {
        const selectedVariant = selectedColorVariant.variants.find(variant =>
          (!variant.ram || variant.ram === cartItem.attributes.get('ram')) &&
          (!variant.storage || variant.storage === cartItem.attributes.get('storage')) &&
          (!variant.size || variant.size === cartItem.attributes.get('size'))
        );

        if (selectedVariant) {
          selectedPrice = selectedVariant.price;
        }
      }

      cartItem.price = selectedPrice;
      cartItem.save();  // Save the updated price in case it's changed
    });

    req.session.cart = cartItems;
    console.log(req.session.cart); // Debugging line
    res.redirect('/checkout');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred fetching cart items');
  }
});

// Route to save an item for later
router.post('/save-for-later/:itemId', isLoggedIn, async (req, res) => {
  try {
    const { itemId } = req.params;
    const userId = req.user._id;

    // Find the cart item by ID and populate the product details
    const cartItem = await CartItem.findById(itemId).populate('product');
    if (!cartItem) {
      return res.status(404).send('Item not found');
    }

    // Find or create the wishlist for the user
    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: []
      });
    }

    // Add the product to the wishlist, preserving attributes and price
    wishlist.products.push({
      product: cartItem.product._id,
      attributes: {
        color: cartItem.attributes.get('color'),
        ram: cartItem.attributes.get('ram'),
        storage: cartItem.attributes.get('storage'),
        size: cartItem.attributes.get('size')
      },
      price: cartItem.price
    });

    // Save the updated wishlist
    await wishlist.save();

    // Remove the item from the cart
    await CartItem.findByIdAndDelete(itemId);

    res.redirect('/cart/view');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

module.exports = router;
