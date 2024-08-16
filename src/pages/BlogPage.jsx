import Berries from "../assets/images/berries.jpg"

import React, { useEffect, useState } from 'react'
import { BlogCard } from '../components/modules/blog/BlogCard';
import { GetRequest } from "../plugins/https";
import { Pagination } from "../components/Pagination";
import { Route, Routes } from "react-router";
import { BlogDetailPage } from "./BlogDetailPage";
import { Loader } from "@mantine/core";

export const BlogPage = () => {
 const [blogs, setBlogs] = useState([])

const postsPerPage = 6;

 const [currentPage, setCurrentPage] = useState(1);


 const indexOfLastPost = currentPage * postsPerPage;
 const indexOfFirstPost = indexOfLastPost - postsPerPage;

 const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost)

 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);








 const fetchAllBlogs = async () =>{
try{
  
  setError(null);
  setLoading(true);
  const res = await GetRequest('/blogs')
  setBlogs(res.data);

}catch(error){
  setError(error.response?.data?.message || "An error occurred. Please try again later.")

}finally{
  setLoading(false);

}
  
 }

 useEffect(()=>{
  fetchAllBlogs()
 }, [])


 const paginate = (number) => setCurrentPage(number);

  return (
    <div className='flex flex-col w-64 mt-7 mx-auto  gap-5 items-center  sm:w-[90%]  md:gap-6 lg:gap-7 xl:gap-8 2xl:gap-10  '>

      <div className="heading font-bold text-[24px] md:text-[30px] xl:text-[34px] text-center">Blog</div>
    {
      loading ? <Loader/> : error ? <div className="text-red-500">{error}</div> :   <div className="blogs flex flex-col gap-5  sm:grid sm:grid-cols-2 lg:gap-9 xl:grid-cols-3 "> 
      {
        currentPosts.map((value, index) => <div className=" sm:w-[256px] md:w-[300px]  " key={index}>
          <BlogCard blog={value}/>
        </div>)
      }

    </div>
    }
      <Pagination totalPosts={blogs.length} postsPerPage={postsPerPage} paginate={paginate} currentPage = {currentPage}/>
    </div>
  )
}
