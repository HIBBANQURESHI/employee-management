import React from 'react';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiSuitcaseSimple } from "react-icons/pi";
import { RiBuilding2Line, RiCalendarCheckLine } from "react-icons/ri";
import { VscCoffee } from "react-icons/vsc";
import { MdAttachMoney } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-200 text-gray-800 h-screen fixed left-0 top-0 w-64 md:w-20 lg:w-64 transition-all duration-300">
      <div className="h-24 flex items-center justify-center">
        <h3 className="text-2xl font-orbit hidden lg:block">AKC LINK TECH</h3>
        <h3 className="text-xl font-orbit block lg:hidden">AKC</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/admin-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 text-white font-semibold" : "text-gray-800"
            } flex items-center space-x-4 block py-3 px-4 rounded text-base hover:bg-blue-100 hover:text-gray-800 transition-all duration-200`
          }
          end
        >
          <MdOutlineSpaceDashboard className="text-xl" />
          <span className="hidden lg:inline">Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/employees"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 text-white font-semibold" : "text-gray-800"
            } flex items-center space-x-4 block py-3 px-4 rounded text-base hover:bg-blue-100 hover:text-gray-800 transition-all duration-200`
          }
        >
          <PiSuitcaseSimple className="text-xl" />
          <span className="hidden lg:inline">Employees</span>
        </NavLink>

        <NavLink
          to="/admin-dashboard/departments"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 text-white font-semibold" : "text-gray-800"
            } flex items-center space-x-4 block py-3 px-4 rounded text-base hover:bg-blue-100 hover:text-gray-800 transition-all duration-200`
          }
        >
          <RiBuilding2Line className="text-xl" />
          <span className="hidden lg:inline">Departments</span>
        </NavLink>

        {/* Attendance Management Link */}
        <NavLink
          to="/admin-dashboard/attendance"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-500 text-white font-semibold" : "text-gray-800"
            } flex items-center space-x-4 block py-3 px-4 rounded text-base hover:bg-blue-100 hover:text-gray-800 transition-all duration-200`
          }
        >
          <RiCalendarCheckLine className="text-xl" />
          <span className="hidden lg:inline">Attendance</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
