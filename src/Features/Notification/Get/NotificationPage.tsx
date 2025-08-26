import { useState } from 'react';
import NotificationsInboxComponent from './NotificationsInboxComponent';
import type { NotificationDTO } from '../index';
import NotificationComponent from './NotificationComponent';

export default function NotificationsPage() {
    const [selectedNotification, setSelectedNotification] = useState<NotificationDTO | null>(null);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-6 text-white">
                    <h1 className="text-3xl font-bold">Notifications Inbox</h1>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1">
                            <NotificationsInboxComponent 
                                onNotificationSelect={setSelectedNotification}
                                selectedNotificationId={selectedNotification?.id}
                            />
                        </div>

                        <div className="lg:col-span-2">
                            <NotificationComponent notification={selectedNotification} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}