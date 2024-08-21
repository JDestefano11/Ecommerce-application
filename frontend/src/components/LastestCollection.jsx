import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  // Effect to set the latest products when the component mounts
  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products]);

  return (
    <div className="bg-[#FFFFFF] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#2F4F4F] sm:text-4xl">
            Latest Collection
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-[#708090] sm:mt-4">
            Discover our newest arrivals and trending styles
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {latestProducts.map((item) => (
            <div key={item._id}>
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                className="h-96"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/collection"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#708090] hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition duration-300"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
