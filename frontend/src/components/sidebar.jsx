import React from 'react'
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { PiSuitcaseSimple } from "react-icons/pi";
import { RiBuilding2Line } from "react-icons/ri";
import { VscCoffee } from "react-icons/vsc";
import { MdAttachMoney } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
      <div>
        <h3> AKC TECH LINK </h3>
      </div>
      <div>
        <NavLink to={"/admin-dashboard"}>
            <MdOutlineSpaceDashboard/>
            <span> Dashboard </span>
        </NavLink>

        <NavLink to={"/admin-dashboard"}>
            <PiSuitcaseSimple/>
            <span> Employees </span>
        </NavLink>

        <NavLink to={"/admin-dashboard"}>
            <RiBuilding2Line/>
            <span> Departments </span>
        </NavLink>

        <NavLink to={"/admin-dashboard"}>
            <VscCoffee/>
            <span> Leaves </span>
        </NavLink>

        <NavLink to={"/admin-dashboard"}>
            <MdAttachMoney/>
            <span> Salary </span>
        </NavLink>

        <NavLink to={"/admin-dashboard"}>
            <IoSettingsOutline/>
            <span> Settings </span>
        </NavLink>
        
      </div>
    </div>
  )
}

export default Sidebar
