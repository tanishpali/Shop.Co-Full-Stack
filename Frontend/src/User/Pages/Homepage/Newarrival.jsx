import React from "react";
import { Link } from "react-router-dom";
import tshirt1 from "../../../Components/Assets/tanish-assets/tshirt1.png";
import a2 from "../../../Components/Assets/tanish-assets/a2.png";
import a3 from "../../../Components/Assets/tanish-assets/a3.png";
import a4 from "../../../Components/Assets/tanish-assets/a4.png";




const Newarrival = () => {
  return (
    <div>


      {/* New Arrivals Section */}
      <section className="px-4 sm:px-8 md:px-12 py-16 flex flex-col items-center">
        <h2 className="font-['Integral_CF'] font-bold text-3xl sm:text-4xl md:text-[48px] leading-[100%] text-black text-center mb-10 md:mb-20">
          NEW ARRIVALS
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1200px]">
          {/* Product Card 1 */}
          <Link to="/product/new-arrival-1" className="block">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-[295px] h-[298px] bg-[#F0EEED] rounded-[20px] flex items-center justify-center overflow-hidden">
                <img src={tshirt1} alt="T-shirt" className="w-full h-full object-contain" />
              </div>
              <h3 className="mt-3 font-['Satoshi'] font-bold text-lg sm:text-[20px] text-black">
                T-shirt with Tape Details
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                ⭐⭐⭐⭐ <span className="text-gray-600 ml-1">4.5/5</span>
              </div>
              <p className="mt-1 text-lg font-bold text-black">₹120</p>
            </div>
          </Link>
          {/* Product Card 2 */}
          <Link to="/product/new-arrival-2" className="block">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-[295px] h-[298px] bg-[#F0EEED] rounded-[20px] flex items-center justify-center overflow-hidden">
                <img src={a2} alt="Skinny Fit Jeans" className="w-full h-full object-contain" />
              </div>
              <h3 className="mt-3 font-['Satoshi'] font-bold text-lg sm:text-[20px] text-black">
                Skinny Fit Jeans
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                ⭐⭐⭐ <span className="text-gray-600 ml-1">3.5/5</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-lg font-bold text-black">₹240</span>
                <span className="text-gray-400 line-through">₹260</span>
                <span className="text-red-500 text-sm">-20%</span>
              </div>
            </div>
          </Link>
          {/* Product Card 3 */}
          <Link to="/product/new-arrival-3" className="block">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-[295px] h-[298px] bg-[#F0EEED] rounded-[20px] flex items-center justify-center overflow-hidden">
                <img src={a3} alt="Checkered Shirt" className="w-full h-full object-contain" />
              </div>
              <h3 className="mt-3 font-['Satoshi'] font-bold text-lg sm:text-[20px] text-black">
                Checkered Shirt
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                ⭐⭐⭐⭐ <span className="text-gray-600 ml-1">4.5/5</span>
              </div>
              <p className="mt-1 text-lg font-bold text-black">₹180</p>
            </div>
          </Link>
          {/* Product Card 4 */}
          <Link to="/product/new-arrival-4" className="block">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-[295px] h-[298px] bg-[#F0EEED] rounded-[20px] flex items-center justify-center overflow-hidden">
                <img src={a4} alt="Sleeve Striped T-shirt" className="w-full h-full object-contain" />
              </div>
              <h3 className="mt-3 font-['Satoshi'] font-bold text-lg sm:text-[20px] text-black">
                Sleeve Striped T-shirt
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                ⭐⭐⭐⭐ <span className="text-gray-600 ml-1">4.5/5</span>
              </div>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-lg font-bold text-black">₹130</span>
                <span className="text-gray-400 line-through">₹160</span>
                <span className="text-red-500 text-sm">-30%</span>
              </div>
            </div>
          </Link>
        </div>
        <button className="mt-12 px-8 py-3 border border-black rounded-full font-['Satoshi'] text-base font-medium hover:bg-black hover:text-white transition">
          View All
        </button>
      </section>

    </div>
  )
}

export default Newarrival