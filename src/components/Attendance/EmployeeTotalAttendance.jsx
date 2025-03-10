import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeTotalAttendance = ({ employeeId }) => {
  const [totals, setTotals] = useState({
    present: 0,
    absent: 0,
    sick: 0,
    leave: 0,
  });

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await axios.get(
          `https://ems-backend-mu.vercel.app/api/attendance/employee-total/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setTotals(response.data.totals);
        }
      } catch (error) {
        console.error("Error fetching employee totals:", error.message);
      }
    };

    if (employeeId) {
      fetchTotals();
    }
  }, [employeeId]);

  return (
    <div className="flex space-x-2">
      <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
        Present: {totals.present}
      </span>
      <span className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded">
        Absent: {totals.absent}
      </span>
      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">
        Sick: {totals.sick}
      </span>
      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
        Leave: {totals.leave}
      </span>
    </div>
  );
};

export default EmployeeTotalAttendance;