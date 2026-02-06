import React, { useState, useEffect } from 'react';
import { MoreVertical, Plus, Filter, Search, Loader } from 'lucide-react';
import Cookies from "js-cookie";

const ProductList = ({ onAddNew }) => {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Debounce Logic
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Determine token (Sidebar logic used localStorage, Navbar used Cookies - checking both)
                const token = Cookies.get("token") || localStorage.getItem("token");
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                };

                const url = `http://localhost:4000/merchant-get-product?q=${query}&sort=latest`;
                const response = await fetch(url, { headers });
                const data = await response.json();

                if (response.ok) {
                    setProducts(data.products || []);
                } else {
                    console.error("Fetch error:", data);
                    // If 403/401, maybe redirect? For now just show error.
                    if (response.status !== 404) setError("Failed to load products");
                }
            } catch (err) {
                console.error("Error fetching merchant products:", err);
                setError("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [query]);

    // Handle Image Fallback
    const getProductImage = (p) => {
        if (p.productImages && p.productImages.length > 0) return p.productImages[0];
        if (p.productImage) return p.productImage;
        return p.thumbnail || "https://via.placeholder.com/150";
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* Search Bar */}
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search your products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl font-bold text-sm hover:bg-gray-50">
                        <Filter className="h-4 w-4" /> Filter
                    </button>
                    <button
                        onClick={onAddNew}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-2xl font-bold text-sm hover:bg-gray-800 shadow-lg shadow-black/10 active:scale-95 transition-all"
                    >
                        <Plus className="h-4 w-4" /> Add Product
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex justify-center items-center h-full py-20">
                        <Loader className="w-8 h-8 animate-spin text-gray-400" />
                    </div>
                ) : products.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                        <p className="text-gray-500 font-medium">No products found.</p>
                        {query && <p className="text-sm text-gray-400 mt-2">Try searching for something else.</p>}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Product</th>
                                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
                                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Price</th>
                                    <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-gray-400">Inventory</th>
                                    <th className="px-6 py-5 text-right text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.map((p) => (
                                    <tr key={p._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={getProductImage(p)}
                                                    alt={p.productName}
                                                    className="w-12 h-12 rounded-xl object-cover shadow-sm bg-gray-100"
                                                />
                                                <span className="font-bold text-sm truncate max-w-[200px]">{p.productName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500 font-medium capitalize">{p.category}</span>
                                            {p.subCategory && <span className="text-xs text-gray-400 block capitalize">{p.subCategory}</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-black text-sm">₹{p.price}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter bg-green-50 text-green-600`}>
                                                In Stock
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-white rounded-lg transition-colors group-hover:shadow-sm">
                                                <MoreVertical className="h-5 w-5 text-gray-400" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
