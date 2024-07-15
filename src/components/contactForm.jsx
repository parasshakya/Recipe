import React, { useState } from 'react'
import { PasswordInput, TextInput, Button, Checkbox, rem, Textarea } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import Berries from "../assets/images/berries.jpg"



export const ContactForm = () => {



    const[contactDetail, setContactDetail] = useState({
        email: "",
        phoneNumber: "",
        message:"",
    
    })

    const handleInput = (event) =>{

        setContactDetail({
            ...contactDetail,
            [event.target.name] : event.target.value
        })

    }

    const handleSubmit = () =>{
        console.log('Contact submit', contactDetail)
        event.preventDefault();
    }


  return (
<form onSubmit={handleSubmit}>
<div style={{width: "90%"}} className='m-auto mt-9 xl:mt-11  flex rounded-sm shadow-md max-w-screen-md gap-9  p-7  '>
            <img  className= " hidden md:block  h-96 w-1/2" src="https://cdn.pixabay.com/photo/2023/09/05/12/44/mug-8235059_1280.jpg" alt="" />
        <div className="right-form flex-grow flex-col flex justify-between gap-5 md:gap-0">
            <div className="title text-2xl">Contact Us</div>
         <div className='flex flex-col gap-3'>
            
         <div className="email">
                <TextInput name='email' onChange={handleInput} leftSection={<IconAt style={{ width: rem(16), height: rem(16) }}/> }
                label="Email"
                placeholder="Enter email"/>
            </div>
            <div  className="phoneNumber">
                <TextInput onChange={handleInput} name='phoneNumber' label="Phone Number"
      placeholder="Enter phone number"/>
            </div>
            <div  className="message">
                <Textarea onChange={handleInput} name='message' label="Message"
      placeholder="Enter message"/>
            </div>
         </div>
          
               <Button type='submit'>
                Submit
               </Button>
           
            
        </div>
    </div>
</form>
  )
}
