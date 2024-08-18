import React, { useEffect, useState } from 'react'
import { IconMenu2 } from '@tabler/icons-react'
import RecipeLogo from "../../assets/images/recipe-logo-png.png"
import { Drawer } from '../Drawer';
import { NavLink, useNavigate } from 'react-router-dom';
import { welcomeRoutes } from '../../routes/welcomeRoutes';
import { useSelector } from 'react-redux';
import { dashboardRoutes } from '../../routes/dashboardRoutes';
import { Autocomplete, Avatar } from '@mantine/core';
import { GetRequest } from '../../plugins/https';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';

export const Navbar = () => {

  const[isDrawerOpen, setIsDrawerOpen] = useState(false);

  const token = useSelector(state => state.authReducer.token) || localStorage.getItem("token");
  const user =  useSelector(state => state.userReducer.profile) || JSON.parse(localStorage.getItem("userData"));


  const [recipeSuggestions, setRecipeSuggestions] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");



  const fetchSuggestions = async () => {
    try{
  
      const res = await GetRequest("/recipes/search", {
        params: { query: searchTerm }
      });
      
      
      if(res.data?.length !== 0){
        const recipeSuggestions = res.data.map(recipe => ({
          id: recipe._id, // Use ID as value
          name: recipe.name // Display recipe name
        }));
        console.log("SUGGESTIONS:", recipeSuggestions);
        setRecipeSuggestions(recipeSuggestions);
  
      }else{
        setRecipeSuggestions([]);
      }
  
    
    
   }catch(error){
    console.error("Error fetching recipes:", error);
    // Optionally handle the error, e.g., show an error message or clear suggestions
    setRecipeSuggestions([]);
  
  
   }


  }

  

  


  useEffect(()=>{
    window.addEventListener("resize", ()=>{
     if(window.innerWidth >= 768){
        setIsDrawerOpen(false)
     }   
    })
}, [])


  // Handle recipe selection
  const handleRecipeSelect = (recipe) => {
    if (recipe) {
      // Navigate to the recipe detail page using the selected recipe ID
      navigate(`/recipes/${recipe.id}`);
    }
  };


  useEffect(() => {
    if (searchTerm.trim() === '') {
      setRecipeSuggestions([]);
    } else {
      fetchSuggestions(searchTerm);
    }
  }, [searchTerm]);


  const handleOnSearch = (string) => {
    setSearchTerm(string);
  };



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
    user  && <div className=' hidden md:flex  md:gap-3   items-center'>

        <ReactSearchAutocomplete    
 className='w-80' items={recipeSuggestions} placeholder='Search for recipes' onSearch={handleOnSearch} onSelect={handleRecipeSelect}/>
     
      <Avatar src={`http://localhost:3002/uploads/${user.image}`} className='lg:w-11 lg:h-11 xl:w-12 xl:h-12' />
    <div className='lg:text-[18px] xl:text-xl'>
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
