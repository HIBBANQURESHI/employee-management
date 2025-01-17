import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/authContext';

const SummaryCard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg flex items-center p-4 space-x-4">
        {/* Icon Section */}
        <div className="bg-teal-600 text-white rounded-full p-4 flex justify-center items-center">
          <FaUser className="text-3xl" />
        </div>

        {/* Text Section */}
        <div>
          <p className="text-lg text-gray-600 font-medium">Welcome Back</p>
          <p className="text-xl font-semibold text-teal-600">{user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
