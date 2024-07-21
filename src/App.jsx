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


function App() {

  const dispatch = useDispatch()


  useEffect(()=>{
    const localStorageToken = localStorage.getItem("token");
    if(localStorageToken){
  
      dispatch(setToken(localStorageToken));
    
    }
  


  },[])

  
  
  const token = useSelector((state) => state.authReducer.token);

  console.log(token)
  
    
  return (
  <div>
    <Navbar/>
    <BackgroundColorPatch/>

  <Routes>
{
     <Route path='/*' element = {  token ? <DashboardLayout/> :  <WelcomeLayout/>}/>  
}
    <Route path='/auth/*' element = {<AuthLayout/>}/>
  </Routes>

  <Footer/>


  

  </div>
  )
}

export default App
