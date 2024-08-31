import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { assets } from "../../src/assets/frontend_assets/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bottom-0 bg-[#F8F8F8] text-[#2F4F4F] w-full">
      {/* First row of the footer */}
      <div className="w-full py-10 px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Us Section */}
        <div>
          <img
            src={assets.TrendHive_logo}
            className="w-48 mb-4"
            alt="Trend Hive Logo"
          />
          <p className="text-[#708090]">
            Your one-stop destination for fashionable, high-quality clothing for
            the entire family. Discover style that speaks to you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#2F4F4F] text-lg font-semibold mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-[#FFC0CB]">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#FFC0CB]">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/collection" className="hover:text-[#FFC0CB]">
                Collection
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#FFC0CB]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-[#2F4F4F] text-lg font-semibold mb-3">
            Customer Support
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/faq" className="hover:text-[#FFC0CB]">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="hover:text-[#FFC0CB]">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/returns-policy" className="hover:text-[#FFC0CB]">
                Returns & Exchanges
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-[#FFC0CB]">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-[#2F4F4F] text-lg font-semibold mb-3">
            Get in Touch
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <FaFacebookF className="text-[#708090]" />
              <a href="tel:+11234567890" className="hover:text-[#FFC0CB]">
                +1 123 456 7890
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaTwitter className="text-[#708090]" />
              <a
                href="mailto:info@trendhive.com"
                className="hover:text-[#FFC0CB]"
              >
                info@trendhive.com
              </a>
            </li>
            <li className="flex items-center space-x-2">
              <FaInstagram className="text-[#708090]" />
              <span>123 Fashion St, Style City, 12345</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Second row of the footer (bottom section) */}
      <div className="bg-[#2F4F4F] w-full py-5 text-center text-[#F8F8F8]">
        <p>
          © {currentYear} Trend Hive. All Rights Reserved. |{" "}
          <Link to="/privacy-policy" className="hover:text-[#FFC0CB]">
            Privacy Policy
          </Link>{" "}
          |{" "}
          <Link to="/terms-conditions" className="hover:text-[#FFC0CB]">
            Terms & Conditions
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
