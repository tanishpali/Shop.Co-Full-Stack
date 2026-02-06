import React from 'react';
import { LogOut, ArrowLeft } from 'lucide-react';

const SignOutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-[400px] rounded-[32px] p-8 shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-300">

                {/* Icon Header */}
                <div className="w-24 h-24 bg-[#F5F5F5] rounded-full flex items-center justify-center mb-6">
                    <LogOut className="w-10 h-10 text-black ml-1" />
                </div>

                {/* Text */}
                <h2 className="text-2xl font-bold text-black mb-3">Sign Out</h2>
                <p className="text-gray-500 text-center mb-8 leading-relaxed">
                    Are you sure you want to sign out of your account?
                </p>

                {/* Buttons */}
                <div className="w-full space-y-3">
                    <button
                        onClick={onConfirm}
                        className="w-full bg-black text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition-all active:scale-[0.98]"
                    >
                        <LogOut className="w-5 h-5" />
                        Yes, Sign Out
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full bg-white text-black border border-gray-100 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98]"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignOutModal;
