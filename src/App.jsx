import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/AdminSummary";
import DepartmentList from "./components/DepartmentList";
import AddDepartment from "./components/AddDepartment";
import EditDepartment from "./components/EditDepartment";
import EmployeeList from "./components/EmployeeList";
import EmployeeAdd from "./components/EmployeeAdd";
import EmployeesView from "./components/EmployeesView";
import EmployeeEdit from "./components/EmployeeEdit";
import AttendanceManagement from "./components/AttendanceManagement";
import SalaryAdd from "./components/SalaryAdd";
import SalaryView from "./components/SalaryView";
//import EmployeeDashboard from './components/EmployeeDashboard';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Navigate to = "/admin-dashboard"/>}> </Route>
        <Route path = "/login" element = { <Login/> }> </Route>
        <Route path = "/admin-dashboard" element = {
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
           <AdminDashboard/>
           </RoleBaseRoutes>
          </PrivateRoutes> 
           }> 

           <Route index element = {<AdminSummary/>}></Route>
           <Route path = "/admin-dashboard/departments" element = {<DepartmentList/>}></Route>
           <Route path = "/admin-dashboard/add-department" element = {<AddDepartment/>}></Route>
           <Route path = "/admin-dashboard/department/:id" element = {<EditDepartment/>}></Route>

           <Route path = "/admin-dashboard/employees" element = {<EmployeeList/>}></Route>
           <Route path = "/admin-dashboard/add-employee" element = {<EmployeeAdd/>}></Route>
           <Route path = "/admin-dashboard/employees/:id" element = {<EmployeesView/>}></Route>
           <Route path = "/admin-dashboard/employees/edit/:id" element = {<EmployeeEdit/>}></Route>

           <Route path = "/admin-dashboard/salary/add" element = {<SalaryAdd/>}></Route>
           <Route path = "/admin-dashboard/employees/salary/:id" element = {<SalaryView/>}></Route>



           <Route path="/admin-dashboard/attendance" element={<AttendanceManagement/>} />





         
           
           </Route>        
        
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
