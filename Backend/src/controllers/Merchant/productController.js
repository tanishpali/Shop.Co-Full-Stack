const productModel = require("../../models/Merchant/productModel");
const mongoose = require("mongoose");
const { isValid, isValidURL } = require("../../controllers/User/validator"); // Validator is in User folder

// Add Products
const addProducts = async (req, res) => {
  try {
    let data = req.body;

    // Capture merchantId if user is a merchant
    if (req.user && req.user.role === "merchant" && req.user.merchantId) {
      data.merchantId = req.user.merchantId;
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "Bad Request, No Data Provided!!!" });
    }

    let {
      productImages,
      productName,
      category,
      description,
      price,
      ratings,
      isFreeDelivery,
    } = data;

    // Product Images Validation
    if (!productImages || !Array.isArray(productImages) || productImages.length === 0) {
      return res.status(400).json({ msg: "At least one Product Image is Required" });
    }

    // Product Name Validation
    if (!isValid(productName)) {
      return res.status(400).json({ msg: "Product Name is Required" });
    }

    let duplicateProduct = await productModel.findOne({ productName });
    if (duplicateProduct) {
      return res.status(400).json({ msg: "Product Already Exists" });
    }

    // Category Validation
    if (!isValid(category)) {
      return res.status(400).json({ msg: "Category is Required" });
    }

    let validCategory = [
      "electronics",
      "clothing",
      "food",
      "books",
      "furniture",
    ];

    if (!validCategory.includes(category.trim().toLowerCase())) {
      return res.status(400).json({ msg: "Invalid Category" });
    }

    // Description Validation
    if (!isValid(description)) {
      return res.status(400).json({ msg: "Description is Required" });
    }

    // Price Validation
    if (!isValid(price) || price < 0) {
      return res.status(400).json({ msg: "Valid Price is Required" });
    }

    // Ratings Validation (Optional)
    if (ratings !== undefined) {
      if (ratings < 0 || ratings > 5) {
        return res.status(400).json({ msg: "Ratings must be between 0 and 5" });
      }
    } else {
      data.ratings = 0;
    }

    // isFreeDelivery Validation
    if (data.hasOwnProperty(isFreeDelivery)) {
      if (typeof isFreeDelivery !== "boolean") {
        return res
          .status(400)
          .json({ msg: "isFreeDelivery must be a boolean value" });
      }
    }

    let products = await productModel.create(data);
    return res
      .status(201)
      .json({ msg: "Product Added Successfully", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.msg, error });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    let filter = {};

    // Check if user is logged in
    // Note: getAllProducts might be public, so req.user might be undefined if no auth middleware was used.
    // However, the text implies that for "normal user / customer" it returns all.
    // If the valid token is present (auth middleware runs), we check role.

    // Assuming auth middleware populates req.user if token is present, even if route is optionally authenticated.
    // Or if the route is protected.
    // If route is public for customers but used by merchants, we need conditional logic.

    // Based on user prompt "When the logged-in user is a merchant...", it implies they are logged in.
    if (req.user && req.user.role === "merchant" && req.user.merchantId) {
      filter.merchantId = req.user.merchantId;
    }

    const products = await productModel.find(filter);

    if (products.length === 0) {
      // Ideally we return empty list 200 rather than 404 for filters, but keeping consistent.
      // However, for merchant dashboard, empty list is fine.
      if (req.user && req.user.role === 'merchant') {
        return res.status(200).json({ msg: "No products uploaded yet.", count: 0, products: [] });
      }
      return res.status(404).json({ msg: "No Products Found" });
    }

    return res
      .status(200)
      .json({ msg: "Products List", count: products.length, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Get Product By Id
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid Product ID" });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: "Product Not Found" });
    }

    return res.status(200).json({ msg: "Product Found", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Get product By Query
const getProductsByQuery = async (req, res) => {
  try {
    let {
      productName,
      category,
      minPrice,
      maxPrice,
      minRating,
      maxRating,
      isFreeDelivery,
    } = req.query;

    if (Object.keys(req.query).length === 0) {
      return res
        .status(400)
        .json({ msg: "Please provide at least one query parameter" });
    }

    let filter = {};

    if (productName) {
      filter.productName = { $regex: productName, $options: "i" };
    }

    if (category) {
      filter.category = category.toLowerCase();
    }

    if (typeof minPrice !== "undefined" || typeof maxPrice !== "undefined") {
      filter.price = {};
      if (typeof minPrice !== "undefined") filter.price.$gte = Number(minPrice);
      if (typeof maxPrice !== "undefined") filter.price.$lte = Number(maxPrice);
    }

    if (typeof minRating !== "undefined" || typeof maxRating !== "undefined") {
      filter.ratings = {};
      if (typeof minRating !== "undefined")
        filter.ratings.$gte = Number(minRating);
      if (typeof maxRating !== "undefined")
        filter.ratings.$lte = Number(maxRating);
    }

    if (typeof isFreeDelivery !== "undefined") {
      if (isFreeDelivery === "true") filter.isFreeDelivery = true;
      else if (isFreeDelivery === "false") filter.isFreeDelivery = false;
      else {
        return res.status(400).json({
          msg: "Invalid value for isFreeDelivery. Use 'true' or 'false'.",
        });
      }
    }

    const products = await productModel.find(filter);

    if (products.length === 0) {
      return res.status(404).json({ msg: "No Products Match Your Query" });
    }

    return res.status(200).json({
      msg: "Filtered Products",
      count: products.length,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Update Products
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid Product ID" });
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ msg: "No data provided for update" });
    }

    const {
      productImages,
      productName,
      category,
      description,
      price,
      ratings,
      isFreeDelivery,
    } = data;

    const updateData = {};

    // Product Images Validation
    if (productImages) {
      if (!Array.isArray(productImages) || productImages.length === 0) {
        return res.status(400).json({ msg: "Valid Product Images array is Required" });
      }
      updateData.productImages = productImages;
    }

    // Product Name Validtion
    if (productName) {
      if (!isValid(productName)) {
        return res.status(400).json({ msg: "Product Name is required" });
      }

      const duplicateProduct = await productModel.findOne({ productName });
      if (duplicateProduct) {
        return res.status(409).json({ msg: "Product Name already exists" });
      }

      updateData.productName = productName;
    }

    // Category Validation
    if (category) {
      if (!isValid(category)) {
        return res.status(400).json({ msg: "Category is Required" });
      }

      const validCategories = [
        "electronics",
        "clothing",
        "food",
        "books",
        "furniture",
      ];
      if (!validCategories.includes(category.trim().toLowerCase())) {
        return res.status(400).json({ msg: "Invalid Category" });
      }
      updateData.category = category.trim().toLowerCase();
    }

    // Description Validation
    if (description) {
      if (!isValid(description)) {
        return res.status(400).json({ msg: "Description is required" });
      }
      updateData.description = description;
    }

    // Price Validation
    if (price) {
      if (!isValid(price) || price < 0) {
        return res.status(400).json({ msg: "Valid Price is Required" });
      }
      updateData.price = price;
    }

    // Ratings
    if (ratings) {
      if (!isValid(ratings) || ratings < 0 || ratings > 5) {
        return res.status(400).json({ msg: "Valid Ratings is Required" });
      }
    }

    // isFreeDelivery Validation
    if (typeof isFreeDelivery !== "undefined") {
      if (typeof isFreeDelivery !== "boolean") {
        return res.status(400).json({
          msg: "isFreeDelivery must be a boolean (true or false)",
        });
      }
      updateData.isFreeDelivery = isFreeDelivery;
    }

    const update = await productModel.findByIdAndUpdate(productId, updateData, {
      new: true,
    });

    return res
      .status(200)
      .json({ msg: "Product Updated Successfully", update });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error", error });
  }
};

// Delete Products
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ msg: "Invalid Product ID" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product Not Found" });
    }

    await productModel.findByIdAndDelete(productId);
    return res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  addProducts,
  getAllProducts,
  getProductById,
  getProductsByQuery,
  updateProduct,
  deleteProduct,
};
