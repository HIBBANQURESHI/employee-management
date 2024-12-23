import React from 'react';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

const AdminSummary = () => {
  return (
    <div className="p-6 flex flex-col items-center bg-gray-50 min-h-screen text-gray-700">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard Overview</h3>
      <div className="flex flex-wrap justify-center gap-10 py-8">
        <SummaryCard
          icon={<FaUsers className="text-blue-500" />}
          text="Total Employees"
          number={6}
          color="bg-white"
        />
        <SummaryCard
          icon={<FaBuilding className="text-green-500" />}
          text="Total Departments"
          number={2}
          color="bg-white"
        />
        <SummaryCard
          icon={<FaMoneyBillWave className="text-yellow-500" />}
          text="Monthly Salary"
          number="$654"
          color="bg-white"
        />
      </div>
    </div>
  );
};

export default AdminSummary;
