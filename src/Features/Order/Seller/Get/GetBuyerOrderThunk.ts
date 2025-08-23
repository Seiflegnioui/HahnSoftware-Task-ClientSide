import { createAsyncThunk } from "@reduxjs/toolkit";
import type { OrderDTO } from "../..";
import { axiosClient } from "../../../../API/AxiosClient";


export const SellerOrder = createAsyncThunk<
  OrderDTO[],          
  number,              
  { rejectValue: string } 
>(
  "orders/seller",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosClient.get(`/order/get?sellerId=${id}`);
      console.log(data);
      
      return data as OrderDTO[];
    } catch (error: any) {
      console.error("Error fetching orders details:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders details"
      );
    }
  }
);

