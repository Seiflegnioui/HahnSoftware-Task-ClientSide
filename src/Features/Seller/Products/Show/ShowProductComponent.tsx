import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { RootState, AppDispatch } from "../../../store";
import { DeleteProduct, GetProduct } from "./GetProductThunk";
import { useAppContext } from "../../../../API/AppContext";
import type { ProductDTO } from "..";
import { Categories } from "../Enums/Caterories";
import { PORT } from "../../../../evn";

export default function ShowProductComponent() {
  const { connectedSellerOrBuyer } = useAppContext();
  const location = useLocation();
  const [notification, setNotification] = useState<{
    message: string;
    type: string;
  } | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const productState = useSelector((s: RootState) => s.product.get);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [filteredProducts, setFilteredProducts] = useState<ProductDTO[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDTO | null>(
    null
  );

  useEffect(() => {
    
    if (connectedSellerOrBuyer && connectedSellerOrBuyer.id) {
      dispatch(GetProduct(connectedSellerOrBuyer.id));
    }
  }, [connectedSellerOrBuyer, dispatch]); 

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.messageType || "success",
      });

      window.history.replaceState({}, document.title);

    
    }

    if (productState.products) {
      let filtered = productState.products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedCategory !== "all") {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }

      setFilteredProducts(filtered);
    }
  }, [searchTerm, selectedCategory, productState.products]);

  const openDeleteDialog = (product: ProductDTO) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    dispatch(DeleteProduct(selectedProduct!.id))
      .unwrap()
      .then(() => {
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
      })
      .catch((error) => {
        console.error("Failed to delete product:", error);
      });
  };

  if (productState.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (productState.errors.length) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mx-4 my-6">
        <h3 className="text-red-800 font-medium">Error loading products</h3>
        <p className="text-red-600 text-sm">{productState.errors.join(", ")}</p>
      </div>
    );
  }

  if (!productState.products || productState.products.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        {notification && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              notification.type === "success"
                ? "bg-green-100 border border-green-400 text-green-700"
                : "bg-red-100 border border-red-400 text-red-700"
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className="text-center bg-white rounded-lg shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            No products found
          </h2>
          <p className="text-gray-600 mb-6">
            You haven't added any products yet.
          </p>
          <Link
            to="/seller/product/new"
            className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            Add Your First Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <Link
          to="/seller/product/new"
          className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Categories</option>
              {Object.entries(Categories)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, value]) => (
                  <option key={value} value={value}>
                    {key}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {(searchTerm || selectedCategory !== "all") && (
          <p className="text-sm text-gray-600 mt-4">
            Showing {filteredProducts.length} of {productState.products.length} products
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory !== "all" && ` in ${Object.keys(Categories).find(key => Categories[key as keyof typeof Categories] === selectedCategory)}`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(searchTerm || selectedCategory !== "all" ? filteredProducts : productState.products).map(
          (product: ProductDTO) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={`http://localhost:${PORT}/products/${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.quantity === 0 && (
                  <div className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                    Out of stock
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-green-700 font-bold text-xl mb-2">
                  MAD {product.price}
                </p>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>Stock: {product.quantity}</span>
                  <span>Category: {Object.keys(Categories).find(key => Categories[key as keyof typeof Categories] === product.category) || 'Unknown'}</span>
                </div>

                <div className="flex space-x-2 mt-4">
                 
                  <button
                    onClick={() => openDeleteDialog(product)}
                    className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>

                <div className="flex items-center mt-4 pt-3 border-t border-gray-100">
                  <div className="flex-shrink-0">
                    {product.seller?.photo ? (
                      <img
                        src={`http://localhost:${PORT}/${product.seller.photo}`}
                        alt={product.seller.username}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-500">
                          {product.seller?.username?.charAt(0) || "U"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="ml-2 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {product.seller?.username || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {product.seller?.shopName || "No shop"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {(searchTerm || selectedCategory !== "all") && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No matching products
          </h3>
          <p className="text-gray-600">Try adjusting your search terms or category filter</p>
        </div>
      )}

      {deleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Delete Product
            </h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{selectedProduct?.name}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}