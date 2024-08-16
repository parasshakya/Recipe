import React, { useState } from 'react'
import { PasswordInput, TextInput, Button, Checkbox, rem, Loader } from '@mantine/core'
import { useNavigate } from 'react-router'
import { IconAt } from '@tabler/icons-react'
import Berries from "../../../assets/images/berries.jpg"
import { PostRequest } from '../../../plugins/https'
import { setToken } from '../../../store/modules/auth/actions'
import { useDispatch } from 'react-redux'
import {  setUserProfile } from '../../../store/modules/user/actions'
import toast from 'react-hot-toast'




export const LoginForm = () => {

    const dispatch = useDispatch()


    const navigate = useNavigate()

    const[loading, setLoading] = useState(false);

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

    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const[serverError, setServerError] = useState(null);


    const validate =  () =>{
       const newErrors = {};
       

       if(!loginDetail.email){
            newErrors.email = "Please enter email";
       }
       if(!loginDetail.password){
        newErrors.password = "Please enter password";

       }
       setErrors(newErrors);
       return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = async(event) =>{
     try{

        event.preventDefault();
        setLoading(true);

        if(!validate()){
            return;
        }

        const res = await PostRequest("/auth/login", loginDetail)

        const token = res.data.token;
        localStorage.setItem("token", token)


        const user = res.data.userData;
        localStorage.setItem("userData", JSON.stringify(user));

        toast.success(res.message);



        dispatch(setToken(token))
        dispatch(setUserProfile(user))


        navigate('/')

     }catch(e){




     }finally{
        setLoading(false);
     }

    }


  return (
<form onSubmit={handleSubmit}>
<div style={{width: "90%"}} className='m-auto mt-9 xl:mt-11 flex rounded-sm shadow-md max-w-screen-md gap-9  p-7  '>
            <img  className= " hidden md:block  h-96 w-1/2" src={Berries} alt="" />
        <div className="right-form flex-grow flex-col flex justify-between gap-5 md:gap-0">
            <div className="title text-2xl">Welcome back !</div>
            {serverError && <div className='text-red-600'>{serverError}</div>}
         <div className='flex flex-col gap-3'>
            
         <div className="email">
                <TextInput type='email' error= {errors.email} name='email' onChange={handleInput} leftSection={<IconAt style={{ width: rem(16), height: rem(16) }}/> }
                label="Email"
                placeholder="Enter email"/>
            </div>
            <div  className="password">
                <PasswordInput error = {errors.password} onChange={handleInput} name='password' label="Password"
      placeholder="Enter password"/>
            </div>
         </div>
          
            <div className="login">
               <Button className='w-full' type='submit'>
             {loading ? <Loader color='white' size={24}/> : <>
             Submit
             </>}
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
