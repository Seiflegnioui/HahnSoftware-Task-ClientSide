import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { CreateBuyer } from "./CreateBuyerThunk";
import { Sources } from "../../Seller/Create/Enums";
import type { CreateBuyerDTO } from "./CreateBuyerSlice";
import { useAppContext } from "../../../API/AppContext";

export default function CreateBuyerComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const buyerState = useSelector((state: RootState) => state.buyer);
  const { connectedUser, refreshUser } = useAppContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const payload: CreateBuyerDTO = {
      birthdate: new Date(form.birthdate.value).toISOString(),
      adress: {
        country: form["adress.country"].value,
        city: form["adress.city"].value,
        adress: form["adress.adress"].value,
      },
      bio: form.bio.value,
      mySource: parseInt(form.mySource.value) as Sources,
    };

    console.log(payload);
    
    dispatch(CreateBuyer(payload)).unwrap()
      .then(() => {
        refreshUser().then(() => {
          navigate("/buyer/home");
        }).catch((refreshError) => {
          console.error("Error in refreshUser:", refreshError);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-green-100">
 
         {connectedUser && (
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-white font-bold">
                {connectedUser.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {connectedUser.username}!
            </h1>
            <p className="text-green-600 mt-1">Complete your buyer profile to get started</p>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-2xl mb-4">
            <span className="text-2xl">🛒</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Complete Your Profile
          </h1>
          <p className="text-green-600 mt-2">Tell us more about yourself</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Birthdate *
              </label>
              <input
                type="date"
                name="birthdate"
                required
                disabled={buyerState.loading}
                max={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                How did you hear about us? *
              </label>
              <select
                name="mySource"
                defaultValue={4}
                required
                disabled={buyerState.loading}
                className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 disabled:opacity-50"
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
          </div>

          <div className="p-4 bg-green-50 rounded-2xl">
            <h3 className="text-lg font-semibold text-green-800 flex items-center mb-4">
              <span className="mr-2">📍</span>
              Address Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="adress.country"
                  placeholder="Country"
                  required
                  disabled={buyerState.loading}
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 disabled:opacity-50 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="adress.city"
                  placeholder="City"
                  required
                  disabled={buyerState.loading}
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 disabled:opacity-50 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="adress.adress"
                  placeholder="Street Address"
                  required
                  disabled={buyerState.loading}
                  className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 disabled:opacity-50 text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              About You
            </label>
            <textarea
              name="bio"
              rows={3}
              placeholder="Tell us a bit about yourself, your interests, and what you like to buy..."
              disabled={buyerState.loading}
              className="w-full px-4 py-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none disabled:opacity-50"
            />
          </div>

          {buyerState.loading && (
            <div className="flex items-center justify-center py-4 bg-green-50 rounded-2xl p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <span className="ml-3 text-green-700 font-medium">
                Creating your account...
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={buyerState.loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {buyerState.loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </span>
            ) : (
              "Complete Registration"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            By completing your profile, you agree to our{" "}
            <a href="#" className="text-green-600 hover:text-green-700 underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600 hover:text-green-700 underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}