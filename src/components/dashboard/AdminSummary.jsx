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
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get("https://ems-backend-mu.vercel.app/api/dashboard/summary", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        setSummary(response.data);
      } catch (error) {
        if (error.response) alert(error.response.data.error);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-500 border-solid">  </div>
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
          number={summary.totalEmployees}
          color="bg-teal-600"
        />
        <SummaryCard
          icon={<Building2 size={24} />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-yellow-600"
        />
        <SummaryCard
          icon={<DollarSign size={24} />}
          text="Monthly Salary"
          number={`$${summary.totalSalary}`}
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
            number={summary.leaveSummary.appliedFor}
            color="bg-teal-600"
          />
          <SummaryCard
            icon={<CheckCircle size={24} />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-green-600"
          />
          <SummaryCard
            icon={<Hourglass size={24} />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-yellow-600"
          />
          <SummaryCard
            icon={<XCircle size={24} />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
