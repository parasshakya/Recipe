import { Loader, Rating } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import Berries from "../../../assets/images/berries.jpg"
import { BlogCard } from './BlogCard';
import { GetRequest } from '../../../plugins/https';
import { useNavigate } from 'react-router';

export const BlogSection = () => {

  
  const [blogs, setBlogs] = useState([]);
  const[loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllBlogs = async () =>{
   try{
    setError(null);
    setLoading(true);
    const res = await GetRequest("/blogs")
    setBlogs(res.data)

   }catch(error){
    setError(error.response?.data?.message || "An error occurred. Please try again later.")

   }finally{
    setLoading(false);
   }
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
           {
            loading ? <Loader/> : error ? <div className='text-red-500'>{error}</div> : <div className="grid-recipes self-center w-full  grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4    ">

            {
                blogs?.slice(0,6).map((blog, index) => <div key={index}>
                  {<BlogCard blog={blog}/>}
                  </div>)
            }
        
        </div>
           }


           </div>

    </div>
    
  )
}



