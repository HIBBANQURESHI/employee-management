import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserPlus } from 'lucide-react'; // Lucide icon
import { motion } from 'framer-motion'; // Framer Motion for animations

const Add = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "https://ems-backend-mu.vercel.app/api/employee/add",
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-900 flex justify-center items-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-900 max-w-4xl w-full p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
          <UserPlus className="mr-3" />
          Add New Employee
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Insert Name"
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Insert Email"
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              />
            </div>

            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                onChange={handleChange}
                placeholder="Employee ID"
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Gender
              </label>
              <select
                name="gender"
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Marital Status
              </label>
              <select
                name="maritalStatus"
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              >
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                onChange={handleChange}
                placeholder="Designation"
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Department
              </label>
              <select
                name="department"
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              >
                <option value="">Select Department</option>
                {departments.map((dep) => (
                  <option key={dep._id} value={dep._id}>
                    {dep.dep_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Salary
              </label>
              <input
                type="number"
                name="salary"
                onChange={handleChange}
                placeholder="Salary"
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="******"
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Role
              </label>
              <select
                name="role"
                onChange={handleChange}
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Upload Image
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                placeholder="Upload Image"
                accept="image/*"
                className="mt-1 p-3 block w-full border border-gray-600 rounded-md bg-gray-700/30 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Add Employee
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Add;
