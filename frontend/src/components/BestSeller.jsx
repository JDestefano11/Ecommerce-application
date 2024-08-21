import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
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
    <div className="my-10">
      {/* Header section */}
      <div className="text-center text-3xl py-8">
        {/* Custom Title component */}
        <Title text1={"Best"} text2={"Sellers"} />
        {/* Description paragraph with responsive text sizing */}
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
          voluptatibus enim ipsa maxime consectetur expedita fuga est
          necessitatibus earum sint, quaerat quibusdam optio excepturi,
          temporibus eum, assumenda natus quod accusantium?
        </p>
      </div>
      {/* Grid layout for product items */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Map through best seller products and render ProductItem components */}
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
