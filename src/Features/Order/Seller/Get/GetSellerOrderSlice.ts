import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { OrderDTO } from "../..";
import { SellerOrder } from "./GetBuyerOrderThunk";

interface SellerOrdersState {
    orders: OrderDTO[] | null;
    loading: boolean;
    errors: string[];
}

const initialState: SellerOrdersState = {
    orders: null,
    loading: false,
    errors: []
};

const SellerOrderSlice = createSlice({
    name: "SellerOrders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(SellerOrder.pending, (state) => {
                state.loading = true;
                state.errors = [];
            })
            .addCase(SellerOrder.fulfilled, (state, action : PayloadAction<OrderDTO[]>) => {
                console.log(action.payload);
                
                state.loading = false;
                state.orders = action.payload;
                state.errors = [];
            })
            .addCase(SellerOrder.rejected, (state, action) => {
                state.loading = false;
                state.errors = [action.payload as string || "Failed to fetch orders"];
            });
    },
});

export default SellerOrderSlice.reducer;