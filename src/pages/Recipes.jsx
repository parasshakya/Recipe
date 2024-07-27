
import React, { useEffect, useState } from 'react'
import { GetRequest } from "../plugins/https";
import { RecipeCard } from "../components/modules/recipes/RecipeCard";

export const Recipes = () => {
  
  const [recipes, setRecipes] = useState([])

  const fetchAllRecipes = async() =>{

    const res = await GetRequest("/recipes")
    setRecipes(res.data)

  }

  useEffect(()=>{
    fetchAllRecipes()
  }, [])

  return (
    <div className='flex flex-col w-64 mt-7 mx-auto  gap-5 items-center  sm:w-[90%]  md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10  '>

      <div className="heading font-bold text-[24px] md:text-[30px] xl:text-[34px] text-center">Recipes</div>
      <div className="blogs flex flex-col gap-5  sm:grid sm:grid-cols-2 lg:gap-9 xl:grid-cols-3 "> 
        {
          recipes.map((value, index) => <div className=" sm:w-[256px] md:w-[300px]  " key={index}>
            <RecipeCard recipe={value}/>
          </div>)
        }

      </div>

    </div>
  )
}
