import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

const Cart = () => {
  // Extract necessary functions and data from ShopContext
  const { products, currency, cartItems, updateCart, removeCartItem, getCartCount, delivery_fee, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Update cartData whenever cartItems changes
  useEffect(() => {
    const tempData = [];
    // Iterate through each item in the cart
    for (const itemId in cartItems) {
      // Iterate through each size of the item
      for (const size in cartItems[itemId]) {
        // Only add items with quantity greater than 0
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    // Update the cartData state with the new array
    setCartData(tempData);
  }, [cartItems]);

  // Handle quantity change for cart items
  const handleQuantityChange = (itemId, size, newQuantity) => {
    // Call updateCart function from context to update the cart
    // Parse newQuantity to ensure it's a number
    updateCart(itemId, size, parseInt(newQuantity));
  };

  // Calculate subtotal price of items in cart
  const calculateSubtotal = () => {
    // Use reduce to sum up the total price of all items
    return cartData.reduce((total, item) => {
      // Find the product data for the current item
      const productData = products.find((p) => p._id === item._id);
      // Add the price of the current item multiplied by its quantity to the total
      return total + productData.price * item.quantity;
    }, 0).toFixed(2); // Fix to 2 decimal places for currency display
  };

  // Handle coupon code submission
  const handleCouponSubmit = (e) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === "SALE20") {
      const subtotal = parseFloat(calculateSubtotal());
      if (subtotal >= 300) {
        setDiscount(subtotal * 0.2);
      } else {
        alert("Spend over $300 to apply this coupon!");
      }
    } else {
      alert("Invalid coupon code!");
    }
  };

  // Calculate total price including shipping and discount
  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return (subtotal + delivery_fee - discount).toFixed(2);
  };

  return (
    <div className="border-t pt-14">
      {/* Cart header */}
      <div className="text-2xl mb-3 text-[#2F4F4F]">
        <h1>Your Cart ({getCartCount()} items)</h1>
      </div>

      {/* Sale Section */}
      <div className="bg-[#FFC0CB] text-[#2F4F4F] p-4 mb-6 rounded-md">
        <h2 className="text-xl font-bold mb-2">🎉 Special Offer!</h2>
        <p>Get 20% off on all items when you spend over $300. Use code: SALE20 at checkout.</p>
      </div>

      {/* Cart items list */}
      <div>
        {cartData.map((item, index) => {
          const productData = products.find((p) => p._id === item._id);
          return (
            <div key={index} className="py-4 border-t text-[#708090] grid grid-cols-[4fr_2fr_0.5fr] items-center gap-4">
              {/* Product image and details */}
              <div className="flex items-start gap-6">
                <img className="w-16 sm:w-20" src={productData.image[0]} alt="" />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-[#708090]">{currency}{productData.price}</p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-[#FFFDD0] text-[#2F4F4F]">{item.size}</p>
                  </div>
                </div>
              </div>

              {/* Quantity input */}
              <input
                className="border border-[#708090] max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-[#2F4F4F]"
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
              />

              {/* Remove item button */}
              <img
                onClick={() => removeCartItem(item._id, item.size)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="bin icon"
              />
            </div>
          );
        })}
      </div>

      {/* Cart subtotal, shipping, and total */}
      {cartData.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <div className="flex justify-between items-center text-[#2F4F4F] mb-2">
            <span className="text-lg">Subtotal:</span>
            <span className="text-lg">{currency}{calculateSubtotal()}</span>
          </div>
          <div className="flex justify-between items-center text-[#2F4F4F] mb-2">
            <span className="text-lg">Shipping:</span>
            <span className="text-lg">{currency}{delivery_fee.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between items-center text-[#2F4F4F] mb-2">
              <span className="text-lg">Discount:</span>
              <span className="text-lg">-{currency}{discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-[#2F4F4F] font-semibold">
            <span className="text-xl">Total:</span>
            <span className="text-xl">{currency}{calculateTotal()}</span>
          </div>

          <form onSubmit={handleCouponSubmit} className="mt-4 mb-4 flex">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="flex-grow border border-[#708090] px-3 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#708090] text-white px-4 py-2 rounded-r-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition-colors"
            >
              Apply
            </button>
          </form>

          <button 
            onClick={() => navigate('/placeorder')}
            className="w-full mt-4 bg-[#708090] text-white py-2 rounded hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
