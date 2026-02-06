import React, { useState, useEffect } from 'react';
import { TrendingUp, Package, DollarSign, Star, ShoppingCart, Sparkles, ArrowRight } from 'lucide-react';
import StatCard from './StatCard';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const DashboardHome = () => {
    const navigate = useNavigate();
    const [merchant, setMerchant] = useState(null);
    const [recentProducts, setRecentProducts] = useState([]);
    const [topRatedProduct, setTopRatedProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState([
        { label: 'Inventory', value: 0, icon: Package, delay: 100 },
        { label: 'Total Sales', value: 856, icon: ShoppingCart, delay: 200 }, // Static for now
        { label: 'Revenue', value: 45231, icon: DollarSign, prefix: '$', delay: 300 }, // Static for now
        { label: 'Rating', value: 0, icon: Star, isDecimal: true, delay: 400 },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) return;

                const headers = { 'Authorization': `Bearer ${token}` };

                // 1. Fetch Profile
                const profileRes = await fetch('http://localhost:4000/merchant/profile', { headers });
                const profileData = await profileRes.json();
                if (profileRes.ok) {
                    setMerchant(profileData.merchant);
                    localStorage.setItem('merchant', JSON.stringify(profileData.merchant));
                }

                // 2. Fetch ALL Products (for Inventory & Rating Stats + Recent List)
                // We fetch sorted by latest to use for the list, but get all to calculate stats
                const productRes = await fetch('http://localhost:4000/merchant/products?sort=latest', { headers });
                const productData = await productRes.json();

                let products = [];
                let inventoryCount = 0;
                let avgRating = 0;

                if (productRes.ok && productData.products) {
                    products = productData.products;
                    inventoryCount = products.length;

                    // Calculate Average Rating across all products
                    // Each product should have 'rating' field from the Rating API logic (updateProductRating)
                    const productsWithRatings = products.filter(p => p.rating && p.rating > 0);
                    if (productsWithRatings.length > 0) {
                        const totalRating = productsWithRatings.reduce((sum, p) => sum + p.rating, 0);
                        avgRating = (totalRating / productsWithRatings.length).toFixed(1);
                    }

                    // Set Recent Products (Top 5)
                    setRecentProducts(products.slice(0, 5));
                }

                // 3. Update Stats
                setStats(prev => [
                    { ...prev[0], value: inventoryCount },
                    prev[1],
                    prev[2],
                    { ...prev[3], value: avgRating }
                ]);

                // 4. Fetch Top Rated Product (Optional: Keep using the optimized endpoint or derive from list)
                // Since we have the list, we could find top rated here, but the dedicated endpoint is efficient for details.
                // Keeping existing logic for Black Card.
                const topRes = await fetch('http://localhost:4000/merchant/top-rated', { headers });
                const topData = await topRes.json();
                if (topRes.ok) {
                    setTopRatedProduct(topData.product);
                }

            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const ownerName = merchant?.ownerName || 'Merchant';



    if (loading) return <div>Loading Dashboard...</div>;

    return (
        <div className="space-y-12 pb-20 fade-in-up">
            {/* Refined Welcome Hero */}
            <div className="relative bg-white rounded-2xl p-12 border border-gray-100 overflow-hidden group shadow-lg">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-[1px] bg-[#C5A059]"></div>
                            <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.3em]">{merchant?.storeName ? merchant.storeName + ' Dashboard' : 'Merchant Dashboard'}</span>
                        </div>
                        <h1 className="text-6xl font-light tracking-tight text-gray-900 mb-6 leading-tight">
                            Welcome back, <br /><span className="font-bold">{ownerName}</span>
                        </h1>
                        <p className="text-gray-400 font-medium text-lg leading-relaxed border-l-2 border-gray-100 pl-6">
                            Your boutique is performing <span className="text-black font-semibold">well</span>.
                        </p>
                    </div>

                    <div className="hidden lg:block w-px h-32 bg-gray-100 mx-8"></div>

                    <div className="flex flex-col gap-4">
                        <button className="flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-gray-800 transition-all group shadow-md">
                            Review Shipments <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={() => navigate('/merchant/add-product')}
                            className="flex items-center gap-4 bg-white text-black border border-gray-100 px-8 py-4 rounded-full font-semibold text-sm hover:bg-gray-50 transition-all"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <StatCard
                        key={i}
                        {...stat}
                    />
                ))}
            </div>

            {/* Secondary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-50 p-10 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">Recent Acquisitions</h3>
                        <button className="text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-widest transition-colors">Archive</button>
                    </div>
                    {/* Recent Acquisitions List */}
                    <div className="space-y-6">
                        {recentProducts.length > 0 ? (
                            recentProducts.map((item) => (
                                <div key={item._id} className="flex items-center justify-between group py-2 border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 rounded-lg bg-gray-50 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                            <img src={item.productImages?.[0] || `https://picsum.photos/seed/${item._id}/300`} alt="Product" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 line-clamp-1 w-32">{item.productName}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.category}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-gray-900">₹{item.price}</p>
                                    <div className="text-right">
                                        <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Active</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400 text-sm">No recent products found.</p>
                        )}
                    </div>
                </div>

                <div className="bg-[#121212] text-white rounded-2xl p-10 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <div className="bg-white/10 w-fit p-3 rounded-xl mb-8">
                            <Star className="h-5 w-5 text-[#C5A059]" />
                        </div>
                        {topRatedProduct ? (
                            <>
                                <h3 className="text-3xl font-light leading-snug mb-4">Top Rated <br /><span className="font-bold italic">Collection.</span></h3>
                                <div className="mb-6">
                                    <p className="text-lg font-bold">{topRatedProduct.productName}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex text-[#C5A059]">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < Math.round(topRatedProduct.rating || 0) ? 'fill-current' : 'opacity-30'}`} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400">({topRatedProduct.numReviews || 0} reviews)</span>
                                    </div>
                                </div>
                                <div className="w-full h-32 rounded-xl bg-white/5 overflow-hidden mb-4">
                                    <img src={topRatedProduct.productImages?.[0]} alt={topRatedProduct.productName} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed font-medium line-clamp-2">{topRatedProduct.description}</p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-3xl font-light leading-snug mb-4">Top Rated <br /><span className="font-bold italic">Empty.</span></h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-medium">No ratings yet.</p>
                            </>
                        )}
                    </div>
                    <button
                        onClick={() => topRatedProduct ? navigate(`/product/${topRatedProduct._id}`) : null}
                        className="relative z-10 w-full bg-white text-black py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-gray-100 transition-all mt-10"
                    >
                        View Product
                    </button>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C5A059]/10 rounded-full blur-[60px]"></div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
