const reviewModel = require("../../models/User/reviewModel");
const productModel = require("../../models/Merchant/productModel");
const merchantModel = require("../../models/Merchant/merchantModel");
const mongoose = require("mongoose");
const { isValid } = require("./validator");
const userModel = require("../../models/User/userModel");

// Add Review
const addReview = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { rating, title, content, isVerified } = req.body;
        // Depending on auth middleware, user ID is in req.user.userId
        const userId = req.user ? req.user.userId : null;
        const userName = req.user ? req.user.name : "Anonymous"; // This might need fetching from DB if not in token

        // Fetch User to get Name if not in token
        let finalUserName = userName;
        if (userId) {
            const userObj = await userModel.findById(userId);
            if (userObj) finalUserName = userObj.name;
        }

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid Product ID" });
        }

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: "Product Not Found" });
        }

        if (!isValid(rating)) {
            return res.status(400).json({ msg: "Rating is required" });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ msg: "Rating must be between 1 and 5" });
        }

        const newReview = await reviewModel.create({
            userId,
            userName: finalUserName,
            productId,
            merchantId: product.merchantId, // Auto-populate from product
            rating,
            title,
            content: content || req.body.comment, // Support both fields
            comment: content || req.body.comment, // Redundant but safe
            isVerified: isVerified || false
        });

        // Update product average rating
        const reviews = await reviewModel.find({ productId });
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = totalRating / reviews.length;

        product.ratings = avgRating;
        await product.save();

        return res.status(201).json({ msg: "Review added successfully", review: newReview });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

// Get Reviews for a Product (Original / Alias)
const getReviewsByProduct = async (req, res) => {
    return getReviewByProductId(req, res);
};

// getReviewByProductId
const getReviewByProductId = async (req, res) => {
    try {
        const productId = req.params.productId || req.query.productId;

        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ msg: "Invalid Product ID" });
        }

        const reviews = await reviewModel.find({ productId }).sort({ createdAt: -1 });

        if (reviews.length === 0) {
            return res.status(200).json({ msg: "No reviews found", reviews: [] });
        }

        return res.status(200).json({ msg: "Reviews fetched successfully", reviews });
    } catch (error) {
        return res.status(500).json({ msg: "Error fetching reviews", error: error.message });
    }
};

// getReviewByUserIdOrUserName
const getReviewByUserIdOrUserName = async (req, res) => {
    try {
        const { userId, userName } = req.query;

        let filter = {};
        if (userId) {
            if (mongoose.Types.ObjectId.isValid(userId)) {
                filter.userId = userId;
            }
        } else if (userName) {
            filter.userName = { $regex: userName, $options: "i" };
        } else {
            return res.status(400).json({ msg: "Provide userId or userName in query" });
        }

        const reviews = await reviewModel.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({ count: reviews.length, reviews });

    } catch (error) {
        return res.status(500).json({ msg: "Error fetching reviews", error: error.message });
    }
};

// getReviewByMerchantIdOrMerchantName
const getReviewByMerchantIdOrMerchantName = async (req, res) => {
    try {
        const { merchantId, merchantName } = req.query;

        let filter = {};
        if (merchantId) {
            if (mongoose.Types.ObjectId.isValid(merchantId)) {
                filter.merchantId = merchantId;
            }
        } else if (merchantName) {
            // Find merchant first
            const merchant = await merchantModel.findOne({ storeName: { $regex: merchantName, $options: "i" } });
            if (!merchant) {
                return res.status(404).json({ msg: "Merchant not found" });
            }
            filter.merchantId = merchant._id;
        } else {
            return res.status(400).json({ msg: "Provide merchantId or merchantName in query" });
        }

        const reviews = await reviewModel.find(filter).sort({ createdAt: -1 });

        // Ensure current merchant can only see his own reviews if he calls this? 
        // Requirement says: "When the logged-in user is a merchant: The API must return only those products ... " 
        // But for reviews, it doesn't explicitly restrict visibility of reviews TO the merchant, but implies filtering BY merchant.

        return res.status(200).json({ count: reviews.length, reviews });

    } catch (error) {
        return res.status(500).json({ msg: "Error fetching reviews", error: error.message });
    }
};

// getAverageRating
const getAverageRating = async (req, res) => {
    try {
        const { productId, merchantId } = req.query;
        let matchStage = {};

        if (productId) {
            if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ msg: "Invalid Product ID" });
            matchStage = { productId: new mongoose.Types.ObjectId(productId) };
        } else if (merchantId) {
            if (!mongoose.Types.ObjectId.isValid(merchantId)) return res.status(400).json({ msg: "Invalid Merchant ID" });
            matchStage = { merchantId: new mongoose.Types.ObjectId(merchantId) };
        } else {
            return res.status(400).json({ msg: "Provide productId or merchantId" });
        }

        const stats = await reviewModel.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                    count: { $sum: 1 }
                }
            }
        ]);

        if (stats.length === 0) {
            return res.status(200).json({ averageRating: 0, count: 0 });
        }

        return res.status(200).json({ averageRating: stats[0].averageRating, count: stats[0].count });

    } catch (error) {
        return res.status(500).json({ msg: "Error calculating average", error: error.message });
    }
};

// Update Review
const updateReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const { rating, comment, content, title } = req.body;
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ msg: "Invalid Review ID" });
        }

        const review = await reviewModel.findById(reviewId);
        if (!review) {
            return res.status(404).json({ msg: "Review Not Found" });
        }

        // Check authorization
        if (review.userId && review.userId.toString() !== userId) {
            return res.status(403).json({ msg: "Not authorized to update this review" });
        }

        if (rating) {
            if (rating < 1 || rating > 5) {
                return res.status(400).json({ msg: "Rating must be between 1 and 5" });
            }
            review.rating = rating;
        }

        const finalContent = content || comment;
        if (finalContent && isValid(finalContent)) {
            review.content = finalContent;
            review.comment = finalContent;
        }

        if (title) review.title = title;

        await review.save();

        // Recalculate product rating
        const productId = review.productId;
        const reviews = await reviewModel.find({ productId });
        const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
        const avgRating = totalRating / reviews.length;

        await productModel.findByIdAndUpdate(productId, { ratings: avgRating });

        return res.status(200).json({ msg: "Review updated successfully", review });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

// Delete Review
const deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.user.userId;

        if (!mongoose.Types.ObjectId.isValid(reviewId)) {
            return res.status(400).json({ msg: "Invalid Review ID" });
        }

        const review = await reviewModel.findById(reviewId);
        if (!review) {
            return res.status(404).json({ msg: "Review Not Found" });
        }

        // Check authorization
        if (review.userId && review.userId.toString() !== userId) {
            return res.status(403).json({ msg: "Not authorized to delete this review" });
        }

        const productId = review.productId;

        await reviewModel.findByIdAndDelete(reviewId);

        // Recalculate product rating
        const reviews = await reviewModel.find({ productId });
        let avgRating = 0;
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
            avgRating = totalRating / reviews.length;
        }

        await productModel.findByIdAndUpdate(productId, { ratings: avgRating });

        return res.status(200).json({ msg: "Review deleted successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
};

module.exports = {
    addReview,
    getReviewsByProduct,
    getReviewByProductId,
    getReviewByUserIdOrUserName,
    getReviewByMerchantIdOrMerchantName,
    getAverageRating,
    updateReview,
    deleteReview
};
