import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../../API/AppContext';
import type { SellerDTO } from '../Create/CreateSellerSlice';
import type { UserDTO } from '../../User/UserSlice';

export default function SellerProfileComponent() {
    const { connectedSellerOrBuyer, connectedUser } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [seller, setSeller] = useState<SellerDTO | null>(null);
    const [user, setUser] = useState<UserDTO | null>(null);

    useEffect(() => {
        if (connectedUser === undefined || connectedSellerOrBuyer === undefined) {
            setLoading(true);
            return;
        }

        if (connectedUser && connectedSellerOrBuyer) {
            setSeller(connectedSellerOrBuyer as SellerDTO);
            setUser(connectedUser);
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, [connectedUser, connectedSellerOrBuyer]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!seller || !user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-center bg-white rounded-xl shadow-lg p-12 border border-gray-200 w-full max-w-2xl">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Profile Not Found
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Unable to load seller profile information.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-start min-h-screen py-12 bg-gray-50">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-6xl">
                <div className="bg-gradient-to-r from-green-600 to-emerald-700 p-10 text-white">
                    <div className="flex items-center space-x-10">
                        <div className="relative">
                            <img
                                src={`http://localhost:5155/shoplogos/${seller.shopLogo || 'default-shop.png'}`}
                                alt={seller.shopName}
                                className="w-40 h-40 rounded-full object-cover border-6 border-white shadow-lg"
                            />
                            {seller.rating > 0 && (
                                <div className="absolute -bottom-3 -right-3 bg-amber-500 text-white text-lg font-bold px-4 py-2 rounded-full shadow-lg">
                                    ⭐ {seller.rating}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h1 className="text-5xl font-bold mb-4">{seller.shopName}</h1>
                            <p className="text-emerald-100 text-xl mb-3">{seller.shopeDescription}</p>
                            <p className="text-emerald-100 text-lg">
                                📍 {seller.adress.adress}, {seller.adress.city}, {seller.adress.country}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-10">
                    <div className="grid grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">Shop Information</h2>
                                
                                <div className="space-y-5 text-lg">
                                    <div className="flex items-center py-3 border-b border-gray-200">
                                        <span className="text-gray-700 font-semibold w-48">Business Field:</span>
                                        <span className="text-gray-900 font-medium">{seller.field}</span>
                                    </div>
                                    
                                    <div className="flex items-center py-3 border-b border-gray-200">
                                        <span className="text-gray-700 font-semibold w-48">Main Address:</span>
                                        <span className="text-gray-900">
                                            {seller.adress.adress}, {seller.adress.city}, {seller.adress.country}
                                        </span>
                                    </div>

                                    {seller.hasLocal && seller.localAdress && (
                                        <div className="flex items-center py-3 border-b border-gray-200">
                                            <span className="text-gray-700 font-semibold w-48">Local Address:</span>
                                            <span className="text-gray-900">
                                                {seller.localAdress.adress}, {seller.localAdress.city}, {seller.localAdress.country}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex items-center py-3">
                                        <span className="text-gray-700 font-semibold w-48">Member since:</span>
                                        <span className="text-gray-900 font-medium">
                                            {new Date(seller.joinedAt).toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {(seller.personalSite || seller.facebook || seller.instagram) && (
                                <div className="bg-gray-50 rounded-2xl p-8">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-5">Social Links</h3>
                                    <div className="flex space-x-6 text-lg">
                                        {seller.personalSite && (
                                            <a href={seller.personalSite} target="_blank" rel="noopener noreferrer" className="flex items-center text-green-600 hover:text-green-700 font-semibold">
                                                <span className="text-2xl mr-2">🌐</span>
                                                Website
                                            </a>
                                        )}
                                        {seller.facebook && (
                                            <a href={seller.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-700 font-semibold">
                                                <span className="text-2xl mr-2">📘</span>
                                                Facebook
                                            </a>
                                        )}
                                        {seller.instagram && (
                                            <a href={seller.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center text-pink-600 hover:text-pink-700 font-semibold">
                                                <span className="text-2xl mr-2">📸</span>
                                                Instagram
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-8">
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">Owner Information</h2>
                                
                                <div className="flex items-center space-x-6 mb-6">
                                    <img
                                        src={`http://localhost:5155/${user.photo || 'default-user.png'}`}
                                        alt={user.username}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                                    />
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{user.username}</h3>
                                        <p className="text-gray-600 text-lg">📧 {user.email}</p>
                                        <p className="text-gray-600 text-lg">📞 {user.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-gray-800 mb-5">Business Source</h3>
                                <div className="bg-white rounded-xl p-6 border border-gray-200">
                                    <p className="text-xl text-gray-800 mb-2">
                                        <span className="font-semibold">Primary Source:</span> {seller.mySource}
                                    </p>
                                    <p className="text-gray-600 text-lg">
                                        How this business connects with customers and reaches its audience
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}