import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineUsergroupAdd,
  AiOutlineApartment,
  AiOutlineCalendar,
  AiOutlineDollarCircle,
  AiOutlineSetting,
} from "react-icons/ai";  // Changed icons to AI set
import { TbLayoutDashboard } from "react-icons/tb";
import { PiUserCheck } from "react-icons/pi";




const AdminSidebar = () => {
  return (
    <div className="bg-sky-300 text-white h-screen fixed left-0 top-0 bottom-0 w-64 shadow-xl">
      <div className="bg-sky-300 h-16 flex items-center justify-center ">
        <h3 className="text-2xl font-semibold tracking-wide text-white">AKC Link tech</h3>
      </div>
      <div className="px-4 py-6 space-y-4">
        {/* Dashboard */}
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-sky-600 text-white shadow-xl"
                : "text-black hover:bg-sky-500 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
          end
        >
          <TbLayoutDashboard className="text-xl" />
          <span className="text-xl font-medium">Dashboard</span>
        </NavLink>
        
        {/* Employee */}
        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-sky-600 text-white shadow-xl"
                : "text-black hover:bg-sky-500 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
        >
          <AiOutlineUsergroupAdd className="text-xl" />
          <span className="text-xl font-medium">Employee</span>
        </NavLink>

        {/* Department */}
        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-sky-600 text-white shadow-xl"
                : "text-black hover:bg-sky-500 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
        >
          <AiOutlineApartment className="text-xl" />
          <span className="text-xl font-medium">Department</span>
        </NavLink>

        {/* Leave */}
        <NavLink
          to="/admin-dashboard/leaves"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-sky-600 text-white shadow-xl"
                : "text-black hover:bg-sky-500 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
        >
          <AiOutlineCalendar className="text-xl" />
          <span className="text-xl font-medium">Leave</span>
        </NavLink>

        {/* Salary */}
        <NavLink
          to="/admin-dashboard/salary/add"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-sky-600 text-white shadow-xl"
                : "text-black hover:bg-sky-500 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
        >
          <AiOutlineDollarCircle className="text-xl" />
          <span className="text-xl font-medium">Salary</span>
        </NavLink>

        {/* Attendance */}
        <NavLink
          to="/admin-dashboard/attendance"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-sky-600 text-white shadow-xl"
                : "text-black hover:bg-sky-500 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
        >
          <PiUserCheck className="text-xl" />
          <span className="text-xl font-medium">Attendance</span>
        </NavLink>


        {/* Settings */}
        <NavLink
          to="/admin-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive
                ? "bg-sky-600 text-white shadow-xl"
                : "text-black hover:bg-sky-500 hover:text-white"
            } flex items-center space-x-4 py-2 px-4 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105`}
        >
          <AiOutlineSetting className="text-xl" />
          <span className="text-xl font-medium">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
