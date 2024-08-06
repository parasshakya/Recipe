
import React, { useEffect, useState } from 'react'
import { GetRequest, PostRequest } from "../plugins/https";
import { RecipeCard } from "../components/modules/recipes/RecipeCard";
import { Pagination } from '../components/Pagination';
import { useSelector } from 'react-redux';

export const Recipes = () => {
  
  const [recipes, setRecipes] = useState([])
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
 
  const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost)
 
  const [savedRecipes, setSavedRecipes] = useState([]);
  

  const fetchAllRecipes = async() =>{

    const res = await GetRequest("/recipes")
    setRecipes(res.data)

  }

  const getSavedRecipes = async() => {
    try{
      const res = await GetRequest(`/users/saved-recipes`);
      setSavedRecipes(res.data);

      

    }catch(e){

      console.log(e);

    }
  }

  useEffect(()=>{
    fetchAllRecipes();
    getSavedRecipes();
  }, [])






  

  const handleRemoveSavedRecipe = async(recipe) =>{
    try{
        const res = await PostRequest("/users/remove-saved-recipe", {
          recipeId: recipe._id
        });


        getSavedRecipes();

    }catch(e){
      console.log(e);
    }
  }




  const handleSaveRecipe = async (recipe) =>{


    const res = await PostRequest("/users/saved-recipes", {
      recipeId: recipe._id
    });


    getSavedRecipes();





  }

  const paginate = (number) =>{
    setCurrentPage(number);

  }

  return (
    <div className='flex flex-col w-64 mt-7 mx-auto  gap-5 items-center  sm:w-[90%]  md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10  '>

      <div className="heading font-bold text-[24px] md:text-[30px] xl:text-[34px] text-center">Recipes</div>
      <div className="blogs flex flex-col gap-5  sm:grid sm:grid-cols-2 lg:gap-9 xl:grid-cols-3 "> 
        {
          currentPosts.map((value, index) => <div className=" sm:w-[256px] md:w-[300px]  " key={index}>
            <RecipeCard recipe={value}  isSaved={savedRecipes.some(savedRecipe => savedRecipe._id === value._id)}
 onSave={handleSaveRecipe}   onUnsave={handleRemoveSavedRecipe} />
          </div>)
        }
      </div>
      <Pagination currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={recipes.length} paginate={paginate}/>

    </div>
  )
}
