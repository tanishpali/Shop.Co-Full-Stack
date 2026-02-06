const express = require("express");
const Route = express.Router();

const {
    registerMerchant,
    loginMerchant,
    getMerchantProfile,
    updateMerchantProfile,
    completeOnboarding,
    getMerchantStats,
    getTopRatedProduct,
} = require("../controllers/Merchant/merchantController");

const {
    addProducts,
    updateProduct,
    deleteProduct,
    getAllProducts, // Merchant may want to see all or filter by own
} = require("../controllers/Merchant/productController");

const authMiddleware = require("../middleware/authMiddleware");

// Merchant Authentication
Route.post("/merchant/register", registerMerchant);
Route.post("/merchant/login", loginMerchant);

// Merchant Profile - RESTful naming
Route.get("/merchant/profile", authMiddleware, getMerchantProfile);
Route.put("/merchant/profile", authMiddleware, updateMerchantProfile);

// Merchant Onboarding
Route.post("/merchant/onboarding", authMiddleware, completeOnboarding);

// Merchant Dashboard/Stats
Route.get("/merchant/stats", authMiddleware, getMerchantStats);
Route.get("/merchant/top-rated", authMiddleware, getTopRatedProduct);

// Merchant Product Management
// Note: standard product routes are in productController.
// We should structure them under /merchant/products if explicit, or just standard REST.
// The prompt requested: "Update all merchant routes to follow clear, descriptive REST style paths... /merchant/..."
Route.post("/merchant/products", authMiddleware, addProducts);
Route.put("/merchant/products/:id", authMiddleware, updateProduct);
Route.delete("/merchant/products/:id", authMiddleware, deleteProduct);
Route.get("/merchant/products", authMiddleware, getAllProducts); // This controller now filters by merchantId if logged in!

module.exports = Route;
