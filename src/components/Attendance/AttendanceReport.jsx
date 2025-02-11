import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const EmployeeTotalAttendance = ({ employeeId }) => {
  const [total, setTotal] = useState({ present: 0, absent: 0, sick: 0, leave: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!employeeId || employeeId === "N/A") return setLoading(false);

    const fetchEmployeeTotal = async () => {
      try {
        const response = await axios.get(
          `https://ems-backend-mu.vercel.app/api/attendance/employee-total/${employeeId}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
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

  const statusColors = {
    present: "bg-teal-700",
    absent: "bg-red-700",
    sick: "bg-yellow-700",
    leave: "bg-blue-700"
  };

  return (
    <div className="grid grid-cols-4 gap-2 text-sm">
      {loading ? (
        <div className="col-span-4 text-center text-gray-400">Loading...</div>
      ) : (
        Object.keys(total).map((key) => (
          <div key={key} className={`p-2 rounded text-center ${statusColors[key]}`}>
            {key.charAt(0).toUpperCase() + key.slice(1)}: {total[key]}
          </div>
        ))
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
  const [summary, setSummary] = useState({ present: 0, absent: 0, sick: 0, leave: 0, notMarked: 0 });

  const fetchReport = useCallback(async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ limit, skip });
      if (dateFilter) query.append("date", dateFilter);
      const response = await axios.get(
        `https://ems-backend-mu.vercel.app/api/attendance/report?${query.toString()}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      if (response.data.success) {
        setReport(response.data.groupData);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }, [dateFilter, limit, skip]);

  useEffect(() => { fetchReport(); }, [fetchReport]);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl font-bold mb-8">Attendance Dashboard</h2>

        <div className="bg-gray-800 p-6 rounded-xl mb-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Daily Records</h3>
            <input type="date" className="px-4 py-2 bg-gray-700 border rounded-lg"
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
                          <td className="p-3">{data.employeeId?.employeeId || 'N/A'}</td>
                          <td className="p-3">{data.employeeName}</td>
                          <td className="p-3">{data.status}</td>
                          <td className="p-3"><EmployeeTotalAttendance employeeId={data.employeeId?.employeeId || 'N/A'} /></td>
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
