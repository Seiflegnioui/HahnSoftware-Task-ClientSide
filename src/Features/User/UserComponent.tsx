import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store";
import  { type FormEvent, useState } from "react";
import { CreateUser } from "./UserThunk";

export default function UserRegistrationForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const NextRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(CreateUser(e));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">Hahn</h1>
          <p className="text-green-600 mt-2 text-lg">Create your account</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-40 h-40 rounded-full border-4 border-green-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                {photoPreview ? (
                  <img 
                    src={photoPreview} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg 
                    className="w-16 h-16 text-gray-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                )}
              </div>
              <label 
                htmlFor="photo" 
                className="absolute bottom-2 right-2 bg-green-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-green-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <input 
                  id="photo" 
                  type="file" 
                  name="photo" 
                  className="hidden" 
                  onChange={handlePhotoChange} 
                  accept="image/*"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500 text-center mb-2">Upload a profile photo</p>
            <p className="text-xs text-gray-400 text-center">JPG, PNG or GIF. Max 5MB.</p>
          </div>

          {/* Form Section */}
          <div className="md:w-2/3">
            <form className="space-y-6" onSubmit={(e) => NextRegister(e)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Username Field */}
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      placeholder="Choose a username"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      placeholder="Create a secure password"
                    />
                  </div>
                </div>

                {/* Role Selection */}
                <div className="md:col-span-2">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    I want to join as a
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        className="sr-only"
                        type="radio"
                        id="seller"
                        name="role"
                        value={1}
                      />
                      <label
                        htmlFor="seller"
                        className="flex flex-col p-4 border border-gray-300 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 has-[:checked]:border-green-500 has-[:checked]:bg-green-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">Seller</span>
                        <span className="text-sm text-gray-500">List and sell products</span>
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        className="sr-only"
                        type="radio"
                        id="buyer"
                        name="role"
                        value={2}
                        defaultChecked
                      />
                      <label
                        htmlFor="buyer"
                        className="flex flex-col p-4 border border-gray-300 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 has-[:checked]:border-green-500 has-[:checked]:bg-green-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">Buyer</span>
                        <span className="text-sm text-gray-500">Browse and purchase items</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-4 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition shadow-md hover:shadow-lg"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="#" className="font-medium text-green-600 hover:text-green-500 transition-colors">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}