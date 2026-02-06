import React, { useState } from "react";
// Cookies is used to get the login token
import Cookies from "js-cookie";
// toast is used for showing alerts/notifications
import { toast } from "sonner";
import Navbar from "./Navbar/Navbar";
import Footer from "./Homepage/Footer";

// ✅ DATA: List of Categories and Sub-categories
// We keep this outside the component to make the code cleaner.
const categoryData = {
  electronics: [
    "mobiles", "laptops", "tablets", "headphones", "cameras",
    "smart-watches", "televisions", "gaming-consoles"
  ],
  clothing: [
    "mens-clothing", "womens-clothing", "kids-clothing", "tshirts",
    "shirts", "jeans", "dresses", "jackets"
  ],
  food: [
    "grocery", "snacks", "bakery", "beverages", "dairy",
    "frozen-food", "spices", "fruits"
  ],
  books: [
    "fiction", "non-fiction", "academic", "comics", "children",
    "business", "science", "novels"
  ],
  furniture: [
    "sofas", "beds", "tables", "chairs", "wardrobes",
    "office-furniture", "dining-sets"
  ]
};

export default function AddProductUI({ isMerchant = false }) {
  // ✅ STATE: Variables to hold form data
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Variables for the image file and preview url
  const [productImages, setProductImages] = useState([]); // Stores URLs

  // Loading state for the button
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // ✅ LOGIC: Upload Image to Backend immediately
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    // If no file selected, do nothing
    if (files.length === 0) return;

    setUploadingImage(true);
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Please login first to upload image");
      setUploadingImage(false);
      return;
    }

    try {
      const uploadedUrls = [];

      // Loop through each file and upload
      for (const file of files) {
        // Check if it is an image
        if (!file.type.startsWith("image/")) {
          toast.error(`Scanning skipped for non-image: ${file.name}`);
          continue;
        }
        // Check size (must be less than 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`Skipped ${file.name}: Too big (Max 5MB)`);
          continue;
        }

        const formData = new FormData();
        formData.append("productImage", file);

        const res = await fetch("http://localhost:4000/upload", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(`Failed to upload ${file.name}:`, data.msg);
          toast.error(`Failed to upload ${file.name}`);
          continue;
        }

        // Add to our list
        uploadedUrls.push(data.imageUrl);
      }

      // Update state with new images (keeping old ones)
      setProductImages((prev) => [...prev, ...uploadedUrls]);

      if (uploadedUrls.length > 0) {
        toast.success(`${uploadedUrls.length} Image(s) uploaded!`);
      }

    } catch (error) {
      console.error("Upload Error:", error);
      toast.error("Failed to upload images");
    } finally {
      setUploadingImage(false);
    }
  };

  // ✅ LOGIC: Remove selected image
  const removeImage = (indexToRemove) => {
    setProductImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // ✅ LOGIC: Submit the Form
  const handleSubmit = async () => {
    // 1. Check if all fields are filled
    if (!productName) return toast.error("Enter product name");
    if (!category) return toast.error("Select a category");
    if (!subCategory) return toast.error("Select a sub-category");
    if (!price) return toast.error("Enter price");

    // Check if image is uploaded (we need at least one)
    if (productImages.length === 0) return toast.error("Please upload at least one image");

    setLoading(true);

    try {
      // 2. Get the user token
      const token = Cookies.get("token");
      if (!token) {
        toast.error("Please login first");
        setLoading(false);
        return;
      }

      // 3. Prepare data to send (JSON)
      const productData = {
        productName,
        category,
        subCategory,
        price,
        description,
        productImages: productImages // sending array of URLs
      };

      // 4. Send request to backend
      const endpoint = isMerchant
        ? "http://localhost:4000/merchant/products"
        : "http://localhost:4000/addProducts";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Failed to add product");
      }

      // 5. Success!
      toast.success("Product Added details Successfully!");

      // Clear the form
      setProductName("");
      setCategory("");
      setSubCategory("");
      setPrice("");
      setDescription("");
      setProductImages([]); // Clear images

    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8">
      {!isMerchant && <Navbar />}


      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">

        {/* --- LEFT SIDE: IMAGE UPLOAD --- */}
        <div className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-sm min-h-[500px]">

          {/* Main Content Area - Always Visible Upload Zone */}
          <div className="flex flex-1 flex-col items-center justify-center">
            <label className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />

              {/* Icon Circle */}
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>

              <h3 className="mb-2 text-xl font-bold text-gray-900">Upload Product Images</h3>
              <p className="text-center text-gray-500 max-w-xs">
                {productImages.length > 0 ? "Click to add more images" : "Drag and drop your images here, or browse"}
              </p>
              {uploadingImage && <p className="mt-2 font-medium text-blue-600">Uploading...</p>}
            </label>
          </div>

          {/* Uploaded Images Row (Small, at bottom) */}
          {productImages.length > 0 && (
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {productImages.map((imgUrl, index) => (
                <div key={index} className="relative h-20 w-20 flex-shrink-0 rounded-xl border border-gray-200 p-1">
                  <img
                    src={imgUrl}
                    alt={`Uploaded ${index}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-white text-xs font-bold text-red-500 shadow-md hover:bg-red-50 flex items-center justify-center border"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Footer Info */}
          <div className="mt-4 flex w-full justify-between border-t pt-4 text-xs font-semibold tracking-wider text-gray-400">
            <div className="uppercase">
              {productImages.length} IMAGES LOADED
            </div>
            <div className="uppercase">
              JPG, PNG UP TO 10MB
            </div>
          </div>

        </div>

        {/* --- RIGHT SIDE: FORM DETAILS --- */}
        <div className="rounded-2xl bg-white p-8 shadow">
          <div className="flex flex-col gap-4">

            {/* 1. Name */}
            <div>
              <label className="mb-2 block font-medium">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: iPhone 15"
              />
            </div>

            {/* 2. Category */}
            <div>
              <label className="mb-2 block font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory(""); // Reset sub-cat when cat changes
                }}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {Object.keys(categoryData).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Sub Category (Only show if category is selected) */}
            <div>
              <label className="mb-2 block font-medium">Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!category}
              >
                <option value="">Select Sub Category</option>
                {category && categoryData[category].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Price */}
            <div>
              <label className="mb-2 block font-medium">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: 999"
              />
            </div>

            {/* 5. Description */}
            <div>
              <label className="mb-2 block font-medium">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-32 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Details about product..."
              ></textarea>
            </div>

            {/* Submit Button with 'button-addProduct' class */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="button-addProduct mt-4 w-full rounded-xl bg-black py-3 text-white hover:opacity-80 disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Product"}
            </button>

          </div>
        </div>
      </div>

      {!isMerchant && <Footer />}
    </div>
  );
}
