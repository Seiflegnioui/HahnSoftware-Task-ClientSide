import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetails } from "./ProductDetailsThunk";
import { SendOrder } from "../../Order/Buyer/Create/SendOrderThunk";
import type { AppDispatch, RootState } from "../../store";
import { useAppContext } from "../../../API/AppContext";
import { PORT } from "../../../evn";

export default function ProductDetailsComponent() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { connectedSellerOrBuyer, connectedUser } = useAppContext();
  const productState = useSelector((s: RootState) => s.product.details);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) dispatch(ProductDetails(parseInt(id)));
  }, [id, dispatch]);

  const handleOrder = () => {
    if (!connectedSellerOrBuyer?.id) {
      return;
    }

    if (!productState.product) return;
    
    const orderData = {
      buyerId: connectedSellerOrBuyer.id,
      productId: productState.product.id,
      quantity: quantity,
    };

    dispatch(SendOrder(orderData))
      .unwrap()
      .then(() => {
        setQuantity(1);
        navigate("/buyer/orders", {
          state: {
            message: "Order placed successfully!",
            messageType: "success",
          },
        });
      })
      .catch((error) => {
        navigate("/buyer/home", {
          state: {
            message: `Failed to place order: ${error.message || error}`,
            messageType: "error",
          },
        });
      });
  };
  const incrementQuantity = () => {
    if (productState.product && quantity < productState.product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (productState.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (productState.errors.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <div className="text-xl font-semibold mb-2">
            Error Loading Product
          </div>
          <div>{productState.errors.join(", ")}</div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!productState.product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-gray-500 mb-4">Product not found</div>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            Go Back to Products
          </button>
        </div>
      </div>
    );
  }

  const product = productState.product;
  const isBuyer = connectedUser?.role === 2;
  const canOrder = isBuyer && product.quantity > 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 font-medium"
        >
          <span className="text-lg">←</span>
          <span className="ml-2">Back to Products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 flex items-center justify-center">
              <img
                src={`http://localhost:${PORT}/products/${product.image}`}
                alt={product.name}
                className="w-full max-w-md h-96 object-cover rounded-xl shadow-lg"
              />
            </div>

            <div className="md:w-1/2 p-8">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <p className="text-2xl font-semibold text-green-700 mb-4">
                  MAD {product.price}
                </p>
                <p className="text-gray-600 text-lg mb-6">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <span className="text-gray-600 font-medium">Stock:</span>
                  <span
                    className={`ml-2 font-semibold ${
                      product.quantity === 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {product.quantity === 0
                      ? "Out of stock"
                      : `${product.quantity} available`}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 font-medium">Reviews:</span>
                  <span className="ml-2 font-semibold">{product.reviews}</span>
                </div>
              </div>

              {product.quantity > 0 && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                        className="px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          const value = Math.max(
                            1,
                            Math.min(
                              product.quantity,
                              parseInt(e.target.value) || 1
                            )
                          );
                          setQuantity(value);
                        }}
                        className="w-16 px-2 py-2 text-center border-0 focus:ring-0"
                        min="1"
                        max={product.quantity}
                      />
                      <button
                        onClick={incrementQuantity}
                        disabled={quantity >= product.quantity}
                        className="px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">
                      Max: {product.quantity}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleOrder}
                disabled={!canOrder}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-colors ${
                  !canOrder
                    ? "bg-gray-400 cursor-not-allowed text-gray-200"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {!isBuyer
                  ? "Login as Buyer to Order"
                  : product.quantity === 0
                  ? "Out of Stock"
                  : `Order Now - MAD ${(product.price * quantity).toFixed(2)}`}
              </button>

              {!isBuyer && connectedUser && (
                <p className="text-sm text-gray-600 mt-3 text-center">
                  You are logged in as a seller. Please login as a buyer to
                  place orders.
                </p>
              )}
            </div>
          </div>
        </div>

        {product.seller && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Seller Information
            </h2>
            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                {product.seller.photo ? (
                  <img
                    src={`http://localhost:${PORT}/${product.seller.photo}`}
                    alt={product.seller.shopName || product.seller.username}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center border-2 border-gray-200">
                    <span className="text-2xl font-bold text-green-600">
                      {product.seller.shopName?.charAt(0) ||
                        product.seller.username?.charAt(0) ||
                        "S"}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {product.seller.shopName || product.seller.username}
                </h3>
                <p className="text-gray-600 mb-3">
                  {product.seller.shopeDescription}
                </p>
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400 text-lg">
                    {"★".repeat(Math.floor(product.seller.rating || 0))}
                    {"☆".repeat(5 - Math.floor(product.seller.rating || 0))}
                  </div>
                  <span className="text-gray-500">
                    ({product.seller.rating || 0} rating)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
