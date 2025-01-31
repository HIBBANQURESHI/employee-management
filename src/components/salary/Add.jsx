import React, { useEffect, useState } from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Add = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState(null);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const departments = await fetchDepartments();
      setDepartments(departments);
    };
    getDepartments();
  }, []);

  const handleDepartment = async (e) => {
    const emps = await getEmployees(e.target.value);
    setEmployees(emps);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://ems-backend-mu.vercel.app/api/salary/add`,
        salary,
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
      {departments ? (
        <div className="min-h-screen bg-gray-900 text-white p-8">
          <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Add Salary</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Department
                  </label>
                  <select
                    name="department"
                    onChange={handleDepartment}
                    className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
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

                {/* Employee */}
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Employee
                  </label>
                  <select
                    name="employeeId"
                    onChange={handleChange}
                    className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  >
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.employeeId}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Basic Salary */}
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Basic Salary
                  </label>
                  <input
                    type="number"
                    name="basicSalary"
                    onChange={handleChange}
                    placeholder="Basic Salary"
                    className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>

                {/* Allowances */}
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Allowances
                  </label>
                  <input
                    type="number"
                    name="allowances"
                    onChange={handleChange}
                    placeholder="Allowances"
                    className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>

                {/* Deductions */}
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Deductions
                  </label>
                  <input
                    type="number"
                    name="deductions"
                    onChange={handleChange}
                    placeholder="Deductions"
                    className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>

                {/* Pay Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Pay Date
                  </label>
                  <input
                    type="date"
                    name="payDate"
                    onChange={handleChange}
                    className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                Add Salary
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
          <div>Loading...</div>
        </div>
      )}
    </>
  );
};

export default Add;
