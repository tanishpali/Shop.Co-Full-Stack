import React from 'react';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AccessRestricted = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fbfbf9] p-4">
            <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h2>
                <p className="text-gray-500 mb-8">
                    This area is exclusive to registered sellers. Please sign in to access your atelier dashboard.
                </p>
                <div className="space-y-3">
                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all"
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-white text-black border border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessRestricted;
