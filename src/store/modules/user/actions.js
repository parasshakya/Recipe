import { SET_USER_ID, SET_USER_PROFILE } from "./actionTypes"

export const setUserId = (userID) =>{
   return {
        type: SET_USER_ID,
        payload: userID
    }
}

export const setUserProfile = (userProfile) =>{
    return{
        type: SET_USER_PROFILE,
        payload: userProfile
    }
}