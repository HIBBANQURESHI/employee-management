import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeDashboard = () => {
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/employee/dashboard', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.success) {
                    setEmployeeData(response.data.employee);
                }
            } catch (error) {
                console.error("Error fetching employee data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, []);

    const renderAttendance = (attendance) => {
        return (
            <div>
                <h4>Attendance for the Current Month:</h4>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((entry, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{new Date(entry.date).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{entry.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!employeeData) {
        return <div>No data available</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Employee Dashboard</h1>
            <div className="mb-6">
                <h3>Name: {employeeData.name}</h3>
                <h4>Employee ID: {employeeData.employeeId}</h4>
                <h4>Department: {employeeData.department}</h4>
                <h4>Salary: ${employeeData.salary}</h4>
            </div>
            {renderAttendance(employeeData.currentMonthAttendance)}
        </div>
    );
};

export default EmployeeDashboard;
