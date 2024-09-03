const mongoose = require('mongoose');
const UserInteraction = require('../models/UserInteraction'); // Correct path to your UserInteraction model
const Product = require('../models/product'); // Correct path to your Product model
const Recommendation = require('../models/recommendation'); // Correct path to your Recommendation model

// Function to build the user's product preference profile
async function buildContentUserProfile(userId) {
    try {
        const interactions = await UserInteraction.find({ user: userId }).populate('product');
        const userProfile = {};

        interactions.forEach(interaction => {
            const product = interaction.product;
            if (!product) return;

            const categories = product.categories || [];
            const tags = product.tags || [];
            
            categories.forEach(category => {
                userProfile[category] = (userProfile[category] || 0) + 1; // Increment score for each category
            });

            tags.forEach(tag => {
                userProfile[tag] = (userProfile[tag] || 0) + 1; // Increment score for each tag
            });

            // Factor in the action type (e.g., add to cart might have more weight than a view)
            switch (interaction.action) {
                case 'view':
                    categories.forEach(category => {
                        userProfile[category] += 0.5; // Less weight for a view
                    });
                    tags.forEach(tag => {
                        userProfile[tag] += 0.5;
                    });
                    break;
                case 'add_to_cart':
                    categories.forEach(category => {
                        userProfile[category] += 2; // More weight for adding to cart
                    });
                    tags.forEach(tag => {
                        userProfile[tag] += 2;
                    });
                    break;
                case 'wishlist_add':
                    categories.forEach(category => {
                        userProfile[category] += 1.5; // Intermediate weight for wishlist add
                    });
                    tags.forEach(tag => {
                        userProfile[tag] += 1.5;
                    });
                    break;
                default:
                    break;
            }
        });

        console.log('Content-Based User Profile:', userProfile);
        return userProfile;
    } catch (error) {
        console.error("Error building content-based user profile:", error);
        throw error;
    }
}

// Function to calculate content-based recommendations for a single user
async function recommendContentBasedProducts(userId) {
    try {
        const userProfile = await buildContentUserProfile(userId);

        // Find all products and calculate similarity with user profile
        const allProducts = await Product.find({});
        const recommendations = [];

        allProducts.forEach(product => {
            let similarityScore = 0;
            const categories = product.categories || [];
            const tags = product.tags || [];

            // Calculate similarity score based on categories and tags
            categories.forEach(category => {
                if (userProfile[category]) {
                    similarityScore += userProfile[category];
                }
            });

            tags.forEach(tag => {
                if (userProfile[tag]) {
                    similarityScore += userProfile[tag];
                }
            });

            if (similarityScore > 0) {
                recommendations.push({
                    product: product._id,
                    similarityScore: similarityScore
                });
            }
        });

        // Sort recommendations by similarity score
        recommendations.sort((a, b) => b.similarityScore - a.similarityScore);

        const recommendedProductIds = recommendations.map(rec => rec.product);
        console.log('Content-Based Recommended Products:', recommendedProductIds);
        return recommendedProductIds;
    } catch (error) {
        console.error("Error recommending products content-based:", error);
        throw error;
    }
}

// Function to save content-based recommendations to the database
async function saveContentBasedRecommendations(userId, recommendedProductIds) {
    try {
        // Convert product IDs to references and calculate scores
        const recommendations = recommendedProductIds.map(productId => ({
            product: new mongoose.Types.ObjectId(productId),
            score: Math.random() * 10 // Example score, replace with actual scoring logic
        }));

        // Find existing recommendation record or create a new one
        let recommendation = await Recommendation.findOne({ user: userId });

        if (recommendation) {
            // Update existing recommendation
            recommendation.products = recommendations;
            recommendation.updatedAt = Date.now();
        } else {
            // Create a new recommendation record
            recommendation = new Recommendation({
                user: new mongoose.Types.ObjectId(userId),
                products: recommendations,
            });
        }

        // Save the recommendation record to the database
        await recommendation.save();
        console.log('Content-Based Recommendations saved successfully.');
    } catch (error) {
        console.error('Error saving content-based recommendations:', error);
    }
}

module.exports = {
    recommendContentBasedProducts,
    saveContentBasedRecommendations
};
