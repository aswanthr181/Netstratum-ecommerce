import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, orderDetailsType } from "../Types/allType";

export interface InitialOrderStateType {
    orderList: orderDetailsType[]
}

const InitialState: InitialOrderStateType = {
    orderList: [],
}

const orderSlice = createSlice({
    name: "order",
    initialState: InitialState,
    reducers: {
        newOrder: (state, action: PayloadAction<{ user: string; products: CartItem[]; address: string; total: number; status: string; paymentType: string; phone: number;name:string;date:string }>) => {
            const { user, products, address, total, status, paymentType, phone,name,date } = action.payload;
            
            state.orderList.push({ user, products, address, total, status, paymentType, phone, date,name })
        },
    }

})

export const { newOrder } = orderSlice.actions
export default orderSlice.reducer