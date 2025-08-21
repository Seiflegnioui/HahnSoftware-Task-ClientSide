import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserDTO } from "./UserSlice";
import type { FormEvent } from "react";
import { axiosClient } from "../../API/AxiosClient";

export const CreateUser = createAsyncThunk<
    UserDTO,
    FormEvent<HTMLFormElement>, 
    { rejectValue: string }
>(
  "users/create",
  async (e, thunk) => {
    try {
      const formdata = new FormData(e.currentTarget);

      const res = await axiosClient.post("user/create", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      
      return res.data as UserDTO; 
    } catch (error: any) {
        console.log(error.response.data.errors);
        
      return thunk.rejectWithValue(error.message || "Failed to create user");
    }
  }
);
