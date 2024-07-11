import { Rating } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import Berries from "../../../assets/images/berries.jpg"

export const ExploreRecipes = () => {
    const [ratingSize, setRatingSize] = useState(12);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setRatingSize(12);
            } else if (window.innerWidth >= 640 && window.innerWidth < 1024) {
                setRatingSize(16);
            } else {
                setRatingSize(20);
            }
        };

        handleResize(); // Set initial size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    const recipes = [
        {
            name: "Tuna salad",
            image: Berries,
            rating : 2
            
        },
        {
            name: "Buff momo",
            image: Berries,
            rating:3
            
        },
        {
            name: "Chowmein",
            image: Berries,
            rating: 4
            
        },
        {
            name: "Chicken Tandoori",
            image: Berries,
            rating: 5
            
        },
      
    ];


  return (
    <div className='m-auto flex flex-col w-[90%]   items-center mt-5   md:mt-28  ' >
           <div className="content  w-full flex flex-col gap-8">
           <div className="heading flex justify-between items-center">
           <div className='text-xl md:text-2xl font-semibold xl:text-3xl '>Explore Recipes</div>
           <div className=''>View more</div>
           </div>

<div className="grid-recipes self-center w-full  grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4    ">

    {
        //md:w-56 lg:w-64 xl:w-72 2xl:w-96
        recipes.map((recipe, index) => <div className= '  border-gray-300  border-2 mx-auto w-full   p-4 rounded-md  flex flex-col gap-4'  key={index}>
            <div >
                <img src= {`${recipe.image}`} className='h-32 sm:h-36   md:h-44 lg:h-56 xl:h-60 2xl:h-64  w-full' alt="" />
            </div>
       <div>
       <div>
       <Rating size={ratingSize}  value={recipe.rating} fractions={2} readOnly />
       </div>
       <div className='sm:text-xl'>
       {recipe.name}
       </div>
       </div>
     
        </div>)
    }

</div>
           </div>

    </div>
    
  )
}
