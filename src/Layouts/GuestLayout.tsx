import  { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppContext } from '../API/AppContext';

export default function GuestLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()
  const {connectedUser} = useAppContext()
  const [OpenPage, SetOpenPage] = useState(false)

  useEffect(() => {
  if (connectedUser === undefined) return;

  if (connectedUser == null) {        
    SetOpenPage(true)
  } else if (connectedUser.role === 1 && !connectedUser.authCompleted) {
    navigate("/seller/create");
  } else if (connectedUser.role === 1 && connectedUser.authCompleted) {
    navigate("/seller/home");
} else if (connectedUser.role === 2 && !connectedUser.authCompleted) {
      navigate("/buyer/create");
  } else if (connectedUser.role === 2 && connectedUser.authCompleted) {
    navigate("/buyer/home");
  }
}, [connectedUser, navigate]);


  return OpenPage && (
    <div className="min-h-screen bg-gray-50">

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">

            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-green-600 rounded-md"></div>
                <span className="ml-2 text-xl font-semibold text-gray-900">Hahn</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Pricing
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/guest/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/guest/user"
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
              >
                Sign up
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                Features
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                Pricing
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                About
              </a>
              <a href="#" className="text-gray-700 hover:text-green-600 block px-3 py-2 text-base font-medium">
                Contact
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <a
                  href="#"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600"
                >
                  Sign in
                </a>
                <a
                  href="#"
                  className="mt-2 block px-3 py-2 text-base font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Sign up
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {<Outlet/>}
      </main>

      <footer className="bg-white mt-12 border-t">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="h-6 w-6 bg-green-600 rounded-md"></div>
              <span className="ml-2 text-lg font-semibold text-gray-900">Hahn</span>
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