import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SalaryAdd = () => {
  const [salary, setSalary] = useState({
    department: "",
    employeeId: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    payDate: "",
  });
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/salary/add",
        salary,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      } else {
        alert(response.data?.error || "Error adding salary details.");
      }
    } catch (error) {
      console.error("Error adding salary details:", error);
      alert("Error adding salary. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Add Salary</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Department Field */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={salary.department}
                onChange={handleChange}
                placeholder="Enter Department Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Employee Field */}
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-2">
                Employee
              </label>
              <input
                type="text"
                name="employeeId"
                value={salary.employeeId}
                onChange={handleChange}
                placeholder="Enter Employee Name or ID"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Basic Salary */}
            <div>
              <label htmlFor="basicSalary" className="block text-sm font-medium text-gray-700 mb-2">
                Basic Salary
              </label>
              <input
                type="number"
                name="basicSalary"
                value={salary.basicSalary}
                onChange={handleChange}
                placeholder="Basic Salary"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Allowances */}
            <div>
              <label htmlFor="allowances" className="block text-sm font-medium text-gray-700 mb-2">
                Allowances
              </label>
              <input
                type="number"
                name="allowances"
                value={salary.allowances}
                onChange={handleChange}
                placeholder="Allowances"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Deductions */}
            <div>
              <label htmlFor="deductions" className="block text-sm font-medium text-gray-700 mb-2">
                Deductions
              </label>
              <input
                type="number"
                name="deductions"
                value={salary.deductions}
                onChange={handleChange}
                placeholder="Deductions"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Pay Date */}
            <div>
              <label htmlFor="payDate" className="block text-sm font-medium text-gray-700 mb-2">
                Pay Date
              </label>
              <input
                type="date"
                name="payDate"
                value={salary.payDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Add Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SalaryAdd;
