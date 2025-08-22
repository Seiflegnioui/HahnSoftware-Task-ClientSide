import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../API/AxiosClient";
import type { SellerDTO } from "./CreateSellerSlice";

export const CreateSeller = createAsyncThunk<
  SellerDTO,
  FormData,
  { rejectValue: string }
>(
  "seller/create",
  async (formData, thunk) => {
    try {
      const res = await axiosClient.post("/seller/create", formData);

      console.log("Response:", res.data);

 

      return res.data as SellerDTO;
    } catch (error: any) {
      console.log("CreateSeller error:", error);
      return thunk.rejectWithValue(error.message || "Failed to create user");
    }
  }
);


