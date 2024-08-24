// const Product = require('../models/product');
// const Review = require('../models/review');
// const UserInteraction = require('../models/UserInteraction');
// const Wishlist = require('../models/wishlist');

// function camelCaseToTitleCase(camelCase) {
//     return camelCase
//         .replace(/([A-Z])/g, ' $1') // Add space before capital letters
//         .replace(/^./, function(str) { return str.toUpperCase(); }); // Capitalize the first letter
// }

// // Show product details
// exports.showProduct = async (req, res) => {
//     try {
//         const { id, slug } = req.params;

//         // Populate reviews and their user field
//         const product = await Product.findOne({ _id: id, slug: slug })
//             .populate({
//                 path: 'reviews',
//                 populate: {
//                     path: 'user',
//                     select: 'name' // Adjust this if you need more fields from the User model
//                 }
//             });

//         if (!product) {
//             return res.status(404).send('Product not found');
//         }

//         // Log product view and entry time
//         if (req.user) {
//             const entryTime = new Date(); // Capture the current time as the entry time

//             await UserInteraction.create({
//                 user: req.user._id,
//                 product: product._id,
//                 action: 'view',
//                 category: product.categories[0],
//                 entryTime: entryTime // Save the entry time
//             });
//         }

//         // Check if the product is in the user's wishlist
//         let isInWishlist = false;
//         if (req.isAuthenticated()) {
//             const wishlist = await Wishlist.findOne({ user: req.user._id });
//             if (wishlist && wishlist.products.includes(product._id)) {
//                 isInWishlist = true;
//             }
//         }

//         // Fetch recommended products based on user interactions
//         let recommendedProducts = [];
//         if (req.isAuthenticated()) {
//             const userId = req.user._id;
//             const interactions = await UserInteraction.find({ user: userId });

//             const viewedCategories = interactions
//                 .filter(interaction => interaction.action === 'view')
//                 .map(interaction => interaction.category);

//             const searchedCategories = interactions
//                 .filter(interaction => interaction.action === 'search')
//                 .map(interaction => interaction.category);

//             const addedToCartCategories = interactions
//                 .filter(interaction => interaction.action === 'add_to_cart')
//                 .map(interaction => interaction.category);

//             const allCategories = [...viewedCategories, ...searchedCategories, ...addedToCartCategories];
//             const uniqueCategories = [...new Set(allCategories)];

//             recommendedProducts = await Product.find({ categories: { $in: uniqueCategories } });
//         }

//         // Render the product show page
//         res.render('home/show', { 
//             product, 
//             recommendedProducts, 
//             camelCaseToTitleCase, 
//             isInWishlist,
//             request: req // Pass the request object to the template
//         });
//     } catch (error) {
//         console.error(error);
//         req.flash('error', 'An error occurred. Please try again.');
//         res.redirect('/'); // Redirect to a safe page on error
//     }
// };

// // Route to log exit time and calculate duration
// exports.logExitTime = async (req, res) => {
//     try {
//         const { productId, exitTime } = req.body;

//         if (req.user) {
//             const interaction = await UserInteraction.findOne({
//                 user: req.user._id,
//                 product: productId,
//                 action: 'view'
//             }).sort({ entryTime: -1 }); // Find the most recent view interaction

//             if (interaction) {
//                 interaction.exitTime = new Date(exitTime);
//                 interaction.duration = (new Date(exitTime) - interaction.entryTime) / 1000; // Duration in seconds
//                 await interaction.save();
//             }
//         }

//         res.status(200).json({ message: 'Exit time logged successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'An error occurred while logging the exit time' });
//     }
// };
