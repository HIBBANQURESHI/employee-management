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
        const response = await axios.get(
          `https://ems-backend-mu.vercel.app/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        console.log("Error: " + error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };

    fetchLeave();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `https://ems-backend-mu.vercel.app/api/leave/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate('/admin-dashboard/leaves');
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
        <div className="min-h-screen bg-gray-900 p-8">
          <div className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-md shadow-lg">
            <h2 className="text-3xl font-bold mb-8 text-center text-white">
              Leave Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex justify-center items-center">
                <img
                  src={`https://ems-backend-mu.vercel.app/${leave.employeeId.userId.profileImage}`}
                  className="rounded-full border-4 border-teal-600 w-72"
                  alt="Profile"
                />
              </div>
              <div>
                <div className="flex space-x-3 mb-4 text-white">
                  <p className="text-lg font-bold">Name:</p>
                  <p className="font-medium">{leave.employeeId.userId.name}</p>
                </div>
                <div className="flex space-x-3 mb-4 text-white">
                  <p className="text-lg font-bold">Employee ID:</p>
                  <p className="font-medium">{leave.employeeId.employeeId}</p>
                </div>

                <div className="flex space-x-3 mb-4 text-white">
                  <p className="text-lg font-bold">Leave Type:</p>
                  <p className="font-medium">{leave.leaveType}</p>
                </div>
                <div className="flex space-x-3 mb-4 text-white">
                  <p className="text-lg font-bold">Reason:</p>
                  <p className="font-medium">{leave.reason}</p>
                </div>

                <div className="flex space-x-3 mb-4 text-white">
                  <p className="text-lg font-bold">Department:</p>
                  <p className="font-medium">{leave.employeeId.department.dep_name}</p>
                </div>
                <div className="flex space-x-3 mb-4 text-white">
                  <p className="text-lg font-bold">Start Date:</p>
                  <p className="font-medium">{new Date(leave.startDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-4 text-white">
                  <p className="text-lg font-bold">End Date:</p>
                  <p className="font-medium">{new Date(leave.endDate).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-3 mb-4 text-white">
                  <p className="text-lg font-bold">
                    {leave.status === "Pending" ? "Action:" : "Status:"}
                  </p>
                  {leave.status === "Pending" ? (
                    <div className="flex space-x-2">
                      <button
                        className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-500"
                        onClick={() => changeStatus(leave._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
                        onClick={() => changeStatus(leave._id, "Rejected")}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <p className="font-medium">{leave.status}</p>
                  )}
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

export default Detail;
