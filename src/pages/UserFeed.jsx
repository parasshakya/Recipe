import React, { useEffect, useState } from 'react'
import { GetRequest } from '../plugins/https';

export const UserFeed = () => {

  const [allRecipes, setAllRecipes] = useState([]);




  const getAllRecipes = async () =>{

    const res = await GetRequest("/recipes")
    setAllRecipes(res.data)

  }

  useEffect(()=>{
    getAllRecipes()
  }, [])

  return (
    <div>
{
  allRecipes.map((recipe, index) =>{
    return(
      <div key={index}>
{        recipe.name
}        </div>
    )
  })
}
    </div>
  )
}
