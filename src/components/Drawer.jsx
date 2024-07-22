import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { dashboardRoutes } from '../routes/dashboardRoutes'
import { NavLink } from 'react-router-dom'
import { welcomeRoutes } from '../routes/welcomeRoutes'

export const Drawer = ({isOpen, onClose}) => {


  const token = useSelector(state => state.authReducer.token)

  

 
  return (
    <div id='drawer' className={`drawer pt-7 ${isOpen ? "open" : ""} `}>
                    <div onClick={onClose} className='close-btn self-end px-6 py-4'>X</div>


 
  <div className="nav-items flex flex-col justify-center flex-grow gap-16 items-center">

{

token ? 
  dashboardRoutes.map((value , index) => {
    return (
      <NavLink onClick={onClose} key={index} to={value.path}  className={({ isActive }) =>
        isActive ? "active-link" : ""
     }>

       <div className='flex '>
    <div className='icon'>
      {value.icon}
    </div>
  <div className="title">
      {value.name}

    </div>
    </div>


     </NavLink>
   
    )
  }) :   welcomeRoutes.map((value ,index) => {
    return (
  
     <NavLink key={index} onClick={onClose} to={value.path}  className={({ isActive }) =>
        isActive ? "active-link" : ""
     } >
      {value.name}
     </NavLink>
    )
  })
}

  </div> 
           

            
 

    </div>
  )
}
