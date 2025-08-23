import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OrderDTO, SendOrderDTO } from "../..";
import { axiosClient } from "../../../../API/AxiosClient";

export const SendOrder = createAsyncThunk<
  OrderDTO, 
  SendOrderDTO,
  { rejectValue: string }
>(
  "order/send",
  async (orderData, thunkAPI) => {
    try {
      const { data } = await axiosClient.post("/order/create", orderData);
      return data as OrderDTO;
    } catch (error: any) {
      console.error("Error placing order:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to place order"
      );
    }
  }
);