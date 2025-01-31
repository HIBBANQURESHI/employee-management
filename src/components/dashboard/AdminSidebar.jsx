import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  DollarSign,
  CalendarCheck,
  FileText,
  Settings,
} from "lucide-react";

const menuItems = [
  { to: "/admin-dashboard", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { to: "/admin-dashboard/employees", icon: <Users size={20} />, label: "Employees" },
  { to: "/admin-dashboard/departments", icon: <Building2 size={20} />, label: "Departments" },
  { to: "/admin-dashboard/leaves", icon: <CalendarDays size={20} />, label: "Leave" },
  { to: "/admin-dashboard/salary/add", icon: <DollarSign size={20} />, label: "Salary" },
  { to: "/admin-dashboard/attendance", icon: <CalendarCheck size={20} />, label: "Attendance" },
  { to: "/admin-dashboard/attendance-report", icon: <FileText size={20} />, label: "Attendance Report" },
  { to: "/admin-dashboard/setting", icon: <Settings size={20} />, label: "Settings" },
];

const AdminSidebar = () => {
  const location = useLocation(); // Get current path

  return (
    <div className="bg-gray-900 text-white h-screen fixed left-0 top-0 bottom-0 w-64 p-4 flex flex-col border-r border-gray-800 shadow-lg">
      {/* Sidebar Header */}
      <div className="h-14 flex items-center justify-center rounded-lg bg-gray-800 shadow-md">
        <h3 className="text-2xl font-semibold">AKC Link Tech</h3>
      </div>

      {/* Navigation */}
      <nav className="mt-4 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map(({ to, icon, label }) => {
          const isActive = location.pathname === to; // Ensure proper active state
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center space-x-4 py-3 px-4 rounded-lg transition duration-300 ${
                isActive ? "bg-teal-600 text-white" : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              {icon}
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
