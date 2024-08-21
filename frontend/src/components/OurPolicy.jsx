import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
  return (
    <div className="bg-[#FFFFFF] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-[#2F4F4F] text-center mb-12">
          Our Policies
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <PolicyItem
            icon={assets.exchange_icon}
            title="Exchange Policy"
            description="We provide hassle-free exchanges"
          />
          <PolicyItem
            icon={assets.quality_icon}
            title="14 Days Return Policy"
            description="We offer a 14-day free return policy"
          />
          <PolicyItem
            icon={assets.support_img}
            title="24/7 Customer Support"
            description="Round-the-clock support available"
          />
        </div>
      </div>
    </div>
  );
};

const PolicyItem = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center">
    <div className="bg-[#FFFDD0] p-4 rounded-full mb-4">
      <img src={icon} className="w-12 h-12" alt="" />
    </div>
    <h3 className="text-lg font-semibold text-[#2F4F4F] mb-2">{title}</h3>
    <p className="text-[#708090]">{description}</p>
  </div>
);

export default OurPolicy;
