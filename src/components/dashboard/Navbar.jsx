import React from "react";
import { useAuth } from "../../context/authContext";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between h-14 bg-gray-900 px-6 text-white shadow-md">
      {/* Welcome Message */}
      <p className="text-lg font-medium">
        Welcome, <span className="font-semibold">{user.name}</span>
      </p>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 transition-all duration-300 rounded-lg text-sm font-medium"
      >
        <LogOut size={18} />
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
