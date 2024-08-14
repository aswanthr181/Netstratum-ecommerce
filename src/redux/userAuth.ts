import { createSlice } from "@reduxjs/toolkit";

const InitialState={
    userData:''
}

const userAuth=createSlice({
    name:"user",
    initialState:InitialState,

    reducers:{
        GetUserData(state,action){
            state.userData=action.payload.userData
        },
        LogoutUser(state,action){
            state.userData=action.payload.userData
        },
    }
})

export const {GetUserData,LogoutUser}=userAuth.actions
export default userAuth.reducer