import React, { useState } from 'react'
import { PasswordInput, TextInput, Button, Checkbox, rem } from '@mantine/core'
import { useNavigate } from 'react-router'
import { IconAt, IconLock } from '@tabler/icons-react'
import Sushi from "../../../assets/images/sushi.jpg"
import { PostRequest } from '../../../plugins/https'
import { setToken } from '../../../store/modules/auth/actions'
import { useDispatch } from 'react-redux'


export const SignUpForm = () => {


    const dispatch = useDispatch()

   
    const [signUpDetail, setSignUpDetail] = useState({
        username: "",
        email:"",
        password:"",
        image: null
    })

    const [errors, setErrors] = useState({
        username: "",
        email:"",
        password:"",
        image: "" 
    })

    const [agreeTerms, setAgreeTerms] = useState(false);

    const [serverError, setServerError] = useState(null);

    const [imagePreview, setImagePreview] = useState(null)

    const convertToFormData = (obj) =>{
        const formData = new FormData();
            for(var key in obj){

                formData.append(key, obj[key])

            }
            return formData;
    }

    const validate = () =>{
        const newErrors = {};

        if(!signUpDetail.email){
            newErrors.email = "Please enter email";
        }
        if(!signUpDetail.password){
            newErrors.password = "Please enter password";
        }
        if(!signUpDetail.image){

            newErrors.image = "Please select an image";

        }
        if(!signUpDetail.username){
            newErrors.username = "Please enter username";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }


    const handleInput = (event) =>{
        setSignUpDetail({
            ...signUpDetail,
            [event.target.name] : event.target.value
        
        })
    }

    const resetImage = () => {
        const image = document.getElementById("profile-pic")
        image.value = "";
    }




    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(!validate()){
            return ;
        }


        try{

        const formData = convertToFormData(signUpDetail);


            
        const res = await PostRequest("/auth/signup", formData)

        const token = res.data.token;
        resetImage();
        localStorage.setItem("token", token);


      dispatch(setToken(token))

      navigate("/")

        
        

        }catch(e){

            console.log(e);
            setServerError("An error occured. Please try again later.");
        }

    }

    const handleCheckboxChange = (event) =>{
        setAgreeTerms(event.target.checked);
    }

    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        if(file){
           setSignUpDetail(
           {
            ...signUpDetail,
            image:file
           }
           )
           setImagePreview(URL.createObjectURL(file))
        }

    }

   
    const navigate = useNavigate()


  return (
<form onSubmit={handleSubmit}>
<div  className='m-auto w-[90%] mt-9 xl:mt-11  flex rounded-sm shadow-md max-w-screen-md gap-9  p-7  '>
            <img  className= " hidden md:block  h-96 w-1/2" src={Sushi} alt="" />
        <div className="right-form gap-3 md:gap-4  xl:gap-5  flex-grow flex-col flex justify-between ">
            <div className="title text-2xl">Want to join our Family?</div>
            {serverError && <div className='text-red-600'>{serverError}</div>}
            <div className="username">
                <TextInput name='username' error= {errors.username} onChange={handleInput}  label="Username"
      placeholder="Enter username"/>
            </div>
            <div className="email">
                <TextInput name='email' error = {errors.email}  onChange={handleInput} leftSection={<IconAt style={{ width: rem(16), height: rem(16) }}/> }
                label="Email"
                placeholder="Enter email"/>
            </div>
            <div className="password">
                <PasswordInput  name='password' error = {errors.password}  onChange={handleInput} leftSection= {<IconLock style={{ width: rem(16), height: rem(16) }}/>} label="Password"
      placeholder="Enter password"/>
            </div>
         
               {<div className="choose-pro-pic flex flex-col ">
                <div className="title font-semibold">Choose profile picture </div>
               <input className='w-full' name='image' id='profile-pic'   type="file"  accept="image/*" onChange={handleImageChange} />
               {errors.image && <div className='text-red-600'>{errors.image}</div>}
               </div>   }

           
           
            {
                imagePreview && <img className='w-24 ' src={imagePreview}  ></img>
            }

    
            <div className="checkbox">
                <Checkbox

                    checked ={agreeTerms}
                    onChange={handleCheckboxChange}
                
                      defaultChecked
                      label="I agree to the terms and conditions"
                />
            </div>

            <Button disabled = {!agreeTerms} type='submit'>
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
