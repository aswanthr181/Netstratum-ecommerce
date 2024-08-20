import { createSlice } from "@reduxjs/toolkit";
import { adminDataType } from "../Types/allType";

export interface AdminAuthState {
    adminData: adminDataType|null;
    current:number
}
const InitialState: AdminAuthState={
    adminData:null,
    current:0
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
        },
        CurrentPage(state,action){
            state.current=action.payload.page
        }
    }
})

export const {GetAdminData,LogOutAdmin,CurrentPage}=adminAuth.actions
export default adminAuth.reducer