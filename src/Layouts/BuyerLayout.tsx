import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../API/AppContext';

export default function BuyerLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { connectedUser } = useAppContext();
  const [OpenPage, SetOpenPage] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    SetOpenPage(true)
  }
}, [connectedUser, navigate]);


  if (!OpenPage) return null;

  const navigationItems = [
    { id: 'home', name: 'home', path: '/buyer/home' },
    // { id: 'products', name: 'Products', path: '/buyer/products' },
    // { id: 'wishlist', name: 'Wishlist', path: '/buyer/wishlist' },
    // { id: 'orders', name: 'Orders', path: '/buyer/orders' },
    // { id: 'reviews', name: 'Reviews', path: '/buyer/reviews' },
  ];

  const getActivePage = () => {
    return navigationItems.find(item => location.pathname === item.path)?.id || 'dashboard';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
 
       <nav className="bg-white shadow-lg border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">

            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-green-600 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="ml-2 text-xl font-bold text-gray-900">Hahn Buyer</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
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
 
               <button className="p-2 text-gray-700 hover:text-green-600 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6h9m-9 0a2 2 0 100 4 2 2 0 000-4zm9 0a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>

              <button className="p-2 text-gray-700 hover:text-green-600 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
                  {connectedUser?.username?.[0]?.toUpperCase() || 'B'}
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {connectedUser?.username || 'Buyer'}
                </span>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-700 hover:text-green-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-green-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    getActivePage() === item.id
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {getActivePage().replace(/-/g, ' ')}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Welcome to your buyer dashboard
            </p>
          </div>


          <div className="bg-white rounded-xl shadow-sm border border-green-100 p-6">
            <Outlet />
          </div>
        </div>
      </main>


      <footer className="bg-white border-t border-green-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-6 w-6 bg-green-600 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">H</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">Hahn Buyer</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-green-600 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-green-600 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-green-600 text-sm">Contact</a>
            </div>
            
            <div className="mt-4 md:mt-0">
              <p className="text-center md:text-right text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} Hahn. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}