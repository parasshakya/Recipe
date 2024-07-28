import { Rating } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import Berries from "../../../assets/images/berries.jpg"
import { BlogCard } from './BlogCard';
import { GetRequest } from '../../../plugins/https';
import { useNavigate } from 'react-router';

export const BlogSection = () => {

  
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () =>{
    const res = await GetRequest("/blogs")
    setBlogs(res.data)
  }

  useEffect(()=>{
    getAllBlogs()

  }, [])


  const navigate = useNavigate();


  return (
    <div className='m-auto flex flex-col w-[90%]   items-center mt-5   md:mt-28  ' >
           <div className="content  w-full flex flex-col gap-8">
           <div className="heading flex justify-between items-center">
           <div className='text-xl md:text-2xl font-semibold xl:text-3xl '>Blogs</div>
           <div className='cursor-pointer' onClick={()=>{
              navigate("/blogs")
           }}>View more</div>
           </div>

<div className="grid-recipes self-center w-full  grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4    ">

    {
        blogs?.map((blog, index) => <div key={index}>
          {<BlogCard blog={blog}/>}
          </div>)
    }

</div>
           </div>

    </div>
    
  )
}



