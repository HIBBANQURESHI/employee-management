import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";
import { Search, PlusCircle } from 'lucide-react'; // Importing Lucide icons
import { motion } from 'framer-motion'; // Framer Motion for animations

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const onDepartmentDelete = () => {
    fetchDepartments();
  };

  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get("https://ems-backend-mu.vercel.app/api/department", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data.success) {
        let sno = 1;
        const data = await response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons Id={dep._id} onDepartmentDelete={onDepartmentDelete} />
          ),
        }));
        setDepartments(data);
        setFilteredDepartments(data);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
  };

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl font-semibold text-gray-500">Loading ...</div>
        </div>
      ) : (
        <motion.div
          className="p-5 min-h-screen bg-gray-900 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-5">
            <h3 className="text-2xl font-bold text-white">Manage Departments</h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-5">
            <div className="flex items-center bg-gray-800 rounded-lg p-2 w-full sm:w-1/3">
              <Search className="text-gray-400" />
              <input
                type="text"
                placeholder="Search By Dep Name"
                className="ml-2 p-2 bg-transparent text-white outline-none w-full"
                onChange={filterDepartments}
              />
            </div>
            <Link
              to="/admin-dashboard/add-department"
              className="flex items-center px-4 py-2 bg-teal-600 rounded-md text-white hover:bg-teal-700 transition"
            >
              <PlusCircle className="mr-2" />
              Add New Department
            </Link>
          </div>

          <div className="overflow-x-auto">
            <DataTable
              columns={columns}
              data={filteredDepartments}
              pagination
              customStyles={{
                headRow: {
                  style: {
                    backgroundColor: "#2d3748",
                    color: "#fff",
                  },
                },
                rows: {
                  style: {
                    backgroundColor: "#1a202c",
                    color: "#fff",
                  },
                },
              }}
            />
          </div>
        </motion.div>
      )}
    </>
  );
};

export default DepartmentList;
