import { createSlice } from "@reduxjs/toolkit";
import { MarskAsSeen } from "./MarkAsSeenThunk";
import type { NotificationDTO } from "../";

interface MarkAsSeenState {
  loading: boolean;
  errors: string[];
  notification: NotificationDTO | null;
}

const initialState: MarkAsSeenState = {
  loading: false,
  errors: [],
  notification: null,
};

export const MarkAsSeenSlice = createSlice({
  name: "markseen",
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(MarskAsSeen.pending, (state) => {
        state.loading = true;
        state.errors = [];
        state.notification = null;
      })
      .addCase(MarskAsSeen.fulfilled, (state, action) => {
        state.loading = false;
        state.notification = action.payload;
        state.errors = [];
      })
      .addCase(MarskAsSeen.rejected, (state, action) => {
        state.loading = false;
        state.notification = null;
        state.errors = action.payload || ["Failed to mark notification as seen"];
      });
  },
});

export default MarkAsSeenSlice.reducer;