import axios from "axios";
import React from "react";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "70px",
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "100px",
  },
  {
    name: "Emp ID",
    selector: (row) => row.employeeId,
    sortable: true,
    width: "100px",
  },
  {
    name: "Department",
    selector: (row) => row.department,
    width: "120px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center: "true",
  },
];

export const AttendanceHelper = ({ status, employeeId, statusChange }) => {
  const markEmployee = async (status, employeeId) => {
    const response = await axios.put(
      `https://ems-backend-mu.vercel.app/api/attendance/update/${employeeId}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      statusChange();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      {status == null ? (
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300"
            onClick={() => markEmployee("present", employeeId)}
          >
            Present
          </button>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300"
            onClick={() => markEmployee("absent", employeeId)}
          >
            Absent
          </button>
          <button
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors duration-300"
            onClick={() => markEmployee("sick", employeeId)}
          >
            Sick
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
            onClick={() => markEmployee("leave", employeeId)}
          >
            Leave
          </button>
        </div>
      ) : (
        <p className="bg-gray-200 text-center py-2 px-4 rounded-lg text-sm font-medium text-gray-700">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </p>
      )}
    </div>
  );
};
