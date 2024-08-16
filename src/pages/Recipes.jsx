
import React, { useEffect, useState } from 'react'
import { GetRequest, PostRequest } from "../plugins/https";
import { RecipeCard } from "../components/modules/recipes/RecipeCard";
import { Pagination } from '../components/Pagination';
import { useSelector } from 'react-redux';
import { Loader } from '@mantine/core';

export const Recipes = () => {
  
  const [recipes, setRecipes] = useState([])
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
 
  const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost)
 
  const [savedRecipes, setSavedRecipes] = useState([]);
  const[error, setError] = useState(null);
  const token = useSelector(state => state.authReducer.token);
  

  const fetchAllRecipes = async() =>{
  
  const res = await GetRequest("/recipes")
  setRecipes(res.data)



  }

  const getSavedRecipes = async() => {
      const res = await GetRequest(`/users/saved-recipes`);
      setSavedRecipes(res.data);

      




    
  }

  useEffect(()=>{
    fetchData();
  }, [])






  

  const handleRemoveSavedRecipe = async(recipe) =>{
    try{
        const res = await PostRequest("/users/remove-saved-recipe", {
          recipeId: recipe._id
        });


        getSavedRecipes();

    }catch(e){
      console.error(e);
    }
  }




  const handleSaveRecipe = async (recipe) =>{


    const res = await PostRequest("/users/saved-recipes", {
      recipeId: recipe._id
    });


    getSavedRecipes();





  }

  const fetchData = async () =>{
   try{
    setLoading(true);
    setError(null);
    await fetchAllRecipes();
  if(token){
    await getSavedRecipes();
  }
    
   }catch(error){

    setError(error.response?.data?.message || "An error occurred. Please try again later.");


    
   }finally{
    setLoading(false);
   }
  }

  const paginate = (number) =>{
    setCurrentPage(number);

  }

 

  return (
    <div className='flex flex-col w-64 mt-7 mx-auto mb-8  gap-5 items-center  sm:w-[90%]  md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10  '>

      <div className="heading font-bold text-[24px] md:text-[30px] xl:text-[34px] text-center">Recipes</div>
      {
        loading ? <Loader/> :  <div className="recipes flex flex-col gap-5  sm:grid sm:grid-cols-2 md:gap-6 lg:gap-9 xl:grid-cols-3 "> 
        {
          currentPosts.map((value, index) => <div className=" sm:w-[256px] lg:w-[300px] " key={index}>
            <RecipeCard recipe={value}  isSaved={savedRecipes.some(savedRecipe => savedRecipe._id === value._id)}
 onSave={handleSaveRecipe}   onUnsave={handleRemoveSavedRecipe} />
          </div>)
        }
      </div>
      }
      {
        error  && <div className='text-red-500'>

{error}

    
        </div>
      }
    
     
      <Pagination currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={recipes.length} paginate={paginate}/>

    </div>
  )
}
