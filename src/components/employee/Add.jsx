import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:5000/api/employee/add",
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
    <div className="max-w-4xl mx-auto mt-10 bg-white text-white p-8 rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center text-black">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-black">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Insert Name"
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Insert Email"
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-black">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              onChange={handleChange}
              placeholder="Employee ID"
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-black">Date of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-black">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
            <label className="block text-sm font-medium text-black">Marital Status</label>
            <select
              name="maritalStatus"
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-black">Designation</label>
            <input
              type="text"
              name="designation"
              onChange={handleChange}
              placeholder="Designation"
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-black">Department</label>
            <select
              name="department"
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
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
            <label className="block text-sm font-medium text-black">Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              placeholder="Salary"
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-black">Role</label>
            <select
              name="role"
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-black">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              accept="image/*"
              className="mt-2 p-3 w-full border border-gray-600 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-sky-700 hover:bg-sky-950 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;
