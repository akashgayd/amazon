import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, addToCart, addToWishlist, getProducts } from '../utils/userApi';
import { StarIcon, HeartIcon, ShoppingCartIcon } from '@heroicons/react/solid';
import { ChevronRightIcon } from '@heroicons/react/outline';
import Navbar from '../componants/common/navbar'

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productData = await getProductById(id);
        setProduct(productData);
        
        // Fetch related products
        const related = await getProducts({ category: productData.category });
        setRelatedProducts(related.products.filter(p => p._id !== id));
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }
    addToCart(product._id, quantity, selectedSize);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout (this would need to be implemented)
    // history.push('/checkout');
  };

  const calculateDiscountPercentage = () => {
    if (product.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  if (loading) {
    return (
      <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2 bg-gray-200 h-96 rounded-lg"></div>
          <div className="md:w-1/2 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
      </>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Product not found</h2>
      </div>
    );
  }

  return (
    <><Navbar/>
    
    <div className="bg-gray-50  m-20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-gray-500 mb-4">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <ChevronRightIcon className="h-4 w-4 mx-1 text-gray-400" />
          <Link to={`/category/${product.category}`} className="hover:text-orange-500">{product.category}</Link>
          <ChevronRightIcon className="h-4 w-4 mx-1 text-gray-400" />
          <span className="text-gray-700 truncate">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="w-full lg:w-2/5">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex md:flex-col overflow-x-auto md:h-96 order-2 md:order-1 mt-4 md:mt-0">
                  {product.images.map((img, index) => (
                    <div 
                      key={index} 
                      className={`min-w-16 h-16 border-2 rounded cursor-pointer mb-2 mr-2 md:mr-0 ${
                        selectedImage === index ? 'border-orange-500' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Main Image */}
                <div className="flex-grow order-1 md:order-2">
                  <div className="bg-white h-80 md:h-96 flex items-center justify-center">
                    <img 
                      src={product.images[selectedImage]} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="w-full lg:w-3/5">
              <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-1">{product.name}</h1>
              
              {/* Brand if available */}
              {product.brand && (
                <Link to={`/brand/${product.brand}`} className="text-sm text-blue-600 mb-2 inline-block">
                  Visit the {product.brand} Store
                </Link>
              )}
              
              {/* Ratings */}
              <div className="flex items-center mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.ratings || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-blue-600">
                  {product.reviews?.length || 0} ratings
                </span>
              </div>
              
              {/* Price section */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                {product.originalPrice && product.originalPrice > product.price ? (
                  <div>
                    <div className="flex items-center">
                      <span className="text-red-600 text-2xl font-medium">${product.price.toFixed(2)}</span>
                      <span className="ml-2 text-sm line-through text-gray-500">${product.originalPrice.toFixed(2)}</span>
                      <span className="ml-2 text-sm bg-red-100 text-red-800 px-1 rounded">
                        Save {calculateDiscountPercentage()}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
                )}
                
                {/* Additional price info */}
                <p className="text-sm text-gray-500 mt-1">
                  {product.freeShipping ? 'FREE delivery' : 'Shipping calculated at checkout'}
                </p>
              </div>
              
              {/* Product features/description */}
              <div className="mb-6">
                <p className="text-sm text-gray-700 mb-4">{product.description}</p>
                
                {product.features && product.features.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-gray-900 mb-2">About this item:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                      {product.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* Size selector if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md text-sm font-medium ${
                          selectedSize === size 
                            ? 'bg-orange-100 text-orange-800 border-orange-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Stock info */}
              <div className="mb-4">
                <p className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 
                    ? `In Stock (${product.stock} available)` 
                    : 'Currently unavailable'
                  }
                </p>
              </div>
              
              {/* Quantity selector */}
              <div className="mb-6">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-700 block mb-2">
                  Quantity
                </label>
                <div className="flex">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1 border border-gray-300 rounded-l-md bg-gray-50 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-2 py-1 border-t border-b border-gray-300 text-center"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-3 py-1 border border-gray-300 rounded-r-md bg-gray-50 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 py-2 px-4 border border-yellow-500 rounded-full text-sm font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50"
                >
                  <span className="flex items-center justify-center">
                    <ShoppingCartIcon className="h-5 w-5 mr-1" />
                    Add to Cart
                  </span>
                </button>
                
                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 py-2 px-4 border border-orange-600 rounded-full text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                >
                  Buy Now
                </button>
                
                <button
                  onClick={() => addToWishlist(product._id)}
                  className="p-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <HeartIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              {/* Product details section */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Product Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.category && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Category:</span> {product.category}
                    </p>
                  )}
                  {product.brand && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Brand:</span> {product.brand}
                    </p>
                  )}
                  {product.color && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Color:</span> {product.color}
                    </p>
                  )}
                  {product.material && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Material:</span> {product.material}
                    </p>
                  )}
                  {product.dimensions && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Dimensions:</span> {product.dimensions}
                    </p>
                  )}
                  {product.weight && (
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Weight:</span> {product.weight}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Customers who viewed this item also viewed</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {relatedProducts.slice(0, 5).map((relatedProduct) => (
                <Link 
                  key={relatedProduct._id} 
                  to={`/product/${relatedProduct._id}`}
                  className="group"
                >
                  <div className="aspect-square bg-white border border-gray-200 rounded-md overflow-hidden">
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="mt-2 text-sm text-gray-700 line-clamp-2 group-hover:text-orange-500">
                    {relatedProduct.name}
                  </h3>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(relatedProduct.ratings || 0) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-xs text-gray-500">
                      ({relatedProduct.reviews?.length || 0})
                    </span>
                  </div>
                  <p className="mt-1 font-medium text-gray-900">${relatedProduct.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

// You'll need to create this component or import it from elsewhere


export default ProductDetailPage;