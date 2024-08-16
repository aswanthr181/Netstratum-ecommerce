import { createSlice } from "@reduxjs/toolkit";
import { adminDataType } from "../Types/allType";

interface AdminAuthState {
    adminData: adminDataType|null;
}
const InitialState: AdminAuthState={
    adminData:null
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