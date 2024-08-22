import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("newest");

  // Function to toggle category selection
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      // If category is already selected, remove it
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      // If category is not selected, add it
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Function to toggle subcategory selection
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      // If subcategory is already selected, remove it
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      // If subcategory is not selected, add it
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Function to apply filters based on selected categories and subcategories
  const applyFilter = () => {
    let productsCopy = products.slice(); // Create a copy of all products

    if (category.length > 0) {
      // Filter products based on selected categories
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      // Filter products based on selected subcategories
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Update the filtered products state
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    // Create a copy of the filtered products to avoid mutating the original array
    let fpCopy = filterProducts.slice();

    // Use a switch statement to handle different sorting options
    switch (sortType) {
      case "low-high":
        // Sort products from lowest to highest price
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        // Sort products from highest to lowest price
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        // If no sorting option is selected, apply the default filter
        applyFilter();
        break;
    }
  };

  // Use an effect to trigger sorting whenever the sort type changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Apply filters whenever category or subcategory selections change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/*Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filters
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-4"
                onChange={toggleCategory}
                value={"Men"}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-4"
                onChange={toggleCategory}
                value={"Women"}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-4"
                onChange={toggleCategory}
                value={"Kids"}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        {/* Sub Category Filter */}
        <div
          className={`border border-gray-300 pl-5 my-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Sub Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-4"
                onChange={toggleSubCategory}
                value={"Topwear"}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-4"
                onChange={toggleSubCategory}
                value={"Bottomwear"}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-4"
                onChange={toggleSubCategory}
                value={"Winterwear"}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base smyexy-2x1 mb-4">
          <h1>All Products</h1>
          {/*Product sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="low-high">Sort by: Price: Low to High</option>
            <option value="high-low">Sort by: Price: High to Low</option>
          </select>
        </div>
        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
