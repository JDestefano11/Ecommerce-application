import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);

  // State to control the visibility of the search bar
  const [visible, setVisible] = useState(false);

  // Hook to access the current location (URL) in the app
  const location = useLocation();

  // Effect to update visibility based on location and search state
  useEffect(() => {
    // Check if the current path includes "collection" and if search should be shown
    if (location.pathname.includes("collection")) {
      // If both conditions are true, make the search bar visible
      setVisible(true);
    } else {
      // Otherwise, hide the search bar
      setVisible(false);
    }
  }, [location]); // Re-run this effect when the location changes

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon} alt="search icon" className="w-4" />
      </div>
      <img
        src={assets.cross_icon}
        alt="cross icon"
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};

export default SearchBar;
