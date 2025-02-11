import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { columns, AttendanceHelper } from "../../utils/AttendanceHelper";
import DataTable from "react-data-table-component";
import axios from "axios";
import { motion } from "framer-motion";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredAttendance, setFilterAttendance] = useState(null);

  const statusChange = () => { 
    fetchAttendance();
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://ems-backend-mu.vercel.app/api/attendance", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if (response.data.success) {
        let sno = 1;
        const data = response.data.attendance.map((att) => ({
          employeeId: att.employeeId?.employeeId || 'N/A',
          sno: sno++,
          department: att.employeeId?.department?.dep_name || 'N/A',
          name: att.employeeId?.userId?.name || 'N/A',
          action: <AttendanceHelper 
                    status={att.status} 
                    employeeId={att.employeeId?.employeeId} 
                    statusChange={statusChange} 
                    allowChange={true} // Added prop to allow changing attendance
                  />,
        }));
        setAttendance(data);
        setFilterAttendance(data);
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = attendance.filter((emp) =>
      emp.employeeId.toLowerCase().includes(searchTerm) ||
      emp.name.toLowerCase().includes(searchTerm)
    );
    setFilterAttendance(records);
  };

  if (loading || !filteredAttendance) {
    return <div className="min-h-screen bg-gray-900 p-6 text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-6">
          <h3 className="text-3xl font-semibold">Manage Attendance</h3>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-900 p-4 rounded-lg">
          <input
            type="text"
            placeholder="Search by Employee ID or Name"
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
            onChange={handleFilter}
          />
          <p className="text-lg">
            Mark Employees for <span className="font-bold underline">{new Date().toISOString().split("T")[0]}</span>
          </p>
          <Link
            to="/admin-dashboard/attendance-report"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 transition duration-200 rounded-lg shadow-lg"
          >
            Attendance Report
          </Link>
        </div>
        <div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-lg">
          <DataTable 
            columns={columns} 
            data={filteredAttendance} 
            pagination 
            className="text-white"
            progressPending={loading}
            progressComponent={<div className="text-white">Loading...</div>}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Attendance;
