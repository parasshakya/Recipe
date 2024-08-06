import React, { useEffect, useState } from 'react'
import { IconMenu2 } from '@tabler/icons-react'
import RecipeLogo from "../../assets/images/recipe-logo-png.png"
import { Drawer } from '../Drawer';
import { NavLink, useNavigate } from 'react-router-dom';
import { welcomeRoutes } from '../../routes/welcomeRoutes';
import { useSelector } from 'react-redux';
import { dashboardRoutes } from '../../routes/dashboardRoutes';
import { Avatar } from '@mantine/core';

export const Navbar = () => {

  const[isDrawerOpen, setIsDrawerOpen] = useState(false);

  const token = useSelector(state => state.authReducer.token) || localStorage.getItem("token");
  const user =  useSelector(state => state.userReducer.profile) || JSON.parse(localStorage.getItem("userData"));

  console.log(user);

  useEffect(()=>{
    window.addEventListener("resize", ()=>{
     if(window.innerWidth >= 768){
        setIsDrawerOpen(false)
     }   
    })
}, [])


const navigate = useNavigate()
  

  
  return (
    <div className={`navbar ${token ? 'fixed bg-blue-300 w-full z-20' : ''}`}>
      <div className='nav-content flex   py-4  items-center   justify-between m-auto w-[90%]' >
        <div onClick={
          ()=>{
            navigate("/home")
          }
        } className="logo flex  cursor-pointer gap-3 items-center">
        <img src="https://cdn.pixabay.com/photo/2017/02/17/17/33/food-2074638_1280.png" className = " w-10 sm:w-12 md:w-14  " alt="logo" />
        <div className="text text-[18px] sm:text-xl md:text-2xl font-bold">Perfect<span className='text-red-500'>Recipe</span></div>

        </div>
        <div onClick={()=>{
          setIsDrawerOpen(true)
        }}  className="hamburger-icon md:hidden">
<IconMenu2  width={"40px"} height={"40px"}/>
        </div>
        {
    user  && <div className=' hidden md:flex  gap-2 items-center'>
      <Avatar src={`http://localhost:3002/uploads/${user.image}`} />
    <div>
    {
        user.username
      }
    </div>

      
        </div>
  }



        <div className={`nav-items  gap-5 hidden   ${!token && 'md:flex' } lg:gap-7 xl:gap-8 2xl:gap-10 font-bold`}>
  {
    
     
    !token &&  welcomeRoutes.map((value, index) => {
        return (
          <div key={index}>
            {
                                <NavLink  className={({ isActive }) =>
                                   isActive ? "active-link" : ""
                                }
                               to={value.path}>
                                <div className='md:text-xl    lg:text-2xl'>
                                {value.name}</div></NavLink>

            }
            </div>
        )
      })
    
  }
 
          

            
        </div>

        
    </div>
    <Drawer isOpen={isDrawerOpen} onClose={()=>{
      setIsDrawerOpen(false)
    }} />
    </div>
  )
}
