import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const List = () => {
  const [leaves, setLeaves] = useState(null);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/leave/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setLeaves(response.data.leaves);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  if (!leaves) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Title */}
      <div className="text-center mb-6">
        <h3 className="text-3xl font-semibold text-teal-600">Manage Leaves</h3>
      </div>

      {/* Search and Add Leave Button */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Department Name"
          className="px-4 py-2 border rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            Add New Leave
          </Link>
        )}
      </div>

      {/* Leave Table */}
      <table className="w-full text-sm text-left text-gray-500 mt-6 border-separate border-spacing-0.5">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="px-6 py-3">SNO</th>
            <th className="px-6 py-3">Leave Type</th>
            <th className="px-6 py-3">From</th>
            <th className="px-6 py-3">To</th>
            <th className="px-6 py-3">Description</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave) => (
            <tr
              key={leave._id}
              className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border-b dark:border-gray-700 transition-all"
            >
              <td className="px-6 py-3">{sno++}</td>
              <td className="px-6 py-3">{leave.leaveType}</td>
              <td className="px-6 py-3">
                {new Date(leave.startDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">
                {new Date(leave.endDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-3">{leave.reason}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    leave.status === "Approved"
                      ? "bg-green-500"
                      : leave.status === "Pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {leave.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
