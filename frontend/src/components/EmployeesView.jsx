import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EmployeesView = () => {

    const {id} = useParams()
    const [employee, setEmployee] = useState(null)
    

    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
              headers:{
                Authorization : `Bearer ${localStorage.getItem('token')}`
              }
            })
            if (response.data.success) {
                setEmployee(response.data.employee)
          }
          
          } catch (error) {
            if(error.response && !error.response.data.success){
              alert(error.response.data.error)
            }        
          }
        }
        fetchEmployee();
      }, [])

  return (
    <>{employee  ?  (
    <div>
        <h2> Employee Details </h2>
        <div> 
        <div>
            <img src={`http://localhost:3000/${employee.userId.profileImage}`} alt='Profile Image'/>
        </div> 
        <div>
            <div>
                <p> Name : </p>
                <p> {employee.userId.name} </p>
            </div>
            <div>
                <p> Employee ID : </p>
                <p> {employee.employeeId} </p>
            </div>
            <div>
                <p> DOB : </p>
                <p> {new Date(employee.dob).toLocaleDateString()} </p>
            </div>
            <div>
                <p> Gender : </p>
                <p> {employee.gender} </p>
            </div>
            <div>
                <p> Department : </p>
                <p> {employee.department} </p>
            </div>
            <div>
                <p>Martial Status</p>
                <p> {employee.martialStatus} </p>
            </div>
        </div>
        </div>
        
    </div>
    ) : <div> Loading.... </div>}</>
  )
}

export default EmployeesView
