import { createSlice } from "@reduxjs/toolkit";
import type { OrderState } from "../..";
import { UpdateState } from "./UpdateStateThunk";

export interface UpdateStateDTO {
  state: OrderState;
  orderId: number;
}

interface UpdateStateSlice {
  errors: string[];
  loading: boolean;
  success: boolean;
}

const initialState: UpdateStateSlice = {
  errors: [],
  loading: false,
  success: false
};

const updateStateSlice = createSlice({
  name: "updateState", 
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.errors = [];
      state.loading = false;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateState.pending, (state) => {
        state.loading = true;
        state.errors = [];
        state.success = false;
      })
      .addCase(UpdateState.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.errors = [];
      })
      .addCase(UpdateState.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.errors = action.payload ? [action.payload] : ["Unknown error occurred"];
      });
  },
});

export const { resetUpdateState } = updateStateSlice.actions;
export default updateStateSlice.reducer;