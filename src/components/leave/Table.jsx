import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("https://ems-backend-mu.vercel.app/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId ? leave.employeeId._id : "N/A",
          name: leave.employeeId && leave.employeeId.userId ? leave.employeeId.userId.name : "Unknown",
          leaveType: leave.leaveType,
          department: leave.employeeId && leave.employeeId.department ? leave.employeeId.department.dep_name : "Unknown",
          days: Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)),
          status: leave.status,
          action: leave._id ? <LeaveButtons Id={leave._id} /> : "N/A",
        }));
        setLeaves(data);
        setFilteredLeaves(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.employeeId
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status
        .toLowerCase()
        .includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="min-h-screen bg-gray-900 text-white p-8">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold">Manage Leaves</h3>
          </div>

          <div className="flex justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-600"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-3 bg-gray-800 p-4 rounded-md shadow-lg">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
          <div>Loading ...</div>
        </div>
      )}
    </>
  );
};

export default Table;
