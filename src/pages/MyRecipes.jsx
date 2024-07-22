import React, { useEffect, useState } from 'react'
import { GetRequest } from '../plugins/https'

export const MyRecipes = () => {


  const[myRecipes, setMyRecipes] = useState(null)

  const getMyRecipes = async() =>{
  
    const res = await GetRequest("recipes/user")
    console.log(res.data)
    setMyRecipes(res.data)
  }

  useEffect(()=>{
    getMyRecipes();
  }, [])

  return (
    <div>
      {myRecipes?.map((recipe, index) => {
        return(
        
          <div key={index}>
          {recipe?.name}
          </div>
        )
      })}
    </div>
  )
}
