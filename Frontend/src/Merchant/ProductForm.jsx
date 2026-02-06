import React from 'react';
import { BookOpen } from 'lucide-react';

const ProductForm = ({ data, setData, onSubmit, isAnalyzing }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const categories = ["Haute Couture", "Prêt-à-Porter", "Leather Goods", "Fine Jewelry", "Footwear"];
    const subCategories = ["Evening Wear", "Outerwear", "Bespoke", "Limited Edition"];

    return (
        <div className="bg-white p-12 rounded-2xl border border-gray-50 shadow-lg space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-1">Curation Details</h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Product Catalog Entry</p>
                </div>
                {isAnalyzing && (
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                        <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse"></div>
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Drafting...</span>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] ml-1">Asset Nomenclature</label>
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="e.g. Midnight Wool Tuxedo"
                    className="w-full px-0 py-4 bg-transparent border-b border-gray-100 focus:outline-none focus:border-black transition-all font-medium text-lg text-gray-900 placeholder:text-gray-200"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] ml-1">Collection</label>
                    <select
                        name="category"
                        value={data.category}
                        onChange={handleChange}
                        className="w-full px-0 py-4 bg-transparent border-b border-gray-100 focus:outline-none focus:border-black transition-all font-medium text-gray-900 appearance-none cursor-pointer"
                    >
                        <option value="">Select Range</option>
                        {categories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] ml-1">Classification</label>
                    <select
                        name="subCategory"
                        value={data.subCategory}
                        onChange={handleChange}
                        className="w-full px-0 py-4 bg-transparent border-b border-gray-100 focus:outline-none focus:border-black transition-all font-medium text-gray-900 appearance-none cursor-pointer"
                    >
                        <option value="">Select Style</option>
                        {subCategories.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] ml-1">Valuation</label>
                <div className="relative group">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 font-light text-2xl group-focus-within:text-black transition-colors">$</span>
                    <input
                        type="text"
                        name="price"
                        value={data.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        className="w-full pl-6 pr-0 py-4 bg-transparent border-b border-gray-100 focus:outline-none focus:border-black transition-all font-light text-4xl text-gray-900"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.3em] ml-1">Narrative Description</label>
                <textarea
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    rows={5}
                    placeholder="The story behind the piece..."
                    className="w-full px-0 py-4 bg-transparent border-b border-gray-100 focus:outline-none focus:border-black transition-all font-medium text-gray-900 resize-none leading-relaxed placeholder:font-light"
                />
            </div>

            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <BookOpen className="h-4 w-4 text-gray-400 shrink-0" />
                <p className="text-[10px] font-medium text-gray-500 leading-relaxed uppercase tracking-widest">
                    Gemini Atelier has generated this draft. Refine as needed for publication.
                </p>
            </div>

            <button
                onClick={onSubmit}
                className="w-full bg-black text-white py-5 rounded-lg font-bold text-[12px] uppercase tracking-[0.3em] hover:bg-gray-800 transition-all transform flex items-center justify-center gap-3 shadow-lg active:scale-[0.98]"
            >
                Finalize Acquisition
            </button>
        </div>
    );
};

export default ProductForm;
