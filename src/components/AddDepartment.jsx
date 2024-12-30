import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name: '',
        description: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://ems-backend-mu.vercel.app/api/department/add',
                department,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            if (response.data.success) {
                navigate('/admin-dashboard/departments');
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white shadow-sm rounded-lg p-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 border border-gray-200">
                <h3 className="text-xl font-medium text-center mb-4 text-gray-700">Add Department</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="dep_name"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Department Name
                        </label>
                        <input
                            type="text"
                            id="dep_name"
                            name="dep_name"
                            onChange={handleChange}
                            placeholder="Enter Department Name"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-300 focus:outline-none bg-gray-50"
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-600 mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleChange}
                            placeholder="Enter Description"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-1 focus:ring-blue-300 focus:outline-none bg-gray-50"
                            rows="4"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-100 text-blue-600 font-medium py-2 px-4 rounded-md hover:bg-blue-200 transition"
                    >
                        Add Department
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddDepartment;
