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
    const [selectedDate, setSelectedDate] = useState("");

    const statusChange = async (employeeId, status, date) => {
        try {
            const response = await axios.put(
                `https://ems-backend-mu.vercel.app/api/attendance/update/${employeeId}`,
                { status, date },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                fetchAttendance(date);
            }
        } catch (error) {
            console.error("Update error:", error.message);
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    const fetchAttendance = async (date = new Date().toISOString().split("T")[0]) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://ems-backend-mu.vercel.app/api/attendance?date=${date}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
    
        if (response.data.success) {
          let sno = 1;
          const data = response.data.attendance.map((att) => ({
            employeeId: att.employeeId?.employeeId || "N/A",
            sno: sno++,
            department: att.employeeId?.department?.dep_name || "N/A",
            name: att.employeeId?.userId?.name || "N/A",
            action: (
              <AttendanceHelper
                status={att.status}
                employeeId={att.employeeId?.employeeId}
                statusChange={() => fetchAttendance(date)} // Refresh data after update
                date={date} // Pass the selected date
              />
            ),
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
        fetchAttendance(selectedDate || new Date().toISOString().split("T")[0]);
    }, [selectedDate]);

    const handleFilter = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const records = attendance.filter(
            (emp) =>
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

                {/* Date Picker */}
                <div className="mb-4 flex justify-center">
                    <input
                        type="date"
                        className="bg-gray-800 text-white px-4 py-2 rounded"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                </div>

                {/* Search Filter */}
                <div className="mb-4 flex justify-center">
                    <input
                        type="text"
                        placeholder="Search by Employee ID or Name"
                        className="bg-gray-800 text-white px-4 py-2 rounded"
                        onChange={handleFilter}
                    />
                </div>

                {/* Attendance Table */}
                <DataTable
                    columns={columns}
                    data={filteredAttendance}
                    pagination
                    highlightOnHover
                    customStyles={{
                        headRow: {
                            style: {
                                backgroundColor: "#1F2937",
                                color: "white",
                            },
                        },
                        rows: {
                            style: {
                                backgroundColor: "#111827",
                                color: "white",
                            },
                        },
                    }}
                />
            </motion.div>
        </div>
    );
};

export default Attendance;