import React from "react";
import { useAuth } from "../context/authContext";
import AdminSidebar from "../components/dashboard/AdminSidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar className="fixed top-0 left-0 w-64 h-screen bg-teal-700 text-white shadow-lg z-20" />

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

export default AdminDashboard;
