import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const EmployeeTotalAttendance = ({ employeeId }) => {
  const [total, setTotal] = useState({ present: 0, absent: 0, sick: 0, leave: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeTotal = async () => {
      try {
        const response = await axios.get(
          `https://ems-backend-mu.vercel.app/api/attendance/employee-total/${employeeId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        if (response.data.success) {
          setTotal(response.data.totals);
        }
      } catch (error) {
        console.error("Error fetching employee totals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeTotal();
  }, [employeeId]);

  return (
    <div className="grid grid-cols-4 gap-2 text-sm">
      {loading ? (
        <div className="col-span-4 text-center text-gray-400">Loading...</div>
      ) : (
        <>
          {["present", "absent", "sick", "leave"].map((key, index) => (
            <div
              key={index}
              className={`p-2 rounded text-center ${
                key === "present" ? "bg-teal-700" :
                key === "absent" ? "bg-red-700" :
                key === "sick" ? "bg-yellow-700" : "bg-blue-700"
              }`}
            >
              {key.charAt(0).toUpperCase()}: {total[key]}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit, setLimit] = useState(5);
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

  useEffect(() => { fetchReport(); }, [skip, dateFilter]);
  useEffect(() => { fetchMonthlySummary(); }, [monthFilter, yearFilter]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) query.append("date", dateFilter);

      const response = await axios.get(
        `https://ems-backend-mu.vercel.app/api/attendance/report?${query.toString()}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        setReport((prev) => ({ ...prev, ...response.data.groupData }));
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
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        setSummary(response.data.summary);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">Attendance Dashboard</h2>

        {/* Monthly Summary Section */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h3 className="text-2xl font-semibold">Monthly Overview</h3>
            <div className="flex gap-4">
              <select
                className="px-4 py-2 bg-gray-700 rounded-lg"
                value={monthFilter}
                onChange={(e) => setMonthFilter(Number(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
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
          </div>

          {/* Summary Cards */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(summary).map(([status, count]) => (
              <div
                key={status}
                className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                  status === 'present' ? 'bg-teal-800' :
                  status === 'absent' ? 'bg-red-800' :
                  status === 'sick' ? 'bg-yellow-800' :
                  status === 'leave' ? 'bg-blue-800' : 'bg-gray-800'
                }`}
              >
                <h3 className="text-sm font-medium capitalize mb-2">{status}</h3>
                <p className="text-2xl font-bold">{count}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Daily Report Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Daily Records</h3>
            <input
              type="date"
              className="px-4 py-2 bg-gray-700 border rounded-lg"
              onChange={(e) => { setDateFilter(e.target.value); setSkip(0); setReport({}); }}
            />
          </div>

          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : Object.keys(report).length === 0 ? (
            <div className="text-center py-8 text-gray-400">No records found</div>
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
                        <tr key={data.employeeId} className="border-b border-gray-700 hover:bg-gray-750">
                          <td className="p-3">{i + 1}</td>
                          <td className="p-3">{data.employeeId}</td>
                          <td className="p-3">{data.employeeName}</td>
                          <td className="p-3">{data.status}</td>
                          <td className="p-3"><EmployeeTotalAttendance employeeId={data.employeeId} /></td>
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
