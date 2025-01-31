import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit } from 'lucide-react'; // Lucide icon
import { motion } from 'framer-motion'; // Framer Motion for animations

const EditDepartment = () => {
  const { id } = useParams();
  const [department, setDepartment] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `https://ems-backend-mu.vercel.app/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartments();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://ems-backend-mu.vercel.app/api/department/${id}`,
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <>
      {depLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-xl font-semibold text-gray-500">Loading ...</div>
        </div>
      ) : (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center"> 
          <motion.div
            className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Edit className="mr-3" /> Edit Department
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="dep_name" className="text-sm font-medium text-gray-300">
                  Department Name
                </label>
                <input
                  type="text"
                  name="dep_name"
                  onChange={handleChange}
                  value={department.dep_name}
                  placeholder="Enter Department Name"
                  className="mt-2 w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Enter Department Description"
                  onChange={handleChange}
                  value={department.description}
                  className="mt-2 p-3 block w-full border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
                  rows="4"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
              >
                Save Changes
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
