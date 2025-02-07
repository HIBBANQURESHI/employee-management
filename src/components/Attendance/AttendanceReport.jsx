import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState();
  const [loading, setLoading] = useState(false);
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth() + 1);
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [summary, setSummary] = useState({
    present: 0,
    absent: 0,
    sick: 0,
    leave: 0,
    notMarked: 0
  });

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) query.append("date", dateFilter);
      
      const response = await axios.get(
        `https://ems-backend-mu.vercel.app/api/attendance/report?${query.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setReport(prev => skip === 0 ? response.data.groupData : { ...prev, ...response.data.groupData });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlySummary = async () => {
    try {
      const response = await axios.get(
        `https://ems-backend-mu.vercel.app/api/attendance/monthly-summary?month=${monthFilter}&year=${yearFilter}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSummary(response.data.summary);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [skip, dateFilter]);

  useEffect(() => {
    fetchMonthlySummary();
  }, [monthFilter, yearFilter]);

  const handleLoadMore = () => setSkip(prev => prev + limit);

  const renderSummaryCards = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6"
    >
      {Object.entries(summary).map(([status, count]) => (
        <div 
          key={status}
          className={`p-4 rounded-lg ${
            status === 'present' ? 'bg-teal-800' :
            status === 'absent' ? 'bg-red-800' :
            status === 'sick' ? 'bg-yellow-800' :
            status === 'leave' ? 'bg-blue-800' : 'bg-gray-800'
          }`}
        >
          <h3 className="text-sm capitalize">{status.replace(/([A-Z])/g, ' $1').trim()}</h3>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      ))}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-center text-3xl font-semibold mb-6">Attendance Report</h2>

        {/* Monthly Summary Section */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Monthly Summary</h3>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <select
              className="px-4 py-2 bg-gray-700 rounded-lg"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i+1} value={i+1}>
                  {new Date(0, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
            <input
              type="number"
              className="px-4 py-2 bg-gray-700 rounded-lg w-32"
              value={yearFilter}
              onChange={(e) => setYearFilter(Math.max(2000, Math.min(2100, e.target.value)))}
              min="2000"
              max="2100"
            />
          </div>
          {renderSummaryCards()}
        </div>

        {/* Daily Report Section */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div>
              <h2 className="text-lg font-medium mb-2">Filter by Date</h2>
              <input
                type="date"
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-white"
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setSkip(0);
                  setReport({});
                }}
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center mt-6">Loading...</div>
          ) : (
            Object.entries(report).map(([date, record]) => (
              <div className="mt-6" key={date}>
                <h2 className="text-xl font-semibold mb-3">{date}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse border border-gray-700">
                    <thead className="bg-gray-700">
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
                        <tr key={data.employeeId} className="odd:bg-gray-900 even:bg-gray-800">
                          <td className="p-2 border border-gray-600">{i + 1}</td>
                          <td className="p-2 border border-gray-600">{data.employeeId}</td>
                          <td className="p-2 border border-gray-600">{data.employeeName}</td>
                          <td className="p-2 border border-gray-600">{data.departmentName}</td>
                          <td className="p-2 border border-gray-600 capitalize">{data.status.toLowerCase()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}

          <div className="text-center mt-6">
            <button
              className="px-6 py-2 bg-teal-600 hover:bg-teal-700 transition duration-200 rounded-lg shadow-lg disabled:opacity-50"
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AttendanceReport;