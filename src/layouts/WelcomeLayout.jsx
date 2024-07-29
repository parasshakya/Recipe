import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

import { welcomeRoutes } from '../routes/welcomeRoutes'
import NoPageFound from '../pages/NoPageFound'
import { BlogDetailPage } from '../pages/BlogDetailPage'
import { RecipeDetail } from '../pages/RecipeDetail'
import { TermsOfUse } from '../pages/TermsOfUse'
import { PrivacyAndCookies } from '../pages/PrivacyAndCookies'

export const WelcomeLayout = () => {
  return (
    <div>  <Routes>

      <Route path='/' element = {<Navigate to={"/home"}/>}/>
    {  welcomeRoutes.map((value, index) =>{
      return (

              <Route key={index} path= {value.path} element = {value.element}/>
   
    
      )
      })}

      <Route path='/blogs/:id' element = {<BlogDetailPage/>}/>
      <Route path = "recipes/:id" element = {<RecipeDetail/>}/>
      <Route path = "/termsofuse" element = {<TermsOfUse/>}/>
      <Route path = "/privacyandcookies" element ={<PrivacyAndCookies/> }/>
                
      
                <Route path='*' element={<NoPageFound />} /> {/* Catch-all route */}

      


    
  </Routes></div>
  )
}
