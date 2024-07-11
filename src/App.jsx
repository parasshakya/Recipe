import './App.css'
import '@mantine/core/styles.css';
import { Navbar } from './components/partials/Navbar';
import { BackgroundColorPatch } from './components/BackgroundColorPatch';
import { WelcomeLayout } from './layouts/WelcomeLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { Route, Routes } from 'react-router';


function App() {

  return (
  <div>
    <Navbar/>
    <BackgroundColorPatch/>

  <Routes>
    <Route path='/*' element = {<WelcomeLayout/>}/>
    <Route path='/auth/*' element = {<AuthLayout/>}/>
  </Routes>


  

  </div>
  )
}

export default App
