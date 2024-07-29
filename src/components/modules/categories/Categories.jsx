import {  Rating } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import Berries from "../../../assets/images/berries.jpg"
import { GetRequest } from '../../../plugins/https';
import { Modal } from '../../modal/Modal';
import { useNavigate } from 'react-router';

export const Categories = () => {

  


 const [categories, setCategories] = useState([])

 const[isModalOpen, setIsModalOpen] = useState(false);

 const openModal = () => {
    setIsModalOpen(true);
 }
 const closeModal = () =>{
    setIsModalOpen(false);
 }
 

 const fetchAllCategories = async () => {

  const res = await GetRequest("/categories")
  setCategories(res.data)

 }

 const navigate = useNavigate();

 const modalTitle = <div>You are not logged in!</div>
 const modalSubtitle = <div>Please <span onClick={()=>{
navigate("/auth/login")
 }} className='text-red-500 cursor-pointer underline'>Log in</span> or <span  onClick={()=>{
    navigate("/auth/signup")
 }} className='text-blue-500 cursor-pointer underline'>Sign up</span> to continue</div>
 
 useEffect(()=>{
  fetchAllCategories()
 }, [])


  return (
    <div className='m-auto flex flex-col w-[90%]   items-center mt-5   md:mt-28  ' >
           <div className="content  w-full flex flex-col gap-8">
           <div className="heading flex justify-between items-center">
           <div className='text-xl md:text-2xl font-semibold xl:text-3xl '>Categories</div>
           <div className=''>View more</div>
           </div>

<div className="grid-recipes self-center w-full  grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4    ">

    {
        categories.map((category, index) => <div className= ' cursor-pointer   mx-auto w-full    flex flex-col gap-4' onClick={openModal}  key={index}>
            <div >
                <img src= {`http://localhost:3002/uploads/${category.image}`} className='h-32 w-32  rounded-full mx-auto   sm:h-36 sm:w-36  md:h-44 md:w-44 lg:h-56 lg:w-56 xl:h-60 xl:w-60 2xl:h-64 2xl:w-64 ' alt="image" />
            </div>
        
       <div className='sm:text-xl text-center '>
       {category.name}
       </div>
       
     


        </div>)
    }

</div>
{
   isModalOpen && <Modal title={modalTitle} subtitle={modalSubtitle}  closeModal={closeModal}/>
}


           </div>

    </div>
    
  )
}
