import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../../API/AxiosClient";
import type { ProductDTO } from "..";

export const GetProduct = createAsyncThunk<
  ProductDTO[],         
  number | undefined,    
  { rejectValue: string }
>(
  "product/get/all",
  async (sellerId, thunkAPI) => {
    try {
      const url = sellerId ? `/product/get?sellerId=${sellerId}` : `/product/get`;
      const { data } = await axiosClient.get(url);
      return thunkAPI.fulfillWithValue(data.datalist as ProductDTO[]) ;
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

export const DeleteProduct = createAsyncThunk<
  ProductDTO,          
  number,              
  { rejectValue: string }
>(
  "product/delete",
  async (id, thunkAPI) => {
    try {
      // Fixed URL template literal
      const { data } = await axiosClient.delete(`/product/delete?id=${id}`);
      // Return the deleted product data
      return data as ProductDTO;
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }
);