import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { dashboardRoutes } from '../routes/dashboardRoutes'
import { UserFeed } from '../pages/UserFeed'
import NoPageFound from '../pages/NoPageFound'

export const DashboardLayout = () => {
  return (

    <div>


    
       <div>

      
{
    <Routes>
        <Route path='/' element = {<Navigate to={'/feed'}/>}/>
            {
                dashboardRoutes.map((value, index) => <Route path={value.path} key = {index} element= {value.element}/>)
            }
                            <Route path='*' element = {<NoPageFound/>}/>

    </Routes>
}
</div>
    </div>

   
  )
}
