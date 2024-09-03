// const Product = require('../models/product');
// const User = require('../models/user');

// // Handle checkout
// exports.checkout = async (req, res) => {
//   if (req.query.productId) {
//     // If coming from a direct buy, clear any existing cart session first
//     req.session.cart = null;
//   }
//   let orderDetails = [];
//   let totalCost = 0;
//   let totalSavings = 0;

//   try {
//     if (req.session.cart) {
//       // Handling checkout with multiple items from the cart
//       for (let item of req.session.cart) {
//         const subtotal = item.product.sellingPrice * item.quantity;
//         const savings = (item.product.mrpPrice - item.product.sellingPrice) * item.quantity;
//         totalCost += subtotal;
//         totalSavings += savings;
//         orderDetails.push({
//           title: item.product.title,
//           price: item.product.sellingPrice,
//           mrp: item.product.mrpPrice,
//           quantity: item.quantity,
//           subtotal: subtotal,
//           savings: savings,
//           imageUrl: item.product.images[0] // Assuming the first image is the main image
//         });
//       }
//     } else {
//       // Handling checkout with a single product (direct buy now)
//       const { productId, quantity } = req.query;
//       const product = await Product.findById(productId);
//       if (!product) {
//         return res.status(404).send('Product not found');
//       }
//       const subtotal = product.sellingPrice * quantity;
//       const savings = (product.mrpPrice - product.sellingPrice) * quantity;
//       totalCost = subtotal;
//       totalSavings = savings;
//       orderDetails.push({
//         title: product.title,
//         price: product.sellingPrice,
//         mrp: product.mrpPrice,
//         quantity: quantity,
//         subtotal: subtotal,
//         savings: savings,
//         imageUrl: product.images[0] // Assuming the first image is the main image
//       });
//     }

//     // Fetch user addresses
//     const user = await User.findById(req.user._id);
//     const addresses = user.address || [];

//     // Render the checkout page with order details, total cost, total savings, and addresses
//     res.render('checkout', { orderDetails, totalCost, totalSavings, addresses, backUrl: res.locals.backUrl });

//   } catch (error) {
//     console.error('Error during checkout:', error);
//     res.status(500).send('An error occurred during checkout');
//   }
// };
