import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { columns, DepartmentButtons } from '../utils/DepartmentHelpers';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([])
  const [depLoading, setDepLoading] = useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState([])


  const onDepartmentDelete = async (id) => {
    const data = departments.filter(dep => dep._id !== id)
    setDepartments(data)
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true)
      try {
        const response = await axios.get('http://localhost:3000/api/department', {
          headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1; 
          const data = response.data.departments.map((dep) => ({
              _id: dep._id,
              sno: sno++,
              dep_name: dep.dep_name,
              action: <DepartmentButtons DepId={dep._id} onDepartmentDelete= {onDepartmentDelete} />,
          }));
          setDepartments(data);
          setFilteredDepartments(data);
      }
      
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error)
        }        
      } finally {
        setDepLoading(false);
      }
    }
    fetchDepartments();
  }, [])

  const filterDepartments = (e) => {
    const records = departments.filter((dep) => 
    dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
  }
  return (
    <> {depLoading ? <div> Loading ...  </div> :
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold">Manage Departments</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by department name"
          onChange={filterDepartments}
          className="px-4 py-2 w-full max-w-md bg-white border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
        />
        <Link
          to="/admin-dashboard/add-department"
          className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded-md transition"
        >
          Add New Department
        </Link>
      </div>
      <div className='mt-5'>
        <DataTable
          columns = {columns}
          data={filteredDepartments}
          pagination
        />
      </div>
    </div>
    } </>
  );
};

export default DepartmentList;
