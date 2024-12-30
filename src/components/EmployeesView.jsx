import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmployeesView = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://ems-backend-mu.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, []);

  return (
    <>
      {employee ? (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center py-8">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Employee Details</h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border border-gray-300 overflow-hidden mb-6">
                <img
                  src={`https://ems-backend-mu.vercel.app/${employee.userId.profileImage}`}
                  alt="Profile Image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <div className="flex justify-between border-b py-2">
                  <p className="text-gray-500 font-medium">Name:</p>
                  <p className="text-gray-800 font-semibold">{employee.userId.name}</p>
                </div>
                <div className="flex justify-between border-b py-2">
                  <p className="text-gray-500 font-medium">Employee ID:</p>
                  <p className="text-gray-800 font-semibold">{employee.employeeId}</p>
                </div>
                <div className="flex justify-between border-b py-2">
                  <p className="text-gray-500 font-medium">DOB:</p>
                  <p className="text-gray-800 font-semibold">
                    {new Date(employee.dob).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-between border-b py-2">
                  <p className="text-gray-500 font-medium">Gender:</p>
                  <p className="text-gray-800 font-semibold">{employee.gender}</p>
                </div>
                <div className="flex justify-between border-b py-2">
                  <p className="text-gray-500 font-medium">Department:</p>
                  <p className="text-gray-800 font-semibold">{employee.department}</p>
                </div>
                <div className="flex justify-between border-b py-2">
                  <p className="text-gray-500 font-medium">Marital Status:</p>
                  <p className="text-gray-800 font-semibold">{employee.martialStatus}</p>
                </div>
                <div className="flex justify-between border-b py-2">
                  <p className="text-gray-500 font-medium">Salary:</p>
                  <p className="text-gray-800 font-semibold">{employee.salary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeesView;
