import React from 'react';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex items-center justify-between h-16 bg-white px-6 shadow-xl">
      <p className="text-2xl font-extrabold text-sky-300">Welcome {user.name} !</p>
      <button
        className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white rounded-md transition-all duration-200 ease-in-out"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
