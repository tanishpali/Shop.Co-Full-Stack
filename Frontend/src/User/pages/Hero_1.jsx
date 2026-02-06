import React from "react";
import heroImage from "../../components/Assets/tanish-assets/Rectangle 2.png";
import versace from "../../components/Assets/tanish-assets/Group.png";
import zara from "../../components/Assets/tanish-assets/zara-logo-1 1.png";
import gucci from "../../components/Assets/tanish-assets/gucci-logo-1 1.png";
import prada from "../../components/Assets/tanish-assets/prada-logo-1 1.png";
import calvinklein from "../../components/Assets/tanish-assets/calvin.png";

import c1 from "../../components/Assets/tanish-assets/Frame 61.png";
import f1 from "../../components/Assets/tanish-assets/Frame 62.png";
import p1 from "../../components/Assets/tanish-assets/Frame 64.png";
import g1 from "../../components/Assets/tanish-assets/Frame 63.png";


import Newarrival from "./Homepage/Newarrival";
import Topselling from "./Homepage/Topselling";
import Footer from "./Homepage/Footer";


export default function Homepage() {
  return (
    <div className="w-full bg-white font-sans">

      {/* Hero Section */}
      <section className="relative max-w-[1560px] mx-auto min-h-[663px] md:h-[663px] overflow-hidden flex items-center justify-center p-4">
        {/* Background Image */}
        <img
          src={heroImage}
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover object-top"
        />

        {/* Content */}
        <div
          className="relative z-10 w-full max-w-[700px] flex flex-col items-start p-4 md:p-0 content-movable"
          style={{ marginTop: '0px', marginLeft: '0px', marginRight: '600px' }} // Adjust these values to move all content in any direction
        >
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-[72px] font-bold leading-[1.1] text-black w-full text-left" style={{ fontFamily: "Integral CF, sans-serif", marginBottom: '12px', marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}>
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>

          {/* Paragraph */}
          <p
            className="text-base leading-relaxed text-black w-full text-left"
            style={{
              fontFamily: "Satoshi, sans-serif",
              fontWeight: 400,
              marginBottom: "32px",
              marginTop: "0px",
              marginLeft: "0px",
              marginRight: "0px"
            }}
          >
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>

          {/* CTA Button */}
          <div className="w-full flex justify-start">
            <button
              className="font-semibold rounded-[62px] flex items-center justify-center"
              style={{
                width: "210px",
                height: "52px",
                padding: "16px 54px",
                background: "#000000",
                color: "#FFFFFF",
                gap: "12px",
                marginBottom: "40px",
                marginTop: "0px",
                marginLeft: "0px",
                marginRight: "0px"
              }}
            >
              Shop Now
            </button>
          </div>

          {/* Stats */}
          <div className="w-full flex justify-start items-center py-6" style={{ marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}>
            <div className="flex w-full max-w-[700px] justify-between items-center text-black">
              <div className="flex-1 text-left">
                <h3 className="text-[2rem] font-bold" style={{ fontFamily: 'Integral CF, sans-serif', marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}>200+</h3>
                <p className="text-base text-black/80" style={{ fontFamily: 'Satoshi, sans-serif', marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}>International Brands</p>
              </div>
              <div className="h-12 w-px bg-gray-300 mx-4"></div>
              <div className="flex-1 text-left">
                <h3 className="text-[2rem] font-bold" style={{ fontFamily: 'Integral CF, sans-serif', marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}>2,000+</h3>
                <p className="text-base text-black/80" style={{ fontFamily: 'Satoshi, sans-serif', marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}>High-Quality Products</p>
              </div>
              <div className="h-12 w-px bg-gray-300 mx-4"></div>
              <div className="flex-1 text-left">
                <h3 className="text-[2rem] font-bold" style={{ fontFamily: 'Integral CF, sans-serif', marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}>30,000+</h3>
                <p className="text-base text-black/80" style={{ fontFamily: 'Satoshi, sans-serif', marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}>Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Strip */}
      <section className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-20 py-8 bg-black text-white">
        <img src={versace} alt="Versace" className="h-8 sm:h-10 md:h-12 w-auto object-contain" />
        <img src={zara} alt="Zara" className="h-8 sm:h-10 md:h-12 w-auto object-contain" />
        <img src={gucci} alt="Gucci" className="h-8 sm:h-10 md:h-12 w-auto object-contain" />
        <img src={prada} alt="Prada" className="h-8 sm:h-10 md:h-12 w-auto object-contain" />
        <img src={calvinklein} alt="Calvin Klein" className="h-8 sm:h-10 md:h-12 w-auto object-contain" />
      </section>


      <div>
        {/* Newarrival section */}
        <div id="newarrival">
          <Newarrival />
        </div>

        {/* Top selling section */}
        <div id="topselling">
          <Topselling />
        </div>






      </div>

      {/* Browse by Dress Style */}
      <section className="px-4 sm:px-8 md:px-12 py-16 flex justify-center">
        <div className="w-full max-w-[1239px] bg-[#F0F0F0] rounded-[40px] p-8 md:p-16 flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8">
            BROWSE BY DRESS STYLE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="relative rounded-[20px] overflow-hidden">
              <img src={c1} alt="Casual" className="w-full h-full object-cover" />
            </div>
            <div className="relative rounded-[20px] overflow-hidden">
              <img src={f1} alt="Formal" className="w-full h-full object-cover" />
            </div>
            <div className="relative rounded-[20px] overflow-hidden col-span-1 md:col-span-2">
              <img src={p1} alt="Party" className="w-full h-full object-cover" />
            </div>
            <div className="relative rounded-[20px] overflow-hidden col-span-1">
              <img src={g1} alt="Gym" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-8 md:px-[100px] py-[80px] bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <h2
            className="text-3xl sm:text-4xl md:text-[48px] font-bold leading-[1.1] md:leading-[100%] tracking-[0%] font-['Integral_CF'] text-center md:text-left mb-6 md:mb-0"
            style={{ fontFamily: "Integral CF, sans-serif" }}
          >
            OUR HAPPY CUSTOMERS
          </h2>
          <div className="flex items-center space-x-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
              ←
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100">
              →
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[1240px] mx-auto">
          {/* Card 1 */}
          <div className="w-full border border-gray-200 rounded-[20px] p-6 sm:p-8 shadow-sm flex flex-col gap-4">
            <div className="flex items-center space-x-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
            </div>
            <h3 className="font-semibold text-base sm:text-[16px] leading-[22px] font-['Satoshi']">
              Sarah M.
            </h3>
            <p className="text-sm sm:text-[16px] leading-[22px] font-['Satoshi'] text-gray-600">
              "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant
              dresses, every piece I’ve bought has exceeded my expectations."
            </p>
          </div>
          {/* Card 2 */}
          <div className="w-full border border-gray-200 rounded-[20px] p-6 sm:p-8 shadow-sm flex flex-col gap-4">
            <div className="flex items-center space-x-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
            </div>
            <h3 className="font-semibold text-base sm:text-[16px] leading-[22px] font-['Satoshi']">Alex K.</h3>
            <p className="text-sm sm:text-[16px] leading-[22px] font-['Satoshi'] text-gray-600">
              "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range
              of options they offer is truly impressive."
            </p>
          </div>
          {/* Card 3 */}
          <div className="w-full border border-gray-200 rounded-[20px] p-6 sm:p-8 shadow-sm flex flex-col gap-4">
            <div className="flex items-center space-x-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
            </div>
            <h3 className="font-semibold text-base sm:text-[16px] leading-[22px] font-['Satoshi']">James L.</h3>
            <p className="text-sm sm:text-[16px] leading-[22px] font-['Satoshi'] text-gray-600">
              "As someone who’s always on the lookout for unique fashion pieces, I’m thrilled to have found Shop.co. Their
              collection is a treasure trove of stylish discoveries."
            </p>
          </div>
        </div>
      </section>
      <Footer />



    </div>
  );
}