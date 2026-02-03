import React, { useState, useEffect } from "react";

export default function ImageGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState("");

  // Update selected image when images prop changes
  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[300px] md:h-[500px] bg-[#F0EEED] rounded-[20px] flex items-center justify-center text-gray-400">
        No Image Available
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4 w-full">
      {/* Thumbnails (Left on LG, Bottom on Mobile) */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto w-full lg:w-[150px] shrink-0 scrollbar-hide">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img)}
            className={`
              relative w-24 h-24 lg:w-full lg:h-[150px] rounded-[20px] overflow-hidden border-2 transition-all shrink-0
              ${selectedImage === img ? "border-black" : "border-transparent hover:border-gray-200"}
            `}
          >
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 aspect-square md:aspect-[1/1.1] bg-[#F0EEED] rounded-[20px] overflow-hidden flex items-center justify-center p-8">
        <img
          src={selectedImage || images[0]}
          alt="Product Detail"
          className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
