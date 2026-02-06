const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./src/routes/userRoute");
const merchantRoutes = require("./src/routes/merchantRoute");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/users", userRoutes); // Mount user routes under /api/users or root?
// User routes include /login, /addUser etc. Usually these are /api/addUser or just /addUser.
// The previous code mounted at / and /api.
// To avoid breaking frontend which calls /login, /getAllProducts etc, I should mount at / or /api depending on frontend.
// Let's assume standard behavior: Keep them at root relative to the mount point if the paths in route files don't have prefixes.
// userRoute has /addUser. If I mount at /, it is /addUser.
// merchantRoute has /merchant/...
app.use("/", userRoutes);
app.use("/", merchantRoutes);

const path = require("path");
const multer = require("multer");

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

// Check File Type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload Endpoint
app.post('/upload', upload.single('productImage'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: 'No file uploaded' });
        }
        // Return the URL to access the file
        const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
        res.status(200).json({
            msg: 'File uploaded successfully',
            imageUrl: imageUrl
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/backend")
    .then(() => {
        console.log("Connected to MongoDB established");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
