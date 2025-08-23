import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../../API/AxiosClient";
import type { ProductDTO } from "..";

export const CreateProduct = createAsyncThunk<
  ProductDTO,          
  FormData
  
  ,    
  { rejectValue: string }
>("product/create", async (dto: FormData, thunkAPI) => {
  try {
    const { data } = await axiosClient.post("/product/create", dto);
    return data.data as ProductDTO; 
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to create product"
    );
  }
});
