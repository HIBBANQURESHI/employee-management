import React from 'react'
import { useAuth } from '../context/authContext'
import Sidebar from '../components/sidebar'


const AdminDashboard = () => {

  const {user} = useAuth()


  return (
   <div>
    <Sidebar/>
   </div>
  )
}

export default AdminDashboard
