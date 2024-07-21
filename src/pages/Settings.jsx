import React from 'react'
import { useDispatch } from 'react-redux';
import { setToken } from '../store/modules/auth/actions';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router';

export const Settings = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const logout = async() => {

        localStorage.clear();
        dispatch(setToken(""))
        navigate("/")

        

    }

  return (
    <Button onClick={logout}>
        Logout
    </Button>
  )
}
