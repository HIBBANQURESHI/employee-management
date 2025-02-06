import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import { 
  Users, 
  Building2, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Hourglass, 
  XCircle 
} from "lucide-react";
import axios from 'axios';

const AdminSummary = () => {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [dashboardRes, attendanceRes] = await Promise.all([
          axios.get("https://ems-backend-mu.vercel.app/api/dashboard/summary", { headers }),
          axios.get(`https://ems-backend-mu.vercel.app/api/attendance/monthly-summary?month=${currentMonth}&year=${currentYear}`, { headers })
        ]);

        setSummary({
          ...dashboardRes.data,
          attendanceSummary: attendanceRes.data.success ? attendanceRes.data.data : [],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) alert(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      {/* Dashboard Heading */}
      <h3 className="text-3xl font-bold text-center md:text-left">Dashboard Overview</h3>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-8 text-black">
        <SummaryCard
          icon={<Users size={24} />}
          text="Total Employees"
          number={summary.totalEmployees || 0}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<Building2 size={24} />}
          text="Total Departments"
          number={summary.totalDepartments || 0}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<DollarSign size={24} />}
          text="Monthly Salary"
          number={`$${summary.totalSalary || 0}`}
          color="bg-orange-600"
        />
      </div>

      {/* Leave Details Section */}
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Leave Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-6 text-black">
          <SummaryCard
            icon={<FileText size={24} />}
            text="Leave Applied"
            number={summary.leaveSummary?.appliedFor || 0}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<CheckCircle size={24} />}
            text="Leave Approved"
            number={summary.leaveSummary?.approved || 0}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<Hourglass size={24} />}
            text="Leave Pending"
            number={summary.leaveSummary?.pending || 0}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<XCircle size={24} />}
            text="Leave Rejected"
            number={summary.leaveSummary?.rejected || 0}
            color="bg-red-600"
          />
        </div>
      </div>

      {/* Attendance Summary Section */}
      <div className="mt-12">
        <h4 className="text-center text-2xl font-bold">Attendance Summary</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6 text-black">
          {summary.attendanceSummary && summary.attendanceSummary.length > 0 ? (
            summary.attendanceSummary.map((emp, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg text-white">
                <h5 className="text-xl font-bold">{emp.name}</h5>
                <p className="text-gray-400">{emp.department}</p>
                <p className="mt-2 text-green-400">Present: {emp.presents}</p>
                <p className="text-red-400">Absent: {emp.absents}</p>
                <p className="text-yellow-400">Sick: {emp.sick}</p>
                <p className="text-blue-400">Leave: {emp.leave}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">No attendance data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
