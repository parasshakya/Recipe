import { SET_TOKEN } from "./actionTypes"


const initialState = {
    token: ""
}


export const authReducer = (state = initialState, action) =>{

    switch(action.type){
        case SET_TOKEN:
            return{
                token: action.payload
            }

         default: 
         return state;   
    }
}