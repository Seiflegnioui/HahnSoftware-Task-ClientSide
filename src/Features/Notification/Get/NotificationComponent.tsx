import { useEffect } from "react";
import type { NotificationDTO } from "../index";

interface Props {
  notification: NotificationDTO | null;
}

export default function NotificationComponent({ notification }: Props) {
    useEffect(()=>{
    },[])
    if (!notification) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a notification</h3>
                    <p className="text-gray-600">Click on a notification from the list to view its details</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Details</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 h-full">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">
                        {notification.subject}
                    </h3>
                    {!notification.seen && (
                        <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                            Unread
                        </span>
                    )}
                </div>

                <div className="prose prose-lg text-gray-700 mb-6">
                    <p>{notification.content}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm text-gray-600">
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Sender Information</h4>
                        <p>From: {notification.notifier?.username || 'Unknown'}</p>
                        <p>Email: {notification.notifier?.email || 'N/A'}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Recipient Information</h4>
                        <p>To: {notification.notified?.username || 'You'}</p>
                        <p>Email: {notification.notified?.email || 'N/A'}</p>
                    </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Received: {new Date(notification.time).toLocaleString()
                        }
                    </p>
                    <p className="text-sm text-gray-500">
                        Status: {notification.seen ? 'Read' : 'Unread'}
                    </p>
                </div>
            </div>
        </div>
    );
}