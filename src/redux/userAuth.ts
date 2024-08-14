import { createSlice } from "@reduxjs/toolkit";

interface UserAuthState {
    userData: string;
}
const InitialState: UserAuthState={
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