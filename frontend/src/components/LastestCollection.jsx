import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LastestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestproducts] = useState([]);

  // Effect to set the latest products when the component mounts
  useEffect(() => {
    setLatestproducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text 3x-1">
        <Title text1={"Latest"} text2={"Collection"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md: text-base text-gray-600">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto quas
          assumenda commodi mollitia deleniti cupiditate dignissimos provident
          totam aut qui, accusamus unde eligendi ea nemo libero porro nostrum
          illum magni.
        </p>
      </div>

      {/*Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 gap-y">
        {latestProducts.map((item, index) => {
          return (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LastestCollection;
