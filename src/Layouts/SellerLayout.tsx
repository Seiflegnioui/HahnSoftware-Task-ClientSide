import { useEffect, useState } from "react";
import { useAppContext } from "../API/AppContext";
import { Outlet, useNavigate } from "react-router-dom";

export default function SellerLayout() {
  const navigate = useNavigate();
  const { connectedUser } = useAppContext();
  const [OpenPage, SetOpenPage] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');

  useEffect(() => {
  if (connectedUser === undefined) return;

  if (connectedUser == null) {        
    navigate("/guest/user");
  } else if (connectedUser.role === 1 && !connectedUser.authCompleted) {
    navigate("/seller/create");
  } else if (connectedUser.role === 1 && connectedUser.authCompleted) {
    SetOpenPage(true)
  } else if (connectedUser.role === 2 && !connectedUser.authCompleted) {
      navigate("/buyer/create");
  } else if (connectedUser.role === 2 && connectedUser.authCompleted) {
    navigate("/buyer/home");
  }
}, [connectedUser, navigate]);


  if (!OpenPage) return null;

  const navigationItems = [
    { id: 'home', name: 'Home', icon: '📊', path: '/seller/home' },
    { id: 'products', name: 'Products', icon: '🛍️', path: '/seller/products' },
    // { id: 'orders', name: 'Orders', icon: '📦', path: '/seller/products' },
    // { id: 'analytics', name: 'Analytics', icon: '📈', path: '/seller/analytics' },
    // { id: 'customers', name: 'Customers', icon: '👥', path: '/seller/customers' },
    // { id: 'settings', name: 'Settings', icon: '⚙️', path: '/seller/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-green-700 to-emerald-800">
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
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {connectedUser?.username || 'Seller'}
                  </p>
                  <p className="text-xs font-medium text-emerald-200 group-hover:text-white">
                    View profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-gradient-to-b from-green-700 to-emerald-800">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                type="button"
                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">Close sidebar</span>
                <span className="text-white text-2xl">×</span>
              </button>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <div className="h-8 w-8 bg-white rounded-md"></div>
                <h1 className="ml-2 text-xl font-bold text-white">Hahn Seller</h1>
              </div>
              <nav className="mt-8 space-y-1 px-4">
                {navigationItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.path);
                      setActivePage(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`group flex items-center rounded-lg px-3 py-3 text-base font-medium transition-colors ${
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
              <div className="flex items-center">
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    {connectedUser?.username || 'Seller'}
                  </p>
                  <p className="text-xs font-medium text-emerald-200">
                    View profile
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

 
       <div className="flex flex-1 flex-col md:pl-64">

        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <span className="text-2xl">☰</span>
              </button>
            </div>
            
            <div className="flex flex-1 justify-center md:justify-end">
              <div className="w-full max-w-lg md:max-w-xs">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-400">🔍</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    className="block w-full rounded-md border-0 bg-gray-100 py-2 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-green-500 focus:ring-inset"
                  />
                </div>
              </div>
            </div>

            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <span className="sr-only">View notifications</span>
                <span className="text-xl">🔔</span>
              </button>

              <div className="relative ml-3">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
                    {connectedUser?.username?.[0]?.toUpperCase() || 'S'}
                  </div>
                  <span className="ml-2 hidden text-sm font-medium text-gray-700 md:block">
                    {connectedUser?.username || 'Seller'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1">
          {<Outlet/>}
        </main>
      </div>
    </div>
  );
}