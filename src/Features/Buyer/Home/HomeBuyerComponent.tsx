import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Categories } from "../../Seller/Products/Enums/Caterories";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../store";
import { GetProduct } from "../../Seller/Products/Show/GetProductThunk";
import type { ProductDTO } from "../../Seller/Products";
import { ReviewProduct } from "../Product/Reviewed/MarkReviewedThunk";

export default function HomeBuyerComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const productState = useSelector((s: RootState) => s.product.get);
  const ReviewproductState = useSelector((s: RootState) => s.product.reviewed);
  
  useEffect(() => {
    dispatch(GetProduct());
  }, [dispatch]);

  const categoryEntries = Object.entries(Categories).filter(([key]) => isNaN(Number(key)));
  const categories = categoryEntries.map(([key]) => key);

  const products = productState.products || [];

  const handleProductClick = (productId: number) => {
    navigate(`/buyer/details/${productId}`);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Shop by Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 bg-white border border-green-200 rounded-full hover:bg-green-50 transition text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Featured Products</h2>
            <button className="text-green-600 hover:text-green-700 font-medium">
              View all →
            </button>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No products available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: ProductDTO) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-green-100 cursor-pointer"
                  onClick={() => {
                    handleProductClick(product.id);
                    dispatch(ReviewProduct(product.id))
                  } }
                >
                  <div className="relative">
                    <img
                      src={`http://localhost:5155/products/${product.image}`}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-t-2xl"
                    />
                    {product.quantity === 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Out of stock
                      </div>
                    )}
                    {product.reviews > 10 && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Popular
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{product.name}</h3>
                      <span className="text-green-600 font-bold">${product.price}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {categoryEntries.find(([key, value]) => value === product.category)?.[0] || 'Unknown'}
                    </p>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex text-yellow-400">
                        {"★".repeat(Math.min(5, Math.floor(product.reviews / 2)))}
                        {"☆".repeat(5 - Math.min(5, Math.floor(product.reviews / 2)))}
                      </div>
                      <span className="text-gray-500 text-sm ml-2">
                        ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        By {product.seller?.shopName || product.seller?.username || 'Unknown'}
                      </span>
                     
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Summer Sale! 🎉</h3>
              <p className="opacity-90">Get 20% off on all eco-friendly products</p>
            </div>
            <button className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition mt-4 md:mt-0">
              Shop Now
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter(product => product.seller)
              .reduce((sellers: any[], product) => {
                const existingSeller = sellers.find(s => s.id === product.seller?.id);
                if (existingSeller) {
                  existingSeller.products++;
                  existingSeller.rating = Math.max(existingSeller.rating, product.reviews / 20);
                } else if (product.seller) {
                  sellers.push({
                    id: product.seller.id,
                    name: product.seller.shopName || product.seller.username,
                    products: 1,
                    rating: Math.min(5, product.reviews / 20),
                    photo: product.seller.photo
                  });
                }
                return sellers;
              }, [])
              .sort((a, b) => b.products - a.products)
              .slice(0, 3)
              .map((seller) => (
                <div key={seller.id} className="bg-white p-4 rounded-2xl shadow-md border border-green-100">
                  <div className="flex items-center mb-3">
                    {seller.photo ? (
                      <img
                        src={`http://localhost:5155/${seller.photo}`}
                        alt={seller.name}
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">{seller.name.charAt(0)}</span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold">{seller.name}</h4>
                      <div className="flex text-yellow-400 text-sm">
                        {"★".repeat(Math.floor(seller.rating))}
                        {"☆".repeat(5 - Math.floor(seller.rating))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{seller.products} products</p>
                  <button 
                    className="w-full mt-3 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition"
                    onClick={() => navigate(`/buyer/store/${seller.id}`)}
                  >
                    Visit Store
                  </button>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}