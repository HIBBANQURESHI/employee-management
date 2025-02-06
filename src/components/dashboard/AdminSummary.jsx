import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { Users, Building2, DollarSign } from "lucide-react";
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }

        const [summaryResponse, attendanceResponse] = await Promise.all([
          axios.get("https://ems-backend-mu.vercel.app/api/dashboard/summary", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://ems-backend-mu.vercel.app/api/attendance/report", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log("Summary Data:", summaryResponse.data);
        console.log("Attendance Data:", attendanceResponse.data);

        setSummary(summaryResponse.data);

        // Extract the latest date dynamically
        const dateKeys = Object.keys(attendanceResponse.data);
        if (dateKeys.length > 0) {
          const latestDate = dateKeys[dateKeys.length - 1];
          const rawAttendance = attendanceResponse.data[latestDate];

          // Group data by employee ID and calculate attendance
          const groupedAttendance = rawAttendance.reduce((acc, record) => {
            if (!acc[record.employeeId]) {
              acc[record.employeeId] = {
                employeeId: record.employeeId,
                employeeName: record.employeeName,
                totalPresent: 0,
                totalAbsent: 0,
              };
            }
            if (record.status === "present") {
              acc[record.employeeId].totalPresent += 1;
            } else {
              acc[record.employeeId].totalAbsent += 1;
            }
            return acc;
          }, {});

          setAttendance(Object.values(groupedAttendance)); // Convert object to array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          alert(error.response.data.error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h3 className="text-3xl font-bold text-center md:text-left">Dashboard Overview</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 text-black">
        <SummaryCard icon={<Users size={24} />} text="Total Employees" number={summary?.totalEmployees || 0} color="bg-teal-600" />
        <SummaryCard icon={<Building2 size={24} />} text="Total Departments" number={summary?.totalDepartments || 0} color="bg-yellow-600" />
        <SummaryCard icon={<DollarSign size={24} />} text="Monthly Salary" number={`$${summary?.totalSalary || 0}`} color="bg-orange-600" />
      </div>

      {/* Attendance Summary Section */}
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Employee Attendance</h4>
        <div className="overflow-x-auto mt-6">
          <table className="w-full text-white border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                <th className="p-3 border border-gray-700">Employee ID</th>
                <th className="p-3 border border-gray-700">Employee Name</th>
                <th className="p-3 border border-gray-700">Total Present</th>
                <th className="p-3 border border-gray-700">Total Absent</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((record, index) => (
                  <tr key={index} className="bg-gray-900">
                    <td className="p-3 border border-gray-700">{record.employeeId}</td>
                    <td className="p-3 border border-gray-700">{record.employeeName}</td>
                    <td className="p-3 border border-gray-700 text-green-400">{record.totalPresent}</td>
                    <td className="p-3 border border-gray-700 text-red-400">{record.totalAbsent}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-3 border border-gray-700">
                    No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
