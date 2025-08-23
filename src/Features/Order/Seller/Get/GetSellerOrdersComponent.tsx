import React, { useEffect, useState } from 'react'
import type { AppDispatch, RootState } from '../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useAppContext } from '../../../../API/AppContext';
import { useNavigate } from 'react-router-dom';
import { SellerOrder } from './GetBuyerOrderThunk';
import { OrderState, type OrderDTO } from '../..';

export default function GetSellerOrdersComponent() {
  const { connectedSellerOrBuyer } = useAppContext();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const ordersState = useSelector((s: RootState) => s.order.sellerOrders);
  const [orders, setOrders] = useState<OrderDTO[]>([]);

  useEffect(() => {
    console.log("Connected seller:", connectedSellerOrBuyer);
    
    if (connectedSellerOrBuyer?.id) {
      dispatch(SellerOrder(connectedSellerOrBuyer.id));
    }
  }, [dispatch, connectedSellerOrBuyer]);

  useEffect(() => {
    if (ordersState.orders) {
      setOrders(ordersState.orders);
    }
  }, [ordersState.orders]);

  const handleApprove = (orderId: number) => {
    console.log("Approving order:", orderId, "with state:", OrderState.APPROVED);
    
    // Update local state for immediate UI feedback
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, state: OrderState.APPROVED }
          : order
      )
    );
    
    // Here you would normally make an API call
    // axiosClient.patch(`/order/update/${orderId}`, { state: OrderState.APPROVED })
  };

  const handleReject = (orderId: number) => {
    console.log("Rejecting order:", orderId, "with state:", OrderState.REJECTED);
    
    // Update local state for immediate UI feedback
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId 
          ? { ...order, state: OrderState.REJECTED }
          : order
      )
    );
    
    // Here you would normally make an API call
    // axiosClient.patch(`/order/update/${orderId}`, { state: OrderState.REJECTED })
  };

  const getOrderStatusText = (state: OrderState) => {
    switch (state) {
      case OrderState.PENDING: return "Pending";
      case OrderState.APPROVED: return "Approved";
      case OrderState.REJECTED: return "Rejected";
      default: return "Unknown";
    }
  };

  const getOrderStatusColor = (state: OrderState) => {
    switch (state) {
      case OrderState.PENDING: return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case OrderState.APPROVED: return "bg-green-100 text-green-800 border border-green-300";
      case OrderState.REJECTED: return "bg-red-100 text-red-800 border border-red-300";
      default: return "bg-gray-100 text-gray-800 border border-gray-300";
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
            onClick={() => navigate("/seller/home")}
            className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Customer Orders</h1>
          <button
            onClick={() => navigate("/seller/home")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-gray-500 text-xl mb-4">No orders found</div>
            <p className="text-gray-600 mb-6">You don't have any orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: OrderDTO) => {
              const productName = order.product?.name || "Unknown Product";
              const productPrice = order.product?.price || 0;
              const buyerName = order.buyer?.username || "Unknown Buyer";

              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className={`mb-6 p-4 rounded-lg ${getOrderStatusColor(order.state)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{getOrderStatusText(order.state)}</h3>
                        <p className="text-sm">Order #{order.id}</p>
                      </div>
                      <span className="text-2xl font-bold">
                        ${(productPrice * order.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Product Details</h4>
                      <p className="text-gray-900 font-semibold">{productName}</p>
                      <p className="text-gray-600">Quantity: {order.quantity}</p>
                      <p className="text-gray-600">Unit Price: ${productPrice}</p>
                      <p className="text-gray-600">Total: ${(productPrice * order.quantity).toFixed(2)}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Customer Information</h4>
                      <p className="text-gray-600">{buyerName}</p>
                      {order.buyer?.email && (
                        <p className="text-gray-600 text-sm">{order.buyer.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Order Date</h4>
                        <p className="text-gray-600">{new Date(order.addedAt).toLocaleDateString()}</p>
                        <p className="text-gray-600 text-sm">{new Date(order.addedAt).toLocaleTimeString()}</p>
                      </div>
                      
                      {/* Approve/Reject Buttons - Only show for pending orders */}
                      {order.state === OrderState.PENDING && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleReject(order.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => handleApprove(order.id)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                          >
                            Approve
                          </button>
                        </div>
                      )}
                      
                      {order.state !== OrderState.PENDING && (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.state)}`}>
                          {getOrderStatusText(order.state)}
                        </span>
                      )}
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