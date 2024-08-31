import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Message sent successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#2F4F4F]">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-[#FFFDD0] p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-[#2F4F4F] text-center">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-[#708090] mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#708090] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#708090] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[#708090] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-[#708090] mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-[#708090] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#708090] text-white px-6 py-2 rounded-md hover:bg-[#2F4F4F] transition-colors duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="bg-[#FFFDD0] p-8 rounded-lg shadow-md flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-6 text-[#2F4F4F]">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaPhone className="text-[#FFC0CB]" />
              <span className="text-[#708090]">+1 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-[#FFC0CB]" />
              <span className="text-[#708090]">info@trendhive.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <FaMapMarkerAlt className="text-[#FFC0CB]" />
              <span className="text-[#708090]">
                123 Fashion St, Style City, 12345
              </span>
            </div>
          </div>
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold mb-4 text-[#2F4F4F]">
              Business Hours
            </h3>
            <ul className="space-y-2 text-[#708090]">
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
