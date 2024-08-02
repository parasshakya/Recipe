import React, { useEffect, useState } from 'react'
import { GetRequest } from '../plugins/https';
import { useNavigate, useParams } from 'react-router';
import { Avatar, Button, Checkbox } from '@mantine/core';
import { useSelector } from 'react-redux';

export const RecipeDetail = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = useSelector(state => state.authReducer.token);

    useEffect(()=>{
        const fetchRecipes = async() =>{
            try{
                const res = await GetRequest(`/recipes/${id}`);
            setRecipe(res.data);
            }catch(e){
                setError("Error fetching data");
                console.log(e);
            }finally{
                setLoading(false);
            }
        }
        fetchRecipes();


        

    },[id]);

  




    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>
    if(!recipe) return <div>No Recipe Found</div>

  return (
    <div className='flex flex-col items-center  gap-7 w-[90%] m-auto'>
        <img className='max-w-[288px] m-auto' src={`http://localhost:3002/uploads/${recipe?.image}`}alt="" />
        <div className="title  text-3xl">{recipe?.name}</div>
        <div className="user-details  flex gap-3 items-center">
        <div className="user-profile"><Avatar src={`http://localhost:3002/uploads/${recipe.image}`}/></div>
        <div className="author text-xl "> {recipe?.user.username}</div>
        <div className="author-placeholder text-xl text-gray-500">(Author)</div>


        </div>
        <div className="description text-xl text-justify"><span className='font-bold'>Description: </span>{recipe?.description}</div>
     {
        !token ?    <div className="call-to-action ">
        <div className="view-more">To view more details, please <span className='cursor-pointer text-red-500 underline' onClick={
            ()=>{
                navigate("/auth/login")
            }
        }>Login</span> or <span className='cursor-pointer text-blue-500 underline' onClick={()=>{
            navigate("/auth/signup")
        }}>
            SignUp</span></div>

    </div> : <div className='self-start gap-5 flex flex-col'>
        
            <div className="cookingTime text-xl"><span className='font-bold'>Cooking Time: </span>{  recipe?.cookingTime}</div>
            <div className="category text-xl"><span className='font-bold'>Category: </span>{recipe?.category?.name}</div>
            <div className="cuisine text-xl"><span className='font-bold'>Cuisine: </span>{recipe?.cuisine?.name}</div>
            <div className="ingredients text-xl flex flex-col gap-4"><span className='font-bold'>Ingredients: </span>{recipe?.ingredients?.map((ingredient, index) =>{
                return(
                    <label key={index}  className='flex gap-3'>
                        <input type="checkbox" className='w-5'/>
                        {ingredient}
                    </label>
                )
            } )}</div>
            <div className="instructions flex flex-col gap-4 text-xl"><span className='font-bold'>Instructions: </span>{recipe?.instructions?.map((instruction, index) =>{
                return(
                    <label key={index} className='flex gap-3'>
                        <input type="checkbox" className='w-5 '/>
                        {instruction}
                    </label>
                )
            } )}</div>


        
    </div>
     }
    </div>
  )
}
