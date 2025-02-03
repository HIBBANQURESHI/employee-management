import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'

const List = () => {
  const [employees, setEmployees] = useState([])
  const [empLoading, setEmpLoading] = useState(false)
  const [filteredEmployee, setFilteredEmployees] = useState(null)

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get(
          "https://ems-backend-mu.vercel.app/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
            },
          }
        );
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`https://ems-backend-mu.vercel.app/${emp.userId.profileImage}`}
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.log(error.message);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(records);
  };

  if (!filteredEmployee) {
    return <div className="text-white">Loading ...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white">Manage Employee</h3>
      </div>
      <div className="flex justify-between items-center mt-6">
        <input
          type="text"
          placeholder="Search By Name"
          className="px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-teal-500"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-6 bg-gray-900 rounded-lg p-4 shadow-lg">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          pagination
          highlightOnHover
          striped
          className="text-white"
        />
      </div>
    </div>
  );
};

export default List;
