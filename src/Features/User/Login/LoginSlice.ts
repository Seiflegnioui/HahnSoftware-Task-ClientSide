import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import { LoginUser } from "./LoginThunk";
import type { UserDTO } from "../UserSlice";

export interface LoginDTO {
  email: string;
  password: string;
}

interface LoginState {
  user: UserDTO | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
    user : null,
  loading: false,
  error: null
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action: PayloadAction<UserDTO>) => {
        state.loading = false;
        state.user= action.payload
        state.error = null;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export default loginSlice.reducer;