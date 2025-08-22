
export default function HomeBuyerComponent() {
  const fakeProducts = [
    {
      id: 1,
      name: "Organic Cotton T-Shirt",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      rating: 4.5,
      reviews: 128,
      category: "Clothing",
      seller: "EcoFashion"
    },
    {
      id: 2,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 256,
      category: "Electronics",
      seller: "TechGadgets"
    },
    {
      id: 3,
      name: "Handmade Ceramic Coffee Mug",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 89,
      category: "Home & Kitchen",
      seller: "ArtisanPottery"
    },
    {
      id: 4,
      name: "Natural Bamboo Cutting Board",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 156,
      category: "Kitchen",
      seller: "EcoHome"
    },
    {
      id: 5,
      name: "Yoga Mat Premium",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 342,
      category: "Fitness",
      seller: "FitLife"
    },
    {
      id: 6,
      name: "Leather Crossbody Bag",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      rating: 4.4,
      reviews: 201,
      category: "Accessories",
      seller: "StyleBoutique"
    }
  ];

  const categories = ["All", "Clothing", "Electronics", "Home & Kitchen", "Fitness", "Accessories"];

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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fakeProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-green-100">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-2xl"
                  />
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Popular
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <span className="text-green-600 font-bold">${product.price}</span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3">{product.category}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-gray-500 text-sm ml-2">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">By {product.seller}</span>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
            {[
              { name: "EcoFashion", products: 42, rating: 4.9 },
              { name: "TechGadgets", products: 38, rating: 4.8 },
              { name: "ArtisanPottery", products: 27, rating: 4.7 }
            ].map((seller, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl shadow-md border border-green-100">
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold">{seller.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{seller.name}</h4>
                    <div className="flex text-yellow-400 text-sm">
                      {"★".repeat(Math.floor(seller.rating))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{seller.products} products</p>
                <button className="w-full mt-3 bg-green-100 text-green-700 py-2 rounded-lg hover:bg-green-200 transition">
                  Visit Store
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

    
    </div>
  )
}