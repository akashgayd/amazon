import React from 'react';
import { Link, useLocation } from 'react-router-dom';



const OrderSuccessPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (

      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            
            {orderId && (
              <div className="bg-gray-50 p-4 rounded-md mb-6 w-full">
                <p className="text-sm font-medium text-gray-700">Order Number:</p>
                <p className="text-lg font-bold text-gray-900">{orderId}</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                to="/orders"
                className="flex-1 sm:flex-none px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View Orders
              </Link>
              <Link
                to="/products"
                className="flex-1 sm:flex-none px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
  
  );
};

export default OrderSuccessPage;