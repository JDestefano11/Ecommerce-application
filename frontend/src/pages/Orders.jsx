import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  // Access global state from ShopContext
  const { products, currency } = useContext(ShopContext);
  // State to store tracking numbers for each order
  const [trackingNumbers, setTrackingNumbers] = useState({});

  // Function to generate a random date for each order
  const getRandomDate = () => {
    // Set the start date to January 1, 2023
    const start = new Date(2023, 0, 1);
    // Set the end date to the current date
    const end = new Date();
    // Generate a random timestamp between start and end dates
    // Use Math.random() to get a value between 0 and 1, then multiply by the time difference
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  // Function to generate and set a tracking number for an order
  const handleTrackPackage = (index) => {
    // Check if a tracking number doesn't already exist for this order
    if (!trackingNumbers[index]) {
      // Update the trackingNumbers state
      setTrackingNumbers({
        // Spread the existing tracking numbers
        ...trackingNumbers,
        // Add a new tracking number for this order index
        // Generate a random string, convert to uppercase, and take the first 9 characters
        [index]: Math.random().toString(36).substr(2, 9).toUpperCase(),
      });
    }
  };

  // Select the first 4 products from the store
  const selectedProducts = products.slice(0, 4);
  // Predefined statuses for each order
  const statuses = ["Delivered", "Delivered", "Ready to Ship", "Shipped"];

  return (
    <div className="border-t pt-16 container mx-auto px-4 mt-20">
      <h1 className="text-3xl font-semibold text-[#2F4F4F] mb-8">My Orders</h1>
      <div className="space-y-8">
        {selectedProducts.map((item, index) => {
          // Generate a random order date and get the status for this order
          const orderDate = getRandomDate();
          const status = statuses[index];

          return (
            <div key={index} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Product image and details */}
                <div className="flex gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-[#2F4F4F]">
                      {item.name}
                    </h3>
                    <p className="text-[#708090] mt-2">
                      Price: {currency}
                      {item.price.toFixed(2)}
                    </p>
                    <p className="text-[#708090] mt-1">Quantity: 1</p>
                    <p className="text-[#708090] font-medium mt-1">
                      Status: {status}
                    </p>
                  </div>
                </div>
                {/* Order total, date, and tracking information */}
                <div className="flex flex-col items-end">
                  <p className="text-lg font-semibold text-[#2F4F4F]">
                    Total: {currency}
                    {item.price.toFixed(2)}
                  </p>
                  <p className="text-[#708090] mt-2">
                    Order Date: {orderDate.toLocaleDateString()}
                  </p>
                  <button
                    onClick={() => handleTrackPackage(index)}
                    className="mt-4 bg-[#708090] text-white py-2 px-4 rounded-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition duration-300"
                  >
                    Track Package
                  </button>
                  {/* Display tracking number if available */}
                  {trackingNumbers[index] && (
                    <p className="text-[#708090] mt-2">
                      Tracking #: {trackingNumbers[index]}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
