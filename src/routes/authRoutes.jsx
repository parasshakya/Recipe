import React from 'react'
import { SignUpPage } from '../pages/SignUpPage';
import { LoginPage } from '../pages/LoginPage';

export const authRoutes = [
    {
        name:"Sign Up",
        path: "/signup",
        element: <SignUpPage/>
    },
    {
        name:"Login",
        path: "/login",
        element: <LoginPage/>
    }

];