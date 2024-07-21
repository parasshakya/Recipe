import React from 'react'
import Burger from "../assets/images/burger.png"
import Chowmein from "../assets/images/chowmein.png"

export const About = () => {
  return (
   
    <div className='main-container mt-8 flex flex-col w-[90%] m-auto gap-10 md:gap-28 max-w-[425px] md:max-w-[830px] lg:gap-32 xl:gap-36 '>
                  <div className="title text-black text-center font-bold text-3xl md:text-[34px] lg:text-[36px] xl:text-[40px] 2xl:text-[44px]">About us</div>

        <div className="    relative flex flex-col justify-center gap-4 items-center md:flex-row md:gap-8 xl:gap-12 2xl:gap-24">
        <img src= {Burger} className='w-64 md:w-72 xl:w-80' alt="" />

    

    <div className="subtitle text-center text-black lg:text-[21px] xl:text-[24px] md:text-xl ">At <span className='font-bold'>PerfectRecipe</span>, we believe that cooking is more than just a necessity—it's an art form, a source of joy, and a way to connect with loved ones.</div>
 
      </div>
      <div className="    relative  flex flex-col-reverse justify-center gap-4 items-center md:flex-row md:gap-8 xl:gap-12 2xl:gap-24">

    

    <div className="subtitle text-center text-black lg:text-[21px] xl:text-[24px] md:text-xl ">Our <span className='font-bold'>mission</span> is to inspire home cooks of all levels to explore the culinary world, experiment with new flavors, and create delicious meals with ease.
</div>
    <img src= {Chowmein} className='w-64 md:w-72 xl:w-80' alt="" />

 
      </div>
      <div className="our-story  m-auto  relative flex flex-col items-center justify-center gap-4  ">
        <img src="https://cdn.pixabay.com/photo/2017/04/04/01/08/fruits-2200001_1280.jpg" className=' h-60 md:h-auto   border rounded-xl' alt="" />
     <div className="text-content flex max-w-[356px] flex-col gap-1  md:gap-3 md:max-w-none absolute p-6 text-white">
     <div className="title text-[16px] md:text-xl font-semibold text-center  xl:text-[24px]">Our Story</div>
      <div className="subtitle text-center text-[14px] md:text-[16px] xl:text-[18px] ">PerfectRecipe was born out of a passion for good food and a love for sharing recipes. Whether you're a seasoned chef or a kitchen novice, we want to be your go-to source for all things culinary. Our journey began from a family tradition with a deep desire to serve food.

</div>
     </div>
      </div>
    </div>
   
  )
}
