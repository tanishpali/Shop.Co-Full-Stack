const express = require("express");
const Route = express.Router();
const {
    addUsers,
    getUsers,
    updateUser,
    deleteUser,
    loginUser,
    sendOtp,
    loginWithOtp,
} = require("../controllers/User/userController");

const {
    addToCart,
    getCart,
    updateCart,
    removeItemFromCart,
    clearCart,
} = require("../controllers/User/cartController");

const {
    placeOrder,
    getMyOrder,
    cancelOrder,
} = require("../controllers/User/orderController");

const {
    addReview,
    getReviewsByProduct,
    updateReview,
    deleteReview,
    getReviewByProductId,
    getReviewByUserIdOrUserName,
    getReviewByMerchantIdOrMerchantName,
    getAverageRating,
} = require("../controllers/User/reviewController");

const {
    getAllProducts,
    getProductById,
    getProductsByQuery,
} = require("../controllers/Merchant/productController"); // Public product routes

const authMiddleware = require("../middleware/authMiddleware");

// User
Route.post("/addUser", addUsers);
Route.get("/getAllUsers", authMiddleware, getUsers);
Route.put("/updateUser/:id", authMiddleware, updateUser);
Route.delete("/deleteUser/:id", authMiddleware, deleteUser);
Route.post("/login", loginUser);
Route.post("/send-otp", sendOtp);
Route.post("/login-otp", loginWithOtp);

// Products (Public/Customer View)
Route.get("/getAllProducts", getAllProducts);
Route.get("/getProductById/:id", getProductById);
Route.get("/getProductsByQuery", getProductsByQuery);

// Reviews
Route.post("/products/:productId/reviews", authMiddleware, addReview);
Route.get("/products/:productId/reviews", getReviewsByProduct);
Route.put("/reviews/:reviewId", authMiddleware, updateReview);
Route.delete("/reviews/:reviewId", authMiddleware, deleteReview);

// New Review APIs
Route.get("/reviews/product", getReviewByProductId);
Route.get("/reviews/user", getReviewByUserIdOrUserName);
Route.get("/reviews/merchant", getReviewByMerchantIdOrMerchantName);
Route.get("/reviews/average-rating", getAverageRating);

// Cart
Route.post("/addToCart", authMiddleware, addToCart);
Route.get("/getCart", authMiddleware, getCart);
Route.put("/updateCart", authMiddleware, updateCart);
Route.delete("/removeItem/:productId", authMiddleware, removeItemFromCart);
Route.delete("/clearCart", authMiddleware, clearCart);

// Order
Route.post("/placeOrder", authMiddleware, placeOrder);
Route.get("/getMyOrder", authMiddleware, getMyOrder);
Route.delete("/cancelOrder/:id", authMiddleware, cancelOrder);

module.exports = Route;
