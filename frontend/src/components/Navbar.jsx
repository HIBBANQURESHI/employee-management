import React from 'react';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <div className="font-normal text-lg flex items-center justify-between h-16 bg-gray-200 px-8 text-gray-800 shadow-sm">
      <p className="ml-4">
        Hi, <span className="font-semibold text-blue-500">{user.name}</span>!
      </p>
      <button
      className="px-4 py-1 bg-red-500 text-white rounded-md font-medium hover:bg-blue-400 transition"
      onClick={() => window.location.href = '/login'}
      >
        Logout
      </button>

    </div>
  );
};

export default Navbar;
