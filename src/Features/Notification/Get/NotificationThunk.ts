import { createAsyncThunk } from "@reduxjs/toolkit";
import type { NotificationDTO } from "..";
import { axiosClient } from "../../../API/AxiosClient";

export const GetNotifs = createAsyncThunk<NotificationDTO[], number, { rejectValue: string }>(
    "notif/get",
    async (notifiedId: number, thunk) => {
        try {
            const { data } = await axiosClient.get(`/notifications/get?notifiedId=${notifiedId}`);
            return data as NotificationDTO[]; 
        } catch (error: any) {
            return thunk.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);