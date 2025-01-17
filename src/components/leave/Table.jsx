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
        const data = await response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          employeeId: leave.employeeId.employeeId,
          name: leave.employeeId.userId.name,
          leaveType: leave.leaveType,
          department: leave.employeeId.department,
          days:
            new Date(leave.endDate).getDate() -
            new Date(leave.startDate).getDate(),
          status: leave.status,
          action: <LeaveButtons Id={leave._id} />,
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
      leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status.toLowerCase().includes(status.toLowerCase())
    );
    setFilteredLeaves(data);
  };

  return (
    <>
      {filteredLeaves ? (
        <div className="p-6">
          {/* Title */}
          <div className="text-center mb-6">
            <h3 className="text-3xl font-semibold text-teal-600">Manage Leaves</h3>
          </div>

          {/* Search Bar and Filter Buttons */}
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search By Emp ID"
              className="px-4 py-2 border border-gray-300 rounded-md w-1/3 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={filterByInput}
            />
            <div className="space-x-3">
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-300"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="mt-6">
            <DataTable
              columns={columns}
              data={filteredLeaves}
              pagination
              customStyles={{
                rows: {
                  style: {
                    minHeight: '50px',
                  },
                },
                headCells: {
                  style: {
                    padding: '10px 15px',
                    fontWeight: 'bold',
                    backgroundColor: '#f3f4f6',
                    color: '#4b5563',
                  },
                },
                cells: {
                  style: {
                    padding: '10px 15px',
                    backgroundColor: '#fff',
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div className="text-center text-xl font-semibold text-teal-600">Loading...</div>
      )}
    </>
  );
};

export default Table;
