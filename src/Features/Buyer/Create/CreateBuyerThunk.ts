import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../API/AxiosClient";
import type { BuyerDTO, CreateBuyerDTO } from "./CreateBuyerSlice";

export const CreateBuyer = createAsyncThunk<
  BuyerDTO,
  CreateBuyerDTO,
  { rejectValue: string }
>(
  "buyer/create",
  async (buyerDto, thunk) => {
    try {
      const res = await axiosClient.post("buyer/create", buyerDto, {
        headers: { "Content-Type": "application/json" },
      });
      
      
      return res.data as BuyerDTO;
    } catch (error: any) {
      return thunk.rejectWithValue(error.message || "Failed to create user");
    }
  }
);

