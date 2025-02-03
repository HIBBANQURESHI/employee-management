import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

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
        <div className="min-h-screen bg-gray-900 p-8">
          <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-md shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Employee Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center items-center">
                <img
                  src={`https://ems-backend-mu.vercel.app/${employee.userId.profileImage}`}
                  className="rounded-full border-4 border-teal-600 w-72"
                  alt="Profile"
                />
              </div>
              <div>
                <div className="flex space-x-3 mb-5 text-white">
                  <p className="text-lg font-bold">Name:</p>
                  <p className="font-medium">{employee.userId.name}</p>
                </div>
                <div className="flex space-x-3 mb-5 text-white">
                  <p className="text-lg font-bold">Employee ID:</p>
                  <p className="font-medium">{employee.employeeId}</p>
                </div>

                <div className="flex space-x-3 mb-5 text-white">
                  <p className="text-lg font-bold">Date of Birth:</p>
                  <p className="font-medium">
                    {new Date(employee.dob).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-3 mb-5 text-white">
                  <p className="text-lg font-bold">Gender:</p>
                  <p className="font-medium">{employee.gender}</p>
                </div>

                <div className="flex space-x-3 mb-5 text-white">
                  <p className="text-lg font-bold">Department:</p>
                  <p className="font-medium">{employee.department.dep_name}</p>
                </div>
                <div className="flex space-x-3 mb-5 text-white">
                  <p className="text-lg font-bold">Marital Status:</p>
                  <p className="font-medium">{employee.maritalStatus}</p>
                </div>
              </div>
            </div>
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

export default View;
