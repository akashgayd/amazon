import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWishlist, removeFromWishlist, addToCart } from '../utils/userApi';


const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        const wishlistData = await getWishlist();
        setWishlist(wishlistData);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWishlist();
  }, []);

  const handleRemoveItem = async (productId) => {
    try {
      const updatedWishlist = await removeFromWishlist(productId);
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleMoveToCart = async (productId) => {
    try {
      await addToCart(productId);
      const updatedWishlist = await removeFromWishlist(productId);
      setWishlist(updatedWishlist);
    } catch (error) {
      console.error('Error moving to cart:', error);
    }
  };

  if (loading) {
    return (
   
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
   
    );
  }

  if (!wishlist || wishlist.products.length === 0) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your wishlist is empty</h2>
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Browse Products
          </Link>
        </div>
    
    );
  }

  return (
   
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Wishlist</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden group relative">
              <Link to={`/products/${product._id}`}>
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img
                    src={product.images[0] || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Link>
              
              <div className="p-4">
                <Link to={`/products/${product._id}`}>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-indigo-600">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-lg font-bold text-gray-900">${product.price}</p>
                
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleMoveToCart(product._id)}
                    className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveItem(product._id)}
                    className="p-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
   
  );
};

export default WishlistPage;