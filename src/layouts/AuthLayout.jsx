import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { authRoutes } from '../routes/authRoutes'

export const AuthLayout = () => {
  return (
    <div>  <Routes>

      <Route path='/' element = {<Navigate to={'/auth/login'} />} />

{
  authRoutes.map((value, index) =>{
    return(
      <Route key={index} path= {value.path} element= {value.element}/>

      
    )
  })
}
    

    
  </Routes></div>
  )
}
