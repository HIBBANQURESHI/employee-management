import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper";
import DataTable from "react-data-table-component";
import axios from "axios";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilterAttendance] = useState(null);

  const statusChange = () => {
    fetchAttendance();
  }

  const fetchAttendance = async () => {
    setLoading(true);
    try {
        const response = await axios.get("http://localhost:5000/api/attendance", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (response.data.success) {
            let sno = 1;
            const data = response.data.attendance.map((att) => ({
                employeeId: att.employeeId ? att.employeeId._id : "N/A", // Access employeeId
                sno: sno++,
                department: att.employeeId && att.employeeId.department ? att.employeeId.department.dep_name : "Unknown", // Access department
                name: att.employeeId && att.employeeId.userId ? att.employeeId.userId.name : "Unknown", // Access userId.name
                action: <AttendanceHelper status={att.status} employeeId={att.employeeId ? att.employeeId._id : "N/A"} statusChange={statusChange} />,
            }));
            setAttendance(data);
            setFilterAttendance(data);
        }
    } catch (error) {
        console.error('Error in fetchAttendance:', error); // Log the full error
        if (error.response) {
            alert(error.response.data.message || "An error occurred while fetching attendance.");
        } else {
            alert("An error occurred while fetching attendance.");
        }
    } finally {
        setLoading(false);
    }
};


  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const records = attendance.filter((emp) =>
        emp.employeeId && emp.employeeId._id.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilterAttendance(records);
};


  if (!filteredAttendance) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="p-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Attendance</h3>
      </div>
      <div className="flex justify-between items-center mt-4">
        <input
          type="text"
          placeholder="Seach By Dep Name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}
        />
        <p className="text-2xl">
          Mark Employees for <span className="font-bold underline">{new Date().toISOString().split("T")[0]}{" "}</span>
        </p>
        <Link
          to="/admin-dashboard/attendance-report"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Attendance Report
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredAttendance} pagination />
      </div>
    </div>
  );
};

export default Attendance;
