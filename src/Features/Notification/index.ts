import { combineReducers } from "@reduxjs/toolkit";
import type { UserDTO } from "../User/UserSlice";
import GetNotificationReducer from "./Get/NotificationSlice"

export interface NotificationDTO {
    id: number,
    Notified : UserDTO,
    Notifier : UserDTO,
    seen: boolean,
    time: string,
    subject : string,
    content : string
}

const NotificationReducer = combineReducers({
    get : GetNotificationReducer
});

export default NotificationReducer;