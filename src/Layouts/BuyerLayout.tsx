import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../API/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../Features/store';
import { GetNotifs } from '../Features/Notification/Get/NotificationThunk';
import type { NotificationDTO } from '../Features/Notification';

export default function BuyerLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const notifState = useSelector((state: RootState) => state.notification.get);
  const navigate = useNavigate();
  const location = useLocation();
  const { connectedUser } = useAppContext();
  const [OpenPage, SetOpenPage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const UnseenNotifications = notifState.notifications 
    ? notifState.notifications.filter(n => !n.seen).length 
    : 0;

  useEffect(() => {
    if (connectedUser === undefined) return;

    if (connectedUser == null) {        
      navigate("/guest/user");
    } else if (connectedUser.role === 1 && !connectedUser.authCompleted) {
      navigate("/seller/create");
    } else if (connectedUser.role === 1 && connectedUser.authCompleted) {
      navigate("/seller/home");
    } else if (connectedUser.role === 2 && !connectedUser.authCompleted) {
      navigate("/buyer/create");
    } else if (connectedUser.role === 2 && connectedUser.authCompleted) {
      SetOpenPage(true);
      dispatch(GetNotifs(connectedUser.id));
    }
  }, [connectedUser, navigate, dispatch]);

  if (!OpenPage) return null;

  const navigationItems = [
    { id: 'home', name: 'Home', path: '/buyer/home' },
    { id: 'orders', name: 'Orders', path: '/buyer/orders' },
  ];

  const getActivePage = () => {
    return navigationItems.find(item => location.pathname === item.path)?.id || 'dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <nav className="bg-white shadow-lg border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-green-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">H</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Hahn Buyer</span>
            </div>

            <div className="flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    getActivePage() === item.id
                      ? 'bg-green-100 text-green-700 border-b-2 border-green-600'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-gray-700 hover:text-green-600 relative"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {UnseenNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {UnseenNotifications}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifState.notifications && notifState.notifications.length > 0 ? (
                        notifState.notifications.map((notification: NotificationDTO) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                              !notification.seen ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">
                                  {notification.subject}
                                </h4>
                                <p className="text-gray-600 text-xs mt-1">
                                  {notification.content}
                                </p>
                                <p className="text-gray-400 text-xs mt-2">
                                  {new Date(notification.time).toLocaleDateString()}
                                </p>
                              </div>
                              {!notification.seen && (
                                <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-gray-500">
                          No notifications yet
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
                  {connectedUser?.username?.[0]?.toUpperCase() || 'B'}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {connectedUser?.username || 'Buyer'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {getActivePage().replace(/-/g, ' ')}
            </h1>
            <p className="mt-1 text-sm text-gray-600">Welcome to your home</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <Outlet />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-green-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-green-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">H</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">Hahn Buyer</span>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Hahn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}