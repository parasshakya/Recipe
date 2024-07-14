import React, { useState } from 'react'
import { PasswordInput, TextInput, Button, Checkbox, rem } from '@mantine/core'
import { useNavigate } from 'react-router'
import { IconAt } from '@tabler/icons-react'
import Berries from "../../../assets/images/berries.jpg"



export const LoginForm = () => {


    const navigate = useNavigate()

    const[loginDetail, setLoginDetail] = useState({
        email: "",
        password: ""
    })

    const handleInput = (event) =>{

        setLoginDetail({
            ...loginDetail,
            [event.target.name] : event.target.value
        })

    }

    const handleSubmit = () =>{
        console.log('Login submit', loginDetail)
        event.preventDefault();
    }


  return (
<form onSubmit={handleSubmit}>
<div style={{width: "90%"}} className='m-auto flex rounded-sm shadow-md max-w-screen-md gap-9  p-7  '>
            <img  className= " hidden md:block  h-96 w-1/2" src={Berries} alt="" />
        <div className="right-form flex-grow flex-col flex justify-between gap-5 md:gap-0">
            <div className="title text-2xl">Welcome back !</div>
         <div className='flex flex-col gap-3'>
            
         <div className="email">
                <TextInput name='email' onChange={handleInput} leftSection={<IconAt style={{ width: rem(16), height: rem(16) }}/> }
                label="Email"
                placeholder="Enter email"/>
            </div>
            <div  className="password">
                <PasswordInput onChange={handleInput} name='password' label="Password"
      placeholder="Enter password"/>
            </div>
         </div>
          
            <div className="login">
               <Button type='submit'>
                Login
               </Button>
            </div>
            <div className="signup">
                <div className="title">Don't have an account? <span className='underline cursor-pointer text-red-600' onClick={
()=>{
    navigate('/auth/signup')
}
                }>
                Sign up</span></div>
            </div>
            
        </div>
    </div>
</form>
  )
}