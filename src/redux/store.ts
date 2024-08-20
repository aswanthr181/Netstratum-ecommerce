import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { InitialCartStateType } from './cart'
import authReducer from './userAuth'
import adminReducer from './adminAuth'
import orderReducer, { InitialOrderStateType } from './order'

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { Action } from "@reduxjs/toolkit";
import { UserAuthState } from "./userAuth";
// import { AdminAuthState } from "../Types/allType";
import { AdminAuthState } from "./adminAuth";

const userConfigure = {
    key: 'user',
    storage
}
const adminConfigure = {
    key: 'admin',
    storage
}
const cartConfigure={
    key:"cart",
    storage
}
const orderConfigure={
    key:"order",
    storage
}

const persistedAuthReducer = persistReducer<UserAuthState,Action>(userConfigure, authReducer)
const persistedAdminReducer = persistReducer<AdminAuthState,Action>(adminConfigure, adminReducer)
const persistedCartReducer=persistReducer<InitialCartStateType,Action>(cartConfigure,cartReducer)
const persistedOrderReducer=persistReducer<InitialOrderStateType,Action>(orderConfigure,orderReducer)


export const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
        userAuth: persistedAuthReducer,
        adminAuth: persistedAdminReducer,
        order:persistedOrderReducer
    }
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
