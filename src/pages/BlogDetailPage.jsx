import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router'
import { GetRequest } from '../plugins/https';

export const BlogDetailPage = () => {

const {id} = useParams();
const[blog, setBlog] = useState(null);
const [loading, setLoading] = useState(true); // Track loading state
const [error, setError] = useState(null); // Track error state

const fetchBlog = async () =>{

    try{
        const response = await GetRequest(`/blogs/${id}`);
        setBlog(response.data);
        console.log(blog);

    }catch(e){
        console.log(e);
        setError("Failed to fetch blog details")
        setLoading(false);

    }finally{
        setLoading(false);
    }

}

useEffect(()=>{
  
    fetchBlog();

}, [id])

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;
if (!blog) return <div>No blog found.</div>;


  return (
    <div className='flex flex-col items-center gap-5 w-[90%] m-auto mt-7 lg:mt-9 xl:mt-11 xl:gap-8 2xl:gap-16'>
        <img className='max-w-[288px] m-auto lg:w-80 lg:max-w-none xl:w-96' src= {`http://localhost:3002/uploads/${blog.image}`} alt="" />
        <div className="title text-3xl lg:text-4xl xl:text-5xl">{blog.title}</div>
        <div className="description text-justify lg:text-xl xl:text-2xl">{blog.description}</div>
    </div>
  )
}
