import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Search, Filter, Plus, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Inventory = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) return;

                const res = await fetch('http://localhost:4000/merchant/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setProducts(data.products);
                }
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="space-y-8 fade-in-up">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-light tracking-tight text-gray-900">Inventory</h1>
                    <p className="text-gray-400 text-sm mt-1">Manage your products and collections.</p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-gray-50 border-none rounded-xl py-3 pl-10 pr-4 text-sm focus:ring-1 focus:ring-black/5"
                    />
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        <Filter className="h-4 w-4" /> Filter
                    </button>
                    <button
                        onClick={() => navigate('/merchant/add-product')}
                        className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-xl text-sm font-bold tracking-wide hover:bg-gray-800 transition-colors shadow-lg shadow-black/20"
                    >
                        <Plus className="h-4 w-4" /> Add Product
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="text-left py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Product</th>
                                <th className="text-left py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Category</th>
                                <th className="text-left py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Price</th>
                                <th className="text-left py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Status</th>
                                <th className="text-right py-4 px-6 text-[10px] uppercase tracking-widest font-bold text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? <tr><td colSpan="5" className="text-center py-4">Loading...</td></tr> : products.map((product) => (
                                <tr key={product._id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-gray-100 overflow-hidden">
                                                <img src={product.productImages?.[0] || 'https://via.placeholder.com/150'} alt={product.productName} className="h-full w-full object-cover mix-blend-multiply" />
                                            </div>
                                            <span className="font-semibold text-sm text-gray-900">{product.productName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-500">{product.category}</td>
                                    <td className="py-4 px-6 text-sm font-bold text-gray-900">{product.price}</td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide bg-green-100 text-green-700`}>
                                            Active
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="text-gray-300 hover:text-black transition-colors">
                                            <MoreVertical className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination (Visual only) */}
                <div className="border-t border-gray-50 p-4 flex justify-between items-center">
                    <p className="text-xs text-gray-400 font-medium">Showing 1-5 of 24 products</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-black disabled:opacity-50">Previous</button>
                        <button className="px-3 py-1 text-xs font-medium text-gray-400 hover:text-black">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
