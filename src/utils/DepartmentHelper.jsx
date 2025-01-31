import axios from "axios";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
  },
  {
    name: "Department Name",
    selector: (row) => row.dep_name,
    sortable: true
  },
  {
    name: "Action",
    selector: (row) => row.action,
  },
];

export const DepartmentButtons = ({ Id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `https://ems-backend-mu.vercel.app/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          onDepartmentDelete();
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3">
      <button
        className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-md transition duration-300"
        onClick={() => navigate(`/admin-dashboard/department/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-300"
        onClick={() => handleDelete(Id)}
      >
        Delete
      </button>
    </div>
  );
};
