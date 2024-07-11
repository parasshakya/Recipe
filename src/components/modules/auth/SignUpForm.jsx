import React, { useState } from 'react'
import { PasswordInput, TextInput, Button, Checkbox, rem } from '@mantine/core'
import { useNavigate } from 'react-router'
import { IconAt, IconLock } from '@tabler/icons-react'
import Sushi from "../../../assets/images/sushi.jpg"

export const SignUpForm = () => {

   
    const [signUpDetail, setSignUpDetail] = useState({
        username: "",
        email:"",
        password:""
    })


    const handleInput = (event) =>{
        setSignUpDetail({
            ...signUpDetail,
            [event.target.name] : event.target.value
        
        })
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        console.log("Submit value" , signUpDetail)

    }


    const navigate = useNavigate()


  return (
<form onSubmit={handleSubmit}>
<div style={{width: "90%"}} className='m-auto flex rounded-sm shadow-md max-w-screen-md gap-9  p-7  '>
            <img  className= " hidden md:block  h-96 w-1/2" src={Sushi} alt="" />
        <div className="right-form flex-grow flex-col flex justify-between ">
            <div className="title text-2xl">Want to join our Family?</div>
            <div className="username">
                <TextInput name='username' onChange={handleInput}  label="Username"
      placeholder="Enter username"/>
            </div>
            <div className="email">
                <TextInput name='email'  onChange={handleInput} leftSection={<IconAt style={{ width: rem(16), height: rem(16) }}/> }
                label="Email"
                placeholder="Enter email"/>
            </div>
            <div className="password">
                <PasswordInput  name='password'  onChange={handleInput} leftSection= {<IconLock style={{ width: rem(16), height: rem(16) }}/>} label="Password"
      placeholder="Enter password"/>
            </div>
            <div className="checkbox">
                <Checkbox
                      defaultChecked
                      label="I agree to the terms and conditions"
                />
            </div>

            <Button type='submit'>
                Sign up
            </Button>
            
            <div className="login">
                <div className="title">Already have an account? <span className='underline cursor-pointer text-red-600' onClick={
()=>{
    navigate('/auth/login')
}
                }>
                Log in</span></div>
            </div>
            
        </div>
    </div>
</form>
  )
}
