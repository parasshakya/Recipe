import { IconBrandFacebook, IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='footer-container mt-24 bg-gray-300 flex flex-col gap-11 py-10'>
     <div className='flex flex-col md:flex-row w-[90%] mx-auto'>
     <div className="first flex flex-col w-full gap-4">
            <div className="logo flex items-center gap-3">
                <img src="https://cdn.pixabay.com/photo/2017/02/17/17/33/food-2074638_1280.png" className='w-10' alt="" />
                <div className="text text-2xl font-bold ">Perfect<span className='text-red-400'>Recipe</span></div>
            </div>
            <div className="subtitle md:w-5/6 ">The purpose of this website is to provide high quality top notch recipes from top chefs including both professional and homemade chefs from countries all around the world</div>
        </div>
        <div className="second flex justify-between w-full md:mt-0  mt-6">

            <div className="links-1 flex flex-col gap-2">
                <div className="title font-bold">Quick Links</div>
                <div className="link-items gap-2 flex flex-col">
                    <div className="link-item"><NavLink to={"/home"}>Home</NavLink></div>
                    <div className="link-item"><NavLink to={"/recipes"}>Recipes</NavLink></div>
                    <div className="link-item"><NavLink to={"/blogs"}>Blog</NavLink></div>

               
                </div>

            </div>
            <div className="links-2 flex flex-col gap-2">
            <div className="title font-bold">Quick Links</div>
                <div className="link-items gap-2 flex flex-col">
                <div className="link-item">Share Recipe</div>
                    <div className="link-item"><NavLink to={"/contact"}>Contact</NavLink></div>
                    <div className="link-item"><NavLink to={"/about"}>About us</NavLink></div>

                </div>

            </div>
            <div className="links-3 flex flex-col gap-2">
            <div className="title font-bold">Legal</div>
                <div className="link-items gap-2 flex flex-col">
                <div className="link-item"><NavLink to={"/termsofuse"}>Terms of use</NavLink></div>
                    <div className="link-item"><NavLink to={"/privacyandcookies"}>Privacy & cookies</NavLink></div>


               
                </div>

            </div>

          

        </div>
     </div>
        <div className="third  md:flex-row-reverse md:justify-between flex flex-col gap-4 w-[90%] mx-auto">
            <div className="social-icons gap-4  sm:gap-8  max-w-80 mx-auto md:mx-0 flex justify-center">
                <div><IconBrandFacebook/></div>
                <div><IconBrandInstagram/></div>
                <div><IconBrandTwitter/></div>
                <div><IconBrandYoutube/></div>
            </div>
            <div className="copyright-message text-center">
                All rights reserved
            </div>
        </div>

    </div>
  )
}
