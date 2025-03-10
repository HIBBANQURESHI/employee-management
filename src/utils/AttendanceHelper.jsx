import axios from "axios";
import React from "react";

export const AttendanceHelper = ({ status, employeeId, statusChange, date }) => {
  const markEmployee = async (newStatus) => {
    try {
      const response = await axios.put(
        `https://ems-backend-mu.vercel.app/api/attendance/update/${employeeId}`,
        { status: newStatus, date }, // Include the date in the request
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        statusChange(); // Refresh the attendance data
      }
    } catch (error) {
      console.error("Error updating attendance:", error.message);
      if (error.response) {
        alert(error.response.data.message || "Failed to update attendance. Please try again.");
      } else {
        alert("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      {status == null ? (
        <div className="flex space-x-2">
          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors duration-300"
            onClick={() => markEmployee("Present")}
          >
            Present
          </button>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300"
            onClick={() => markEmployee("Absent")}
          >
            Absent
          </button>
          <button
            className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors duration-300"
            onClick={() => markEmployee("Sick")}
          >
            Sick
          </button>
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
            onClick={() => markEmployee("Leave")}
          >
            Leave
          </button>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <span
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              status === "Present"
                ? "bg-green-100 text-green-800"
                : status === "Absent"
                ? "bg-red-100 text-red-800"
                : status === "Sick"
                ? "bg-yellow-100 text-yellow-800"
                : status === "Leave"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
          <button
            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-300"
            onClick={() => markEmployee(null)}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};