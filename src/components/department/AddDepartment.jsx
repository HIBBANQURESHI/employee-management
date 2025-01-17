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
        "http://localhost:5000/api/department/add",
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
    <div className="max-w-2xl mx-auto mt-12 bg-gray-800 text-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6">Add New Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="dep_name"
            className="block text-sm font-medium text-gray-300"
          >
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            onChange={handleChange}
            placeholder="Enter Department Name"
            className="mt-2 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter Description"
            onChange={handleChange}
            className="mt-2 w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md transition-all duration-300 ease-in-out"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
