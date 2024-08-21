import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  // Access the products from the ShopContext
  const { products } = useContext(ShopContext);
  // Initialize state for best seller products
  const [bestSeller, setBestSeller] = useState([]);

  // Effect to filter and set best seller products
  useEffect(() => {
    // Filter products marked as bestsellers
    const bestProduct = products.filter((item) => item.bestseller);
    // Set the state with up to 5 best seller products
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]); // Re-run effect when products change

  return (
    <div className="bg-[#FFFDD0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#2F4F4F] sm:text-5xl">
            Best Sellers
          </h2>
          <p className="mt-4 text-xl text-[#708090]">
            Our most popular items, loved by customers
          </p>
        </div>

        {/* Grid layout for product items */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Map through best seller products and render ProductItem components */}
          {bestSeller.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <ProductItem
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
