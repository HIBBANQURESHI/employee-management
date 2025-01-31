import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

const Edit = () => {
  const [employee, setEmployee] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: 0,
    department: "",
  });
  const [departments, setDepartments] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://ems-backend-mu.vercel.app/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchEmployee();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://ems-backend-mu.vercel.app/api/employee/${id}`,
        employee,
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
    <>
    <div className="bg-gray-900 min-h-screen">
      {departments && employee ? (
        
        <motion.div
          className="max-w-4xl mx-auto mt-10 bg-gray-800 text-white p-8 rounded-md shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  placeholder="Insert Name"
                  className="mt-1 p-2 block w-full bg-gray-700 border border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 text-white"
                  required
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  onChange={handleChange}
                  value={employee.maritalStatus}
                  className="mt-1 p-2 block w-full bg-gray-700 border border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 text-white"
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
                  value={employee.designation}
                  onChange={handleChange}
                  placeholder="Designation"
                  className="mt-1 p-2 block w-full bg-gray-700 border border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 text-white"
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  placeholder="Salary"
                  className="mt-1 p-2 block w-full bg-gray-700 border border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 text-white"
                  required
                />
              </div>

              {/* Department */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300">
                  Department
                </label>
                <select
                  name="department"
                  onChange={handleChange}
                  value={employee.department}
                  className="mt-1 p-2 block w-full bg-gray-700 border border-gray-600 rounded-md focus:ring-teal-500 focus:border-teal-500 text-white"
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
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Edit Employee
            </button>
          </form>
        </motion.div>
      ) : (
        <div className="max-w-4xl mx-auto mt-10 text-center text-white">Loading...</div>
      )}
      </div>
    </>
  );
};

export default Edit;
