import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import moment from 'moment';

const AttendanceReport = () => {
    const [report, setReport] = useState({});
    const [limit, setLimit] = useState(5);
    const [skip, setSkip] = useState(0);
    const [dateFilter, setDateFilter] = useState(moment().format('YYYY-MM-DD')); // Initialize with current date
    const [loading, setLoading] = useState(false);
    const [totals, setTotals] = useState({});
    const [error, setError] = useState(null); // State for error messages


    const fetchReport = async () => {
        try {
            setLoading(true);
            setError(null); // Clear any previous errors

            const query = new URLSearchParams({ limit, skip });
            if (dateFilter) {
                query.append("date", dateFilter);
            }

            const response = await axios.get(
                `https://ems-backend-mu.vercel.app/api/attendance/report?${query.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.data.success) {
                setReport((prevData) => (skip === 0 ? response.data.groupData : { ...prevData, ...response.data.groupData }));
                setTotals(response.data.totals);
            } else {
                setError(response.data.message || "Failed to fetch report."); // Set error message
            }

        } catch (error) {
            console.error("Error fetching report:", error); // Log detailed error
            setError("An error occurred. Please try again later."); // Generic user-friendly message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReport();
    }, [skip, dateFilter]);

    const handleLoadMore = () => {
        setSkip((prevSkip) => prevSkip + limit);
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6 text-white">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <h2 className="text-center text-3xl font-semibold mb-6">Attendance Report</h2>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-900 p-4 rounded-lg">
                    <div>
                        <h2 className="text-lg font-medium mb-2">Filter by Date</h2>
                        <input
                            type="date"
                            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                            value={dateFilter} // Bind value for controlled component
                            onChange={(e) => {
                                setDateFilter(moment(e.target.value).format('YYYY-MM-DD'));
                                setSkip(0);
                            }}
                        />
                    </div>
                </div>

                {error && <div className="text-red-500 mt-4">{error}</div>} {/* Display error message */}

                {loading ? (
                    <div className="text-center mt-6">Loading...</div>
                ) : (
                    <>
                        <div className="mt-6 bg-gray-900 p-4 rounded-lg">
                            <h2 className="text-xl font-semibold mb-3">Monthly Summary</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>Present: {totals.Present || 0}</div>
                                <div>Absent: {totals.Absent || 0}</div>
                                <div>Sick: {totals.Sick || 0}</div>
                                <div>Leave: {totals.Leave || 0}</div>
                            </div>
                        </div>

                        {Object.entries(report).map(([date, record]) => (
                            <div className="mt-6 bg-gray-900 p-4 rounded-lg" key={date}>
                                <h2 className="text-xl font-semibold mb-3">{date}</h2>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse border border-gray-700">
                                        {/* ... (table header) */}
                                        <tbody>
                                            {record.map((data, i) => (
                                                <tr key={data.employeeId} className="odd:bg-gray-700 even:bg-gray-700">
                                                    {/* ... (table cells) */}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}

                        {Object.keys(report).length > 0 && ( // Conditionally render "Load More"
                            <div className="text-center mt-6">
                                <button
                                    className="px-6 py-2 bg-teal-600 hover:bg-teal-700 transition duration-200 rounded-lg shadow-lg"
                                    onClick={handleLoadMore}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </motion.div>
        </div>
    );
};

export default AttendanceReport;