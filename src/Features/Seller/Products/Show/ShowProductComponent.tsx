import React from 'react';
import { Link } from 'react-router-dom';

export default function ShowProductComponent() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Products
        </h1>
        <div className="flex w-full md:w-auto space-x-2">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          <Link to="/seller/product/new">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            New Product
          </button>
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Sample product card */}
        {[...Array(8)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow p-4 flex flex-col items-center hover:shadow-lg transition"
          >
            <div className="h-40 w-full mb-4 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-lg">
              Image
            </div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Product Name
            </h2>
            <p className="text-gray-500 mb-4">$99.99</p>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
