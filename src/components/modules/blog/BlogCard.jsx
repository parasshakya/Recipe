import React, { useEffect, useState } from 'react'
import { GetRequest } from '../../../plugins/https'
import { useNavigate } from 'react-router'

export const BlogCard =  ({blog}) => {

  const navigate = useNavigate();



  return (
    <div className= 'border-gray-300 border-2 mx-auto w-full  p-4 rounded-md cursor-pointer  flex flex-col gap-4' onClick={()=>{
navigate(`/blogs/${blog._id}`)

    }}>
    <div >
        <img src= {`http://localhost:3002/uploads/${blog.image}`} className='h-32 sm:h-36   md:h-44 lg:h-56 xl:h-60 2xl:h-64  w-full' alt="" />
    </div>

<div className='sm:text-xl '>
{blog.title}
</div>

<div className="  text-gray-600 line-clamp-2">
{blog.description}

</div>


</div>
  )
}
