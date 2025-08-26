import { useEffect, useState } from "react";
import { useAppContext } from "../API/AppContext";
import { Link, Outlet, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../Features/store";
import { useDispatch, useSelector } from "react-redux";
import { GetNotifs } from "../Features/Notification/Get/NotificationThunk";
import type { NotificationDTO } from "../Features/Notification";

export default function SellerLayout() {
  const navigate = useNavigate();
  const { connectedUser, refreshUser,setConnectedUser,setconnectedSellerOrBuyer } = useAppContext();
  const [OpenPage, SetOpenPage] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  
  const notifState = useSelector((state: RootState) => state.notification.get);
  const UnseenNotifications = notifState.notifications 
    ? notifState.notifications.filter(n => !n.seen).length 
    : 0;
  
  const [activePage, setActivePage] = useState('home');
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (connectedUser === undefined) return;

    if (connectedUser == null) {        
      navigate("/guest/user");
    } else if (connectedUser.role === 1 && !connectedUser.authCompleted) {
      navigate("/seller/create");
    } else if (connectedUser.role === 1 && connectedUser.authCompleted) {
      SetOpenPage(true);
      dispatch(GetNotifs(connectedUser.id));
    } else if (connectedUser.role === 2 && !connectedUser.authCompleted) {
      navigate("/buyer/create");
    } else if (connectedUser.role === 2 && connectedUser.authCompleted) {
      navigate("/buyer/home");
    }
  }, [connectedUser, navigate, dispatch]);

  const handleLogout = () => {
    setConnectedUser(undefined)
    setconnectedSellerOrBuyer(undefined)
    localStorage.removeItem("TOKEN");
    refreshUser();
    navigate("/guest/user");
    setShowLogoutDropdown(false);
  };

  if (!OpenPage) return null;

  const navigationItems = [
    { id: 'home', name: 'Home', icon: '📊', path: '/seller/home' },
    { id: 'products', name: 'Products', icon: '🛍️', path: '/seller/products' },
    { id: 'orders', name: 'Orders', icon: '📦', path: '/seller/orders' },
    { id: 'notifications', name: 'Notifications', icon: '📦', path: '/seller/notifications' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed inset-y-0 left-0 w-64 flex-col bg-gradient-to-b from-green-700 to-emerald-800">
        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div className="flex flex-shrink-0 items-center px-4">
            <div className="h-8 w-8 bg-white rounded-md"></div>
            <h1 className="ml-2 text-xl font-bold text-white">Hahn Seller</h1>
          </div>
          <nav className="mt-8 flex-1 space-y-1 px-4">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path);
                  setActivePage(item.id);
                }}
                className={`group flex items-center rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                  activePage === item.id
                    ? 'bg-emerald-900 text-white'
                    : 'text-emerald-100 hover:bg-emerald-800 hover:text-white'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-shrink-0 border-t border-emerald-800 p-4">
          <div className="group block w-full flex-shrink-0">
            <div className="flex items-center">
              {connectedUser?.photo ? (
                <img
                  src={`http://localhost:5155/${connectedUser.photo}`}
                  alt={connectedUser.username}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-500">
                    {connectedUser?.username?.[0]?.toUpperCase() || 'S'}
                  </span>
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {connectedUser?.username || 'Seller'}
                </p>
                <Link to="/seller/profile" className="text-xs font-medium text-emerald-200 group-hover:text-white">
                  View profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col pl-64">
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex flex-1 justify-end">
              <div className="w-full max-w-xs">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full rounded-md border-0 bg-gray-100 py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:ring-inset"
                  />
                </div>
              </div>
            </div>

            <div className="ml-4 flex items-center">
              <div className="relative mr-4">
                <button
                  type="button"
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 relative"
                >
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {UnseenNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
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
                          <Link to="/seller/notifications">
                          <div key={notification.id}
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
                          </Link>
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

              <div className="relative">
                <button
                  onClick={() => setShowLogoutDropdown(!showLogoutDropdown)}
                  className="flex items-center focus:outline-none"
                >
                  {connectedUser?.photo ? (
                    <img
                      src={`http://localhost:5155/${connectedUser.photo}`}
                      alt={connectedUser.username}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
                      {connectedUser?.username?.[0]?.toUpperCase() || 'S'}
                    </div>
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    {connectedUser?.username || 'Seller'}
                  </span>
                </button>

                {showLogoutDropdown && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}