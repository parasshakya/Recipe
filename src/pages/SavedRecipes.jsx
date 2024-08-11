import React, { useEffect, useState } from 'react'
import { GetRequest, PostRequest } from '../plugins/https';
import { Pagination } from '../components/Pagination';
import { RecipeCard } from '../components/modules/recipes/RecipeCard';
import { useSelector } from 'react-redux';

export const SavedRecipes = () => {


  const [savedRecipes, setSavedRecipes] = useState([]);
  const postsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
 
  const currentPosts = savedRecipes.slice(indexOfFirstPost, indexOfLastPost)



  const fetchSavedRecipes  = async() =>{
    try{
        const res = await GetRequest(`users/saved-recipes`);
        setSavedRecipes(res.data);
    }catch(e){

      console.log(e);

    }
  }

  const handleRemoveSavedRecipe = async(recipe) =>{
    try{
        const res = await PostRequest("/users/remove-saved-recipe", {
          recipeId: recipe._id
        });

        fetchSavedRecipes();



    }catch(e){
      console.log(e);
    }
  }

  const paginate = (number) =>{
    setCurrentPage(number);

  }


  useEffect(()=>{

    fetchSavedRecipes();

  }, [])

  return (
    <div className='flex flex-col mb-8  w-64 mt-7 mx-auto  gap-5 items-center  sm:w-[90%]  md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10  '>

      <div className="heading font-bold text-[24px] md:text-[30px] xl:text-[34px] text-center">Saved Recipes</div>
      <div className="saved-recipes flex flex-col gap-5  sm:grid sm:grid-cols-2 md:gap-6 lg:gap-9 xl:grid-cols-3 "> 
        {
          currentPosts.map((value, index) => <div className=" sm:w-[256px] lg:w-[300px]  " key={index}>
            <RecipeCard recipe={value} isSaved={savedRecipes.some(savedRecipe => savedRecipe._id === value._id)}   onUnsave={handleRemoveSavedRecipe} />
          </div>)
        }

      </div>
      <Pagination currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={savedRecipes.length} paginate={paginate}/>

    </div>
  )
}
