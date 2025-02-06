import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [summary, setSummary] = useState([]);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();
  const [loading, setLoading] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
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
        setSummary(response.data.attendanceCount); // Store the summary data
      }
    } catch (error) {
      alert(error.message);
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
        
        {/* Date Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-gray-900 p-4 rounded-lg">
          <div>
            <h2 className="text-lg font-medium mb-2">Filter by Date</h2>
            <input
              type="date"
              className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
              onChange={(e) => {
                setDateFilter(e.target.value);
                setSkip(0);
              }}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center mt-6">Loading...</div>
        ) : (
          <>
            {/* Attendance Records */}
            {Object.entries(report).map(([date, record]) => (
              <div className="mt-6 bg-gray-900 p-4 rounded-lg" key={date}>
                <h2 className="text-xl font-semibold mb-3">{date}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="p-2 border border-gray-600">S No</th>
                        <th className="p-2 border border-gray-600">Employee ID</th>
                        <th className="p-2 border border-gray-600">Name</th>
                        <th className="p-2 border border-gray-600">Department</th>
                        <th className="p-2 border border-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.map((data, i) => (
                        <tr key={data.employeeId} className="odd:bg-gray-700 even:bg-gray-700">
                          <td className="p-2 border border-gray-600">{i + 1}</td>
                          <td className="p-2 border border-gray-600">{data.employeeId}</td>
                          <td className="p-2 border border-gray-600">{data.employeeName}</td>
                          <td className="p-2 border border-gray-600">{data.departmentName}</td>
                          <td className="p-2 border border-gray-600">{data.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}

            {/* Monthly Attendance Summary Table */}
            {summary.length > 0 && (
              <div className="mt-10 bg-gray-900 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Monthly Attendance Summary</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-gray-700">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="p-2 border border-gray-600">Employee ID</th>
                        <th className="p-2 border border-gray-600">Name</th>
                        <th className="p-2 border border-gray-600">Total Present</th>
                        <th className="p-2 border border-gray-600">Total Absent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summary.map((data) => (
                        <tr key={data.employeeId} className="odd:bg-gray-700 even:bg-gray-700">
                          <td className="p-2 border border-gray-600">{data.employeeId}</td>
                          <td className="p-2 border border-gray-600">{data.employeeName}</td>
                          <td className="p-2 border border-gray-600">{data.totalPresent}</td>
                          <td className="p-2 border border-gray-600">{data.totalAbsent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* Load More Button */}
        <div className="text-center mt-6">
          <button
            className="px-6 py-2 bg-teal-600 hover:bg-teal-700 transition duration-200 rounded-lg shadow-lg"
            onClick={handleLoadMore}
          >
            Load More
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AttendanceReport;
