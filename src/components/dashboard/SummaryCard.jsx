import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
<div className="bg-white bg-opacity-30 backdrop-blur-xl rounded-lg flex shadow-md hover:scale-105 transform transition-all duration-300 ease-in-out">
<div
        className={`text-4xl flex justify-center items-center ${color} text-white p-6 rounded-l-lg`}
      >
        {icon}
      </div>
      <div className="pl-6 pr-6 py-4">
        <p className="text-xl text-black">{text}</p>
        <p className="text-xl font-semibold text-black">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
