import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../../API/AxiosClient";
import type { NotificationDTO } from "..";

export const MarskAsSeen = createAsyncThunk<NotificationDTO, number, { rejectValue: string[] }>("markseen", async (id, thunk) => {
    try {
        const { data } = await axiosClient.put(`notifications/seen?id=${id}`)
        return data as NotificationDTO;
    } catch (error: any) {
        if (Array.isArray(error.response.data.Errors)) {
            return thunk.rejectWithValue(error.response.data.Errors);
        }
        return thunk.rejectWithValue(["Failed to create user"]);
    }
})