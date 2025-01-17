import React from 'react';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between h-16 bg-teal-900 px-6 shadow-md">
      <p className="text-lg font-semibold text-white">Welcome, {user.name}</p>
      <button
        className="px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-md transition-all duration-200 ease-in-out"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
