import React from "react";

const NewsLetterBox = () => {
  return (
    <div className="bg-[#FFFDD0] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#2F4F4F] sm:text-4xl mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xl text-[#708090] mb-8">
            Stay updated with our latest collections and exclusive offers
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 w-full sm:w-64 border border-[#708090] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#708090] text-white rounded-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterBox;
