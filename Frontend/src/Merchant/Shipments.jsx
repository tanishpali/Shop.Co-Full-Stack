import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

const Shipments = () => {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 fade-in-up">
            {/* Header */}
            <h1 className="text-3xl font-light tracking-tight text-gray-900">Shipments</h1>

            {/* Empty State Card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[60vh] flex flex-col items-center justify-center text-center p-8">

                {/* Icon */}
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 relative">
                    <Clock className="w-6 h-6 text-gray-300" />
                    <div className="absolute top-3 right-4 w-1.5 h-1.5 bg-[#C5A059] rounded-full"></div>
                </div>

                {/* Content */}
                <div className="space-y-4 max-w-md mx-auto">
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C5A059]">Under Development</span>
                        <h2 className="text-2xl text-gray-900 font-light">Logistics Insight</h2>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed font-light">
                        Our refined shipment tracking module is currently undergoing final verification. Real-time data will be accessible shortly.
                    </p>

                    <div className="w-8 border-t border-gray-200 mx-auto my-8"></div>

                    <button
                        onClick={() => navigate('/seller')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-all hover:gap-3"
                    >
                        <ArrowLeft className="w-3 h-3" />
                        Return to Overview
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Shipments;
