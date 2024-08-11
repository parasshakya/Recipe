import {  SET_USER_PROFILE } from "./actionTypes"


const initialState = {
    profile: null
}


export const userReducer = (state = initialState, action) => {
    switch(action.type){
    
        case SET_USER_PROFILE: 
        return {
            ...state,
            profile: action.payload
        }

        default:
            return state;

    }
}