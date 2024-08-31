import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Profile = () => {
  // Access global context for user data and currency
  const { user, currency } = useContext(ShopContext);

  // State for managing edit mode and user data
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Anytown, USA",
    phone: "+1 234 567 8900",
  });

  // Mock data for recent orders (to be replaced with real data)
  const recentOrders = [
    { id: "1234", date: "2023-05-01", total: 99.99, status: "Delivered" },
    { id: "5678", date: "2023-05-15", total: 149.99, status: "Shipped" },
    { id: "9012", date: "2023-05-30", total: 79.99, status: "Processing" },
  ];

  // Handler for entering edit mode
  const handleEdit = () => setIsEditing(true);

  // Handler for saving changes and showing success toast
  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // Handler for updating user data as it's edited
  const handleChange = (e) =>
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });

  return (
    <div className="container mx-auto px-4 py-8 bg-[#FFFDD0] min-h-screen mt-20">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile header */}
        <div className="bg-[#2F4F4F] text-white py-4 px-6">
          <h1 className="text-3xl font-semibold">My Profile</h1>
        </div>

        {/* User information section */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(editedUser).map(([key, value]) => (
              <div key={key} className="mb-4">
                <label className="block text-[#708090] text-sm font-bold mb-2 capitalize">
                  {key}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full p-2 border border-[#708090] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC0CB]"
                  />
                ) : (
                  <p className="text-[#2F4F4F] bg-[#FFFDD0] p-2 rounded-md">
                    {value}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* Edit/Save button */}
          <div className="mt-6 flex justify-end">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-[#708090] text-white py-2 px-6 rounded-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFC0CB] focus:ring-opacity-50"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-[#708090] text-white py-2 px-6 rounded-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFC0CB] focus:ring-opacity-50"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="mt-8 p-6 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-[#2F4F4F] mb-4">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-[#708090]">
              <thead className="text-xs text-[#2F4F4F] uppercase bg-[#FFFDD0]">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="bg-white border-b">
                    <td className="px-6 py-4">{order.id}</td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">
                      {currency}
                      {order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Link to full orders page */}
          <div className="mt-4">
            <Link to="/orders" className="text-[#708090] hover:text-[#FFC0CB]">
              View All Orders
            </Link>
          </div>
        </div>
      </div>
      {/* Toast container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Profile;
