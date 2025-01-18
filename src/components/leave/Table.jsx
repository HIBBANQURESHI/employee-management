import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButtons } from "../../utils/LeaveHelper";
import axios from "axios";

const Table = () => {
  const [leaves, setLeaves] = useState(null);
  const [filteredLeaves, setFilteredLeaves] = useState(null);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.data.success) {
        let sno = 1;
        console.log("API response: ", response.data.leaves); // Log raw API response
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
      console.error("Error fetching leaves: ", error);
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
    setFilteredLeaves(data)
  };
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status
        .toLowerCase()
        .includes(status.toLowerCase())
    );
    setFilteredLeaves(data)
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Seach By Emp Id"
              className="px-4 py-2 border border-gray-600 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button className="px-4 py-2 bg-gray-500 text-white hover:bg-gray-700 border border-gray-500 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onClick={() => filterByButton("Pending")}>
                Pending
              </button>
              <button className="px-4 py-2 bg-green-500 text-white hover:bg-green-700 border border-green-500 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onClick={() => filterByButton("Approved")}>
                Approved
              </button>
              <button className="px-4 py-2 bg-red-500 text-white hover:bg-red-700 border border-red-500 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              onClick={() => filterByButton("Rejected")}>
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-3">
            <DataTable columns={columns} data={filteredLeaves} pagination />
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default Table;
