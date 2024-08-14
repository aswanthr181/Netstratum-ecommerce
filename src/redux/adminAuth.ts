import { createSlice } from "@reduxjs/toolkit";

const InitialState={
    adminData:''
}

const adminAuth=createSlice({
    name:"admin",
    initialState:InitialState,

    reducers:{
        GetAdminData(state,action){
            state.adminData=action.payload.adminData
        },
        LogOutAdmin(state,action){
            state.adminData=action.payload.adminData
        }
    }
})

export const {GetAdminData,LogOutAdmin}=adminAuth.actions
export default adminAuth.reducer