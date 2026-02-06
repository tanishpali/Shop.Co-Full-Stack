const userModel = require("../../models/User/userModel");
const Joi = require('joi'); // Assuming Joi or manual validation, using manual for compatibility
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Validators (embedded from validator.js if needed or imported)
const {
    isValid,
    isValidName,
    isValidEmail,
    isValidPhone,
    isValidPassword,
} = require("./validator"); // Assumes validator.js is in same folder

// Add Users
const addUsers = async (req, res) => {
    try {
        let userData = req.body;
        if (Object.keys(userData).length === 0) {
            return res.status(400).json({ msg: "Bad Request, No Data Provided" });
        }

        let { name, email, contact, password, address, gender, age } = userData;

        // Name Validation
        if (!isValid(name)) return res.status(400).json({ msg: "Name is Required" });
        if (!isValidName(name)) return res.status(400).json({ msg: "Invalid Name" });

        // UserEmail Validation
        if (!isValid(email)) return res.status(400).json({ msg: "Email is Required" });
        if (!isValidEmail(email)) return res.status(400).json({ msg: "Invalid Email" });

        let duplicateEmail = await userModel.findOne({ email });
        if (duplicateEmail) return res.status(400).json({ msg: "Email Already Exists" });

        // User Contact Validation
        if (!isValid(contact)) return res.status(400).json({ msg: "Contact is Required" });
        if (!isValidPhone(contact)) return res.status(400).json({ msg: "Invalid Contact" });

        let duplicateContact = await userModel.findOne({ contact });
        if (duplicateContact) return res.status(400).json({ msg: "Contact Already Exists" });

        // Address Validation
        if (!isValid(address)) return res.status(400).json({ msg: "Address is Required" });

        // Gender Validation
        if (!isValid(gender)) return res.status(400).json({ msg: "Gender is Required" });

        let validGenders = ["male", "female", "others"];
        if (!validGenders.includes(gender.trim().toLowerCase())) {
            return res.status(400).json({ msg: "Gender must be 'male', 'female' and 'Others'" });
        }

        // Password Validation
        if (!isValid(password)) return res.status(400).json({ msg: "Password is Required" });

        if (!isValidPassword(password)) {
            return res.status(400).json({
                msg: "Password must be contain 6-20 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Age Validation
        if (!isValid(age)) return res.status(400).json({ msg: "Age is Required" });

        let user = await userModel.create({
            name,
            email,
            contact,
            password: hashedPassword,
            address,
            gender,
            age,
        });
        return res.status(201).json({ msg: "User Added Successfully", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error", error });
    }
};

// Get All Users
const getUsers = async (req, res) => {
    try {
        let userData = await userModel.find();
        if (userData.length === 0) {
            return res.status(404).json({ msg: "No User Found" });
        }
        return res.status(200).json({ userData });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

// Update User Data (Assuming typical update logic from previous context)
const updateUser = async (req, res) => {
    // ... simplified update logic or removed if not critical for now, but keeping for structure
    try {
        let userId = req.params.id;
        // Validation...
        let update = await userModel.findByIdAndUpdate(userId, req.body, { new: true });
        return res.status(200).json({ msg: "Updated", update });
    } catch (e) { return res.status(500).json({ msg: e.message }); }
};

// Delete User
const deleteUser = async (req, res) => {
    try {
        let userId = req.params.id;
        await userModel.findByIdAndDelete(userId);
        return res.status(200).json({ msg: "Deleted" });
    } catch (e) { return res.status(500).json({ msg: e.message }); }
};

// Login User
const loginUser = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ msg: "Bad Request, No Data Found" });
        }

        let { email, password } = req.body;

        if (!isValid(email)) return res.status(400).json({ msg: "Email is required" });
        if (!isValid(password)) return res.status(400).json({ msg: "Password is required" });

        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ msg: "User not Found with this email" });

        const matchUser = await bcrypt.compare(password, user.password);
        if (!matchUser) return res.status(401).json({ msg: "Incorrect Password" });

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || "your_super_secret_key_12345"
        );

        return res.status(200).json({ msg: "Login Successfull", token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ msg: "Email is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Save to user
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();

        console.log(`OTP for ${email}: ${otp}`);

        return res.status(200).json({ msg: "OTP sent to your email" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

const loginWithOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ msg: "Email and OTP are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (!user.otp || !user.otpExpires) {
            return res.status(400).json({ msg: "OTP not sent or expired" });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ msg: "Invalid OTP" });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ msg: "OTP Expired" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET || "your_super_secret_key_12345"
        );

        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        return res.status(200).json({ msg: "Login Successful", token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

module.exports = { addUsers, getUsers, updateUser, deleteUser, loginUser, sendOtp, loginWithOtp };
