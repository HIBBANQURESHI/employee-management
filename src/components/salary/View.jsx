import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const View = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;
  const { user } = useAuth();

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/salary/${id}/${user.role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const filterSalaries = (q) => {
    const filteredRecords = salaries.filter((leave) =>
      leave.employeeId.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg text-gray-500">Loading...</p>
        </div>
      ) : (
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-teal-700">Salary History</h2>
          </div>
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Search by Employee ID"
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={(e) => filterSalaries(e.target.value)}
            />
          </div>
          {filteredSalaries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600 bg-white rounded-lg shadow-md">
                <thead className="bg-teal-600 text-white uppercase text-xs tracking-wide">
                  <tr>
                    <th className="px-6 py-3">SNO</th>
                    <th className="px-6 py-3">Emp ID</th>
                    <th className="px-6 py-3">Salary</th>
                    <th className="px-6 py-3">Allowance</th>
                    <th className="px-6 py-3">Deduction</th>
                    <th className="px-6 py-3">Total</th>
                    <th className="px-6 py-3">Pay Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr
                      key={salary.id}
                      className="odd:bg-gray-100 even:bg-white hover:bg-teal-50"
                    >
                      <td className="px-6 py-3">{sno++}</td>
                      <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                      <td className="px-6 py-3">{salary.basicSalary}</td>
                      <td className="px-6 py-3">{salary.allowances}</td>
                      <td className="px-6 py-3">{salary.deductions}</td>
                      <td className="px-6 py-3">{salary.netSalary}</td>
                      <td className="px-6 py-3">
                        {new Date(salary.payDate).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center mt-8">
              <p className="text-gray-600 text-lg">No records found</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default View;
