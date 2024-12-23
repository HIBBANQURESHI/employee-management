import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/AdminSummary";
import DepartmentList from "./components/departmentList";
import AddDepartment from "./components/AddDepartment";

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
         
           
           </Route>        
        
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
