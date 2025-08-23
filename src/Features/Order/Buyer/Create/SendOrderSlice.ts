import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { SendOrder } from "./SendOrderThunk";

interface OrderState {
  loading: boolean;
  errors: string[];
  lastOrderId?: number;
  orderSuccess: boolean;
}

const initialState: OrderState = {
  loading: false,
  errors: [],
  orderSuccess: false,
};

const CreateOrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SendOrder.pending, (state) => {
        state.loading = true;
        state.errors = [];
        state.orderSuccess = false;
      })
      .addCase(SendOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.errors = [];
        state.orderSuccess = true;
        state.lastOrderId = action.payload?.id; 
      })
      .addCase(SendOrder.rejected, (state, action) => {
        state.loading = false;
        state.orderSuccess = false;
        state.errors = [action.payload as string || "Failed to place order"];
      });
  },
});

export default CreateOrderSlice.reducer;