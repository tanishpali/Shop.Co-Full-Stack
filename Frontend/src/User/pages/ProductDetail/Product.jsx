import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import Footer from "../../pages/Homepage/Footer";

// Custom Data
import all_product from "../../../components/Assets/all_product";

const Product = () => {
  const [products, setProducts] = useState(all_product); // Start with static data

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/getAllProducts");
        if (res.ok) {
          const data = await res.json();
          // Map backend product structure to frontend structure
          const backendProducts = data.products.map(p => ({
            id: p._id, // Map _id to id
            name: p.productName || p.name,
            // Handle images: prioritize array, fallback to string, fallback to placeholder
            image: Array.isArray(p.productImages) && p.productImages.length > 0
              ? p.productImages[0] // Use first image for card
              : (p.productImage || "https://placehold.co/400?text=No+Image"),
            price: p.price, // Map to 'price' for ProductCard
            new_price: p.price, // Keep new_price for compatibility
            old_price: p.old_price || null,
            rating: p.rating || 0, // Default rating if missing from API
            category: p.category,
            // Add other fields if necessary
          }));

          // Combine static and backend products (avoiding duplicates if needed, but IDs likely differ)
          // We put backend products FIRST so they appear at the top
          setProducts([...backendProducts, ...all_product]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <>
      <div className="max-w-[1240px] mx-auto px-4 md:px-0 pt-6 pb-20">
        <hr className="border-gray-200 mb-6" />

        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
          <span>Home</span>
          <ChevronRight size={14} />
          <span className="text-black font-medium">Casual</span>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <div className="w-full md:w-[295px] flex-shrink-0 hidden md:block">
            <Filter />
          </div>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Header: Title & Sort */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6">
              <h2 className="text-[32px] font-bold text-black" style={{ fontFamily: "Satoshi, sans-serif" }}>Casual</h2>
              <div className="flex items-center gap-4 text-gray-500 mt-4 md:mt-0">
                <span className="text-base">
                  Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, products.length)} of {products.length} Products
                </span>
                <div className="hidden md:block w-px h-4 bg-gray-300"></div>
                <div className="flex items-center gap-2 text-black cursor-pointer">
                  <span className="text-base">Sort by: <span className="font-bold">Most Popular</span></span>
                  <ChevronDown size={14} />
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-9">
              {currentProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}
            </div>

            <hr className="border-gray-200 my-10" />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-[8px] text-sm font-medium transition bg-white
                        ${currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 hover:bg-gray-50 text-black'}`}
                >
                  <ArrowLeft size={16} /> Previous
                </button>

                <div className="hidden md:flex items-center gap-1 text-sm text-gray-500">
                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    // Simple logic: Show all pages if less than 7, else simple abbreviation logic could be added here
                    // For now, simpler map is fine for moderate product counts
                    return (
                      <button
                        key={pageNum}
                        onClick={() => paginate(pageNum)}
                        className={`w-9 h-9 flex items-center justify-center rounded-[8px] font-medium transition
                                    ${currentPage === pageNum
                            ? 'bg-gray-100 text-black'
                            : 'hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-[8px] text-sm font-medium transition bg-white
                        ${currentPage === totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 hover:bg-gray-50 text-black'}`}
                >
                  Next <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Product;
