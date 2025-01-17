import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendarAlt,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { useAuth } from "../../context/authContext";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 w-64 space-y-4 shadow-lg">
      <div className="bg-teal-600 h-16 flex items-center justify-center shadow-md">
        <h3 className="text-2xl text-white font-semibold">Employee MS</h3>
      </div>
      <div className="mt-8 px-4 space-y-2">
        <NavLink
          to="/employee-dashboard"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500 text-white" : "text-gray-300 hover:bg-teal-700"
            } flex items-center space-x-4 py-2.5 px-4 rounded-lg hover:text-white transition-all duration-200`
          }
          end
        >
          <FaTachometerAlt className="text-xl" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/profile/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500 text-white" : "text-gray-300 hover:bg-teal-700"
            } flex items-center space-x-4 py-2.5 px-4 rounded-lg hover:text-white transition-all duration-200`
          }
        >
          <FaUsers className="text-xl" />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/leaves/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500 text-white" : "text-gray-300 hover:bg-teal-700"
            } flex items-center space-x-4 py-2.5 px-4 rounded-lg hover:text-white transition-all duration-200`
          }
        >
          <FaBuilding className="text-xl" />
          <span>Leaves</span>
        </NavLink>
        <NavLink
          to={`/employee-dashboard/salary/${user._id}`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500 text-white" : "text-gray-300 hover:bg-teal-700"
            } flex items-center space-x-4 py-2.5 px-4 rounded-lg hover:text-white transition-all duration-200`
          }
        >
          <FaCalendarAlt className="text-xl" />
          <span>Salary</span>
        </NavLink>
        <NavLink
          to="/employee-dashboard/setting"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500 text-white" : "text-gray-300 hover:bg-teal-700"
            } flex items-center space-x-4 py-2.5 px-4 rounded-lg hover:text-white transition-all duration-200`
          }
        >
          <FaCogs className="text-xl" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
