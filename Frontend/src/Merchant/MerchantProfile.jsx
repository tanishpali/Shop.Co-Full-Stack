import React, { useState, useEffect } from 'react';
import { ShieldCheck, Mail, Phone, MapPin, Building2, FileText, User } from 'lucide-react';
import Cookies from 'js-cookie';

const MerchantProfile = () => {
    const [merchant, setMerchant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) return;

                const res = await fetch('http://localhost:4000/merchant/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const data = await res.json();
                if (res.ok) {
                    setMerchant(data.merchant);
                }
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <div className="p-8">Loading Profile...</div>;
    if (!merchant) return <div className="p-8">Merchant Profile Not Found</div>;

    return (
        <div className="p-8 space-y-8 fade-in-up max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-light tracking-tight text-gray-900">
                    Merchant Profile
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Identity */}
                <div className="space-y-8">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm text-center flex flex-col items-center">
                        <div className="w-32 h-32 rounded-full overflow-hidden mb-6 bg-gray-100">
                            <img
                                src={merchant.storeLogo || "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&q=80"}
                                alt={merchant.storeName}
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{merchant.storeName}</h2>
                        <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.2em] mb-8">Established {merchant.yearOfEstablishment || '2024'}</p>

                        <div className="relative">
                            <span className="absolute -top-4 -left-2 text-4xl text-gray-200 font-serif">"</span>
                            <p className="text-gray-400 italic font-serif leading-relaxed px-4 text-sm">
                                {merchant.storeDescription || "The Modern Online Store."}
                            </p>
                            <span className="absolute -bottom-8 -right-2 text-4xl text-gray-200 font-serif">"</span>
                        </div>
                    </div>
                </div>

                {/* Right Column - Credentials & Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Legal Credentials */}
                    <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <FingerprintIcon className="h-5 w-5 text-[#C5A059]" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900">Legal Credentials</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Owner Name</p>
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-gray-300" />
                                    <span className="font-semibold text-gray-900">{merchant.ownerName}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">GST(GSTIN)</p>
                                <div className="flex items-center gap-3">
                                    <FileText className="h-4 w-4 text-gray-300" />
                                    <span className="font-semibold text-gray-900">{merchant.gstNumber || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact & Logistics */}
                    <div className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-8">
                            <GlobeIcon className="h-5 w-5 text-[#C5A059]" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-900">Contact Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Email for Correspondence</p>
                                <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-gray-300" />
                                    <span className="font-semibold text-gray-900">{merchant.email}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Contact Number</p>
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-gray-300" />
                                    <span className="font-semibold text-gray-900">{merchant.mobileNumber}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Address</p>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-gray-300" />
                                <span className="font-semibold text-gray-900">{merchant.pickupAddress}, {merchant.city}, {merchant.state}, {merchant.pincode}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Custom Icon Components for specific SVG paths if needed, or mapped from Lucide
const FingerprintIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
        <path d="M21 12a9 9 0 1 1-18 0c0 4.07 2.6 7.56 6.38 8.85a9 9 0 0 1 11.24 0A9 9 0 1 1 21 12Z" />
        <path d="M12 10a2 2 0 0 1 2 2" />
    </svg>
);

const GlobeIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
    </svg>
);

export default MerchantProfile;
