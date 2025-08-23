import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ProductDTO } from "../../Seller/Products";
import { axiosClient } from "../../../API/AxiosClient";
import type { OrderDTO, SendOrderDTO } from "../../Order";

export const ProductDetails = createAsyncThunk<
  ProductDTO,          
  number,              
  { rejectValue: string } 
>(
  "product/details",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosClient.get(`/product/get?id=${id}`);
      return data.data as ProductDTO;
    } catch (error: any) {
      console.error("Error fetching product details:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch product details"
      );
    }
  }
);

