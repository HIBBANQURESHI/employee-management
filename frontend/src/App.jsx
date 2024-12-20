import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

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
           }> </Route>        
        
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
