import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, Menu, ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    // Get merchant info
    const merchantData = JSON.parse(localStorage.getItem('merchant') || '{}');
    const displayName = merchantData.storeName || merchantData.ownerName || 'Merchant';
    const storeLogo = merchantData.storeLogo || "https://picsum.photos/seed/profile/100";

    // Debounce Search
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.trim()) {
                try {
                    const res = await fetch(`http://localhost:4000/getProductsByQuery?productName=${query}`);
                    const data = await res.json();
                    if (res.ok) {
                        setResults(data.products || []);
                        setShowResults(true);
                    } else {
                        setResults([]);
                    }
                } catch (error) {
                    console.error("Search error:", error);
                    setResults([]);
                }
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300); // 300ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    // Close search on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleResultClick = (productId) => {
        setShowResults(false);
        setQuery('');
        navigate(`/product/${productId}`);
    };



    return (
        <nav className="bg-white sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                {/* Brand and Links */}
                <div className="flex items-center gap-8">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden text-gray-500 hover:text-black transition-colors"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <h1 className="text-3xl font-black tracking-[-0.03em] text-black shrink-0">SHOP.CO</h1>

                    <div className="hidden lg:flex items-center gap-6">
                        {['Shop', 'On Sale', 'New Arrivals', 'Top Selling'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-base font-normal text-black hover:text-gray-600 transition-colors whitespace-nowrap"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Actions: Search and Icons */}
                <div className="flex items-center gap-6">
                    {/* Search Bar - Pill Shape */}
                    <div className="hidden md:flex items-center relative w-[500px] h-12 bg-[#F0F0F0] rounded-full px-4" ref={searchRef}>
                        <Search className="h-5 w-5 text-gray-400 shrink-0 mr-3" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && query.trim()) {
                                    setShowResults(false);
                                    navigate(`/seller/search?q=${encodeURIComponent(query.trim())}`);
                                }
                            }}
                            onFocus={() => { if (results.length > 0) setShowResults(true); }}
                            placeholder="Search for products..."
                            className="bg-transparent w-full text-base text-gray-900 placeholder:text-gray-500 focus:outline-none"
                        />

                        {/* Search Results Dropdown */}
                        {showResults && results.length > 0 && (
                            <div className="absolute top-14 left-0 w-full bg-white border border-gray-100 shadow-xl rounded-2xl max-h-80 overflow-y-auto z-50">
                                {results.map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() => handleResultClick(product._id)}
                                        className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                                    >
                                        <div className="h-10 w-10 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                            <img src={product.productImages?.[0] || 'https://via.placeholder.com/50'} alt={product.productName} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">{product.productName}</p>
                                            <p className="text-xs text-gray-500">₹{product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {showResults && query && results.length === 0 && (
                            <div className="absolute top-14 left-0 w-full bg-white border border-gray-100 shadow-xl rounded-2xl p-4 z-50">
                                <p className="text-sm text-gray-500 text-center">No results found.</p>
                            </div>
                        )}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/seller/profile')}
                            className="text-black hover:text-gray-600 transition-colors"
                        >
                            <User className="h-6 w-6" />
                        </button>

                        <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden border border-gray-200 cursor-pointer" onClick={() => navigate('/seller/profile')}>
                            <img src={storeLogo} alt="Store" className="w-full h-full object-cover" />
                        </div>
                        {/* Assuming LogOut is handled elsewhere or just visual for now as per image */}
                        {/* Image shows a logout-ish icon or maybe it's orders. I'll stick to Cart/User for now as common. 
                            Actually, image shows: Cart, Person, Import/Logout icon? 
                            I'll add LogOut icon.
                        */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
