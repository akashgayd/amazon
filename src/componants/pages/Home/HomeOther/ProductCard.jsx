import React from 'react';
import { Link } from 'react-router-dom';
import { StarIcon, HeartIcon } from '@heroicons/react/solid';
import { addToCart, addToWishlist } from '../../../../utils/userApi';


const ProductCard = ({ product }) => {
  if (!product) return null; // Safeguard

  return (
    <>
   
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product._id}`}>
        <div className="h-48 bg-gray-200 flex items-center justify-center">
          <img
            src={product.images?.[0] || '/placeholder-product.jpg'}
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
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              className={`h-4 w-4 ${i < product.ratings ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.reviews?.length || 0})</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          <div className="flex space-x-2">
            <button
              onClick={() => addToCart(product._id)}
              className="p-1 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            <button
              onClick={() => addToWishlist(product._id)}
              className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
            >
              <HeartIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProductCard;
