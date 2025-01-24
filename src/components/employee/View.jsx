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
          `https://ems-backend-mu.vercel.app/api/employee/${id}`,
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
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg">
          <h2 className="text-3xl font-semibold text-black mb-8 text-center">
            Employee Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16">
            <div className="flex justify-center items-center">
              <img
                src={`https://ems-backend-mu.vercel.app/${employee.userId.profileImage}`}
                alt="Profile"
                className="rounded-full border-4 border-sky-300 w-72 h-72 object-cover"
              />
            </div>
            <div className="space-y-6 text-gray-300">
              <div className="flex space-x-3">
                <p className="text-xl font-bold text-sky-300">Name:</p>
                <p className="font-medium text-black text-xl">{employee.userId.name}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-xl font-bold text-sky-300">Employee ID:</p>
                <p className="font-medium text-black text-xl">{employee.employeeId}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-xl font-bold text-sky-300">Date of Birth:</p>
                <p className="font-medium text-black text-xl">
                  {new Date(employee.dob).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-3">
                <p className="text-xl font-bold text-sky-300">Gender:</p>
                <p className="font-medium text-black text-xl">{employee.gender}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-xl font-bold text-sky-300">Department:</p>
                <p className="font-medium text-black text-xl">{employee.department}</p>
              </div>
              <div className="flex space-x-3">
                <p className="text-xl font-bold text-sky-300">Marital Status:</p>
                <p className="font-medium text-black text-xl">{employee.maritalStatus}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-blue-950">Loading...</div>
      )}
    </>
  );
};

export default View;
