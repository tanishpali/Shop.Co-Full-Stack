import React from 'react';
import { Mail, Twitter, Facebook, Instagram, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 relative">
      {/* Newsletter Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 -mb-24">
        <div className="bg-black rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl shadow-black/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <h2 className="text-white text-3xl md:text-4xl font-black tracking-tight leading-tight max-w-lg text-center lg:text-left">
            STAY UP TO DATE ABOUT <br className="hidden md:block" /> OUR LATEST OFFERS
          </h2>

          <div className="flex flex-col gap-3 w-full max-w-sm">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-white py-4 pl-12 pr-6 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C5A059] transition-all"
              />
            </div>
            <button className="w-full bg-white text-black py-4 rounded-full font-bold text-sm hover:bg-gray-100 transition-all active:scale-[0.98]">
              Subscribe to Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-[#f0f0f0] pt-40 pb-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Info */}
            <div className="lg:col-span-4 space-y-6">
              <h1 className="text-3xl font-black tracking-[-0.08em] text-black">SHOP.CO</h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-medium">
                We have clothes that suits your style and which you're proud to wear. From women to men.
              </p>
              <div className="flex gap-4">
                {[Twitter, Facebook, Instagram, Github].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className={`w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center transition-all ${idx === 1 ? 'bg-black text-white border-black' : 'bg-white text-black hover:bg-black hover:text-white hover:border-black'}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.3em] text-black">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                {['About', 'Features', 'Works', 'Career'].map(link => (
                  <li key={link}><a href="#" className="hover:text-black transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.3em] text-black">Help</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                {['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'].map(link => (
                  <li key={link}><a href="#" className="hover:text-black transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.3em] text-black">FAQ</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                {['Account', 'Manage Deliveries', 'Orders', 'Payments'].map(link => (
                  <li key={link}><a href="#" className="hover:text-black transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <h4 className="text-[12px] font-bold uppercase tracking-[0.3em] text-black">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-500 font-medium">
                {['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'].map(link => (
                  <li key={link}><a href="#" className="hover:text-black transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[12px] font-medium text-gray-400">
              Shop.co © 2000-2023, All Rights Reserved
            </p>

            <div className="flex gap-3">
              {['Visa', 'Mastercard', 'PayPal', 'ApplePay', 'GooglePay'].map((payment) => (
                <div key={payment} className="w-12 h-8 bg-white rounded-md border border-gray-100 flex items-center justify-center p-2 shadow-sm">
                  {/* Styled payment icon placeholders */}
                  <div className="w-full h-full bg-gray-50 rounded-sm flex items-center justify-center overflow-hidden">
                    <span className="text-[8px] font-black italic tracking-tighter scale-75 opacity-40">{payment}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
