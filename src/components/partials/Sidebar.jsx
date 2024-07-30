import React, { useEffect } from 'react'
import { dashboardRoutes } from '../../routes/dashboardRoutes'
import { NavLink } from 'react-router-dom'

export const Sidebar = () => {


  

  return (
  <div>
      <div className=' hidden border  border-r-black bg-gray-100 h-screen fixed mt-[88.09px]    md:w-40  md:flex md:flex-col '>

{
       dashboardRoutes.map((value, index) => {
        return (
          <div key={index} >
            {
                                <NavLink  className={({ isActive }) =>
                                   isActive ? "active-link" : ""
                                }
                               to={value.path}>
                               <div className='flex flex-col items-center border hover:bg-gray-800 hover:bg-opacity-5 py-4 px-2 border-b-gray-400'>
                                <div className="icon">{value.icon}</div>
                               <div className='md:text-[16px] text-center    lg:text-[18px]'>
                               {value.name}</div>
                               
                               </div></NavLink>

            }
            </div>
        )
      })
}



</div>


  </div>
    
  )
}
