import { createSlice } from "@reduxjs/toolkit";
import type { NotificationDTO } from "..";
import { GetNotifs } from "./NotificationThunk"; 

interface GetNotifState {
    errors: string[]; 
    loading: boolean;
    notifications: NotificationDTO[] | null; 
}

const initialState: GetNotifState = {
    errors: [], 
    loading: false,
    notifications: null
};

const NotificationSlice = createSlice({
    name: "notifications", 
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetNotifs.pending, (state) => {
                state.loading = true;
                state.errors = [];
            })
            .addCase(GetNotifs.fulfilled, (state, action) => {
                state.loading = false;
                state.notifications = action.payload;
                state.errors = [];
            })
            .addCase(GetNotifs.rejected, (state, action) => {
                state.loading = false;
                state.notifications = null;
                state.errors = action.payload ? [action.payload] : ['Failed to fetch notifications'];
            });
    },
});
export default NotificationSlice.reducer;