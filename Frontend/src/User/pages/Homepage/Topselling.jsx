import React from "react";
import { Link } from "react-router-dom";
import t1 from "../../../components/Assets/tanish-assets/t1.png";
import t2 from "../../../components/Assets/tanish-assets/t2.png";
import t3 from "../../../components/Assets/tanish-assets/t3.png";
import t4 from "../../../components/Assets/tanish-assets/t4.png";

const Topselling = () => {
  return (
    <div>

      {/* Top Selling Section */}
      <section className="px-4 sm:px-8 md:px-12 py-16 flex flex-col items-center">
        <h2 className="font-['Integral_CF'] font-bold text-3xl sm:text-4xl md:text-[48px] leading-[100%] text-black text-center mb-10 md:mb-20">
          TOP SELLING
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-[1200px]">
          {/* Product Card 1 */}
          <Link to="/product/top-selling-1" className="block">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-[295px] h-[298px] bg-[#F0EEED] rounded-[20px] flex items-center justify-center overflow-hidden">
                <img src={t1} alt="Vertical Striped Shirt" className="w-full h-full object-contain" />
              </div>
              <h3 className="mt-3 font-['Satoshi'] font-bold text-lg sm:text-[20px] text-black">
                Vertical Striped Shirt
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                ⭐⭐⭐⭐⭐ <span className="text-gray-600 ml-1">5.0/5</span>
              </div>
              <p className="mt-1 text-lg font-bold text-black">₹212</p>
            </div>
          </Link>

          {/* Product Card 2 */}
          <Link to="/product/top-selling-2" className="block">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-[295px] h-[298px] bg-[#F0EEED] rounded-[20px] flex items-center justify-center overflow-hidden">
                <img src={t2} alt="Courage Graphic T-shirt" className="w-full h-full object-contain" />
              </div>
              <h3 className="mt-3 font-['Satoshi'] font-bold text-lg sm:text-[20px] text-black">
                Courage Graphic T-shirt
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                ⭐⭐⭐⭐ <span className="text-gray-600 ml-1">4.0/5</span>
              </div>
              <p className="mt-1 text-lg font-bold text-black">₹145</p>
            </div>
          </Link>

          {/* Product Card 3 */}
          <Link to="/product/top-selling-3" className="block">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-[295px] h-[298px] bg-[#F0EEED] rounded-[20px] flex items-center justify-center overflow-hidden">
                <img src={t3} alt="Loose Fit Bermuda Shorts" className="w-full h-full object-contain" />
              </div>
              <h3 className="mt-3 font-['Satoshi'] font-bold text-lg sm:text-[20px] text-black">
                Loose Fit Bermuda Shorts
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                ⭐⭐⭐ <span className="text-gray-600 ml-1">3.0/5</span>
              </div>
              <p className="mt-1 text-lg font-bold text-black">₹80</p>
            </div>
          </Link>

          {/* Product Card 4 */}
          <Link to="/product/top-selling-4" className="block">
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-[295px] h-[298px] bg-[#F0EEED] rounded-[20px] flex items-center justify-center overflow-hidden">
                <img src={t4} alt="Faded Skinny Jeans" className="w-full h-full object-contain" />
              </div>
              <h3 className="mt-3 font-['Satoshi'] font-bold text-lg sm:text-[20px] text-black">
                Faded Skinny Jeans
              </h3>
              <div className="flex items-center gap-1 text-yellow-500 text-sm mt-1">
                ⭐⭐⭐⭐ <span className="text-gray-600 ml-1">4.5/5</span>
              </div>
              <p className="mt-1 text-lg font-bold text-black">₹210</p>
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

export default Topselling