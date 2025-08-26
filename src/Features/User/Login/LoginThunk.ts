import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../API/AxiosClient";
import type { LoginDTO } from "./LoginSlice";
import type { UserDTO } from "../UserSlice";

export const LoginUser = createAsyncThunk<
  UserDTO, 
  LoginDTO,
  { rejectValue: string }
>(
  "user/login",
  async (dto, thunkAPI) => {
    try {
      const {data} = await axiosClient.post('/user/login', dto);
      localStorage.setItem("TOKEN",data.token);
      return data.data as UserDTO;

    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response.data[0] || "Login failed"
      );
    }
  }
);