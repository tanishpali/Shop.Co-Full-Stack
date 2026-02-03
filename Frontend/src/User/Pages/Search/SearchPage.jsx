import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const query = searchParams.get('q') || ''; // Derived state from URL directly

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleProductClick = (productId) => {
        if (!location.pathname.startsWith('/seller')) {
            navigate(`/product/${productId}`);
        }
    };
    useEffect(() => {
        const fetchProducts = async () => {
            if (!query.trim()) {
                setProducts([]);
                return;
            }

            setLoading(true);
            try {
                // Assuming backend is on port 4000
                const response = await fetch(`http://localhost:4000/search?q=${query}&limit=12`);
                const result = await response.json();

                if (result.success) {
                    setProducts(result.data);
                } else {
                    setProducts([]);
                }
            } catch (err) {
                console.error("Search Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [query]); // React to URL query changes

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Header and Search Input removed as per user request */}



                {/* Status Message */}


                {/* Product Grid - 3 Columns */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {products.map((product) => (
                            <div key={product._id} className="group cursor-pointer">
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] overflow-hidden rounded-[20px] mb-5 bg-[#F4F4F4]">
                                    {/* Tag Overlay */}


                                    <img
                                        src={(product.productImages && product.productImages[0]) || product.productImage || product.thumbnail}
                                        alt={product.productName}
                                        onClick={() => handleProductClick(product._id)}
                                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                                    />

                                </div>

                                {/* Content: Name and Price stacked + Space between */}
                                <div className="space-y-1 px-1">

                                    <div className="flex justify-between items-start gap-4">
                                        <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                            {product.productName}
                                        </h3>
                                        <p className="text-xl font-black text-gray-900 whitespace-nowrap">
                                            ₹{product.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    query && (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-light text-gray-400">No results found for "{query}"</h3>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default SearchPage;
