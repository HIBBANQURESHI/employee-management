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
    </div>
    );
  };