// src/utils/columns.js
export const columns = [
    {
      name: "S No",
      selector: (row) => row.sno,
      width: "70px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "100px",
    },
    {
      name: "Emp ID",
      selector: (row) => row.employeeId,
      sortable: true,
      width: "100px",
    },
    {
      name: "Department",
      selector: (row) => row.department,
      width: "120px",
    },
    {
      name: "Action",
      selector: (row) => row.action,
      center: true,
    },
  ];