import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";
import {
  AiOutlineUsergroupAdd,
  AiOutlineApartment,
  AiOutlineDollarCircle,
  AiOutlineFileText,
  AiOutlineCheckCircle,
  AiOutlineHourglass,
  AiOutlineCloseCircle,
} from "react-icons/ai"; // Updated icons for a cleaner look
import axios from "axios";

const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summary = await axios.get("http://localhost:5000/api/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(summary.data);
        setSummary(summary.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error);
        }
        console.log(error.message);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="text-black text-center mt-6">Loading...</div>;
  }

  return (
    <div className="p-6 h-screen bg-white">
      <h3 className="text-3xl font-bold text-black">Dashboard Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <SummaryCard
          icon={<AiOutlineUsergroupAdd />}
          text="Total Employees"
          number={summary.totalEmployees}
          color="bg-gradient-to-r from-blue-500 to-black"
        />
        <SummaryCard
          icon={<AiOutlineApartment />}
          text="Total Departments"
          number={summary.totalDepartments}
          color="bg-gradient-to-r from-yellow-500 to-black"
        />
        <SummaryCard
          icon={<AiOutlineDollarCircle />}
          text="Monthly Salary"
          number={`${summary.totalSalary}`}
          color="bg-gradient-to-r from-orange-500 to-black"
        />
      </div>

      <div className="mt-32">
        <h4 className="text-left text-3xl font-bold text-teal-black">Leave Details</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard
            icon={<AiOutlineFileText />}
            text="Leave Applied"
            number={summary.leaveSummary.appliedFor}
            color="bg-gradient-to-r from-teal-500 to-black"
          />
          <SummaryCard
            icon={<AiOutlineCheckCircle />}
            text="Leave Approved"
            number={summary.leaveSummary.approved}
            color="bg-gradient-to-r from-green-500 to-black"
          />
          <SummaryCard
            icon={<AiOutlineHourglass />}
            text="Leave Pending"
            number={summary.leaveSummary.pending}
            color="bg-gradient-to-r from-violet-500 to-black"
          />
          <SummaryCard
            icon={<AiOutlineCloseCircle />}
            text="Leave Rejected"
            number={summary.leaveSummary.rejected}
            color="bg-gradient-to-r from-red-500 to-black"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
