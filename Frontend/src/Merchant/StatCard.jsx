import React, { useState, useEffect } from 'react';

const CountUp = ({ end, duration = 1500, prefix = "", isDecimal = false }) => {
    const [count, setCount] = useState(0);
    const target = typeof end === 'string' ? parseFloat(end.replace(/[^0-9.]/g, '')) : end;

    useEffect(() => {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(progress * target);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [target, duration]);

    const displayValue = isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString();
    return <span>{prefix}{displayValue}</span>;
};

const StatCard = ({ label, value, icon: Icon, delay, prefix = "", isDecimal = false }) => {
    return (
        <div
            className="group relative bg-white p-8 rounded-[2.5rem] border border-gray-100 luxury-shadow overflow-hidden transition-all duration-500 hover:border-black/5 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Animated Floating Background Icons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute top-[10%] left-[10%] animate-float-slow opacity-[0.05] group-hover:opacity-[0.15] transition-opacity">
                    <Icon className="h-30 w-30 text-gray-400" strokeWidth={1} />
                </div>
                <div className="absolute bottom-[5%] right-[5%] animate-float-slow-reverse opacity-[0.03] group-hover:opacity-[0.1] transition-opacity" style={{ animationDelay: '-2s' }}>
                    <Icon className="h-30 w-30 text-gray-400" strokeWidth={0.5} />
                </div>
                <div className="absolute top-[40%] right-[20%] animate-float-slow opacity-[0.04] group-hover:opacity-[0.12] transition-opacity" style={{ animationDelay: '-4s' }}>
                    <Icon className="h-30 w-30 text-gray-400" strokeWidth={1} />
                </div>
            </div>

            {/* Holographic Orbs */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                <div className="absolute top-[-20%] left-[-10%] w-40 h-40 bg-blue-50/40 rounded-full blur-[40px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-[#C5A059]/10 rounded-full blur-[40px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start mb-10">
                    <div className="p-4 rounded-2xl bg-[#f8f8f8] text-black border border-gray-50 group-hover:bg-black group-hover:text-white group-hover:shadow-xl group-hover:shadow-black/20 transition-all duration-500 animate-subtle-float">
                        <Icon className="h-10 w-10" />
                    </div>
                    <div className="h-1.5 w-1.5 rounded-full bg-black/5 group-hover:bg-[#C5A059] transition-colors" />
                </div>

                <div>
                    <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-3 group-hover:text-gray-600 transition-colors">
                        {label}
                    </h3>
                    <p className="text-5xl font-black tracking-tight text-gray-900 group-hover:scale-[1.02] transition-transform duration-500 origin-left">
                        <CountUp end={value} prefix={prefix} isDecimal={isDecimal} />
                    </p>
                </div>
            </div>

            <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:left-[100%] transition-all duration-1000 ease-in-out"></div>

            <style>{`
        @keyframes float-slow {
          0% { transform: translateY(0) translateX(0) rotate(0); }
          50% { transform: translateY(-15px) translateX(10px) rotate(5deg); }
          100% { transform: translateY(0) translateX(0) rotate(0); }
        }
        @keyframes float-slow-reverse {
          0% { transform: translateY(0) translateX(0) rotate(0); }
          50% { transform: translateY(15px) translateX(-10px) rotate(-5deg); }
          100% { transform: translateY(0) translateX(0) rotate(0); }
        }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-float-slow-reverse { animation: float-slow-reverse 12s ease-in-out infinite; }
      `}</style>
        </div>
    );
};

export default StatCard;
