import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineDashboard,
  AiOutlineUsergroupAdd,
  AiOutlineApartment,
  AiOutlineCalendar,
  AiOutlineDollarCircle,
  AiOutlineSetting,
} from "react-icons/ai";  // Changed icons to AI set

const AdminSidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-xl">
      <div className="bg-teal-800 h-16 flex items-center justify-center shadow-md">
        <h3 className="text-3xl font-semibold tracking-wide text-white">Employee MS</h3>
      </div>
      <div className="px-4 py-6 space-y-4">
        {/* Dashboard */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-teal-600 text-white shadow-xl"
                : "text-gray-300 hover:bg-teal-600 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
          end
        >
          <AiOutlineDashboard className="text-lg" />
          <span className="text-lg font-medium">Dashboard</span>
        </NavLink>
        
        {/* Employee */}
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-teal-600 text-white shadow-xl"
                : "text-gray-300 hover:bg-teal-600 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
        >
          <AiOutlineUsergroupAdd className="text-lg" />
          <span className="text-lg font-medium">Employee</span>
        </NavLink>

        {/* Department */}
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-teal-600 text-white shadow-xl"
                : "text-gray-300 hover:bg-teal-600 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
        >
          <AiOutlineApartment className="text-lg" />
          <span className="text-lg font-medium">Department</span>
        </NavLink>

        {/* Leave */}
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-teal-600 text-white shadow-xl"
                : "text-gray-300 hover:bg-teal-600 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
        >
          <AiOutlineCalendar className="text-lg" />
          <span className="text-lg font-medium">Leave</span>
        </NavLink>

        {/* Salary */}
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-teal-600 text-white shadow-xl"
                : "text-gray-300 hover:bg-teal-600 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
        >
          <AiOutlineDollarCircle className="text-lg" />
          <span className="text-lg font-medium">Salary</span>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/admin-dashboard/setting"
          className="flex items-center space-x-4 py-2 px-4 rounded-md text-gray-300 hover:bg-teal-600 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          <AiOutlineSetting className="text-lg" />
          <span className="text-lg font-medium">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
