import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm: text-sm md: text-base text-gray-700">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Exchange Policy</p>
        <p className="text-gray-400">We provide a hassle-free exchanges</p>
      </div>

      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">14 Days Exchange Policy</p>
        <p className="text-gray-400">We offer a 14-day free return policy</p>
      </div>

      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-400">
          We offer round-the-clock customer support, available 24/7
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
