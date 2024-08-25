const mongoose = require('mongoose');
const UserInteraction = require('../models/UserInteraction'); // Correct path to your UserInteraction model
const Product = require('../models/product'); // Correct path to your Product model
const Recommendation = require('../models/recommendation'); // Correct path to your Recommendation model

// Function to build the user-product interaction matrix from UserInteraction data
async function buildCollaborativeUserProductMatrix() {
    try {
        const interactions = await UserInteraction.find({}).populate('product');
        const userProductMatrix = {};

        interactions.forEach(interaction => {
            const userId = interaction.user.toString();

            if (!interaction.product) {
                console.warn(`Product not found for interaction: ${interaction._id}`);
                return; // Skip this iteration if product is undefined
            }

            const productId = interaction.product._id.toString();

            if (!userProductMatrix[userId]) {
                userProductMatrix[userId] = {};
            }

            let score = 0;

            switch (interaction.action) {
                case 'view':
                    score = 1;
                    break;
                case 'search':
                    score = 2;
                    break;
                case 'add_to_cart':
                    score = 3;
                    break;
                case 'wishlist_add':
                    score = 2.5;
                    break;
                default:
                    break;
            }

            userProductMatrix[userId][productId] = (userProductMatrix[userId][productId] || 0) + score;
        });

        console.log('Collaborative User-Product Matrix:', userProductMatrix);
        return userProductMatrix;
    } catch (error) {
        console.error("Error building collaborative user-product matrix:", error);
        throw error;
    }
}

// Function to calculate similarity between two users based on their interactions
function calculateUserSimilarity(matrix, userId1, userId2) {
    const user1Products = matrix[userId1];
    const user2Products = matrix[userId2];
    let sum = 0;
    let sumUser1Squares = 0;
    let sumUser2Squares = 0;

    for (let productId in user1Products) {
        if (user2Products[productId]) {
            sum += user1Products[productId] * user2Products[productId];
        }
        sumUser1Squares += Math.pow(user1Products[productId], 2);
    }

    for (let productId in user2Products) {
        sumUser2Squares += Math.pow(user2Products[productId], 2);
    }

    // Calculate cosine similarity
    const denominator = Math.sqrt(sumUser1Squares) * Math.sqrt(sumUser2Squares);
    return denominator ? sum / denominator : 0;
}

// Function to find users similar to a given user
async function findCollaborativeSimilarUsers(userId) {
    try {
        const matrix = await buildCollaborativeUserProductMatrix();
        const similarities = {};

        for (let otherUserId in matrix) {
            if (otherUserId !== userId) {
                const similarity = calculateUserSimilarity(matrix, userId, otherUserId);
                if (similarity > 0) {
                    similarities[otherUserId] = similarity;
                }
            }
        }

        console.log('Collaborative Similarities:', similarities);
        return Object.entries(similarities).sort((a, b) => b[1] - a[1]);
    } catch (error) {
        console.error("Error finding collaborative similar users:", error);
        throw error;
    }
}

// Function to recommend products to a user based on similar users
async function recommendCollaborativeProducts(userId) {
    try {
        const similarUsers = await findCollaborativeSimilarUsers(userId);
        const matrix = await buildCollaborativeUserProductMatrix();
        const userInteractions = matrix[userId] || {};
        const recommendations = {};

        similarUsers.forEach(([similarUserId, similarity]) => {
            const products = matrix[similarUserId];

            for (let productId in products) {
                if (!userInteractions[productId]) {
                    recommendations[productId] = (recommendations[productId] || 0) + similarity * products[productId];
                }
            }
        });

        const recommendedProductIds = Object.entries(recommendations)
            .sort((a, b) => b[1] - a[1])
            .map(([productId]) => productId);

        console.log('Collaborative Recommended Products:', recommendedProductIds);
        return recommendedProductIds;
    } catch (error) {
        console.error("Error recommending collaborative products:", error);
        throw error;
    }
}

// Function to save collaborative filtering recommendations to the database
async function saveCollaborativeRecommendations(userId, recommendedProductIds) {
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
        console.log('Collaborative Recommendations saved successfully.');
    } catch (error) {
        console.error('Error saving collaborative recommendations:', error);
    }
}

module.exports = {
    recommendCollaborativeProducts,
    saveCollaborativeRecommendations
};
