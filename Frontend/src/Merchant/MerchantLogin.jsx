
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
    Eye, EyeOff, Check, ArrowRight, ShoppingBag, Tag,
    CreditCard, Package, ShoppingCart, Truck, Gift,
    BarChart3, Zap, Globe, Smartphone, Heart
} from 'lucide-react';
import { toast } from 'sonner';

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [end, duration]);

    return <span>{count.toLocaleString()}{suffix}</span>;
};

const FloatingIcon = ({ Icon, size, top, left, delay, duration }) => (
    <div
        className="absolute text-white/10 pointer-events-none animate-float-slow"
        style={{
            top,
            left,
            animationDelay: delay,
            animationDuration: duration
        }}
    >
        <Icon size={size} strokeWidth={1} />
    </div>
);

const MerchantLogin = () => {
    const navigate = useNavigate();
    const [loginMethod, setLoginMethod] = useState('password');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleLogin = async () => {
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        if (loginMethod === 'password' && !password) {
            toast.error("Please enter your password");
            return;
        }

        try {
            const loginData = { email, password };

            const response = await fetch('http://localhost:4000/merchant/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Login Successful. Redirecting...");
                Cookies.set('token', data.token, { expires: 1 });
                if (data.merchant) {
                    localStorage.setItem('merchant', JSON.stringify(data.merchant));
                }
                navigate('/merchant');
            } else {
                toast.error(data.msg || "Login failed");
            }

        } catch (err) {
            console.error("Login Error:", err);
            toast.error("Login failed. Check connection.");
        }
    };

    const handleCreateAccount = () => {
        // Redirect to Onboarding
        navigate('/merchant/onboarding');
    };

    const handleSendOTP = () => {
        if (!email) {
            toast.error("Please enter your email address to receive OTP");
            return;
        }

        // SMTP Functionality Simulation
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: 'Sending OTP via Secure SMTP...',
                success: () => {
                    setOtpSent(true);
                    return `OTP sent to ${email}`;
                },
                error: 'Failed to send OTP',
            }
        );
    };

    return (
        <div className="min-h-screen flex bg-[#fbfbf9] overflow-hidden">
            <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
            -webkit-text-fill-color: black !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

            {/* Left Pane: Cinematic Black Background with Floating Icons */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black">
                {/* Background Animation Layer */}
                <div className="absolute inset-0 z-0">
                    <FloatingIcon Icon={ShoppingBag} size={40} top="15%" left="10%" delay="0s" duration="18s" />
                    <FloatingIcon Icon={Tag} size={30} top="25%" left="80%" delay="-2s" duration="22s" />
                    <FloatingIcon Icon={CreditCard} size={45} top="65%" left="15%" delay="-5s" duration="20s" />
                    <FloatingIcon Icon={Package} size={35} top="80%" left="70%" delay="-8s" duration="25s" />
                    <FloatingIcon Icon={ShoppingCart} size={50} top="40%" left="40%" delay="-3s" duration="21s" />
                    <FloatingIcon Icon={Truck} size={38} top="10%" left="60%" delay="-12s" duration="19s" />
                    <FloatingIcon Icon={Gift} size={32} top="55%" left="85%" delay="-1s" duration="24s" />
                    <FloatingIcon Icon={BarChart3} size={42} top="85%" left="30%" delay="-15s" duration="23s" />
                    <FloatingIcon Icon={Zap} size={28} top="30%" left="20%" delay="-4s" duration="17s" />
                    <FloatingIcon Icon={Globe} size={44} top="70%" left="50%" delay="-10s" duration="26s" />
                    <FloatingIcon Icon={Smartphone} size={36} top="5%" left="35%" delay="-6s" duration="22s" />
                    <FloatingIcon Icon={Heart} size={30} top="45%" left="75%" delay="-9s" duration="20s" />

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[120px]" />
                </div>

                {/* Content Container */}
                <div className="relative z-20 flex flex-col justify-center px-24 text-white w-full h-full">
                    <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
                        <div className="flex items-center gap-3 mb-12">
                            <h1 className="text-xl font-black tracking-[-0.08em]">SHOP.CO</h1>
                            <div className="w-8 h-[1px] bg-[#C5A059]"></div>
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">Merchant Portal</span>
                        </div>

                        <div className="space-y-8 max-w-lg">
                            <h2 className="text-6xl font-bold tracking-tight leading-none animate-in fade-in slide-in-from-left-8 duration-1000 delay-150">
                                Welcome <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 font-bold">Back</span>
                            </h2>
                            <p className="text-gray-400 text-lg font-medium leading-relaxed animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                                Step into style. Access your personal fashion universe and discover clothing that matches your unique aesthetic.
                            </p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-12 mt-24 relative animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                        <div className="absolute -top-12 left-0 w-full h-[1px] bg-white/5 overflow-hidden">
                            <div className="w-1/3 h-full bg-[#C5A059] animate-[slide_3s_infinite_linear]" />
                        </div>

                        <div className="space-y-2">
                            <p className="text-4xl font-bold tracking-tighter text-white">
                                <CountUp end={200} suffix="+" />
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Brands</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-4xl font-bold tracking-tighter text-white">
                                <CountUp end={2000} suffix="+" />
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Products</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-4xl font-bold tracking-tighter text-white">
                                <CountUp end={30000} suffix="+" />
                            </p>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Happy Customers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Pane: Login Card - Exact Reference Match */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#fbfbf9] relative z-30">
                <div className="w-full max-w-lg bg-white p-12 rounded-[3.5rem] shadow-[0_48px_80px_-24px_rgba(0,0,0,0.08)] border border-gray-50 animate-in fade-in zoom-in-95 duration-700">
                    <div className="mb-10 text-left">
                        <h3 className="text-4xl font-bold text-gray-900 mb-2">Merchant Login</h3>
                        <p className="text-sm text-gray-500 font-medium">Enter your credentials to access your account</p>
                    </div>

                    {/* Tab Switcher - Match Reference Gray */}
                    <div className="bg-[#e5e5e5]/50 p-1 rounded-2xl flex mb-10">
                        <button
                            onClick={() => setLoginMethod('password')}
                            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${loginMethod === 'password' ? 'bg-[#e5e5e5] text-black shadow-sm' : 'text-gray-500'}`}
                        >
                            Password Login
                        </button>
                        <button
                            onClick={() => setLoginMethod('otp')}
                            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all duration-300 ${loginMethod === 'otp' ? 'bg-[#e5e5e5] text-black shadow-sm' : 'text-gray-500'}`}
                        >
                            OTP Login
                        </button>
                    </div>

                    <div className="space-y-8">
                        {/* Email Field - Floating Label Style */}
                        <div className="relative">
                            <label className="text-[11px] font-medium text-gray-500 absolute -top-2 left-4 bg-white px-2 z-10">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tanishph9@yopmail.com"
                                className="w-full px-5 py-4 bg-[#ebf2ff]/30 border border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none transition-all text-sm font-medium text-gray-900"
                            />
                        </div>

                        {/* Password Field */}
                        {loginMethod === 'password' ? (
                            <div className="relative">
                                <label className="text-[11px] font-medium text-gray-500 absolute -top-2 left-4 bg-white px-2 z-10">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none transition-all text-sm font-medium text-gray-900"
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                    >
                                        <div className="relative w-4 h-4 rounded-full overflow-hidden border border-gray-200 bg-gradient-to-br from-red-200 to-red-500" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative animate-in slide-in-from-top-2 space-y-4">
                                {!otpSent ? (
                                    <button
                                        onClick={handleSendOTP}
                                        className="w-full py-4 border-2 border-dashed border-black/10 rounded-2xl text-xs font-bold uppercase tracking-widest text-gray-500 hover:border-black hover:text-black transition-all bg-[#fbfbf9]"
                                    >
                                        Send OTP via SMTP
                                    </button>
                                ) : (
                                    <div className="relative">
                                        <label className="text-[11px] font-medium text-gray-500 absolute -top-2 left-4 bg-white px-2 z-10">
                                            One-Time Password
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Verification Code"
                                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl focus:border-blue-400 focus:outline-none transition-all text-sm font-medium tracking-widest text-center"
                                        />
                                        <div className="text-center mt-2">
                                            <button onClick={handleSendOTP} className="text-[10px] font-bold text-gray-400 hover:text-black underline">Resend code</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setRememberMe(!rememberMe)}>
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${rememberMe ? 'bg-black border-black shadow-md shadow-black/10' : 'bg-white border-gray-300'}`}>
                                    {rememberMe && <Check className="h-3 w-3 text-white" />}
                                </div>
                                <span className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors">Remember me</span>
                            </div>
                            <button className="text-xs font-bold text-black hover:underline underline-offset-4">
                                Forgot password?
                            </button>
                        </div>

                        <button
                            onClick={handleLogin}
                            className="w-full py-5 bg-black text-white rounded-full font-bold text-sm transition-all shadow-xl shadow-black/10 active:scale-95 group flex items-center justify-center gap-3"
                        >
                            Sign In
                        </button>

                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-500">
                                Don't have an account? <button onClick={handleCreateAccount} className="text-black font-bold hover:underline ml-1">Create account</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes float-slow {
          0% { transform: translateY(0) translateX(0) rotate(0); }
          33% { transform: translateY(-30px) translateX(20px) rotate(5deg); }
          66% { transform: translateY(20px) translateX(-15px) rotate(-5deg); }
          100% { transform: translateY(0) translateX(0) rotate(0); }
        }
        .animate-float-slow {
          animation: float-slow infinite ease-in-out;
        }
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
        </div>
    );
};

export default MerchantLogin;
