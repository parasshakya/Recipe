import React, { useEffect, useState } from 'react'
import { GetRequest, PostRequest } from '../plugins/https';
import { useNavigate, useParams } from 'react-router';
import { Avatar, Button, Checkbox, Textarea } from '@mantine/core';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export const RecipeDetail = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState(0);
    const token = useSelector(state => state.authReducer.token);
    const [comment, setComment] = useState({
        text : '',
        date: Date.now()
    });
    const [liked, setLiked] = useState(false);
    
    const user = useSelector(state => state.userReducer.profile);

    const fetchRecipe = async() =>{
        try{
            setLoading(true);
            const res = await GetRequest(`/recipes/${id}`);
        setRecipe(res.data);
        console.log(res.data);
       if(user){
        if(res.data.likes.some((value) => value._id === user._id)){
            setLiked(true);
            setLikes(res.data.likes.length);
        }else{
            setLiked(false);
            
        }
        
        setComments(res.data.comments);
       }
       
        
        }catch(e){
            toast.error("Error fetching data. Please try again.")
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    

    useEffect(()=>{
      
        fetchRecipe();
    

        

    },[id]);



    const handleCommentChange = (event) =>{

        setComment({
            ...comment,
            [event.target.name] : event.target.value
        })

    }


  

    const handlePost = async ()=>{
        try{
            const res = await PostRequest(`/recipes/${id}/comment`, comment)

            setComments(res.data.comments);
            
                toast.success("Comment created successfully");
            


        }catch(e){
                console.log(e);
                toast.error("Something went wrong");
        }
    }

    const handleLike = async () =>{
        try{
            const res = await PostRequest(`/recipes/${id}/like`)
            setLikes(res.data.likes.length);
            setLiked(!liked);
            

        }catch(e){
            console.log(e);
            toast.error("Something went wrong");

        }
    }



    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>
    if(!recipe) return <div>No Recipe Found</div>

  return (
    <div className='flex flex-col items-center mb-8  gap-7 w-[90%] m-auto'>
        <img className='max-w-[288px] m-auto' src={`http://localhost:3002/uploads/${recipe?.image}`}alt="" />
        <div className="title  text-3xl">{recipe?.name}</div>
        <div className="user-details  flex gap-3 items-center">
        <div className="user-profile"><Avatar src={`http://localhost:3002/uploads/${recipe?.user?.image}`}/></div>
        <div className="author text-xl "> {recipe?.user?.username}</div>
        <div className="author-placeholder text-xl text-gray-500">(Author)</div>


        </div>
        <div className="description text-xl self-start "><span className='font-bold'>Description: </span>{recipe?.description}</div>
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
    <div className="preparing-time-section flex gap-1 text-xl">
        <div className="label font-bold">Preparing Time:</div>
        <div className="value flex gap-3 ">
{
    recipe.preparingTimeInHours !== 0 &&              <div className="hours">{recipe.preparingTimeInHours}<span>hr</span></div>

}        

{
    recipe.preparingTimeInMinutes !== 0 &&         <div className="minutes">{recipe.preparingTimeInMinutes }<span>min</span></div>

}
        
{
    recipe.preparingTimeInSeconds !== 0 &&          <div className="seconds">{recipe.preparingTimeInSeconds}<span>sec</span></div>

}        
        </div>


    </div>
    <div className="cooking-time-section flex gap-1 text-xl">
        <div className="label font-bold">Cooking Time:</div>
        <div className="value flex gap-3 ">
{
    recipe.cookingTimeInHours !== 0 &&                        <div className="hours">{recipe.cookingTimeInHours}<span>hr</span></div>

}        
{
    recipe.cookingTimeInMinutes !== 0 && <div className="minutes">{recipe.cookingTimeInMinutes}<span>min</span></div>

}
{
    recipe.cookingTimeInSeconds !== 0 &&          <div className="seconds">{recipe.cookingTimeInSeconds}<span>sec</span></div>

}        
        </div>


    </div>

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
            <div className="likes-section flex gap-2 items-center">
            <div className="likes-count text-xl font-semibold">{likes}</div>

                <div className="title font-semibold text-xl">Likes</div>
            </div>

            <div className='comments-section flex flex-col gap-4'>
               <div className="title flex gap-2 items-center">
               <div className=" font-bold text-xl">Comments</div>
               <div className="count-comment text-xl font-semibold">{comments.length}</div>
               </div>
                <hr />

                {
                    comments?.map((comment, index) =>{
                        return(
                            <div key={index} className='flex flex-col '>
                                <div className="user-details flex gap-3 items-center">
                                    
                                <Avatar src={`http://localhost:3002/uploads/${comment.user.image}`} />                               
                                <div className="username">{comment.user.username}</div>
                
                                </div>
                <div className="comment-text ">{comment.text}</div>

                            </div>
                        )
                    })
                }

                
                
            </div>
            <div className="share-opinion flex flex-col gap-5">
                <div className="title text-xl font-bold">Share your opinion</div>
                <Textarea name='text' value={comment.text}  onChange={handleCommentChange} placeholder='Type here...' />
                <div className="buttons flex gap-3">
                <Button onClick={handlePost} className='bg-red-500'>Post</Button>
                <Button onClick={handleLike} >{liked ? <>Dislike</> : <>Like</>}</Button>
                </div>
            </div>

            


        
    </div>
     }
    </div>
  )
}
