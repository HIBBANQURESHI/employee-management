import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Attendance = () => {
    const [employees, setEmployees] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);

    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get("https://ems-backend-mu.vercel.app/api/employee", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.data.success) {
                    let sno = 1;
                    const data = response.data.employees.map((emp) => ({
                        _id: emp._id,
                        sno: sno++,
                        dep_name: emp.department ? emp.department.dep_name : 'Unknown',
                        name: emp.userId.name,
                        profileImage: emp.userId.profileImage ? (
                            <img width={40} className="rounded-full" src={`https://ems-backend-mu.vercel.app/${emp.userId.profileImage}`} alt="profile" />
                        ) : (
                            <span>No Image</span>
                        ),
                    }));

                    setEmployees(data);
                }
            } catch (error) {
                console.log(error.message);
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setEmpLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleAttendanceChange = (empId, status) => {
        if (!empId || !status) return;
    
        setAttendanceData((prevData) => {
            const existing = prevData.find((item) => item.empId === empId);
    
            if (existing) {
                return prevData.map((item) =>
                    item.empId === empId ? { ...item, status } : item
                );
            } else {
                return [...prevData, { empId, status }];
            }
        });
    };
    
    
    

    const handleSubmitAttendance = async () => {
        console.log("Sending Attendance Data:", attendanceData);
    
        try {
            const response = await axios.post(
                "https://ems-backend-mu.vercel.app/api/attendance/mark",
                { attendanceData },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
    
            if (response.data.success) {
                alert("Attendance marked successfully");
                setAttendanceData([]);
            }
        } catch (error) {
            console.log("Error Response:", error.response?.data || error.message);
    
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); // Show specific error message
            } else {
                alert("Error marking attendance, please try again.");
            }
        }
    };
    
    

    if (empLoading) {
        return <div className="text-center text-gray-600">Loading employees...</div>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg space-y-6">
            <h3 className="text-3xl font-semibold text-gray-800 mb-6">Add Attendance</h3>

            {employees.length > 0 ? (
                <div className="space-y-4">
                    {employees.map((emp) => (
                        <div key={emp._id} className="flex justify-between items-center p-4 border-b border-gray-200 hover:bg-gray-50 rounded-md transition-all duration-200">
                            <div className="flex items-center space-x-4">
                                {emp.profileImage}
                                <span className="text-lg font-medium text-gray-700">{emp.name}</span>
                            </div>
                            <div>
                                <label className="mr-4 text-gray-600">Mark Attendance:</label>
                                <select
                                    onChange={(e) => handleAttendanceChange(emp._id, e.target.value)}
                                    className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select</option>
                                    <option value="present">Present</option>
                                    <option value="absent">Absent</option>
                                    <option value="leave">Leave</option>
                                </select>
                            </div>

                            {/* View Attendance Button */}
                            <Link
                                to={`/admin-dashboard/attendance/${emp._id}`} // Link to ViewAttendance.jsx
                                className="text-sky-900 hover:text-sky-700 font-semibold"
                            >
                                View Attendance
                            </Link>

                        </div>
                    ))}
                    <button
                        onClick={handleSubmitAttendance}
                        className="w-full py-3 bg-sky-900 text-white font-semibold rounded-md hover:bg-sky-700 transition-all duration-200"
                    >
                        Submit Attendance
                    </button>
                </div>
            ) : (
                <div className="text-center text-gray-600">No employees found</div>
            )}
        </div>
    );
};

export default Attendance;
