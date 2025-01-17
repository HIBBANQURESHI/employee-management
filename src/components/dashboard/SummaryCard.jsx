import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="bg-gray-800 rounded-lg flex shadow-md hover:scale-105 transform transition-all duration-300 ease-in-out">
      <div
        className={`text-4xl flex justify-center items-center ${color} text-white p-6 rounded-l-lg`}
      >
        {icon}
      </div>
      <div className="pl-6 pr-6 py-4">
        <p className="text-lg text-gray-300">{text}</p>
        <p className="text-xl font-semibold text-white">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
