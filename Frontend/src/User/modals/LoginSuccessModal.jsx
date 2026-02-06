import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

const LoginSuccessModal = ({ isOpen, onComplete }) => {
    const [seconds, setSeconds] = useState(3);
    const totalSeconds = 3;

    useEffect(() => {
        if (!isOpen) return;

        if (seconds === 0) {
            onComplete();
            return;
        }

        const timer = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen, seconds, onComplete]);

    if (!isOpen) return null;

    const progress = ((totalSeconds - seconds) / totalSeconds) * 100;

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-white shadow-2xl backdrop-blur-sm" />

            {/* Modal Content */}
            <div className="relative bg-white w-full max-w-[450px] rounded-[48px] p-12 flex flex-col items-center animate-in fade-in zoom-in duration-500">

                {/* Success Icon */}
                <div className="relative mb-8">
                    <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                        <Check className="w-16 h-16 text-white stroke-[3px]" />
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute inset-0 bg-black blur-2xl opacity-20 -z-10 rounded-full" />
                </div>

                {/* Text Section */}
                <h2 className="text-[40px] font-bold text-black mb-3 font-['Integral_CF'] text-center tracking-tight">
                    Welcome Back!
                </h2>
                <p className="text-gray-500 text-center text-lg mb-8 leading-relaxed">
                    You have successfully signed in to your account.<br />
                    <span className="text-gray-400">Redirecting you to the home page...</span>
                </p>

                {/* Timer UI */}
                <div className="flex flex-col items-center gap-4 w-full mb-10">
                    <div className="bg-gray-100 px-6 py-2 rounded-full flex items-center gap-3">
                        <span className="w-8 h-8 bg-white text-black font-bold rounded-full flex items-center justify-center shadow-sm">
                            {seconds}
                        </span>
                        <span className="text-gray-600 font-medium">seconds remaining</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-black transition-all duration-1000 ease-linear"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Skip Action */}
                <button
                    onClick={onComplete}
                    className="text-gray-400 font-medium hover:text-black transition-colors"
                >
                    Skip and go to home
                </button>
            </div>
        </div>
    );
};

export default LoginSuccessModal;
