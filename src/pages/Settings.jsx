import React from 'react'
import { useDispatch } from 'react-redux';
import { setToken } from '../store/modules/auth/actions';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router';
import { setUserProfile } from '../store/modules/user/actions';

export const Settings = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logout = async() => {

        localStorage.clear();
        dispatch(setToken(""))
        dispatch(setUserProfile(null))
      
        navigate("/")

        

    }

  return (
    <Button onClick={logout}>
        Logout
    </Button>
  )
}
