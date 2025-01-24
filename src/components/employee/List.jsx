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
                        dep_name: emp.department ? emp.department.dep_name : 'Unknown',  // Ensure dep_name is a string
                        name: emp.userId.name,  // String, no issues here
                        dob: new Date(emp.dob).toLocaleDateString(),
                        profileImage: emp.userId.profileImage ? (
                          <img width={40} className='rounded-full' src={`https://ems-backend-mu.vercel.app/${emp.userId.profileImage}`} alt="profile" />
                        ) : (
                          <span>No Image</span> // Fallback if no image exists
                        ),
                        action: (<EmployeeButtons Id={emp._id} />),
                    }));
                    
                    setEmployees(data);
                    setFilteredEmployees(data);
                }
            } catch (error) {
                console.log(error.message)
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setEmpLoading(false)
            }
        };

        fetchEmployees();
    }, []);

    const handleFilter = (e) => {
        const records = employees.filter((emp) => (
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        ));
        setFilteredEmployees(records);
    };

    if (!filteredEmployee) {
        return <div className="text-center text-white">Loading ...</div>;
    }

    return (
        <div className='p-6'>
            <div className="text-center">
                <h3 className="text-3xl font-semibold text-black mb-6">Manage Employee</h3>
            </div>
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search By Name"
                    className="px-4 py-2 border border-gray-600 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    onChange={handleFilter}
                />
                <Link
                    to="/admin-dashboard/add-employee"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-teal-700 transition-all duration-200"
                >
                    Add New Employee
                </Link>
            </div>
            <div className="mt-6 rounded-md shadow-lg p-4">
                <DataTable columns={columns} data={filteredEmployee} pagination />
            </div>
        </div>
    );
};

export default List;
