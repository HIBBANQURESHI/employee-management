import React from "react";

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className="flex items-center bg-gray-800 text-white rounded-lg shadow-lg p-4 transition-all duration-300 hover:shadow-xl">
      {/* Icon Section */}
      <div className={`text-3xl p-3 rounded-lg ${color} text-white flex items-center justify-center`}>
        {icon}
      </div>

      {/* Text & Number Section */}
      <div className="ml-4">
        <p className="text-lg font-medium text-gray-300">{text}</p>
        <p className="text-2xl font-bold">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
