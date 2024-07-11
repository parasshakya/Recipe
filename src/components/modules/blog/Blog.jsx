import { Rating } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import Berries from "../../../assets/images/berries.jpg"

export const Blog = () => {

  


    const blogs = [
      {
        title:"Intermittent fasting benefits",
        description: "lsdjfl;sadjf;lksadjf;lsdakjflsjdflsadkfjlsdfjlsdfjlsdkfjlksdjflsdjflsdkfjlsdkfjlsdkfjlsdfjlksdjflsdkjflsdfkjlsdfj",
        image: Berries
        
      },
      {
        title:"Intermittent fasting benefits",
        description: "lsdjfl;sadjf;lksadjf;lsdakjflsjdflsadkfjlsdfjlsdfjlsdkfjlksdjflsdjflsdkfjlsdkfjlsdkfjlsdfjlksdjflsdkjflsdfkjlsdfj",
        image: Berries
        
      },
      {
        title:"Intermittent fasting benefits",
        description: "lsdjfl;sadjf;lksadjf;lsdakjflsjdflsadkfjlsdfjlsdfjlsdkfjlksdjflsdjflsdkfjlsdkfjlsdkfjlsdfjlksdjflsdkjflsdfkjlsdfj",
        image: Berries
        
      },
      {
        title:"Intermittent fasting benefits",
        description: "lsdjfl;sadjf;lksadjf;lsdakjflsjdflsadkfjlsdfjlsdfjlsdkfjlksdjflsdjflsdkfjlsdkfjlsdkfjlsdfjlksdjflsdkjflsdfkjlsdfj",
        image: Berries
        
      },
      {
        title:"Intermittent fasting benefits",
        description: "lsdjfl;sadjf;lksadjf;lsdakjflsjdflsadkfjlsdfjlsdfjlsdkfjlksdjflsdjflsdkfjlsdkfjlsdkfjlsdfjlksdjflsdkjflsdfkjlsdfj",
        image: Berries
        
      },
      {
        title:"Intermittent fasting benefits",
        description: "lsdjfl;sadjf;lksadjf;lsdakjflsjdflsadkfjlsdfjlsdfjlsdkfjlksdjflsdjflsdkfjlsdkfjlsdkfjlsdfjlksdjflsdkjflsdfkjlsdfj",
        image: Berries
        
      },
   
      
      
      
      
    ];


  return (
    <div className='m-auto flex flex-col w-[90%]   items-center mt-5   md:mt-28  ' >
           <div className="content  w-full flex flex-col gap-8">
           <div className="heading flex justify-between items-center">
           <div className='text-xl md:text-2xl font-semibold xl:text-3xl '>Blogs</div>
           <div className=''>View more</div>
           </div>

<div className="grid-recipes self-center w-full  grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4    ">

    {
        //md:w-56 lg:w-64 xl:w-72 2xl:w-96
        blogs.map((blog, index) => <div className= '  border-gray-300 border-2 mx-auto w-full   p-4 rounded-md  flex flex-col gap-4'  key={index}>
            <div >
                <img src= {`${blog.image}`} className='h-32 sm:h-36   md:h-44 lg:h-56 xl:h-60 2xl:h-64  w-full' alt="" />
            </div>
       <div>
      
       <div className='sm:text-xl'>
       {blog.title}
       </div>
       <div className=' line-clamp-3'>
       {blog.description}
       </div>
       </div>
     
        </div>)
    }

</div>
           </div>

    </div>
    
  )
}
