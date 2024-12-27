import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeEdit = () => {
  const [formData, setFormData] = useState({});
  const [employee, setEmployee] = useState({
    name:'',
    martialStatus:'',
    designation:'',
    salary: 0,
    department:''
  });
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch employee data
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data && response.data.success) {
            const employee = response.data.employee;
          setEmployee((prev) => ({
            ...prev,
            name:employee.userId.name,
            martialStatus:employee.martialStatus,
            designation:employee.designation,
            salary:employee.salary,
            department:employee.department  
          }));
          setFormData(response.data.employee); // Initialize form data
        } else {
          alert('Error: Unable to fetch employee details.');
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
        alert('Error fetching employee. Please try again later.');
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (e.target.type === 'file') {
      setFormData((prevData) => ({ ...prevData, [name]: files[0] }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });
  
    try {
      const response = await axios.put(
        `http://localhost:3000/api/employee/${id}`,
        formData, // Send formData instead of employee state
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json', // Update content type to match the request body type
          },
        }
      );
      if (response.data && response.data.success) {
        navigate('/admin-dashboard/employees');
      } else {
        alert(response.data?.error || 'Error updating employee.');
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee. Please try again later.');
    }
  };
  
  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
        <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">Edit Employee</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="martialStatus" className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
              <select
                id="martialStatus"
                name="martialStatus"
                value={formData.martialStatus || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select Marital Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>
            <div>
              <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation || ''}
                onChange={handleChange}
                placeholder="Enter Designation"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department || ''}
                onChange={handleChange}
                placeholder="Enter Department"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">Salary</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary || ''}
                onChange={handleChange}
                placeholder="Enter Salary"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;
