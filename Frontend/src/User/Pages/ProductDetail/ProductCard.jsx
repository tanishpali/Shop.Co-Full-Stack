import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id || product.id}`} className="block w-full">
      <div className="flex flex-col gap-3 group cursor-pointer">
        {/* Image Container with gray background */}
        <div className="w-full aspect-square bg-[#F0EEED] rounded-[20px] overflow-hidden flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Product Title */}
        <h3 className="font-bold text-lg md:text-xl truncate text-black" style={{ fontFamily: "Satoshi, sans-serif" }}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array(5).fill(0).map((_, i) => (
            <span key={i} className="text-yellow-400 text-lg">
              {i < Math.floor(product.rating) ? "★" : "☆"}
            </span>
          ))}
          <span className="text-sm text-gray-600 ml-1">{product.rating}/5</span>
        </div>

        {/* Price & Discount */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-black">₹{product.price}</span>
          {product.old_price && (
            <span className="text-2xl font-bold text-gray-300 line-through">₹{product.old_price}</span>
          )}
          {product.discount && (
            <span className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-[62px]">
              -{product.discount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

