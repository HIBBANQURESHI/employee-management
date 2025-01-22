import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

const ViewAttendance = () => {
    const { employeeId } = useParams(); // Extract employeeId from URL parameters
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchAttendanceRecords = async () => {
        setLoading(true);
        setError('');
        try {
            // Prepare the query params
            const params = {
                employeeId,
                ...(filterMonth && { month: filterMonth.padStart(2, '0') }), // Ensure month is two digits
                ...(filterYear && { year: filterYear }),
            };

            const response = await axios.get("http://localhost:5000/api/attendance/records", {
                params,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.success) {
                setAttendanceRecords(response.data.records); // Make sure you are using 'records' from the response
            } else {
              setError(response.data.message || "Failed to fetch records.");
          }
        } catch (error) {
            console.error("Error fetching attendance records:", error);
            setError(error.response?.data?.message || "Failed to fetch records.");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!filterMonth || !filterYear) {
            setError("Please select both month and year.");
            return;
        }
        fetchAttendanceRecords();
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">View Attendance Records</h2>

            <div className="space-y-4 mb-6">
                <div>
                    <h3 className="text-xl">Employee ID: {employeeId}</h3>
                </div>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Month (MM)"
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                        className="w-1/2 px-4 py-2 border rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Year (YYYY)"
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                        className="w-1/2 px-4 py-2 border rounded-md"
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="w-full py-3 bg-sky-900 text-white font-semibold rounded-md hover:bg-sky-700 transition"
                >
                    Search
                </button>
            </div>

            {loading && <div className="text-center">Loading...</div>}
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            {!loading && !error && attendanceRecords.length > 0 && (
                <div className="overflow-auto">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendanceRecords.map((record) => (
                                <tr key={record._id}>
                                    <td className="border px-4 py-2">{new Date(record.date).toLocaleDateString()}</td>
                                    <td className="border px-4 py-2">{record.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            {!loading && !error && attendanceRecords.length === 0 && (
                <div className="text-center">No attendance records found for this employee.</div>
            )}
        </div>
    );
};

export default ViewAttendance;
