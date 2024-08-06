import './App.css'
import '@mantine/core/styles.css';
import { Navbar } from './components/partials/Navbar';
import { BackgroundColorPatch } from './components/BackgroundColorPatch';
import { WelcomeLayout } from './layouts/WelcomeLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { Navigate, Route, Routes } from 'react-router';
import { Footer } from './components/modules/footer/Footer';
import { DashboardLayout } from './layouts/DashboardLayout';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './store/modules/auth/actions';
import { useEffect } from 'react';
import {  setUserProfile } from './store/modules/user/actions';


function App() {

  const dispatch = useDispatch()
  const token = useSelector((state) => state.authReducer.token);
   


  useEffect(()=>{
    const localStorageToken = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("userData"));

    if(localStorageToken && user ){
  
      dispatch(setToken(localStorageToken));
      dispatch(setUserProfile(user));
    
    }
  


  },[dispatch])

  
  
  

  
    
  return (
  <div>
     <Navbar/>
    
{
  !token &&     <BackgroundColorPatch/>

}
  <Routes>
{
     <Route path='/*' element = {  token ? <DashboardLayout/> :  <WelcomeLayout/>}/>  
}
    <Route path='/auth/*' element = {<AuthLayout/>}/>
  </Routes>

{
  !token &&  <Footer/>
}

  

  </div>
  )
}

export default App
