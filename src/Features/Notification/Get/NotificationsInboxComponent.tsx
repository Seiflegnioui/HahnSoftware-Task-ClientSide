import { useSelector, useDispatch } from "react-redux";
import { useAppContext } from "../../../API/AppContext";
import { MarskAsSeen } from "../MarkAsSeen/MarkAsSeenThunk";
import { GetNotifs } from "./NotificationThunk";
import type { RootState, AppDispatch } from "../../store";
import { useEffect } from "react";
import type { NotificationDTO } from "../index";

interface Props {
  onNotificationSelect: (notification: NotificationDTO) => void;
  selectedNotificationId?: number;
}

export default function NotificationsInboxComponent({ onNotificationSelect, selectedNotificationId }: Props) {
    const { connectedUser } = useAppContext();
    const dispatch = useDispatch<AppDispatch>();
    const notificationState = useSelector((s: RootState) => s.notification.get);

    useEffect(() => {
        if (connectedUser && connectedUser.id) {
            dispatch(GetNotifs(connectedUser.id));
        }
    }, [connectedUser, dispatch]);

    const handleNotificationClick = (notification: NotificationDTO) => {
        
        dispatch(MarskAsSeen(notification.id));
        onNotificationSelect(notification);
    };

    if (notificationState.loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="h-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Notifications</h2>
            
            {!notificationState.notifications || notificationState.notifications.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications yet</h3>
                    <p className="text-gray-600">You don't have any notifications at this time.</p>
                </div>
            ) : (
                <div className="space-y-3 h-96 overflow-y-auto">
                    {notificationState.notifications.map((notification: NotificationDTO) => (
                        <div
                            key={notification.id}
                            className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                                notification.seen 
                                    ? 'bg-gray-50 border-gray-200' 
                                    : 'bg-blue-50 border-blue-200'
                            } ${
                                selectedNotificationId === notification.id
                                    ? 'ring-2 ring-green-500 border-green-500'
                                    : 'hover:shadow-md'
                            }`}
                            onClick={() => handleNotificationClick(notification)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
                                        {notification.subject}
                                    </h3>
                                    <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                                        {notification.content}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-2">
                                        {new Date(notification.time).toLocaleDateString()}
                                    </p>
                                </div>
                                {!notification.seen && (
                                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-2">
                                        New
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}