import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
  {
      name : "S No.",
      selector: (row) => row.sno
  },
  {
      name : "Name",
      selector: (row) => row.name,
      sortable: true
  },
  {
    name : "Department",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name : "DOB",
    selector: (row) => row.dob,
    sortable: true
  },
  {
      name : "Action",
      selector: (row) => row.action,
      center: "true"
  },
]


export const fetchDepartments = async () => {
    let departments
    try {
      const response = await axios.get('http://localhost:3000/api/departments', {
        headers:{
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        departments = response.data.departments
    }
    
    } catch (error) {
      if(error.response && !error.response.data.success){
        alert(error.response.data.error)
      }        
    }
    return departments
  };

  export const getEmployees = async (id) => {
    let employees = []; // Initialize employees as an empty array
    try {
      const response = await axios.get(`http://localhost:3000/api/employee/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.data.success) {
        employees = response.data.employees || []; // Ensure employees are assigned if response is successful
      } else {
        console.error('Failed to fetch employees:', response.data.error || 'Unknown error');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(error.response.data.error); // Show error message from API
      } else {
        alert('An error occurred while fetching employees.');
      }
      console.error("Error fetching employees:", error);
    }
    return employees; // Return employees (empty array if there's an error or no data)
  };
  
  




export const EmployeeButtons = ({Id}) => {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col space-y-2 py-3"> 
      <button className="flex items-center justify-center px-3 py-2 bg-green-100 text-green-600 font-medium rounded-md border border-green-300 hover:bg-green-200 transition"
      onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}>
        View
      </button>

      <button className="flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-600 font-medium rounded-md border border-blue-300 hover:bg-blue-200 transition"
      onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}>
        Edit
      </button>

      <button className="flex items-center justify-center px-3 py-2 bg-yellow-100 text-yellow-600 font-medium rounded-md border border-yellow-300 hover:bg-yellow-200 transition"
      onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}>
        Salary
      </button>
    </div>
    );
  };