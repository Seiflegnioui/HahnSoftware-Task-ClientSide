import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../API/AxiosClient";
import type { OrderCountsDTO, OrderDTO } from "../../Order";


export const GetRecentOrders = createAsyncThunk<
  OrderDTO[],          
  number,              
  { rejectValue: string } 
>(
  "orders/recent",
  async (sellerId, thunkAPI) => {
    try {
      const { data } = await axiosClient.get(`/order/get?sellerId=${sellerId}&limit=3`); 
      return data as OrderDTO[];
    } catch (error: any) {
      console.error("Error fetching recent orders:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch recent orders"
      );
    }
  }
);

export const GetOrdersCounts = createAsyncThunk<
  OrderCountsDTO,          
  number,  
  { rejectValue: string } 
>(
  "orders/counts",
  async (sellerId, thunkAPI) => {
    try {
      const { data } = await axiosClient.get(`/order/counts?sellerId=${sellerId}`);
      return data as OrderCountsDTO;
    } catch (error: any) {
      console.error("Error fetching orders counts:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders counts"
      );
    }
  }
);

