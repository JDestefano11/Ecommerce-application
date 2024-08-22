import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  // Extract productId from URL parameters
  const { productId } = useParams();
  // Access products and currency from ShopContext
  const { products, currency } = useContext(ShopContext);
  // State for storing product data, current image, and selected size
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // Function to fetch product data based on productId
  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        console.log(item);
        return null;
      }
    });
  };

  // Fetch product data when productId changes
  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnail images */}
          <div className="flex flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt="product images"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          {/* Main product image */}
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1">
          {/* Product name */}
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          {/* Product rating */}
          <div className="flex gap-2 items-center mt-2">
            {/* Star icons */}
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          {/* Product price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          {/* Product description */}
          <p className="mt-5 text-gray-500">{productData.description}</p>
          {/* Size selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ""}`}
                  key={index}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* Add to cart button */}
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">Add to Cart</button>
          <hr className="mt-8 sm:w-4/5" />
          {/* Additional product information */}
          <div className="text-sm text-gray-500 mt-5 flex-col flex gap-1">
            <p>Shop with confidence - all products are 100% authentic.</p>
            <p>Hassle-free payment - Cash on Delivery available.</p>
            <p>Easy returns and exchanges - your satisfaction is our priority.</p>
          </div>
        </div>
      </div>
      {/* Review Section */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
