import { Avatar, Rating } from '@mantine/core'
import { IconBookmark, IconBookmarkFilled, IconDownload } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { GetRequest, PostRequest } from '../../../plugins/https'
import { useSelector } from 'react-redux'

export const RecipeCard = ({recipe, isSaved, onSave, onUnsave}) => {

  const navigate = useNavigate();

  const handleSaveClick = (e) => {
    e.stopPropagation();
    onSave(recipe);
  };

  const handleUnsaveClick = (e) => {
    e.stopPropagation();
    onUnsave(recipe);
  };
 


  return (
    <div className= ' cursor-pointer  border-gray-300  border-2 mx-auto w-full   p-4 rounded-md  flex flex-col gap-4' onClick={()=>{
navigate(`/recipes/${recipe._id}`)
    }} >
            <div >
                <img src= {`http://localhost:3002/uploads/${recipe.image}`} className='h-32 sm:h-36   md:h-44 lg:h-56 xl:h-60 2xl:h-64  w-full' alt="" />
            </div>
       <div>
       <div>
       <Rating size={'sm'}  value={2} fractions={2} readOnly />
       </div>
       <div className='sm:text-xl line-clamp-1'>
       {recipe.name}
       </div>
      
       </div>
       <div className=' flex items-center justify-between '>
        <div className="profile-detail flex gap-2 items-center">
        <div className="profile-image"><Avatar src={`http://localhost:3002/uploads/${recipe.user.image}`}/></div>
        <div className="name">{recipe.user.username}</div>
        </div>
        <div className="save-button">

          {
            isSaved ? <IconBookmarkFilled onClick={handleUnsaveClick}/> : <IconBookmark onClick={handleSaveClick}/>
          }
         
        </div>

       </div>
     
        </div>
  )
}
