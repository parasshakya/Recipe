import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { welcomeRoutes } from '../routes/welcomeRoutes'
import NoPageFound from '../pages/NoPageFound'

export const WelcomeLayout = () => {
  return (
    <div>  <Routes>

      <Route path='/' element = {<Navigate to={"/home"}/>}/>
    {  welcomeRoutes.map((value, index) =>{
      return (

              <Route key={index} path= {value.path} element = {value.element}/>
   
    
      )
      })}
      
                <Route path='*' element={<NoPageFound />} /> {/* Catch-all route */}

      


    
  </Routes></div>
  )
}
