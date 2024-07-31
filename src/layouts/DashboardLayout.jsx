import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { dashboardRoutes } from '../routes/dashboardRoutes'
import { UserFeed } from '../pages/UserFeed'
import NoPageFound from '../pages/NoPageFound'
import { Sidebar } from '../components/partials/Sidebar'

export const DashboardLayout = () => {
  return (

    <div className='flex   '>

      <Sidebar/>


    
       <div className='w-full md:ml-40 mt-24  '>

      
{
    <Routes>
        <Route path='/' element = {<Navigate to={'/home'}/>}/>
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
