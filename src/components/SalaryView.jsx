import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SalaryView = () => {
  const [salaries, setSalaries] = useState(null);
  const [filteredSalaries, setFilteredSalaries] = useState(null);
  const { id } = useParams();
  let sno = 1;

  const fetchedSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
    fetchedSalaries();
  }, []);

  const filterSalaries = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((salary) =>
      salary.employeeId.toLowerCase().includes(q.toLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="text-lg font-medium text-gray-600">Loading...</div>
        </div>
      ) : (
        <div className="p-8 bg-gray-50 min-h-screen">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Salary History</h2>
            <input
              type="text"
              placeholder="Search by Employee ID"
              onChange={filterSalaries}
              className="w-full sm:w-1/2 mx-auto border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          {filteredSalaries.length > 0 ? (
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-100 text-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left">SNO</th>
                  <th className="px-4 py-2 text-left">Employee</th>
                  <th className="px-4 py-2 text-left">Basic Salary</th>
                  <th className="px-4 py-2 text-left">Allowance</th>
                  <th className="px-4 py-2 text-left">Deduction</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Pay Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr
                    key={salary.id}
                    className="border-t hover:bg-gray-100 transition duration-150"
                  >
                    <td className="px-4 py-2">{sno++}</td>
                    <td className="px-4 py-2">{salary.employeeId.employeeId}</td>
                    <td className="px-4 py-2">{salary.basicSalary}</td>
                    <td className="px-4 py-2">{salary.allowances}</td>
                    <td className="px-4 py-2">{salary.deductions}</td>
                    <td className="px-4 py-2">{salary.netSalary}</td>
                    <td className="px-4 py-2">
                      {new Date(salary.payDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center text-gray-500 mt-6">No Records Found...</div>
          )}
        </div>
      )}
    </>
  );
};

export default SalaryView;
