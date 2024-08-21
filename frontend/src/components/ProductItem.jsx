import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="group block" to={`/product/${id}`}>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={image[0]}
          alt={name}
          className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
          <h3 className="text-[#2F4F4F] font-medium truncate">{name}</h3>
          <p className="text-[#708090] font-semibold mt-1">
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
