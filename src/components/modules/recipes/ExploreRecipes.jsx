import { Loader, Rating } from '@mantine/core';
import React, { lazy, useEffect, useState } from 'react'
import Berries from "../../../assets/images/berries.jpg"
import { GetRequest } from '../../../plugins/https';
import { RecipeCard } from './RecipeCard';
import { useNavigate } from 'react-router';

export const ExploreRecipes = () => {
    const [ratingSize, setRatingSize] = useState(12);
    const [recipes, setRecipes] = useState([])
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(null);


    const handleResize = () => {
        if (window.innerWidth < 640) {
            setRatingSize(12);
        } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
            setRatingSize(16);
        } else {
            setRatingSize(20);
        }
    };
    const fetchAllRecipes = async() =>{
try{
    setError(null);
    setLoading(true);
    const res = await GetRequest("/recipes")
    setRecipes(res.data)

}catch(error){
    setError(error.response?.data?.message || "An error occurred. Please try again later.")

}finally{
    setLoading(false);
}
    }

    useEffect(() => {
        fetchAllRecipes();
      

        handleResize(); // Set initial size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigate = useNavigate();

   
    

    

    


  return (
    <div className='m-auto flex flex-col w-[90%]   items-center mt-5   md:mt-28  ' >
           <div className="content  w-full flex flex-col gap-8">
           <div className="heading flex justify-between items-center">
           <div className='text-xl md:text-2xl font-semibold xl:text-3xl '>Explore Recipes</div>
           <div className='cursor-pointer' onClick={() => {
                navigate("/recipes")
           }}>View more</div>
           </div>

{
    loading ? <Loader/> : error ? <div className='text-red-500'>{error}</div> : <div className="grid-recipes self-center w-full  grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4    ">

    {
        
        recipes.slice(0,6).map((recipe, index) => <RecipeCard key={index} recipe={recipe} />  )
    }

</div>
}


           </div>

    </div>
    
  )
}
