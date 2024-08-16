import { createSlice } from "@reduxjs/toolkit";
import { userDataType } from "../Types/allType";

interface UserAuthState {
    userData: userDataType|null;
}
const InitialState: UserAuthState={
    userData:null
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