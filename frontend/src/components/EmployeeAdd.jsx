import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeAdd = () => {

    const [formData, setFormData] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value, files} = e.target
        if(name === "image"){
            setFormData((prevData) => ({...prevData, [name] : files[0]}))
        } else {
            setFormData((prevData) => ({...prevData, [name] : value}))
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })

        try {
            const response = await axios.post('http://localhost:3000/api/employee/add', formDataObj, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if(response.data.success){
                navigate("/admin-dashboard/employee")
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add New Employee</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Employee ID */}
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID
              </label>
              <input
                type="text"
                onChange={handleChange}
                id="employeeId"
                placeholder="Enter Employee ID"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* DOB */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <select
                id="gender"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* Marital Status */}
            <div>
              <label htmlFor="maritalStatus" className="block text-sm font-medium text-gray-700 mb-2">
                Marital Status
              </label>
              <select
                id="maritalStatus"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
            {/* Designation */}
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                Designation
              </label>
              <input
                type="text"
                id="designation"
                onChange={handleChange}
                placeholder="Enter Designation"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                id="department"
                onChange={handleChange}
                placeholder="Enter Department"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Salary */}
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                Salary
              </label>
              <input
                type="number"
                onChange={handleChange}
                id="salary"
                placeholder="Enter Salary"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role"
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>
            {/* Image Upload */}
            <div className="sm:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <input
                type="file"
                onChange={handleChange}
                id="image"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeAdd;
