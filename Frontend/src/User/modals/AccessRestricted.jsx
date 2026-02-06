import React from 'react';
import { ShieldAlert, LogIn, UserPlus, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccessRestricted = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#F9FAFB]">
            {/* Background Decor */}
            <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

            {/* Card */}
            <div className="relative bg-white w-full max-w-[500px] rounded-[48px] p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex flex-col items-center animate-in fade-in zoom-in duration-500">

                {/* Icon Header */}
                <div className="relative mb-10">
                    <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center">
                        <ShieldAlert className="w-14 h-14 text-red-500" />
                    </div>
                    <div className="absolute bottom-1 -right-1 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                </div>

                {/* Text Section */}
                <h2 className="text-[40px] font-bold text-black mb-4 font-['Integral_CF'] text-center leading-tight">
                    Access Restricted
                </h2>
                <p className="text-gray-500 text-center text-lg mb-10 leading-relaxed max-w-[360px]">
                    This page requires authentication. Please sign in to your account or create a new one to continue.
                </p>

                {/* Action Buttons */}
                <div className="w-full space-y-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-900 transition-all active:scale-[0.98] text-lg group"
                    >
                        <LogIn className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        Sign In
                    </button>

                    <button
                        onClick={() => navigate('/signup')}
                        className="w-full bg-white text-black border-2 border-gray-100 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-all active:scale-[0.98] text-lg"
                    >
                        <UserPlus className="w-6 h-6" />
                        Create Account
                    </button>
                </div>

                {/* Footer Link */}
                <div className="mt-12 pt-8 border-t border-gray-100 w-full text-center">
                    <p className="text-gray-500">
                        Want to browse first?{' '}
                        <button
                            onClick={() => navigate('/')}
                            className="text-black font-bold hover:underline"
                        >
                            Continue as guest
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AccessRestricted;
