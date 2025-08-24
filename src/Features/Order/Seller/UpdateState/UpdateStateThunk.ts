import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../../API/AxiosClient";
import type { OrderDTO } from "../..";
import type { UpdateStateDTO } from "./UpdateStateSlice";

export const UpdateState = createAsyncThunk<
  OrderDTO, 
  UpdateStateDTO,
  { rejectValue: string }
>(
  "update/state", 
  async (updateData, thunkAPI) => {
    try {
      const response = await axiosClient.put(`/order/state`, updateData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update order state"
      );
    }
  }
);