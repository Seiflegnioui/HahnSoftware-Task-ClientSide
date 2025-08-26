import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { Categories } from "../Enums/Caterories";
import { CreateProduct } from "./CreateProductThunk";
import type { CreateProductDTO } from "..";
import { useNavigate } from "react-router-dom";

export default function CreateProductComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const state = useSelector((s: RootState) => s.product.create);
  const [form, setForm] = useState<CreateProductDTO>({
    name: "",
    description: "",
    category: Categories.Electronics,
    image: null!,
    price: 0,
    quantity: 0,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setForm((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("category", String(form.category));
    formData.append("image", form.image);
    formData.append("price", String(form.price));
    formData.append("quantity", String(form.quantity));


    dispatch(CreateProduct(formData))
      .unwrap()
      .then(() => {

        navigate("/seller/products", {
          state: {
            message: "Product created successfully!",
            messageType: "success",
          },
        });
      })
      .catch((error) => {
        console.error("Failed to create product:", error);

      });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {state.errors && state.errors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-red-800">Please fix the following errors:</h3>
            {state.errors.map((err: string, index: number) => (
              <p key={index} className="text-sm">• {err}</p>
            ))}
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 p-6 bg-gray-50 flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Product Image
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Add a clear photo of your product
                </p>
              </div>

              <div className="relative w-full max-w-xs">
                {previewImage ? (
                  <div className="border-2 border-dashed border-green-200 rounded-xl overflow-hidden">
                    <img
                      src={previewImage}
                      alt="Product preview"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl h-64 flex flex-col items-center justify-center text-gray-400">
                    <svg
                      className="w-12 h-12 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm">No image selected</p>
                  </div>
                )}

                <label className="block mt-4">
                  <span className="sr-only">Choose product photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                  />
                </label>
              </div>
            </div>

            <div className="md:w-3/5 p-8">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Add New Product
              </h1>
              <p className="text-gray-600 mb-6">
                Fill in the details below to add a new product to your catalog
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter product name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      
                    >
                      {Object.entries(Categories)
                        .filter(([key]) => isNaN(Number(key)))
                        .map(([key, value]) => (
                          <option key={value} value={value}>
                            {key}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (MAD) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      placeholder="0"
                      min="0"
                      value={form.quantity}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      placeholder="Describe your product in detail..."
                      rows={4}
                      value={form.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                      
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={state.loading}
                  className={`w-full px-4 py-3 font-medium rounded-lg transition ${
                    state.loading
                      ? "bg-gray-400 cursor-not-allowed text-gray-200"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {state.loading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Adding Product...
                    </div>
                  ) : (
                    "Add Product"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}