// cashfreeConfig.js
module.exports = {
    clientId: process.env.CASHFREE_APP_ID,
    clientSecret: process.env.CASHFREE_SECRET_KEY,
    apiUrl: process.env.CASHFREE_API_URL,
    apiVersion: "2023-08-01",
    environment: "PRODUCTION"
};

// module.exports = {
//     clientId: process.env.CASHFREE_SANDBOX_APP_ID,
//     clientSecret: process.env.CASHFREE_SANDBOX_SECRET_KEY,
//     apiUrl: "https://sandbox.cashfree.com/pg",
//     apiVersion: "2023-08-01",
//     environment: "TEST"
// };
