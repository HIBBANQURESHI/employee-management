import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
    {
        name : "S No.",
        selector: (row) => row.sno
    },
    {
        name : "Department Number",
        selector: (row) => row.dep_name,
        sortable: true
    },
    {
        name : "Action",
        selector: (row) => row.action
    },
]

export const DepartmentButtons = ({DepId, onDepartmentDelete}) => {
    const navigate = useNavigate()

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do You Want To Delete it?");
    if (confirm) {
      try {
        const response = await axios.delete(`http://localhost:3000/api/department/${id}`, {
           headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          onDepartmentDelete(id);
        } else {
          alert("Failed to delete department.");
        }
      } catch (error) {
        console.error("Error during deletion:", error);
        alert(error.response ? error.response.data.error : "Unknown error during deletion");
      }
    }
  };
    return (
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-gray-100 text-gray-600 font-medium rounded-md border border-gray-300 hover:bg-gray-200 transition" 
          onClick={() => navigate (`/admin-dashboard/department/${DepId}`)}
        >
          Edit
        </button>
        <button className="px-4 py-2 bg-red-100 text-red-600 font-medium rounded-md border border-red-300 hover:bg-red-200 transition"
         onClick={() => handleDelete(DepId)}
        >
          Delete
        </button>
      </div>
    );
  };
  