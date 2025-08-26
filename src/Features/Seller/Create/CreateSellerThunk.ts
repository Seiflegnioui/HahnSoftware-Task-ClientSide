import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../API/AxiosClient";
import type { SellerDTO } from "./CreateSellerSlice";

export const CreateSeller = createAsyncThunk<
  SellerDTO,
  FormData,
  { rejectValue: string[] }
>(
  "seller/create",
  async (formData, thunk) => {
    try {
      const res = await axiosClient.post("/seller/create", formData);
      return res.data as SellerDTO;
    } catch (error: any) {

       if(Array.isArray(error.response.data.Errors)){
        return thunk.rejectWithValue(error.response.data.Errors);
      }
      return thunk.rejectWithValue( ["Failed to create user"]);
    }
  }
);


