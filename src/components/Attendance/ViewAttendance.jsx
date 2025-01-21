import React, { useState } from 'react';
import axios from 'axios';

const ViewAttendance = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/attendance/view', {
        params: { employeeId, month, year }
      });
      setAttendanceRecords(response.data.attendanceRecords);
    } catch (error) {
      setMessage('Error fetching attendance records.');
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">View Attendance</h2>
      {message && <p className="text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="employee" className="block">Employee</label>
          <input
            type="text"
            id="employee"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Employee ID"
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="month" className="block">Month</label>
          <input
            type="number"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="Month"
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="year" className="block">Year</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className="input"
            required
          />
        </div>
        <button type="submit" className="btn">View</button>
      </form>
      {attendanceRecords.length > 0 && (
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewAttendance;
