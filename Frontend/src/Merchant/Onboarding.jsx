import React, { useState, useRef } from 'react';
import {
    Building2, User, Mail, Phone, Lock, Camera,
    FileText, Briefcase, Hash, Calendar, MapPin, Check,
    ArrowRight, ArrowLeft, Sparkles, Eye, EyeOff,
    ChevronDown, Image as ImageIcon, Fingerprint
} from 'lucide-react';

const indianStates = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [formData, setFormData] = useState({
        storeName: '',
        ownerName: '',
        email: '',
        mobileNumber: '',
        password: '',
        storeLogo: '',
        storeBanner: '',
        storeDescription: '',
        businessType: 'Individual',
        regNumber: '',
        gstNumber: '',
        panNumber: '',
        yearOfEstablishment: '',
        pickupAddress: '',
        sameAsPickup: true,
        warehouseAddress: '',
        city: '',
        state: 'Maharashtra',
        pincode: '',
        country: 'India',
        confirmed: false
    });

    const fileInputLogo = useRef(null);
    const fileInputBanner = useRef(null);

    const handleImageUpload = (e, field) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, [field]: reader.result }));
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const nextStep = () => setStep(s => Math.min(s + 1, 4));
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:4000/merchant-onboard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                // toast.success("Store submitted successfully!"); // Assuming toast is available or use existing UI
                // setTimeout(() => {
                //     if (onComplete) onComplete();
                // }, 5000);
            } else {
                alert(data.msg || "Onboarding failed");
            }
        } catch (error) {
            console.error("Onboarding Error:", error);
            alert("Something went wrong during onboarding.");
        }
    };

    const Stepper = () => (
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-16 relative">
            <div className="absolute top-5 left-0 w-full h-[1px] bg-gray-100 -z-10" />
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-[11px] font-bold transition-all duration-700 z-10 ${step >= i ? 'bg-black text-white border-black shadow-xl scale-110' : 'bg-white text-gray-300 border-gray-100'
                        }`}>
                        {step > i ? <Check className="h-4 w-4" /> : i}
                    </div>
                    <span className={`text-[15px] uppercase tracking-[0.2em] font-bold whitespace-nowrap ${step >= i ? 'text-black' : 'text-gray-300'}`}>
                        {i === 1 ? 'Step 1' : i === 2 ? 'Step 2' : i === 3 ? 'Step 3' : 'Review & Submit'}
                    </span>
                </div>
            ))}
        </div>
    );

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-[#fbfbf9] flex items-center justify-center p-8 animate-in fade-in duration-1000">
                <div className="max-w-xl w-full text-center space-y-10 bg-white p-16 rounded-[3rem] luxury-shadow border border-gray-50">
                    <div className="relative inline-block">
                        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                            <Check className="h-10 w-10" />
                        </div>
                        <Sparkles className="absolute -top-2 -right-2 h-8 w-8 text-[#C5A059] animate-pulse" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-4xl font-light tracking-tight text-gray-900">🎉 Your store has been submitted for review!</h2>
                        <p className="text-gray-400 font-medium leading-relaxed">
                            ⏳ Our team will verify your details within 24–48 hours.
                        </p>
                    </div>
                    <div className="pt-4">
                        <div className="w-full bg-gray-50 h-[1px] relative overflow-hidden rounded-full">
                            <div className="absolute inset-0 bg-black w-1/3 animate-[slide_2s_infinite_linear]"></div>
                        </div>
                    </div>
                    <style>{`
             @keyframes slide {
               0% { transform: translateX(-100%); }
               100% { transform: translateX(300%); }
             }
           `}</style>
                </div>
            </div>
        );
    }

    // Styles for autofill to prevent blue background
    const autofillStyles = {
        WebkitBoxShadow: "0 0 0 30px white inset",
        WebkitTextFillColor: "inherit",
        transition: "background-color 5000s ease-in-out 0s",
    };

    return (
        <div className="min-h-screen bg-[#fbfbf9] py-16 px-4 md:px-8">
            <style>{`
                input:-webkit-autofill,
                input:-webkit-autofill:hover,
                input:-webkit-autofill:focus,
                input:-webkit-autofill:active,
                textarea:-webkit-autofill,
                textarea:-webkit-autofill:hover,
                textarea:-webkit-autofill:focus,
                textarea:-webkit-autofill:active,
                select:-webkit-autofill,
                select:-webkit-autofill:hover,
                select:-webkit-autofill:focus,
                select:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 30px white inset !important;
                    -webkit-text-fill-color: black !important;
                    transition: background-color 5000s ease-in-out 0s;
                }
            `}</style>
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h5 className="text-5xl font-black tracking-[-0.08em] text-black mb-8">SHOP.CO</h5>
                    <Stepper />
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-50 luxury-shadow overflow-hidden transition-all duration-700">

                    {/* STEP 1: BUSINESS INFO */}
                    {step === 1 && (
                        <div className="p-8 md:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-light tracking-tight text-gray-900">Let’s set up your store</h2>
                                <p className="text-gray-400 text-[15px] font-medium">Tell us the basics about your business</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                                <div className="space-y-10">
                                    <div className="space-y-4">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Upload Store Logo</label>
                                        <div
                                            onClick={() => fileInputLogo.current?.click()}
                                            className="w-32 h-32 rounded-full border-2 border-dashed border-gray-100 bg-[#fbfbf9] flex flex-col items-center justify-center cursor-pointer group overflow-hidden relative"
                                        >
                                            {formData.storeLogo ? (
                                                <img src={formData.storeLogo} className="w-full h-full object-cover" alt="Store Logo" />
                                            ) : (
                                                <Camera className="h-6 w-6 text-gray-300 group-hover:text-black transition-colors" />
                                            )}
                                            <input type="file" ref={fileInputLogo} onChange={(e) => handleImageUpload(e, 'storeLogo')} hidden accept="image/*" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Upload Store Banner (optional)</label>
                                        <div
                                            onClick={() => fileInputBanner.current?.click()}
                                            className="w-full aspect-[21/9] rounded-2xl border-2 border-dashed border-gray-100 bg-[#fbfbf9] flex flex-col items-center justify-center cursor-pointer group overflow-hidden relative"
                                        >
                                            {formData.storeBanner ? (
                                                <img src={formData.storeBanner} className="w-full h-full object-cover" alt="Store Banner" />
                                            ) : (
                                                <ImageIcon className="h-6 w-6 text-gray-300 group-hover:text-black transition-colors" />
                                            )}
                                            <input type="file" ref={fileInputBanner} onChange={(e) => handleImageUpload(e, 'storeBanner')} hidden accept="image/*" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-1">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Store / Shop Name</label>
                                        <input type="text" value={formData.storeName} onChange={(e) => setFormData({ ...formData, storeName: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-medium" placeholder="My Boutique" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Owner Name</label>
                                        <input type="text" value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-medium" placeholder="Your Name" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Email</label>
                                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-medium" placeholder="name@email.com" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Mobile Number</label>
                                        <div className="flex items-center border-b border-gray-100 focus-within:border-black">
                                            <span className="text-xs font-bold text-gray-400 mr-2">+91</span>
                                            <input type="tel" value={formData.mobileNumber} onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })} className="w-full py-4 bg-transparent focus:outline-none text-[15px] font-medium" placeholder="9876543210" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Password</label>
                                        <div className="flex items-center border-b border-gray-100 focus-within:border-black">
                                            <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full py-4 bg-transparent focus:outline-none text-[15px] font-medium" placeholder="••••••••" />
                                            <button onClick={() => setShowPassword(!showPassword)} className="text-gray-300 hover:text-black">
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 2: BUSINESS DETAILS */}
                    {step === 2 && (
                        <div className="p-8 md:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-light tracking-tight text-gray-900">Tell us about your business</h2>
                                <p className="text-gray-400 text-[15px] font-medium">This helps us verify and trust your store</p>
                            </div>

                            <div className="space-y-12">
                                <div className="space-y-1">
                                    <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Store Description / About</label>
                                    <textarea rows={3} value={formData.storeDescription} onChange={(e) => setFormData({ ...formData, storeDescription: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-medium resize-none" placeholder="Describe what you sell..." />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-1">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1 flex items-center gap-2">
                                            <Briefcase className="h-3 w-3" /> Business Type
                                        </label>
                                        <div className="relative">
                                            <select value={formData.businessType} onChange={(e) => setFormData({ ...formData, businessType: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-medium appearance-none">
                                                <option>Individual</option>
                                                <option>Proprietor</option>
                                                <option>Company</option>
                                            </select>
                                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1 flex items-center gap-2">
                                            <Calendar className="h-3 w-3" /> Year of Establishment <span className="text-[8px] opacity-60">(optional)</span>
                                        </label>
                                        <input type="text" value={formData.yearOfEstablishment} onChange={(e) => setFormData({ ...formData, yearOfEstablishment: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-medium" placeholder="e.g. 2020" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-1">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1 flex items-center gap-2">
                                            <FileText className="h-3 w-3" />Registration Number <span className="text-[8px] opacity-60">(optional)</span>
                                        </label>
                                        <input type="text" value={formData.regNumber} onChange={(e) => setFormData({ ...formData, regNumber: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-mono" placeholder="U1234..." />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1 flex items-center gap-2">
                                            <Hash className="h-3 w-3" /> GST Number <span className="text-[8px] opacity-60">(optional)</span>
                                        </label>
                                        <input type="text" value={formData.gstNumber} onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-mono uppercase tracking-widest" placeholder="27AAAAA..." />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1 flex items-center gap-2">
                                            <Fingerprint className="h-3 w-3" /> PAN Number
                                        </label>
                                        <input type="text" value={formData.panNumber} onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-mono uppercase tracking-widest" placeholder="ABCDE1234F" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: ADDRESS & LOCATION */}
                    {step === 3 && (
                        <div className="p-8 md:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-light tracking-tight text-gray-900">Where do you operate from?</h2>
                                <p className="text-gray-400 text-[15px] font-medium">This address will be used for pickups and deliveries</p>
                            </div>

                            <div className="space-y-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-8">
                                        <div className="space-y-1">
                                            <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Pickup Address</label>
                                            <textarea rows={3} value={formData.pickupAddress} onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-medium resize-none" placeholder="Flat No, Building, Street..." />
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div
                                                onClick={() => setFormData({ ...formData, sameAsPickup: !formData.sameAsPickup })}
                                                className={`w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-all ${formData.sameAsPickup ? 'bg-black border-black' : 'bg-white border-gray-200'}`}
                                            >
                                                {formData.sameAsPickup && <Check className="h-3 w-3 text-white" />}
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Warehouse address is same as pickup address</span>
                                        </div>

                                        {!formData.sameAsPickup && (
                                            <div className="space-y-1 animate-in slide-in-from-top-2">
                                                <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Warehouse Address</label>
                                                <textarea rows={3} value={formData.warehouseAddress} onChange={(e) => setFormData({ ...formData, warehouseAddress: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-medium resize-none" placeholder="Warehouse street address..." />
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-1">
                                                <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">City</label>
                                                <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-medium" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">State</label>
                                                <div className="relative">
                                                    <select value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-medium appearance-none">
                                                        {indianStates.map(state => <option key={state}>{state}</option>)}
                                                    </select>
                                                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300 pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-1">
                                                <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Pincode</label>
                                                <input type="number" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} className="w-full py-4 bg-transparent border-b border-gray-100 focus:border-black focus:outline-none text-[15px] font-mono" />
                                            </div>
                                            <div className="space-y-1 opacity-50">
                                                <label className="text-[17px] font-bold text-black uppercase tracking-widest font-['Outfit'] mb-2 block ml-1">Country</label>
                                                <input type="text" value={formData.country} disabled className="w-full py-4 bg-transparent border-b border-gray-100 text-[15px] font-medium" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: REVIEW & SUBMIT */}
                    {step === 4 && (
                        <div className="p-8 md:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-light tracking-tight text-gray-900">Review your details</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Identity Summary */}
                                <div className="p-10 bg-gray-50 rounded-[2rem] space-y-6 relative group">
                                    <button onClick={() => setStep(1)} className="absolute top-6 right-8 text-[9px] font-bold uppercase underline opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                                    <h4 className="text-[17px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">Business Info</h4>
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-full bg-white border border-gray-100 overflow-hidden shadow-sm">
                                            {formData.storeLogo && <img src={formData.storeLogo} className="w-full h-full object-cover" alt="Store Logo" />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg">{formData.storeName || 'Unnamed Store'}</p>
                                            <p className="text-xs text-gray-400">By {formData.ownerName}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 text-xs text-gray-500 font-medium">
                                        <div className="flex items-center gap-3"><Mail className="h-3 w-3" /> {formData.email}</div>
                                        <div className="flex items-center gap-3"><Phone className="h-3 w-3" /> +91 {formData.mobileNumber}</div>
                                    </div>
                                </div>

                                {/* Business Details Summary */}
                                <div className="p-10 bg-gray-50 rounded-[2rem] space-y-6 relative group">
                                    <button onClick={() => setStep(2)} className="absolute top-6 right-8 text-[9px] font-bold uppercase underline opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                                    <h4 className="text-[17px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">Business Details</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-[17px] font-bold uppercase text-gray-400">Type</span>
                                            <span className="text-xs font-bold">{formData.businessType}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-[17px] font-bold uppercase text-gray-400">PAN</span>
                                            <span className="text-[15px] font-mono">{formData.panNumber || 'Pending'}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-100 pb-2">
                                            <span className="text-[17px] font-bold uppercase text-gray-400">GST</span>
                                            <span className="text-[10px] font-mono">{formData.gstNumber || 'N/A'}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Logistics Summary */}
                                <div className="p-10 bg-gray-50 rounded-[2rem] md:col-span-2 space-y-6 relative group">
                                    <button onClick={() => setStep(3)} className="absolute top-6 right-8 text-[9px] font-bold uppercase underline opacity-0 group-hover:opacity-100 transition-opacity">Edit</button>
                                    <h4 className="text-[17px] font-bold uppercase tracking-[0.3em] text-[#C5A059]">Address & Location</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-4">
                                            <p className="text-[17px] font-bold text-gray-400 uppercase tracking-widest">Pickup Address</p>
                                            <p className="text-xs leading-relaxed text-gray-600 italic">{formData.pickupAddress || 'No address provided'}</p>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-[17px] font-bold text-gray-400 uppercase tracking-widest">Operational Region</p>
                                            <p className="text-xs font-bold text-gray-900">{formData.city}, {formData.state} - {formData.pincode}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 space-y-10">
                                <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setFormData({ ...formData, confirmed: !formData.confirmed })}>
                                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${formData.confirmed ? 'bg-black border-black' : 'bg-white border-gray-200 group-hover:border-black'}`}>
                                        {formData.confirmed && <Check className="h-4 w-4 text-white" />}
                                    </div>
                                    <span className="text-[15px] font-medium text-gray-600">I confirm that all details are correct</span>
                                </div>

                                <button
                                    disabled={!formData.confirmed}
                                    onClick={handleSubmit}
                                    className="w-full py-6 bg-black text-white rounded-2xl font-bold text-xs uppercase tracking-[0.3em] hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-black transition-all shadow-2xl shadow-black/10 active:scale-95"
                                >
                                    Submit for Verification
                                </button>
                            </div>
                        </div>
                    )}

                    {/* CONTROLS */}
                    <div className="bg-gray-50/50 p-8 flex justify-between items-center border-t border-gray-50">
                        {step > 1 ? (
                            <button onClick={prevStep} className="flex items-center gap-3 text-gray-400 hover:text-black font-bold text-[10px] uppercase tracking-[0.2em] transition-all">
                                <ArrowLeft className="h-4 w-4" /> Back
                            </button>
                        ) : <div />}

                        {step < 4 ? (
                            <button onClick={nextStep} className="group bg-black text-white px-10 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 hover:bg-gray-800 transition-all active:scale-95 shadow-xl shadow-black/5">
                                Next <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
