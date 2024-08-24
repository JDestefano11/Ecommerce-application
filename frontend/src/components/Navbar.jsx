import React, { useState, useEffect, useRef, useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { setShowSearch, getCartCount, logout } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Ref to the mobile menu for detecting clicks outside
  const menuRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Function to toggle the mobile menu open/closed
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to toggle the profile dropdown
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Effect to handle clicking outside the mobile menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
  };

  return (
    <div className="relative flex items-center justify-between py-5 font-medium bg-[#FFFFFF] w-full z-50">
      <img src={assets.logo} className="w-36" alt="logo" />
      <ul className="hidden sm:flex gap-5 text-sm text-[#708090]">
        <NavLink
          to="/"
          className="flex flex-col items-center gap-1 hover:text-[#FFC0CB] transition-colors duration-300"
        >
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#708090] hidden" />
        </NavLink>
        <NavLink
          to="/collection"
          className="flex flex-col items-center gap-1 hover:text-[#FFC0CB] transition-colors duration-300"
        >
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#708090] hidden" />
        </NavLink>
        <NavLink
          to="/about"
          className="flex flex-col items-center gap-1 hover:text-[#FFC0CB] transition-colors duration-300"
        >
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#708090] hidden" />
        </NavLink>
        <NavLink
          to="/contact"
          className="flex flex-col items-center gap-1 hover:text-[#FFC0CB] transition-colors duration-300"
        >
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#708090] hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-5">
        {location.pathname.includes("collection") && (
          <img
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt="search"
            onClick={() => {
              console.log("Search icon clicked");
              console.log("Current path:", window.location.pathname);
              setShowSearch(true);
              console.log("showSearch set to true");
            }}
          />
        )}
        <div className="relative" ref={profileDropdownRef}>
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
            onClick={toggleProfileDropdown}
          />
          {isProfileDropdownOpen && (
            <div className="absolute dropdown right-0 mt-2">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-[#FFFDD0] text-[#2F4F4F] rounded shadow-md">
                <Link to="/profile" className="cursor-pointer hover:text-[#FFC0CB]">My Profile</Link>
                <Link to="/orders" className="cursor-pointer hover:text-[#FFC0CB]">Orders</Link>
                <button
                  className="cursor-pointer hover:text-[#FFC0CB] text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
          <span className="absolute top-[-10px] right-[-10px] w-5 h-5 text-center leading-5 bg-[#FFC0CB] text-[#2F4F4F] text-xs rounded-full">
            {getCartCount()}
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
        ref={menuRef}
        className={`fixed top-0 right-0 h-full bg-[#FFFFFF] transition-all duration-300 ease-in-out ${
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
        <ul className="flex flex-col items-start p-4 space-y-4 text-[#708090]">
          <NavLink
            to="/"
            className="w-full hover:text-[#FFC0CB] transition-colors duration-300"
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/collection"
            className="w-full hover:text-[#FFC0CB] transition-colors duration-300"
            onClick={toggleMenu}
          >
            Collection
          </NavLink>
          <NavLink
            to="/about"
            className="w-full hover:text-[#FFC0CB] transition-colors duration-300"
            onClick={toggleMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="w-full hover:text-[#FFC0CB] transition-colors duration-300"
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
