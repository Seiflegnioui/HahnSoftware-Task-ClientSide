import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './User/UserSlice'
import SellerReducer from './Seller/Create/CreateSellerSlice'
import BuyerReducer from './Buyer/Create/CreateBuyerSlice'
export const store = configureStore({
    reducer:{
        user: UserReducer,
        seller : SellerReducer,
        buyer : BuyerReducer,
    }
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export type MyStore = typeof store