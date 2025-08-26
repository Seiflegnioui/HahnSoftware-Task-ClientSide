import { createAsyncThunk } from "@reduxjs/toolkit";
import type { UserDTO } from "./UserSlice";
import type { FormEvent } from "react";
import { axiosClient } from "../../API/AxiosClient";
import type { NavigateFunction } from "react-router-dom";

export const CreateUser = createAsyncThunk<
  UserDTO,
  FormEvent<HTMLFormElement>,
  { rejectValue: string[] }
>(
  "users/create",
  async (e, thunk) => {
    try {
      const formdata = new FormData(e.currentTarget);

      const { data } = await axiosClient.post("user/create", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("TOKEN", data.token)


      return data.data as UserDTO;
    } catch (error: any) {
      if(Array.isArray(error.response.data.Errors)){

        return thunk.rejectWithValue(error.response.data.Errors);
      }
      
      const errorsObject = error.response.data.errors as Object;
      const errors: string[] = [];

      if (Array.isArray(error.response.data)) {
        return thunk.rejectWithValue(error.response.data);
      }

      Object.values(errorsObject).forEach((errorArray: string[]) => {
        errorArray.forEach(err => errors.push(err))
      })
      return thunk.rejectWithValue(errors);
    }
  }
);

export const GetUserById = createAsyncThunk<
  UserDTO,
  { e: FormEvent<HTMLFormElement>, navigate: NavigateFunction },
  { rejectValue: string }
>(
  "users/create",
  async ({ e, navigate }, thunk) => {
    try {
      const formdata = new FormData(e.currentTarget);

      const { data } = await axiosClient.post("user/create", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      localStorage.setItem("TOKEN", data.token)
      if (data.data.role == 1) {
        navigate('seller/create')
      }

      return data.data as UserDTO;
    } catch (error: any) {

      return thunk.rejectWithValue(error.message || "Failed to create user");
    }
  }
);
