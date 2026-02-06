const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productImages: {
      type: [String],
      required: true,
      validate: [(val) => val.length > 0, 'Must have at least one image']
    },
    productName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    category: {
      type: String,
      enum: ["electronics", "clothing", "food", "books", "furniture"],
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ratings: {
      type: Number,
      required: false,
    },
    isFreeDelivery: {
      type: Boolean,
      default: true,
    },
    merchantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Merchant",
    },

  },
  { timestamps: true }
);

module.exports = new mongoose.model("product", productSchema);
