const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema({
    storeName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    password: { type: String, required: true },
    storeLogo: { type: String },
    storeBanner: { type: String },
    storeDescription: { type: String },
    businessType: { type: String, default: "Individual" },
    regNumber: { type: String },
    gstNumber: { type: String },
    panNumber: { type: String },
    yearOfEstablishment: { type: String },
    pickupAddress: { type: String },
    warehouseAddress: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    country: { type: String, default: "India" },
    isVerified: { type: Boolean, default: false },
    isOnboardingComplete: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Merchant", merchantSchema);
