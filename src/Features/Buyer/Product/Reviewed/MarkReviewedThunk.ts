import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../../API/AxiosClient";
import type { ProductDTO } from "../../../Seller/Products";

export const ReviewProduct = createAsyncThunk<
  ProductDTO,          
  number,              
  { rejectValue: string } 
>(
  "product/reviewed",
  async (productId, thunkAPI) => {
    try {
      const { data } = await axiosClient.put(`/product/reviewed?productId=${productId}`);
      return data.data as ProductDTO;
    } catch (error: any) {
      console.error("Error review:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to product reviewed"
      );
    }
  }
);

