import React from 'react';

const SummaryCard = ({ icon, text, number, color }) => {
  return (
    <div className='rounded-lg bg-white shadow-md flex items-center p-4 w-full max-w-xs'>
      <div className={`text-3xl flex justify-center items-center ${color} text-white rounded-full p-4`}>
        {icon}
      </div>
      <div className='pl-4'>
        <p className='text-lg font-medium text-gray-600'>{text}</p>
        <p className='text-xl font-semibold text-gray-800'>{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
