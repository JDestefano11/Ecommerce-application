import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from '../components/NewsLetterBox.jsx';

const About = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#2F4F4F]">About Us</h1>
        
        <div className="flex flex-col md:flex-row gap-16 mb-16">
          <img src={assets.about_img} alt="About Trend Hive" className="w-full md:w-1/2 rounded-lg shadow-lg object-cover" />
          <div className="flex flex-col justify-center gap-6 md:w-1/2 text-[#708090]">
            <p className="text-lg">Welcome to Trend Hive, where style meets comfort for the entire family. Founded with a passion for fashion and a commitment to quality, we offer a curated collection of men's, women's, and kids' clothing that reflects the latest trends while staying true to timeless classics.</p>
            <p className="text-lg">Our mission is to provide fashion-forward pieces that empower our customers to express their individuality and confidence. Whether you're looking for casual everyday wear or something bold for a special occasion, Trend Hive has something for everyone, combining fashion and function at affordable prices.</p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-center text-[#2F4F4F]">Our Mission</h2>
          <p className="text-lg text-[#708090]">At Trend Hive, our mission is to create a one-stop destination for fashionable, high-quality clothing for men, women, and kids. We aim to inspire confidence and self-expression through trendy and timeless pieces that cater to diverse styles and needs. Committed to affordability, comfort, and sustainability, we strive to bring the latest trends and everyday essentials to families everywhere, making fashion accessible to all.</p>
        </div>

        <h2 className="text-3xl font-semibold mb-8 text-center text-[#2F4F4F]">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { title: "Quality Assurance", content: "At Trend Hive, quality is at the heart of everything we do. We meticulously source our fabrics and partner with trusted manufacturers to ensure that every piece of clothing meets the highest standards of durability, comfort, and craftsmanship." },
            { title: "Convenience", content: "Shopping at Trend Hive is designed to be as convenient as possible. Our user-friendly website makes it easy to browse our extensive collection of men's, women's, and kids' clothing, find exactly what you're looking for, and check out in just a few clicks." },
            { title: "Exceptional Customer Service", content: "Your satisfaction is our priority at Trend Hive. Our dedicated customer service team is always ready to assist you with any inquiries or concerns, ensuring a smooth and pleasant shopping experience from start to finish." }
          ].map((item, index) => (
            <div key={index} className="bg-[#FFFDD0] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-4 text-[#2F4F4F] text-center">{item.title}</h3>
              <p className="text-[#708090]">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
      <NewsLetterBox />
    </>
  );
};

export default About;
