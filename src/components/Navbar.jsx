import React from 'react';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="font-normal text-lg flex items-center justify-between h-16 bg-gray-200 px-4 sm:px-8 text-gray-800 shadow-sm">
      {/* User greeting */}
      <p className="text-sm sm:text-base">
        Hi, <span className="font-semibold text-blue-500">{user.name}</span>!
      </p>

      {/* Logout button */}
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-blue-400 transition"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
