import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeave = async () => {
      try {
        const responnse = await axios.get(
          `https://ems-backend-mu.vercel.app/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (responnse.data.success) {
          setLeave(responnse.data.leave);
        }
      } catch (error) {
        console.log("Errrror: " + error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const responnse = await axios.put(
        `https://ems-backend-mu.vercel.app/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (responnse.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {leave ? (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md">
          <h2 className="text-3xl font-semibold mb-8 text-center text-black">
            Leave Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16">
            {/* Profile Image */}
            <div className="flex justify-center">
              <img
                src={`https://ems-backend-mu.vercel.app/${leave.employeeId.userId.profileImage}`}
                alt="Profile"
                className="rounded-full border-4 border-sky-300 w-48 h-48 object-cover"
              />
            </div>

            {/* Leave Details */}
            <div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <p className="text-xl font-semibold text-sky-300">Name:</p>
                  <p className="text-black text-xl font-medium">{leave.employeeId.userId.name}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-xl font-semibold text-sky-300">Employee ID:</p>
                  <p className="text-black text-xl font-medium">{leave.employeeId.employeeId}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-xl font-semibold text-sky-300">Leave Type:</p>
                  <p className="text-black text-xl font-medium">{leave.leaveType}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-xl font-semibold text-sky-300">Reason:</p>
                  <p className="text-black text-xl font-medium">{leave.reason}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-xl font-semibold text-sky-300">Department:</p>
                  <p className="text-black text-xl font-medium">{leave.employeeId.department}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-xl font-semibold text-sky-300">Start Date:</p>
                  <p className="text-black text-xl font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <p className="text-xl font-semibold text-sky-300">End Date:</p>
                  <p className="text-black text-xl font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
                </div>

                {/* Status / Action Buttons */}
                <div className="flex items-center space-x-3">
                  <p className="text-xl font-semibold text-gray-800">
                    {leave.status === "Pending" ? "Action:" : "Status:"}
                  </p>
                  {leave.status === "Pending" ? (
                    <div className="flex space-x-4">
                      <button
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-teal-700 focus:outline-none"
                        onClick={() => changeStatus(leave._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-700 focus:outline-none"
                        onClick={() => changeStatus(leave._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p className="text-lg font-medium text-gray-600">{leave.status}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-xl font-semibold">Loading...</div>
      )}
    </>
  );
};

export default Detail;
