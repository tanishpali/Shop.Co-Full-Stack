const merchantModel = require("../../models/Merchant/merchantModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerMerchant = async (req, res) => {
    try {
        const { storeName, ownerName, email, mobileNumber, password } = req.body;
        // Basic validation
        if (!storeName || !email || !password) return res.status(400).json({ msg: "Missing required fields" });

        const existing = await merchantModel.findOne({ email });
        if (existing) return res.status(400).json({ msg: "Merchant already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const merchant = await merchantModel.create({ ...req.body, password: hashedPassword });
        res.status(201).json({ msg: "Merchant Registered", merchant });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

const loginMerchant = async (req, res) => {
    try {
        const { email, password } = req.body;
        const merchant = await merchantModel.findOne({ email });
        if (!merchant) return res.status(404).json({ msg: "Merchant not found" });

        const isMatch = await bcrypt.compare(password, merchant.password);
        if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

        const token = jwt.sign({ merchantId: merchant._id, role: "merchant" }, process.env.JWT_SECRET || "your_super_secret_key_12345");
        res.status(200).json({ msg: "Login success", token });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

const getMerchantProfile = async (req, res) => {
    try {
        const merchant = await merchantModel.findById(req.user.merchantId);
        res.status(200).json({ merchant });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

const updateMerchantProfile = async (req, res) => {
    try {
        const merchant = await merchantModel.findByIdAndUpdate(req.user.merchantId, req.body, { new: true });
        res.status(200).json({ merchant });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

const completeOnboarding = async (req, res) => {
    try {
        const merchant = await merchantModel.findByIdAndUpdate(req.user.merchantId, { ...req.body, isOnboardingComplete: true }, { new: true });
        res.status(200).json({ msg: "Onboarding complete", merchant });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

const getMerchantStats = async (req, res) => {
    res.status(200).json({ msg: "Stats (Placeholder)" });
};

const getTopRatedProduct = async (req, res) => {
    try {
        const merchantId = req.user.merchantId;
        const productModel = require("../../models/Merchant/productModel");

        // Find highest rated product for this merchant
        const product = await productModel.findOne({ merchantId }).sort({ ratings: -1 });

        if (!product) {
            return res.status(200).json({ msg: "No products found", product: null });
        }

        return res.status(200).json({ product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = { registerMerchant, loginMerchant, getMerchantProfile, updateMerchantProfile, completeOnboarding, getMerchantStats, getTopRatedProduct };
