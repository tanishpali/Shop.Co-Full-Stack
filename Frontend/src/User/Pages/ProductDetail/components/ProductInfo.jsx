import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";

// Helper for Star Rating
const StarRating = ({ rating }) => {
    return (
        <div className="flex text-yellow-400 text-xl">
            {[...Array(5)].map((_, i) => (
                <span key={i}>
                    {i < Math.floor(rating) ? "★" : "☆"}
                </span>
            ))}
        </div>
    );
};

export default function ProductInfo({ product }) {
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
    const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
    const [quantity, setQuantity] = useState(1);
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    // Calculate discount percentage if old price exists
    const discountPercent = product.old_price
        ? Math.round(((product.old_price - product.new_price) / product.old_price) * 100)
        : 0;

    const handleAddToCart = async () => {
        // Check if user is logged in
        const token = Cookies.get("token");

        if (!token) {
            toast.error("Please login to add items to cart");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
            return;
        }

        setIsAddingToCart(true);

        // Check if it's a static product (ID is number or < 1000)
        // MongoDB IDs are long strings, static IDs are numbers 1-9
        const isStaticProduct = typeof (product._id || product.id) === 'number';

        if (isStaticProduct) {
            // Simulate API delay & LOCAL STORAGE persistence
            setTimeout(() => {
                // Get existing static cart
                const existingCart = JSON.parse(localStorage.getItem("static_cart") || "[]");

                // Check if product already in cart
                const existingItemIndex = existingCart.findIndex(item => item.productId === (product._id || product.id));

                if (existingItemIndex > -1) {
                    // Update quantity
                    existingCart[existingItemIndex].quantity += quantity;
                } else {
                    // Add new item
                    existingCart.push({
                        productId: product._id || product.id,
                        quantity: quantity,
                        timestamp: Date.now()
                    });
                }

                localStorage.setItem("static_cart", JSON.stringify(existingCart));

                toast.success("Item added to cart successfully! (Local)");
                setIsAddingToCart(false);
            }, 500);
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/addToCart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    productId: product._id || product.id,
                    quantity: quantity
                })
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Item added to cart successfully!");
                // Optionally reset quantity or navigate to cart
                // setQuantity(1);
            } else {
                toast.error(data.msg || "Failed to add item to cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add item to cart. Please try again.");
        } finally {
            if (!isStaticProduct) {
                setIsAddingToCart(false);
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 font-sans">
            {/* Title & Rating */}
            <div>
                <h1 className="text-[32px] md:text-[40px] font-bold uppercase leading-tight font-['Integral_CF']">
                    {product.name}
                </h1>
                <div className="flex items-center gap-3 mt-3">
                    <StarRating rating={4.5} />
                    <span className="text-sm text-gray-600">4.5/5</span>
                </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
                <span className="text-[32px] font-bold text-black">₹{product.new_price}</span>
                {product.old_price && (
                    <>
                        <span className="text-[32px] font-bold text-gray-300 line-through">₹{product.old_price}</span>
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-500 text-sm font-medium">
                            -{discountPercent}%
                        </span>
                    </>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed border-b pb-6">
                {product.description}
            </p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
                <div className="border-b pb-6">
                    <h3 className="text-gray-500 text-sm mb-4">Select Colors</h3>
                    <div className="flex gap-4">
                        {product.colors.map((color) => (
                            <button
                                key={color}
                                onClick={() => setSelectedColor(color)}
                                className={`w-9 h-9 rounded-full relative flex items-center justify-center border transition-all ${selectedColor === color ? 'ring-1 ring-offset-2 ring-black' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                                aria-label={`Select color ${color}`}
                            >
                                {selectedColor === color && (
                                    <span className="text-white text-xs">✓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
                <div className="border-b pb-6">
                    <h3 className="text-gray-500 text-sm mb-4">Choose Size</h3>
                    <div className="flex flex-wrap gap-3">
                        {product.sizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors duration-200
                                    ${selectedSize === size
                                        ? 'bg-black text-white'
                                        : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
                                    }
                                `}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-5 pt-2">
                {/* Quantity Counter */}
                <div className="flex items-center bg-[#F0F0F0] rounded-full px-5 py-3 gap-6 w-max">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="text-2xl font-bold leading-none disabled:opacity-50"
                        disabled={quantity <= 1}
                    >
                        -
                    </button>
                    <span className="text-base font-medium min-w-[20px] text-center">{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="text-2xl font-bold leading-none"
                    >
                        +
                    </button>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="flex-1 bg-black text-white rounded-full py-4 px-8 text-base font-medium hover:bg-gray-900 transition-colors shadow-lg active:scale-95 transform duration-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isAddingToCart ? "Adding..." : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}
