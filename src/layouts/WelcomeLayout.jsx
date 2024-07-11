import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { welcomeRoutes } from '../routes/welcomeRoutes'

export const WelcomeLayout = () => {
  return (
    <div>  <Routes>

      <Route path='/' element = {<Navigate to={"/home"}/>}/>
    {  welcomeRoutes.map((value, index) =>{
      return (

              <Route key={index} path= {value.path} element = {value.element}/>
   
    
      )
      })}


    
  </Routes></div>
  )
}
