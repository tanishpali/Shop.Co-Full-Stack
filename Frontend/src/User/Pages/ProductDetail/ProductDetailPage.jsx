import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import ImageGallery from "./components/ImageGallery";
import ProductInfo from "./components/ProductInfo";
import ProductReviews from "./components/ProductReviews";
import Footer from "../Homepage/Footer";

// Fallback dummy data while loading or if data missing
const DUMMY_PRODUCT = {
    id: "dummy",
    name: "One Life Graphic T-shirt",
    category: "T-shirts",
    new_price: 260,
    old_price: 300,
    description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    image: [
        "https://storage.googleapis.com/not-yet-deployed/tshirt-green-front.png", // placeholders
        "https://storage.googleapis.com/not-yet-deployed/tshirt-green-back.png",
        "https://storage.googleapis.com/not-yet-deployed/tshirt-green-model.png"
    ],
    colors: ["#505634", "#203430", "#181A28"],
    sizes: ["Small", "Medium", "Large", "X-Large"]
};

import all_product from "../../../Components/Assets/all_product";

export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            // First check static data
            const staticProduct = all_product.find(p => p.id === Number(id));

            if (staticProduct) {
                // Use static data structure, ensure arrays for images
                setProduct({
                    ...staticProduct,
                    image: [staticProduct.image], // Convert single image to array for gallery
                    new_price: staticProduct.new_price || staticProduct.price,
                });
                setLoading(false);
                return;
            }

            // If not found in static, try backend
            try {
                const res = await fetch(`http://localhost:4000/getProductById/${id}`);
                if (res.ok) {
                    const responseData = await res.json();
                    const backendProduct = responseData.product;

                    const mappedProduct = {
                        ...backendProduct,
                        id: backendProduct._id, // IMPORTANT: Map Mongo _id to id for frontend use
                        name: backendProduct.productName || backendProduct.name,
                        new_price: backendProduct.price !== undefined ? backendProduct.price : (backendProduct.new_price || 0),
                        old_price: backendProduct.old_price || null,
                        // Handle potential different field names for image or missing image
                        // Priority: productImages (array) -> productImage (string) -> image (legacy)
                        image: Array.isArray(backendProduct.productImages) && backendProduct.productImages.length > 0
                            ? backendProduct.productImages
                            : (backendProduct.productImage ? [backendProduct.productImage] : []),
                        // Use backend colors/sizes if available, else defaults
                        colors: backendProduct.colors || ["#4F4631", "#314F4A", "#31344F"],
                        sizes: backendProduct.sizes || ["Small", "Medium", "Large", "X-Large"]
                    };

                    // Fallback if no images found
                    if (mappedProduct.image.length === 0) {
                        mappedProduct.image = ["https://placehold.co/444x530?text=No+Image"];
                    }

                    // Duplicate if only 1 image to make gallery look functional
                    if (mappedProduct.image.length === 1) {
                        const img = mappedProduct.image[0];
                        mappedProduct.image = [img, img, img];
                    }

                    setProduct(mappedProduct);
                } else {
                    const errorData = await res.json();
                    toast.error(errorData.msg || "Product not found");
                    console.warn("Product not found, using dummy data");
                    setProduct(DUMMY_PRODUCT);
                }
            } catch (e) {
                console.error("Failed to fetch product", e);
                toast.error("Failed to load product. Please try again.");
                setProduct(DUMMY_PRODUCT);
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!product) return <div className="p-10 text-center">Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
                <Link to="/" className="hover:text-black transition">Home</Link>
                <span>&gt;</span>
                <Link to="/shop" className="hover:text-black transition">Shop</Link>
                <span>&gt;</span>
                <span className="text-black font-medium text-transform: capitalize">{product.category}</span>
            </nav>

            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                <ImageGallery images={product.image} />
                <ProductInfo product={product} />
            </div>

            {/* Reviews Section */}
            <ProductReviews />
            <Footer />
        </div>
    );
}
