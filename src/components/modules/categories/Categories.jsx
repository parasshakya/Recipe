import { Rating } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import Berries from "../../../assets/images/berries.jpg"

export const Categories = () => {

  


    const categories = [
      {
        title:"Breakfast",
        image: Berries
        
      },
      {
        title:"Dinner",
        image: Berries
        
      },
      {
        title:"Lunch",
        image: Berries
        
      },
      {
        title:"Desert",
        image: Berries
        
      },
      {
        title:"Appetizer",
        image: Berries
        
      },
      {
        title:"Main course",
        image: Berries
        
      },
     
      
      
      
      
    ];


  return (
    <div className='m-auto flex flex-col w-[90%]   items-center mt-5   md:mt-28  ' >
           <div className="content  w-full flex flex-col gap-8">
           <div className="heading flex justify-between items-center">
           <div className='text-xl md:text-2xl font-semibold xl:text-3xl '>Categories</div>
           <div className=''>View more</div>
           </div>

<div className="grid-recipes self-center w-full  grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4    ">

    {
        //md:w-56 lg:w-64 xl:w-72 2xl:w-96
        categories.map((category, index) => <div className= '   mx-auto w-full    flex flex-col gap-4'  key={index}>
            <div >
                <img src= {`${category.image}`} className='h-32 w-32  rounded-full mx-auto   sm:h-36 sm:w-36  md:h-44 md:w-44 lg:h-56 lg:w-56 xl:h-60 xl:w-60 2xl:h-64 2xl:w-64 ' alt="" />
            </div>
        
       <div className='sm:text-xl text-center '>
       {category.title}
       </div>
       
     


        </div>)
    }

</div>
           </div>

    </div>
    
  )
}
