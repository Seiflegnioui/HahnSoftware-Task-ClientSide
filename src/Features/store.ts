import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './User/index'
import SellerReducer from './Seller/Create/CreateSellerSlice'
import BuyerReducer from './Buyer/Create/CreateBuyerSlice'
import orderReducer from '../Features/Order/index'
import { productReducer } from "./Seller/Products";

export const store = configureStore({
    reducer:{
        user: UserReducer,
        seller : SellerReducer,
        buyer : BuyerReducer,
        product: productReducer,
        order : orderReducer
    }
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type MyStore = typeof store