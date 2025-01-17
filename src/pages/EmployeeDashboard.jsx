import React from "react";
import Sidebar from "../components/EmployeeDashboard/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";

const EmployeeDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar className="fixed top-0 left-0 w-64 h-screen bg-indigo-700 text-white shadow-lg z-20" />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <Navbar className="fixed top-0 left-64 right-0 bg-white shadow-md z-10 px-6 py-4" />

        {/* Content Area */}
        <div className="pt-20 px-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
