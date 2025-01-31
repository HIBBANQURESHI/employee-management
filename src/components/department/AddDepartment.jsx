import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ems-backend-mu.vercel.app/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-lg bg-gray-800/60 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-white text-center">Add Department</h2>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Department Name */}
          <div>
            <label htmlFor="dep_name" className="block text-sm font-medium text-gray-300">
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              onChange={handleChange}
              placeholder="Enter department name"
              className="mt-2 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* Description */}
          <div className="mt-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter department description"
              onChange={handleChange}
              className="mt-2 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
