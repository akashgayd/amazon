import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../utils/userApi';
import ProductCard from './pages/Home/HomeOther/ProductCard';
import Navbar from './common/navbar';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchParams] = useSearchParams();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 12,
    total: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      setFilters({ ...filters, keyword: searchTerm });
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {
          page: pagination.page,
          pageSize: pagination.pageSize,
          ...filters
        };
        
        const data = await getProducts(params);
        setProducts(data.products);
        setPagination({
          ...pagination,
          total: data.count,
          pages: Math.ceil(data.count / pagination.pageSize)
        });
        
        if (data.products.length > 0 && categories.length === 0) {
          const uniqueCategories = [...new Set(data.products.map(p => p.category))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [filters, pagination.page]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleProductClick = (productId) => {
    navigate(`/product-detail/${productId}`);
  };

  return (
    <>
      <div className="mb-8">
        <Navbar/>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
               
              </div>
              
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found matching your criteria.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div 
                        key={product._id} 
                        onClick={() => handleProductClick(product._id)}
                        className="cursor-pointer"
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <nav className="inline-flex rounded-md shadow">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {[...Array(pagination.pages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium ${pagination.page === i + 1 ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.page === pagination.pages}
                        className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductListingPage;