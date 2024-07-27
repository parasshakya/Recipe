import { Avatar, Rating } from '@mantine/core'
import { IconBookmark, IconDownload } from '@tabler/icons-react'
import React from 'react'

export const RecipeCard = ({recipe}) => {


  return (
    <div className= '  border-gray-300  border-2 mx-auto w-full   p-4 rounded-md  flex flex-col gap-4'  >
            <div >
                <img src= {`http://localhost:3002/uploads/${recipe.image}`} className='h-32 sm:h-36   md:h-44 lg:h-56 xl:h-60 2xl:h-64  w-full' alt="" />
            </div>
       <div>
       <div>
       <Rating size={'sm'}  value={2} fractions={2} readOnly />
       </div>
       <div className='sm:text-xl'>
       {recipe.name}
       </div>
      
       </div>
       <div className=' flex items-center justify-between '>
        <div className="profile-detail flex gap-2 items-center">
        <div className="profile-image"><Avatar src={`http://localhost:3002/uploads/${recipe.user.image}`}/></div>
        <div className="name">{recipe.user.username}</div>
        </div>
        <div className="save-button">
          <IconBookmark/>
        </div>

       </div>
     
        </div>
  )
}
