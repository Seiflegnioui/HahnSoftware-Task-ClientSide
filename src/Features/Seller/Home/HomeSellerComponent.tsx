import React, { useEffect,useLayoutEffect ,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import { GetProduct } from '../Products/Show/GetProductThunk'
import { GetOrdersCounts, GetRecentOrders } from './SellerHomeThunk'
import { useAppContext } from '../../../API/AppContext'
import { setProductsCount } from './SellerHomeSlice'
import { OrderState } from '../../Order'
import { Link } from 'react-router-dom'
import type { ProductDTO } from '../Products'

export default function HomeSellerComponent() {
  const dispatch = useDispatch<AppDispatch>()
  const { connectedSellerOrBuyer } = useAppContext()
  const sellerHomeState = useSelector((s: RootState) => s.sellerHome)
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [productsInStock, setProductsInStock] = useState(0)

   useEffect(() => {
    if (connectedSellerOrBuyer?.id) {
      dispatch(GetRecentOrders(connectedSellerOrBuyer.id))
      dispatch(GetOrdersCounts(connectedSellerOrBuyer.id))
      dispatch(GetProduct(connectedSellerOrBuyer.id))
        .unwrap()
        .then((productsData: ProductDTO[]) => {
          setProducts(productsData)
          const inStockCount = productsData.filter((product: any) => product.quantity > 0).length
          setProductsInStock(inStockCount)
          dispatch(setProductsCount(productsData.length))
        })
    }
  }, [dispatch, connectedSellerOrBuyer])

  const calculateSumReviews = () => {
    if (!products?.length) return 0
    const totalRating = products.reduce((sum, product) => sum + (product.reviews || 0), 0)
    return (totalRating).toFixed(1)
  }

  const totalReviews = products.reduce((sum, product) => sum + (product.reviews || 0), 0)

  if (sellerHomeState.loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white">
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-emerald-100 mt-2">Loading your business overview...</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-xl p-6 text-white">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <p className="text-emerald-100 mt-2">Welcome back! Here's your business overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {sellerHomeState.ordersCounts?.ordersCount ?? '0'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📦</span>
            </div>
          </div>
          <p className="text-green-600 text-sm mt-2">
            +{sellerHomeState.ordersCounts?.recentOrdersCount ?? '0'} recent
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Products</p>
              <p className="text-2xl font-bold text-gray-900">
                {products.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🛍️</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-2">{productsInStock} in stock</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Reviews Sum</p>
              <p className="text-2xl font-bold text-gray-900">
                {calculateSumReviews()}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⭐</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            Based on {totalReviews} reviews
          </p>
        </div>

        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {sellerHomeState.orders && sellerHomeState.orders.length > 0 ? (
              sellerHomeState.orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      {order.quantity} item{order.quantity !== 1 ? 's' : ''} • MAD{order.product.price}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.state === OrderState.APPROVED
                      ? 'bg-green-100 text-green-800'
                      : order.state === OrderState.PENDING
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.state}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No recent orders</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/seller/product/new" className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg text-center transition-colors">
              <span className="block text-2xl mb-2">➕</span>
              Add Product
            </Link>
          
            <Link to="/seller/orders" className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg text-center transition-colors">
              <span className="block text-2xl mb-2">📦</span>
              Manage Orders
            </Link>
           
          </div>
        </div>
      </div>

      {sellerHomeState.errors && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <h3 className="font-bold">Error</h3>
          <ul>
            {sellerHomeState.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}