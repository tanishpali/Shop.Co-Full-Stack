const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const reviewSchema = new mongoose.Schema(
    {
        userId: {
            type: ObjectId,
            ref: "user",
        },
        userName: {
            type: String,
        },
        productId: {
            type: ObjectId,
            ref: "product",
            required: true,
        },
        merchantId: {
            type: ObjectId,
            ref: "Merchant",
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
        comment: {
            type: String, // mapped to 'content' in user request, keeping comment for consistency or we can alias
            trim: true,
        },
        title: {
            type: String,
            trim: true,
        },
        content: {
            type: String,
            trim: true
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("review", reviewSchema);
