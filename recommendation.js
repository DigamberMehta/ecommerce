const mongoose = require('mongoose');
const UserInteraction = require('./models/UserInteraction'); // Correct path to your UserInteraction model
const Product = require('./models/product'); // Correct path to your Product model
const Recommendation = require('./models/recommendation'); // Correct path to your Recommendation model

// Function to build the user-product interaction matrix from UserInteraction data
async function buildUserProductMatrix() {
    try {
        const interactions = await UserInteraction.find({}).populate('product');
        const userProductMatrix = {};

        interactions.forEach(interaction => {
            const userId = interaction.user.toString();
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
                default:
                    break;
            }

            userProductMatrix[userId][productId] = (userProductMatrix[userId][productId] || 0) + score;
        });

        console.log('User-Product Matrix:', userProductMatrix);
        return userProductMatrix;
    } catch (error) {
        console.error("Error building user-product matrix:", error);
        throw error;
    }
}

// Function to calculate similarity between two users based on their interactions
function calculateSimilarity(matrix, userId1, userId2) {
    const user1Products = matrix[userId1];
    const user2Products = matrix[userId2];
    let sum = 0;

    for (let productId in user1Products) {
        if (user2Products[productId]) {
            sum += user1Products[productId] * user2Products[productId];
        }
    }

    return sum;
}

// Function to find users similar to a given user
async function findSimilarUsers(userId) {
    try {
        const matrix = await buildUserProductMatrix();
        const similarities = {};

        for (let otherUserId in matrix) {
            if (otherUserId !== userId) {
                const similarity = calculateSimilarity(matrix, userId, otherUserId);
                if (similarity > 0) {
                    similarities[otherUserId] = similarity;
                }
            }
        }

        console.log('Similarities:', similarities);
        return Object.entries(similarities).sort((a, b) => b[1] - a[1]);
    } catch (error) {
        console.error("Error finding similar users:", error);
        throw error;
    }
}

// Function to recommend products to a user based on similar users
async function recommendProducts(userId) {
    try {
        const similarUsers = await findSimilarUsers(userId);
        const matrix = await buildUserProductMatrix();
        const userInteractions = matrix[userId];
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

        console.log('Recommended Products:', recommendedProductIds);
        return recommendedProductIds;
    } catch (error) {
        console.error("Error recommending products:", error);
        throw error;
    }
}

// Function to save recommendations to the database

async function saveRecommendations(userId, recommendedProductIds) {
    try {
        // Convert product IDs to references and calculate scores
        const recommendations = recommendedProductIds.map(productId => ({
            product: new mongoose.Types.ObjectId(productId), // Ensure `new` is used with `ObjectId`
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
                user: new mongoose.Types.ObjectId(userId), // Use `new` with `ObjectId` for the user as well
                products: recommendations,
            });
        }

        // Save the recommendation record to the database
        await recommendation.save();
    } catch (error) {
        console.error('Error saving recommendations:', error);
    }
}

module.exports = {
    recommendProducts,
    saveRecommendations
};

