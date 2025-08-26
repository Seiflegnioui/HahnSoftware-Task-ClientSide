import { createSlice } from "@reduxjs/toolkit";
import { GetRecentOrders, GetOrdersCounts } from "./SellerHomeThunk";
import type { OrderCountsDTO, OrderDTO } from "../../Order";

export interface HomeGeneralStatsState {
    orders: OrderDTO[] | null;
    errors: string[] | null;
    ordersCounts: OrderCountsDTO | null;
    loading: boolean;
    productsCount: number | null;
}

const initialState: HomeGeneralStatsState = {
    orders: null,
    errors: null,
    ordersCounts: null,
    loading: false,
    productsCount: null
};

const SellerHomeSlice = createSlice({
    name: "seller/home",
    initialState,
    reducers: {
        setProductsCount: (state, action) => {
            state.productsCount = action.payload;
        },
        clearErrors: (state) => {
            state.errors = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetRecentOrders.pending, (state) => {
            state.loading = true;
            state.errors = null;
        });
        builder.addCase(GetRecentOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
            state.errors = null;
        });
        builder.addCase(GetRecentOrders.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload ? [action.payload] : ['Failed to fetch recent orders'];
        });

        builder.addCase(GetOrdersCounts.pending, (state) => {
            state.loading = true;
            state.errors = null;
        });
        builder.addCase(GetOrdersCounts.fulfilled, (state, action) => {
            state.loading = false;
            state.ordersCounts = action.payload;
            state.errors = null;
        });
        builder.addCase(GetOrdersCounts.rejected, (state, action) => {
            state.loading = false;
            state.errors = action.payload ? [action.payload] : ['Failed to fetch orders counts'];
        });
    }
});

export const { setProductsCount, clearErrors } = SellerHomeSlice.actions;
export default SellerHomeSlice.reducer;