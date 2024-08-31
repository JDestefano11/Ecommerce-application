import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";

const PlaceOrder = () => {
  // Access global state from ShopContext
  const { cartItems, products, currency, delivery_fee } =
    useContext(ShopContext);

  // State for checkout mode
  const [checkoutMode, setCheckoutMode] = useState("guest");

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // State for login data
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // State for payment method and payment information
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // State for form validation errors
  const [errors, setErrors] = useState({});

  // Available payment methods
  const paymentMethods = [
    { icon: assets.stripe_logo },
    { icon: assets.razorpay_logo },
  ];

  // Handler for form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for login input changes
  const handleLoginInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handler for payment information changes
  const handlePaymentInfoChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  // Calculate subtotal based on cart items
  const calculateSubtotal = () => {
    return Object.entries(cartItems)
      .reduce((total, [itemId, sizes]) => {
        const product = products.find((p) => p._id === itemId);
        const itemTotal = Object.values(sizes).reduce(
          (sum, quantity) => sum + quantity * product.price,
          0
        );
        return total + itemTotal;
      }, 0)
      .toFixed(2);
  };

  const subtotal = calculateSubtotal();
  const total = (parseFloat(subtotal) + delivery_fee).toFixed(2);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (checkoutMode === "guest") {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.email) newErrors.email = "Email is required";
    } else {
      if (!loginData.email) newErrors.loginEmail = "Email is required";
      if (!loginData.password) newErrors.loginPassword = "Password is required";
    }
    if (paymentMethod === "")
      newErrors.paymentMethod = "Please select a payment method";
    if (!paymentInfo.cardNumber)
      newErrors.cardNumber = "Card number is required";
    if (!paymentInfo.expiry) newErrors.expiry = "Expiry date is required";
    if (!paymentInfo.cvv) newErrors.cvv = "CVV is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Order submitted", {
        checkoutMode,
        formData,
        loginData,
        paymentMethod,
        paymentInfo,
        total,
      });
      // Proceed with order submission
    }
  };

  return (
    <div className="mt-20 flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t ">
      <div className="flex flex-col gap-6 w-full sm:w-1/2">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#2F4F4F]">
          Checkout Information
        </h1>

        {/* Checkout Mode Selection */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setCheckoutMode("guest")}
            className={`py-2 px-4 rounded-md ${
              checkoutMode === "guest"
                ? "bg-[#708090] text-white"
                : "bg-gray-200"
            }`}
          >
            Checkout as Guest
          </button>
          <button
            onClick={() => setCheckoutMode("login")}
            className={`py-2 px-4 rounded-md ${
              checkoutMode === "login"
                ? "bg-[#708090] text-white"
                : "bg-gray-200"
            }`}
          >
            Login to Checkout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {checkoutMode === "guest" ? (
            <>
              {/* Guest Checkout Form */}
              <div className="flex gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                />
              </div>
              <div className="flex gap-4">
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip code"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                />
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                />
              </div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
              />
            </>
          ) : (
            <>
              {/* Login Form */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={loginData.email}
                onChange={handleLoginInputChange}
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
              />
              {errors.loginEmail && (
                <p className="text-red-500 text-sm">{errors.loginEmail}</p>
              )}
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleLoginInputChange}
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
              />
              {errors.loginPassword && (
                <p className="text-red-500 text-sm">{errors.loginPassword}</p>
              )}
            </>
          )}

          {/* Payment Method Selection */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-[#2F4F4F]">
              Payment Method
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {paymentMethods.map((method, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={index}
                    checked={paymentMethod === index}
                    onChange={() => setPaymentMethod(index)}
                    className="form-radio h-5 w-5 text-[#708090]"
                  />
                  <img
                    src={method.icon}
                    alt={`Payment method ${index + 1}`}
                    className="h-8"
                  />
                </label>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
            )}
          </div>

          {/* Payment Information Inputs */}
          {paymentMethod !== "" && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-[#2F4F4F]">
                Payment Information
              </h2>
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentInfoChange}
                className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">{errors.cardNumber}</p>
              )}
              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={paymentInfo.expiry}
                    onChange={handlePaymentInfoChange}
                    className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                  />
                  {errors.expiry && (
                    <p className="text-red-500 text-sm">{errors.expiry}</p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentInfoChange}
                    className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#708090] text-white py-2 px-4 rounded-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition duration-300"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* Order Summary */}
      <div className="w-full sm:w-1/2 bg-[#FFFFFF] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#2F4F4F]">
          Order Summary
        </h2>
        <div className="space-y-2 text-[#708090]">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>
              {currency}
              {subtotal}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>
              {currency}
              {delivery_fee.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total:</span>
            <span>
              {currency}
              {total}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
