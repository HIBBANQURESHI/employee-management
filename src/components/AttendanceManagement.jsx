import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AttendanceManagement = () => {
    const [employees, setEmployees] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [date, setDate] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/employee', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.success) {
                    setEmployees(response.data.employees);
                }
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, []);

    const fetchAttendance = async (selectedDate) => {
        try {
            const response = await axios.get(
                `http://localhost:3000/api/attendance/${selectedDate}`,
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            if (response.data.success) {
                const fetchedAttendance = {};
                response.data.attendance.forEach((record) => {
                    fetchedAttendance[record.employeeId] = record.status;
                });
                setAttendance(fetchedAttendance);
            }
        } catch (error) {
            console.error("Error fetching attendance:", error);
        }
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        fetchAttendance(selectedDate);
    };

    const handleAttendanceChange = (id, status) => {
        setAttendance((prev) => ({ ...prev, [id]: status }));
    };

    const handleSubmit = async () => {
        if (!date) {
            alert("Please select a date before submitting.");
            return;
        }

        // Format the date to ISO format for the backend
        const formattedDate = new Date(date).toISOString();

        const attendanceRecords = employees.map((emp) => ({
            employeeId: emp._id,
            status: attendance[emp._id] || "Absent",
        }));

        try {
            const response = await axios.post(
                'http://localhost:3000/api/attendance/mark',
                { date: formattedDate, attendanceRecords },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert("Attendance marked successfully!");
            navigate("/admin-dashboard");
        } catch (error) {
            console.error("Error marking attendance:", error);
            alert("Error marking attendance.");
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h3 className="text-2xl font-semibold mb-6">Attendance Management</h3>
            <div className="mb-4">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Select Date:
                </label>
                <input
                    type="date"
                    id="date"
                    className="mt-1 block w-full sm:w-auto rounded-md border-gray-300 shadow-sm focus:ring focus:ring-indigo-200"
                    onChange={handleDateChange}
                />
            </div>
            <table className="w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp.userId.name}</td>
                            <td>{emp.department}</td>
                            <td>
                                <select
                                    value={attendance[emp._id] || "Absent"}
                                    onChange={(e) => handleAttendanceChange(emp._id, e.target.value)}
                                    className="border rounded p-2"
                                >
                                    <option value="Present">Present</option>
                                    <option value="Absent">Absent</option>
                                    <option value="Leave">Leave</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSubmit}
            >
                Submit Attendance
            </button>
        </div>
    );
};

export default AttendanceManagement;
