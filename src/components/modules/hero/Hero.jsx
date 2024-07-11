import React from 'react'
import MyImage from "../../../assets/images/food-plate.png";
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router';

export const Hero = () => {


  const navigate  = useNavigate()


  return (
    <div className='hero-container w-[90%]  mt-4  md:mt-8  flex flex-col justify-center gap-5 items-center relative  m-auto md:flex-row ' >
          


        <div className="content   text-center flex flex-col gap-6 items-center max-w-screen-sm " >
            <div className="title text-4xl lg:text-[40px] xl:text-5xl font-bold ">Your Daily Dish <br/> A <span className='text-red-400'>Food</span> Journey</div>
            <div className="subtitle text-gray-500 lg:text-[18px]">Explore food varieties like never before. Deep dive into the molecules of how the best dishes are made within the confines of your home.</div>
            <div className="buttons flex gap-2">
          <Button className='bg-red-400  lg:text-[16px]' onClick={() =>{
            navigate('/auth/login')
          }}>
            Login
          </Button>
          <Button className='lg:text-[16px]' onClick={()=>{
            navigate("/auth/signup")
          }}>
            Sign up
          </Button>
        </div>
            


        </div>

        <div className="image max-w-72 xl:max-w-96">
            <img src={MyImage} alt="food" />
        </div>
        

    </div>
    
  )
}
