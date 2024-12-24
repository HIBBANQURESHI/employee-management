import React from 'react'
import { Link } from 'react-router-dom'


const EmployeeList = () => {
  return (
    <div className='p-6 bg-gray-50 min-h-screen text-gray-800'>
        <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold">Manage Employees</h3>
            </div>
            <div className="flex justify-between items-center mb-4">
                <input
                type="text"
                placeholder="Search by Employee name"
                className="px-4 py-2 w-full max-w-md bg-white border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
            <Link
              to="/admin-dashboard/add-employee"
              className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md transition"
            >
            Add New Employee
            </Link>
            </div>
    </div>
  )
}

export default EmployeeList
