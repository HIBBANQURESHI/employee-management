import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const responnse = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (responnse.data.success) {
          setEmployee(responnse.data.employee);
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
        <div className="max-w-3xl mx-auto mt-10 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-8 text-center">
            Employee Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center items-center">
              <img
                src={`http://localhost:5000/${employee.userId.profileImage}`}
                alt="Profile"
                className="rounded-full border-4 border-teal-600 w-72 h-72 object-cover"
              />
            </div>
            <div className="space-y-6 text-gray-300">
              <div className="flex space-x-3">
                <p className="text-lg font-bold text-teal-500">Name:</p>
                <p className="font-medium">{employee.userId.name}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold text-teal-500">Employee ID:</p>
                <p className="font-medium">{employee.employeeId}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold text-teal-500">Date of Birth:</p>
                <p className="font-medium">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold text-teal-500">Gender:</p>
                <p className="font-medium">{employee.gender}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold text-teal-500">Department:</p>
                <p className="font-medium">{employee.department}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-lg font-bold text-teal-500">Marital Status:</p>
                <p className="font-medium">{employee.maritalStatus}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-white">Loading...</div>
      )}
    </>
  );
};

export default View;
