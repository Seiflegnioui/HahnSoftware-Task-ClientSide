import React, { useState } from "react";
import { Sources } from "./Enums";
import type { CreateSellerDTO } from "./CreateSellerSlice";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../../store";
import { CreateSeller } from "./CreateSellerThunk";
import { useAppContext } from "../../../API/AppContext";
import { useNavigate } from "react-router-dom";

export default function CreateSellerComponent() {
  const { connectedUser, refreshUser } = useAppContext();
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const sellerState = useSelector((state: RootState) => state.seller);

  const [seller, setSeller] = useState<CreateSellerDTO>({
    shopName: "",
    shopLogo: null,
    shopDescription: "",
    adress: { country: "", city: "", adress: "" },
    hasLocal: false,
    localAdress: { country: "", city: "", adress: "" },
    field: "",
    personalSite: null,
    facebook: null,
    instagram: null,
    mySource: 4,
  });

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const slides = [
    {
      title: "Business Information",
      description: "Tell us about your business",
    },
    { title: "Personal Address", description: "Where are you located?" },
    {
      title: "Physical Store",
      description: "Do you have a physical location?",
    },
    {
      title: "Online Presence",
      description: "Share your social media profiles",
    },
    {
      title: "How did you find us?",
      description: "Help us understand how you discovered our platform",
    },
  ];

  const nextSlide = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const handleChange = (field: string, value: any) => {
    setSeller((prev) => ({ ...prev, [field]: value }));
  };

  const handleAdressChange = (
    type: "adress" | "localAdress",
    field: string,
    value: string
  ) => {
    setSeller((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleChange("shopLogo", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("shopName", seller.shopName);
    formData.append("shopDescription", seller.shopDescription);
    formData.append("field", seller.field);

    formData.append("adress.country", seller.adress.country);
    formData.append("adress.city", seller.adress.city);
    formData.append("adress.adress", seller.adress.adress);

    if (seller.hasLocal && seller.localAdress) {
      formData.append("localAdress.country", seller.localAdress.country);
      formData.append("localAdress.city", seller.localAdress.city);
      formData.append("localAdress.adress", seller.localAdress.adress);
    }

    formData.append("hasLocal", seller.hasLocal.toString());

    if (seller.personalSite) {
      formData.append("personalSite", seller.personalSite);
    }
    if (seller.facebook) {
      formData.append("facebook", seller.facebook);
    }
    if (seller.instagram) {
      formData.append("instagram", seller.instagram);
    }
    if (seller.shopLogo) {
      formData.append("shopLogo", seller.shopLogo);
    }

    formData.append("mySource", seller.mySource.toString());

    dispatch(CreateSeller(formData))
    .unwrap()
    .then(() => {

      refreshUser().then(() => {

        navigate("/seller/home");
      }).catch((refreshError) => {
        console.error("Error in refreshUser:", refreshError);
      });
    })
    .catch((error) => {
      console.error(error);
      
    });

    console.log(...formData.entries());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-2xl">
        {/* Loading Overlay */}
        {sellerState.loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 rounded-2xl">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
              <p className="text-green-700 font-medium">
                Creating your seller account...
              </p>
            </div>
          </div>
        )}

        {connectedUser && (
          <div className="flex flex-col items-center justify-center my-8">
            <h1 className="text-4xl font-bold text-green-700 text-center">
              Welcome, {connectedUser.username}
            </h1>
          </div>
        )}

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-1/5 h-2 mx-1 rounded-full ${
                  index <= currentSlide ? "bg-green-600" : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800">
              {slides[currentSlide].title}
            </h2>
            <p className="text-sm text-gray-600">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          {currentSlide === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Field *
                </label>
                <input
                  type="text"
                  name="field"
                  placeholder="e.g. Fashion, Electronics, Food"
                  value={seller.field}
                  onChange={(e) => handleChange("field", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={sellerState.loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Name *
                </label>
                <input
                  type="text"
                  name="shopName"
                  placeholder="Enter your shop name"
                  value={seller.shopName}
                  onChange={(e) => handleChange("shopName", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={sellerState.loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Logo
                </label>
                <div className="flex items-center space-x-6">
                  <div className="shrink-0">
                    {logoPreview ? (
                      <img
                        className="h-16 w-16 object-cover rounded-full border-2 border-green-200"
                        src={logoPreview}
                        alt="Shop logo preview"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  <label className="block">
                    <span className="sr-only">Choose shop logo</span>
                    <input
                      type="file"
                      name="shopLogo"
                      onChange={handleLogoChange}
                      accept="image/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={sellerState.loading}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shop Description *
                </label>
                <textarea
                  name="shopDescription"
                  placeholder="Describe your business and what you offer"
                  value={seller.shopDescription}
                  onChange={(e) =>
                    handleChange("shopDescription", e.target.value)
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={sellerState.loading}
                />
              </div>
            </div>
          )}

          {currentSlide === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={seller.adress.country}
                    onChange={(e) =>
                      handleAdressChange("adress", "country", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                    disabled={sellerState.loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={seller.adress.city}
                    onChange={(e) =>
                      handleAdressChange("adress", "city", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                    disabled={sellerState.loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Street address"
                  value={seller.adress.adress}
                  onChange={(e) =>
                    handleAdressChange("adress", "adress", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={sellerState.loading}
                />
              </div>
            </div>
          )}

          {/* Slide 3: Physical Store */}
          {currentSlide === 2 && (
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  id="hasLocal"
                  name="hasLocal"
                  type="checkbox"
                  checked={seller.hasLocal}
                  onChange={(e) => handleChange("hasLocal", e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={sellerState.loading}
                />
                <label
                  htmlFor="hasLocal"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I have a physical store location
                </label>
              </div>

              {seller.hasLocal && (
                <div className="space-y-6 pt-4 border-t border-gray-200">
                  <h3 className="font-medium text-gray-700">Store Address</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="localCountry"
                        placeholder="Country"
                        value={seller.localAdress.country}
                        onChange={(e) =>
                          handleAdressChange(
                            "localAdress",
                            "country",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={sellerState.loading}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="localCity"
                        placeholder="City"
                        value={seller.localAdress.city}
                        onChange={(e) =>
                          handleAdressChange(
                            "localAdress",
                            "city",
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={sellerState.loading}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="localAddress"
                      placeholder="Store address"
                      value={seller.localAdress.adress}
                      onChange={(e) =>
                        handleAdressChange(
                          "localAdress",
                          "adress",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={sellerState.loading}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Slide 4: Online Presence */}
          {currentSlide === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website (optional)
                </label>
                <input
                  type="url"
                  name="personalSite"
                  placeholder="https://yoursite.com"
                  value={seller.personalSite || ""}
                  onChange={(e) => handleChange("personalSite", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={sellerState.loading}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook (optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">fb.com/</span>
                    </div>
                    <input
                      type="text"
                      name="facebook"
                      placeholder="yourpage"
                      value={seller.facebook || ""}
                      onChange={(e) => handleChange("facebook", e.target.value)}
                      className="block w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={sellerState.loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram (optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">@</span>
                    </div>
                    <input
                      type="text"
                      name="instagram"
                      placeholder="username"
                      value={seller.instagram || ""}
                      onChange={(e) =>
                        handleChange("instagram", e.target.value)
                      }
                      className="block w-full pl-7 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={sellerState.loading}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentSlide === 4 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did you hear about us? *
                </label>
                <select
                  name="mySource"
                  value={seller.mySource}
                  onChange={(e) =>
                    handleChange("mySource", parseInt(e.target.value))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  required
                  disabled={sellerState.loading}
                >
                  {Object.entries(Sources)
                    .filter(([key]) => isNaN(Number(key)))
                    .map(([key, value]) => (
                      <option key={value} value={value}>
                        {key}
                      </option>
                    ))}
                </select>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">
                  Ready to complete your registration?
                </h3>
                <p className="text-sm text-green-600 mt-1">
                  Click submit to create your seller account.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={prevSlide}
              disabled={currentSlide === 0 || sellerState.loading}
              className={`px-5 py-2.5 rounded-lg font-medium ${
                currentSlide === 0 || sellerState.loading
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-green-600 hover:bg-green-50"
              }`}
            >
              Back
            </button>

            {currentSlide < slides.length - 1 ? (
              <button
                type="button"
                onClick={nextSlide}
                disabled={sellerState.loading}
                className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={sellerState.loading}
                className="px-5 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed relative"
              >
                {sellerState.loading ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                    <span className="opacity-0">Submitting...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
