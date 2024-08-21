import React from "react";
import { assets } from "../../src/assets/frontend_assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#FFFDD0] text-[#2F4F4F] py-10 mt-40">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Logo and Description */}
          <div className="flex flex-col">
            <img src={assets.logo} className="mb-5 w-32" alt="Company Logo" />
            <p className="text-sm text-[#708090]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Exercitationem consequatur iste sequi molestiae, pariatur veniam
              non rem illo esse? Laborum sit porro voluptatibus exercitationem
              ab reprehenderit officia nemo harum at.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col">
            <p className="text-xl font-semibold mb-5 text-[#2F4F4F]">Company</p>
            <ul className="text-sm space-y-1">
              <li>
                <a href="#home" className="text-[#708090] hover:text-[#FFC0CB]">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-[#708090] hover:text-[#FFC0CB]"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#delivery"
                  className="text-[#708090] hover:text-[#FFC0CB]"
                >
                  Delivery
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-[#708090] hover:text-[#FFC0CB]"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col">
            <p className="text-xl font-semibold mb-5 text-[#2F4F4F]">
              Get in Touch
            </p>
            <ul className="text-sm space-y-1">
              <li>
                Phone:{" "}
                <a
                  href="tel:+11234567890"
                  className="text-[#708090] hover:text-[#FFC0CB]"
                >
                  +1 123 456 7890
                </a>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:company@companyname.com"
                  className="text-[#708090] hover:text-[#FFC0CB]"
                >
                  company@companyname.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-[#708090] mb-5" />

        <p className="text-center text-sm text-[#708090]">
          &copy; 2024{" "}
          <a href="#home" className="text-[#708090] hover:text-[#FFC0CB]">
            companyname.com
          </a>{" "}
          - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
