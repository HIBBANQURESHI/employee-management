import React, { useState, useEffect } from 'react';
import SummaryCard from './SummaryCard';
import { FaBuilding, FaUsers, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';

const AdminSummary = () => {
  const [notes, setNotes] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [employeeCount, setEmployeeCount] = useState(0);
  const [departmentCount, setDepartmentCount] = useState(0);

  useEffect(() => {
    // Load saved notes from localStorage
    const savedNotes = localStorage.getItem('adminNotes');
    if (savedNotes) {
      setNotes(savedNotes);
    }

    // Set current date
    const today = new Date();
    setCurrentDate(
      today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );

    // Fetch employee count
    const fetchEmployeeCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setEmployeeCount(response.data.employees.length);
        }
      } catch (error) {
        console.error('Failed to fetch employee count:', error);
      }
    };

    // Fetch department count
    const fetchDepartmentCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          setDepartmentCount(response.data.departments.length);
        }
      } catch (error) {
        console.error('Failed to fetch department count:', error);
      }
    };

    fetchEmployeeCount();
    fetchDepartmentCount();
  }, []);

  const handleNotesChange = (e) => {
    const updatedNotes = e.target.value;
    setNotes(updatedNotes);
    localStorage.setItem('adminNotes', updatedNotes);
  };

  return (
    <div className="p-6 flex flex-col items-center bg-gray-50 min-h-screen text-gray-700">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard Overview</h3>

      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full">
        <SummaryCard
          icon={<FaUsers className="text-blue-500" />}
          text="Total Employees"
          number={employeeCount} // Display total employee count
          color="bg-white"
        />
        <SummaryCard
          icon={<FaBuilding className="text-green-500" />}
          text="Total Departments"
          number={departmentCount} // Display total department count
          color="bg-white"
        />
        <SummaryCard
          icon={<FaCalendarAlt className="text-purple-500" />}
          text="Today's Date"
          number={currentDate}
          color="bg-white"
        />
      </div>

      {/* Notes Section */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mt-10">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">Personal Notes</h4>
        <textarea
          className="w-full h-40 border border-gray-300 rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Write your notes here..."
          value={notes}
          onChange={handleNotesChange}
        />
        <p className="text-sm text-gray-500 mt-2">Notes are automatically saved.</p>
      </div>
    </div>
  );
};

export default AdminSummary;
