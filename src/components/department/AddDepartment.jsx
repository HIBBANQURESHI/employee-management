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
    <div className="max-w-2xl mx-auto mt-12 bg-white bg-opacity-30 backdrop-blur-lg text-white p-8 rounded-lg ">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">Add New Department</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="dep_name"
            className="block text-sm font-medium text-black"
          >
            Department Name
          </label>
          <input
            type="text"
            name="dep_name"
            onChange={handleChange}
            placeholder="Enter Department Name"
            className="mt-2 w-full p-3 bg-white border border-black rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-black"
          >
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter Description"
            onChange={handleChange}
            className="mt-2 w-full p-3 bg-white border border-black rounded-md text-black focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
            rows="4"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-sky-700 hover:bg-sky-950 text-white font-semibold rounded-md transition-all duration-300 ease-in-out"
        >
          Add Department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
