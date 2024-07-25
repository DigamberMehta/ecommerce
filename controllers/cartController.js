// const CartItem = require('../models/cartItem');
// const Product = require('../models/product');
// const User = require('../models/user');
// const Wishlist = require('../models/wishlist');

// // Add a product to the cart
// exports.addToCart = async (req, res) => {
//   const { productId, quantity } = req.body;
//   const userId = req.user._id;

//   console.log('Product ID:', productId);
//   console.log('User ID:', userId);

//   try {
//     // Check if the product exists
//     const product = await Product.findById(productId);
//     if (!product) {
//       console.log('Product not found');
//       return res.status(404).json({ success: false, message: 'Product not found' });
//     }

//     // Check if the cart item already exists
//     let cartItem = await CartItem.findOne({ user: userId, product: productId });
//     if (cartItem) {
//       cartItem.quantity += 1; // Increase quantity if item already in cart
//     } else {
//       cartItem = new CartItem({
//         user: userId,
//         product: productId,
//         quantity: parseInt(quantity, 10) || 1 // Ensure quantity is parsed as an integer
//       });
//     }

//     await cartItem.save();

//     // Update the user's cart
//     const user = await User.findById(userId);
//     if (!user.cart.includes(cartItem._id)) {
//       user.cart.push(cartItem._id);
//       await user.save();
//     }

//     console.log('Product added to cart successfully');
//     return res.redirect(req.get('referer')); // Redirect back to the same page
//   } catch (error) {
//     console.error('Error adding product to cart:', error);
//     return res.status(500).json({ success: false, message: 'An error occurred. Please try again.' });
//   }
// };





// // View cart items
// exports.viewCart = async (req, res) => {
//   const userId = req.user._id;

//   try {
//     const cartItems = await CartItem.find({ user: userId }).populate('product');

//     res.render('home/cart', { cartItems });
//   } catch (error) {
//     console.error('Error retrieving cart items:', error);
//     req.flash('error', 'An error occurred. Please try again.');
//     res.redirect('back');
//   }
// };

// // Update cart item quantity
// exports.updateCart = async (req, res) => {
//   const { cartItemId, newQuantity } = req.body;

//   try {
//     const cartItem = await CartItem.findById(cartItemId);

//     if (!cartItem) {
//       return res.json({ success: false, message: 'Cart item not found' });
//     }

//     cartItem.quantity = newQuantity;
//     await cartItem.save();

//     const userId = req.user._id;
//     const cartItems = await CartItem.find({ user: userId }).populate('product');
//     const newSubtotal = cartItems.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);

//     res.json({ success: true, newSubtotal });
//   } catch (error) {
//     console.error('Error updating cart item quantity:', error);
//     res.json({ success: false, message: 'An error occurred. Please try again.' });
//   }
// };

// // Remove item from cart
// exports.removeFromCart = async (req, res) => {
//   const { cartItemId } = req.body;

//   try {
//     // Delete the cart item
//     const result = await CartItem.deleteOne({ _id: cartItemId });

//     if (result.deletedCount === 0) {
//       return res.json({ success: false, message: 'Cart item not found' });
//     }

//     // Remove the item from the user's cart array
//     const userId = req.user._id;
//     await User.updateOne({ _id: userId }, { $pull: { cart: cartItemId } });

//     // Calculate the new subtotal
//     const cartItems = await CartItem.find({ user: userId }).populate('product');
//     const newSubtotal = cartItems.reduce((sum, item) => sum + item.product.sellingPrice * item.quantity, 0);

//     res.json({ success: true, newSubtotal });
//   } catch (error) {
//     console.error('Error removing cart item:', error);
//     res.json({ success: false, message: 'An error occurred. Please try again.' });
//   }
// };

// // Get total cart quantity
// exports.getCartQuantity = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const cartItems = await CartItem.find({ user: userId });
//     const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
//     res.json({ totalQuantity });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to get cart quantity' });
//   }
// };

// // Checkout cart
// exports.checkoutCart = async (req, res) => {
//   try {
//     const cartItems = await CartItem.find({ user: req.user._id }).populate('product');
//     req.session.cart = cartItems;  // Save cart items to session
//     res.redirect('/checkout');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('An error occurred fetching cart items');
//   }
// };

// // Save for later
// exports.saveForLater = async (req, res) => {
//   try {
//     const { itemId } = req.params;
//     const userId = req.user._id;  // Assuming you're using some form of user authentication

//     // Find and then remove the cart item
//     const cartItem = await CartItem.findById(itemId);
//     if (cartItem) {
//       // Remove the cart item
//       await CartItem.findByIdAndDelete(itemId);

//       // Add to Wishlist
//       const wishlist = await Wishlist.findOne({ user: userId });
//       if (wishlist) {
//         wishlist.products.push(cartItem.product);  // Assuming you want to save product ID to the wishlist
//         await wishlist.save();
//       } else {
//         // If no wishlist exists, create a new one
//         const newWishlist = new Wishlist({
//           user: userId,
//           products: [cartItem.product]
//         });
//         await newWishlist.save();
//       }

//       res.redirect('/cart/view');  // Redirect back to the cart page or wherever appropriate
//     } else {
//       res.status(404).send('Item not found');
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('An error occurred');
//   }
// };
