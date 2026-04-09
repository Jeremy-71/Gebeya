import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/api/authSlice';
import productReducer from './features/products/api/ProductSlice';
import cartReducer from "./features/cart/api/CartSlice"
export const store=configureStore({
    reducer:{
      products: productReducer,
        auth: authReducer,
        cart:cartReducer,
    }
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch=typeof store.dispatch   