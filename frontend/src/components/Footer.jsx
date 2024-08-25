import React from "react";
import { assets } from "../../src/assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: "Home", path: "/" },
    { title: "About Us", path: "/about" },
    { title: "Collection", path: "/collection" },
    { title: "Contact", path: "/contact" },
    { title: "Privacy Policy", path: "/privacy-policy" },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, url: "#" },
    { icon: <FaTwitter />, url: "#" },
    { icon: <FaInstagram />, url: "#" },
    { icon: <FaLinkedinIn />, url: "#" },
  ];

  return (
    <footer className=" text-[#2F4F4F] py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="flex flex-col space-y-4">
            <img src={assets.logo} className="w-32 mb-2" alt="Trend Hive Logo" />
            <p className="text-sm text-[#708090] leading-relaxed">
              Trend Hive: Your one-stop destination for fashionable, high-quality clothing for the entire family. Discover style that speaks to you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">Quick Links</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text-[#708090] hover:text-[#FFC0CB] transition-colors duration-300">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xl font-semibold text-[#2F4F4F] mb-2">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-[#708090]">📞</span>
                <a href="tel:+11234567890" className="text-[#708090] hover:text-[#FFC0CB] transition-colors duration-300">
                  +1 123 456 7890
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#708090]">✉️</span>
                <a href="mailto:info@trendhive.com" className="text-[#708090] hover:text-[#FFC0CB] transition-colors duration-300">
                  info@trendhive.com
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#708090]">📍</span>
                <span className="text-[#708090]">123 Fashion St, Style City, 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className="text-[#708090] hover:text-[#FFC0CB] transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <hr className="border-[#708090] mb-8" />

        <p className="text-center text-sm text-[#708090]">
          &copy; {currentYear} Trend Hive. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
