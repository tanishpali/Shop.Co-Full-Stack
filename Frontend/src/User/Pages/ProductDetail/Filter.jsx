import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

const Filter = () => {
  const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
  const colors = [
    "#2ECC71", "#E74C3C", "#F1C40F", "#E67E22",
    "#1ABC9C", "#3498DB", "#9B59B6", "#EC87C0", "#FFFFFF", "#000000"
  ];
  const sizes = [
    "XX-Small", "X-Small", "Small", "Medium", "Large",
    "X-Large", "XX-Large", "3X-Large", "4X-Large"
  ];
  const dressStyles = ["Casual", "Formal", "Party", "Gym"];

  const [price, setPrice] = useState([50, 200]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="w-full md:w-[295px] bg-white border border-gray-200 rounded-[20px] p-6">

      {/* Filters Header */}
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-200">
        <h2 className="text-xl font-bold">Filters</h2>
        <svg className="w-6 h-6 text-gray-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </div>

      {/* Categories */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <ul className="space-y-4">
          {categories.map((item) => (
            <li
              key={item}
              className="flex justify-between items-center text-gray-600 hover:text-black cursor-pointer"
            >
              {item}
              <ChevronRight size={16} className="text-gray-400" />
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Price</h3>
          <ChevronDown size={20} className="transform rotate-180" />
        </div>

        <div className="mt-4 px-2">
          <input
            type="range"
            min="50"
            max="200"
            value={price[1]}
            onChange={(e) => setPrice([50, e.target.value])}
            className="w-full h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-black"
          />
          <div className="flex justify-between text-sm font-medium text-black mt-3">
            <span>₹{price[0]}</span>
            <span>₹{price[1]}</span>
          </div>
        </div>
      </div>

      {/* Colors */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Colors</h3>
          <ChevronDown size={20} className="transform rotate-180" />
        </div>

        <div className="flex flex-wrap gap-4">
          {colors.map((clr) => (
            <div
              key={clr}
              onClick={() => setSelectedColor(clr)}
              className={`w-9 h-9 rounded-full cursor-pointer border flex items-center justify-center transition-all ${selectedColor === clr ? "border-black" : "border-gray-200"
                }`}
              style={{ backgroundColor: clr }}
            >
              {selectedColor === clr && (
                <span className={`text-sm ${clr === "#FFFFFF" ? "text-black" : "text-white"}`}>
                  ✔
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Size</h3>
          <ChevronDown size={20} className="transform rotate-180" />
        </div>

        <div className="flex flex-wrap gap-2">
          {sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`px-5 py-2.5 rounded-[62px] text-sm font-medium transition-all ${selectedSize === sz
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0] text-gray-600 hover:bg-gray-200"
                }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Style */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-xl">Dress Style</h3>
          <ChevronDown size={20} className="transform rotate-180" />
        </div>
        <ul className="space-y-4">
          {dressStyles.map((style) => (
            <li
              key={style}
              className="flex justify-between items-center text-gray-600 hover:text-black cursor-pointer"
            >
              {style}
              <ChevronRight size={16} className="text-gray-400" />
            </li>
          ))}
        </ul>
      </div>

      {/* Apply Button */}
      <button className="w-full bg-black text-white py-4 rounded-[62px] text-sm font-medium hover:bg-gray-900 transition-all">
        Apply Filter
      </button>
    </div>
  );
};

export default Filter;
