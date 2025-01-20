// src/components/forms/DepartmentForm.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [setting, setSetting] = useState({
    userId: user._id,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting({ ...setting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Password not matched");
    } else {
      try {
        const response = await axios.put(
          "http://localhost:5000/api/setting/change-password",
          setting,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          navigate("/admin-dashboard/employees");
          setError("");
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 rounded-lg w-full sm:w-96">
      <h2 className="text-2xl font-semibold text-black mb-6 text-center">Change Password</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium text-black">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter Old Password"
            onChange={handleChange}
            value={setting.oldPassword}
            className="mt-1 w-full p-3 border border-gray-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium text-black">New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter New Password"
            onChange={handleChange}
            value={setting.newPassword}
            className="mt-1 w-full p-3 border border-gray-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-black">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            onChange={handleChange}
            value={setting.confirmPassword}
            className="mt-1 w-full p-3 border border-gray-600 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-sky-900 hover:bg-sky-700 text-white font-bold py-3 rounded-md transition-all duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
