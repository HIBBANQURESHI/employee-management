import React from 'react'
import { useAuth } from '../context/authContext'
import Sidebar from '../components/sidebar'
import Navbar from '../components/Navbar'
import AdminSummary from '../components/AdminSummary'
import { Outlet } from 'react-router-dom'


const AdminDashboard = () => {

  const {user} = useAuth()


  return (
   <div className='flex'>
    <Sidebar/>
    <div className='flex-1 ml-64 bg-gray-100 h-screen'>
      <Navbar/>
      <Outlet/>      
    </div>
   </div>
  )
}

export default AdminDashboard
