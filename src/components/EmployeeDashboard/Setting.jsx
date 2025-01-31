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
      setError("Passwords do not match");
    } else {
      try {
        const response = await axios.put(
          "https://ems-backend-mu.vercel.app/api/setting/change-password",
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
    <div className="max-w-md mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-lg w-full">
      <h2 className="text-3xl font-semibold text-white mb-6">Change Password</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-300" htmlFor="oldPassword">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            placeholder="Enter Old Password"
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-300" htmlFor="newPassword">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            placeholder="Enter New Password"
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-gray-300" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm New Password"
            onChange={handleChange}
            className="mt-2 w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
