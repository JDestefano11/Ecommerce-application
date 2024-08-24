import React, { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";


const Login = () => {
  // State for managing login/signup mode and form inputs
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // Access login function and navigation from ShopContext
  const { login, navigate } = useContext(ShopContext);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Perform login
      login();
      navigate("/");
    } else {
      // After successful signup, switch to login mode
      setIsLogin(true);
      navigate("/login");
    }
  };

  // Handle guest checkout
  const handleGuestCheckout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFDD0]">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#2F4F4F]">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Conditional rendering of name input for signup */}
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#708090] text-white py-2 px-4 rounded-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-[#708090]">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-1 text-[#FFC0CB] no-underline" 
          >
            {isLogin ? "Create an account" : "Login"} 
          </button>
        </p>
        <div className="mt-6">
          <button
            onClick={handleGuestCheckout}
            className="w-full bg-[#FFFDD0] text-[#2F4F4F] py-2 px-4 rounded-md hover:bg-[#FFC0CB] transition duration-300"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
