import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart'
import authReducer from './userAuth'
import adminReducer from './adminAuth'
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";

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

const persistedAuthReducer = persistReducer(userConfigure, authReducer)
const persistedAdminReducer = persistReducer(adminConfigure, adminReducer)
const persistedCartReducer=persistReducer(cartConfigure,cartReducer)

export const store = configureStore({
    reducer: {
        cart: persistedCartReducer,
        userAuth: persistedAuthReducer,
        adminAuth: persistedAdminReducer,
    }
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
