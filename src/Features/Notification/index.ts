import { combineReducers } from "@reduxjs/toolkit";
import type { UserDTO } from "../User/UserSlice";
import GetNotificationReducer from "./Get/NotificationSlice"
import MarkAsSeenReducer from "./MarkAsSeen/MarkAsSeenSlice"

export interface NotificationDTO {
    id: number,
    notified : UserDTO,
    notifier : UserDTO,
    seen: boolean,
    time: string,
    subject : string,
    content : string
}

const NotificationReducer = combineReducers({
    get : GetNotificationReducer,
    markSeen : MarkAsSeenReducer
});

export default NotificationReducer;