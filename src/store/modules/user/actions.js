import { SET_USER_PROFILE } from "./actionTypes"



export const setUserProfile = (userProfile) =>{
    return{
        type: SET_USER_PROFILE,
        payload: userProfile
    }
}