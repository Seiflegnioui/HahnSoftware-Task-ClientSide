import { useEffect, useState } from "react";
import { useAppContext } from "../../../../API/AppContext";
import { BuyerOrders } from "./GetBuyerOrderThunk";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { useLocation, useNavigate } from "react-router-dom";
import type { OrderDTO, OrderState } from "../..";

export default function GetBuyerOrdersComponent() {
  const { connectedSellerOrBuyer } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const ordersState = useSelector((s: RootState) => s.order.buyerOrders);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);

  useEffect(() => {
    if (connectedSellerOrBuyer?.id) {
      dispatch(BuyerOrders(connectedSellerOrBuyer.id));
    }
  }, [dispatch, connectedSellerOrBuyer]);

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.messageType || "success"
      });
      
      window.history.replaceState({}, document.title);
      
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const getOrderStatusText = (state: OrderState) => {
    switch (state) {
      case 0: return "Pending Approval";
      case 1: return "Approved";
      case 2: return "Rejected";
      default: return "Unknown";
    }
  };

  const getOrderStatusColor = (state: OrderState) => {
    switch (state) {
      case 0: return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case 1: return "bg-green-100 text-green-800 border border-green-300";
      case 2: return "bg-red-100 text-red-800 border border-red-300";
      default: return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  const getStatusMessage = (state: OrderState) => {
    switch (state) {
      case 0: return "Waiting for seller approval. You will receive an email confirmation once approved.";
      case 1: return "Your order has been approved! The seller will contact you for delivery details.";
      case 2: return "Your order has been rejected. Please contact the seller for more information.";
      default: return "Your order status is being processed.";
    }
  };

  if (ordersState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (ordersState.errors.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">Error Loading Orders</div>
          <div className="text-gray-600">{ordersState.errors.join(", ")}</div>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg ${
            notification.type === "success" 
              ? "bg-green-100 border border-green-400 text-green-700" 
              : "bg-red-100 border border-red-400 text-red-700"
          }`}>
            {notification.message}
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track your order status and manage your purchases</p>
        </div>

        {/* Orders List */}
        {!ordersState.orders || ordersState.orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-gray-500 text-xl mb-4">No orders found</div>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {ordersState.orders.map((order: OrderDTO) => {
              const productName = order.product?.name || "Unknown Product";
              const productPrice = order.product?.price || 0;
              const productImage = order.product?.image || "";
              const sellerName = order.product?.seller?.shopName || 
                               order.product?.seller?.username || 
                               "Unknown Seller";

              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                  {/* Order Status Banner */}
                  <div className={`mb-6 p-4 rounded-lg ${getOrderStatusColor(order.state)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{getOrderStatusText(order.state)}</h3>
                        <p className="text-sm">{getStatusMessage(order.state)}</p>
                      </div>
                      <span className="text-2xl font-bold">
                        ${(productPrice * order.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="md:w-1/4">
                      <img
                        src={`http://localhost:5155/products/${productImage}`}
                        alt={productName}
                        className="w-full h-48 object-cover rounded-xl shadow-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='12' cy='12' r='3'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="md:w-3/4">
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">{productName}</h2>
                        <p className="text-gray-600">Order #: {order.id}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Order Details</h4>
                          <p className="text-gray-600">Quantity: {order.quantity}</p>
                          <p className="text-gray-600">Unit Price: ${productPrice}</p>
                          <p className="text-gray-600">Total: ${(productPrice * order.quantity).toFixed(2)}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2">Seller</h4>
                          <p className="text-gray-600">{sellerName}</p>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-1">Order Date</h4>
                            <p className="text-gray-600">{new Date(order.addedAt).toLocaleDateString()}</p>
                            <p className="text-gray-600 text-sm">{new Date(order.addedAt).toLocaleTimeString()}</p>
                          </div>
                          {order.product?.id && (
                            <button
                              onClick={() => navigate(`/buyer/details/${order.product.id}`)}
                              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                            >
                              View Product
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}