import React from 'react';
import {  Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import Signup from './componants/auth/userAuth/signup';
import VerifyOTP from './componants/auth/userAuth/Otp';
import Login from './componants/auth/userAuth/login';
import ForgotPassword from './componants/auth/userAuth/forgatepassword';
import ResetPassword from './componants/auth/userAuth/resetPassword';
import ResetPasswordOTP from './componants/auth/userAuth/resetPassCompo';

import Home from './componants/pages/Home/HomePage';
import ProductListingPage from './componants/ProductListingPage';
import ProductDetailPage from './componants/ProductDetailPage';
import CartPage from './componants/CartPage';
import WishlistPage from './componants/WishlistPage';
import CheckoutPage from './componants/CheckoutPage';
import OrderSuccessPage from './componants/OrderSuccessPage';

// Protected Route
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('token');
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
   
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password-otp" element={<ResetPasswordOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/product-listing" 
            element={
              <ProtectedRoute>
                <ProductListingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/product-detail/:id" 
            element={
              <ProtectedRoute>
                <ProductDetailPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/wishlist" 
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/order-success" 
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            } 
          />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
  
  );
};

export default App;
