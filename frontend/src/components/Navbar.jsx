import React, { useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative flex items-center justify-between py-5 font-medium">
      <img src={assets.logo} className="w-36" alt="logo" />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-5">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
          />
          <div className="group-hover:block hidden absolute dropdown right-0 mt-2">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
          <span className="absolute top-[-10px] right-[-10px] w-5 h-5 text-center leading-5 bg-black text-white text-xs rounded-full">
            5
          </span>
        </Link>
        <img
          src={assets.menu_icon}
          alt="menu"
          className="w-5 cursor-pointer sm:hidden"
          onClick={toggleMenu}
        />
      </div>

      {/* Sliding menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? "w-64" : "w-0"
        } overflow-hidden z-50`}
      >
        <div className="flex justify-end p-4">
          <img
            src={assets.menu_icon}
            alt="close"
            className="w-5 cursor-pointer"
            onClick={toggleMenu}
          />
        </div>
        <ul className="flex flex-col items-start p-4 space-y-4 text-gray-700">
          <NavLink to="/" className="w-full" onClick={toggleMenu}>
            Home
          </NavLink>
          <NavLink to="/collection" className="w-full" onClick={toggleMenu}>
            Collection
          </NavLink>
          <NavLink to="/about" className="w-full" onClick={toggleMenu}>
            About
          </NavLink>
          <NavLink to="/contact" className="w-full" onClick={toggleMenu}>
            Contact
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
