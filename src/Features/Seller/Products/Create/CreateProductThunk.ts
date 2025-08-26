import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../../API/AxiosClient";
import type { ProductDTO } from "..";

export const CreateProduct = createAsyncThunk<
  ProductDTO,          
  FormData
  
  ,    
  { rejectValue: string[] }
>("product/create", async (dto: FormData, thunk) => {
  try {
    const { data } = await axiosClient.post("/product/create", dto);
    return data.data as ProductDTO; 
  } catch (error: any) {

     if(Array.isArray(error.response.data.Errors)){
        return thunk.rejectWithValue(error.response.data.Errors);
      }
    return thunk.rejectWithValue([ "Failed to create product"]
    );
  }
});
