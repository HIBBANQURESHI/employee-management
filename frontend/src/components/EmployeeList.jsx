import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { EmployeeButtons } from '../utils/EmployeeHelper';
import axios from 'axios';



const EmployeeList = () => {

  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)

  const columns = [
    { name: "S.No", selector: (row) => row.sno, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Department", selector: (row) => row.dep_name, sortable: true },
    { name: "Date of Birth", selector: (row) => row.dob, sortable: true },
    {
      name: "Profile",
      cell: (row) => (
        <img
          src={row.profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
      ),
    },
    {
      name: "Action",
      cell: (row) => row.action,
    },
  ];
  

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/api/employee', {
          headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1; 
          const data = response.data.employees.map((emp) => ({
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department,
              name: emp.userId.name,
              dob: new Date(emp.dob).toDateString(),
              profileImage:  <img src={`http://localhost:3000/${emp.userId.profileImage}`}/> ,
              action: <EmployeeButtons DepId={emp._id}/>,
          }));
          setEmployees(data);
          setFilteredDepartments(data);
      }
      
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }        
      } finally {
        setEmpLoading(false);
      }
    }
    fetchEmployees();
  }, [])

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
            <div>
              <DataTable columns= {columns} data={employees}/>
            </div>
    </div>
  )
}

export default EmployeeList
