import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { BuyerOrders } from "./GetBuyerOrderThunk";
import type { OrderDTO } from "../..";

interface BuyerOrdersState {
    orders: OrderDTO[] | null;
    loading: boolean;
    errors: string[];
}

const initialState: BuyerOrdersState = {
    orders: null,
    loading: false,
    errors: []
};

const BuyerOrderSlice = createSlice({
    name: "buyerOrders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(BuyerOrders.pending, (state) => {
                state.loading = true;
                state.errors = [];
            })
            .addCase(BuyerOrders.fulfilled, (state, action : PayloadAction<OrderDTO[]>) => {                
                state.loading = false;
                state.orders = action.payload;
                state.errors = [];
            })
            .addCase(BuyerOrders.rejected, (state, action) => {
                state.loading = false;
                state.errors = [action.payload as string || "Failed to fetch orders"];
            });
    },
});

export default BuyerOrderSlice.reducer;