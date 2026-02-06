import React, { useRef, useState } from 'react';
import { Upload, X, Sparkles, Plus } from 'lucide-react';

const ImageUpload = ({ images, setImages, isAnalyzing, onImageAdded }) => {
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [activePreviewIdx, setActivePreviewIdx] = useState(0);

    const handleFile = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setImages((prev) => [...prev, base64String]);
            if (onImageAdded) onImageAdded(file);
            if (images.length === 0) setActivePreviewIdx(0);
        };
        reader.readAsDataURL(file);
    };

    const handleFileChange = (e) => {
        if (e.target.files?.[0]) handleFile(e.target.files[0]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        if (activePreviewIdx >= images.length - 1) {
            setActivePreviewIdx(Math.max(0, images.length - 2));
        }
    };

    const mainImage = images[activePreviewIdx] || images[0];

    return (
        <div className="flex flex-col gap-6 fade-in-left">
            {/* Primary Preview Section */}
            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]); }}
                className={`relative aspect-[4/5] w-full rounded-2xl overflow-hidden border transition-all duration-300 group bg-white shadow-lg
          ${isDragging ? 'border-[#C5A059] bg-[#fbfbf9]' : 'border-gray-100'}
        `}
            >
                {images.length > 0 ? (
                    <>
                        <img
                            src={mainImage}
                            alt="Primary preview"
                            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isAnalyzing ? 'opacity-50 grayscale blur-[1px]' : ''}`}
                        />

                        {/* Elegant AI Analysis Scanner */}
                        {isAnalyzing && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                {/* Horizontal Scan Line - Gold single pixel */}
                                <div className="absolute w-full h-[1px] bg-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,1)] animate-elegant-scan z-20"></div>

                                <div className="relative z-30">
                                    <div className="bg-black/80 backdrop-blur-md px-8 py-4 rounded-full flex items-center gap-3">
                                        <Sparkles className="h-4 w-4 text-[#C5A059] animate-pulse" />
                                        <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em]">Processing Visuals</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <button
                            onClick={(e) => { e.stopPropagation(); removeImage(activePreviewIdx); }}
                            className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-sm rounded-full text-black opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-90"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm px-5 py-2 rounded-full text-white text-[9px] font-bold tracking-[0.2em] uppercase">
                            Selected Capture
                        </div>
                    </>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-full flex flex-col items-center justify-center cursor-pointer group"
                    >
                        <div className="w-16 h-16 rounded-full border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-300">
                            <Upload className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                        <h4 className="text-xl font-light text-gray-900 mb-2 tracking-tight">Acquire Imagery</h4>
                        <p className="text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em]">
                            Drag Assets or <span className="text-black underline">Browse Archive</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Gallery */}
            <div className="flex flex-wrap gap-3">
                {images.map((src, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActivePreviewIdx(idx)}
                        className={`relative w-16 h-20 rounded-lg overflow-hidden border transition-all active:scale-95
              ${activePreviewIdx === idx ? 'border-black shadow-lg shadow-black/5 ring-1 ring-black scale-105' : 'border-gray-100 opacity-60 hover:opacity-100'}
            `}
                    >
                        <img src={src} alt={`Thumb ${idx}`} className="w-full h-full object-cover grayscale" />
                    </button>
                ))}

                {images.length > 0 && (
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-16 h-20 flex items-center justify-center border border-dashed border-gray-200 rounded-lg hover:border-black transition-all group active:scale-95"
                    >
                        <Plus className="h-4 w-4 text-gray-300 group-hover:text-black" />
                    </button>
                )}
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        </div>
    );
};

export default ImageUpload;
