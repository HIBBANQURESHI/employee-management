import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EmployeeTotalAttendance = ({ employeeId }) => {
  const [total, setTotal] = useState({ present: 0, absent: 0, sick: 0, leave: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    const fetchEmployeeTotal = async () => {
      try {
        // Validate employeeId before making the request
        if (!employeeId || typeof employeeId !== 'string') {
          setError('Invalid employee ID');
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://ems-backend-mu.vercel.app/api/attendance/employee-total/${employeeId}`,
          {
            headers: { 
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json"
            },
            signal: controller.signal,
            timeout: 10000
          }
        );

        if (response.data?.success) {
          setTotal({
            present: response.data.totals?.present || 0,
            absent: response.data.totals?.absent || 0,
            sick: response.data.totals?.sick || 0,
            leave: response.data.totals?.leave || 0
          });
          setError(null);
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          setError(error.response?.data?.error || "Failed to load attendance totals");
          console.error("Employee totals error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeTotal();
    return () => controller.abort();
  }, [employeeId]);

  if (!employeeId) {
    return (
      <div className="text-sm text-red-400 p-2 text-center">
        Missing employee ID
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-400 p-2 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-sm">
      {loading ? (
        <div className="col-span-4 text-center text-gray-400">Loading...</div>
      ) : (
        ["present", "absent", "sick", "leave"].map((key) => (
          <div
            key={key}
            className={`p-2 rounded text-center ${
              key === "present" ? "bg-teal-700" :
              key === "absent" ? "bg-red-700" :
              key === "sick" ? "bg-yellow-700" : "bg-blue-700"
            }`}
          >
            {key.charAt(0).toUpperCase()}: {total[key]}
          </div>
        ))
      )}
    </div>
  );
};

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState("");
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
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchReport(controller);
    return () => controller.abort();
  }, [skip, dateFilter, limit]);

  useEffect(() => {
    const controller = new AbortController();
    fetchMonthlySummary(controller);
    return () => controller.abort();
  }, [monthFilter, yearFilter]);

  const fetchReport = async (controller) => {
    try {
      setLoading(true);
      setApiError(null);
      const query = new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString()
      });
      
      if (dateFilter) query.append("date", dateFilter);

      const response = await axios.get(
        `https://ems-backend-mu.vercel.app/api/attendance/report?${query.toString()}`,
        { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
          signal: controller.signal,
          timeout: 15000
        }
      );

      if (response.data?.success) {
        // Filter out invalid records and add fallbacks
        const filteredData = Object.entries(response.data.groupData || {}).reduce((acc, [date, records]) => {
          acc[date] = records.filter(record => 
            record?.employeeId && 
            typeof record.employeeId === 'string' &&
            record.employeeName
          ).map(record => ({
            employeeId: record.employeeId || 'N/A',
            employeeName: record.employeeName || 'Unknown',
            status: record.status || 'Not marked'
          }));
          return acc;
        }, {});
        
        setReport(filteredData);
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        setApiError(
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to load attendance report. Please try again later."
        );
        console.error("Report fetch error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchMonthlySummary = async (controller) => {
    try {
      const response = await axios.get(
        `https://ems-backend-mu.vercel.app/api/attendance/monthly-summary?month=${monthFilter}&year=${yearFilter}`,
        { 
          headers: { 
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          },
          signal: controller.signal,
          timeout: 15000
        }
      );

      if (response.data?.success) {
        setSummary({
          present: response.data.summary?.present || 0,
          absent: response.data.summary?.absent || 0,
          sick: response.data.summary?.sick || 0,
          leave: response.data.summary?.leave || 0,
          notMarked: response.data.summary?.notMarked || response.data.summary?.not_marked || 0
        });
      }
    } catch (error) {
      if (!axios.isCancel(error)) {
        console.error("Monthly summary error:", error);
        alert(
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to load monthly summary"
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">Attendance Dashboard</h2>

        {apiError && (
          <div className="bg-red-800 text-white p-4 rounded-lg mb-6 text-center">
            {apiError}
          </div>
        )}

        {/* Monthly Summary Section */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8 shadow-xl">
          {/* ... (monthly summary section remains same as before) */}
        </div>

        {/* Daily Report Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Daily Records</h3>
            <input
              type="date"
              className="px-4 py-2 bg-gray-700 border rounded-lg"
              onChange={(e) => {
                setDateFilter(e.target.value);
                setSkip(0);
                setReport({});
              }}
            />
          </div>

          {loading ? (
            <div className="text-center py-8">Loading attendance data...</div>
          ) : Object.keys(report).length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {dateFilter ? `No records found for ${dateFilter}` : "No records found"}
            </div>
          ) : (
            Object.entries(report).map(([date, record]) => (
              <div key={date} className="mb-8">
                <h2 className="text-xl font-semibold mb-4">{date}</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-700">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Employee ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Total Attendance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.map((data, i) => (
                        <tr 
                          key={`${date}-${data.employeeId}-${i}`} 
                          className="border-b border-gray-700 hover:bg-gray-750"
                        >
                          <td className="p-3">{i + 1 + skip}</td>
                          <td className="p-3">{data.employeeId}</td>
                          <td className="p-3">{data.employeeName}</td>
                          <td className="p-3 capitalize">{data.status}</td>
                          <td className="p-3">
                            {data.employeeId && data.employeeId !== 'N/A' ? (
                              <EmployeeTotalAttendance employeeId={data.employeeId} />
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AttendanceReport;