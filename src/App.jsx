import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './componants/auth/userAuth/signup';
import VerifyOTP from './componants/auth/userAuth/Otp';
import Login from './componants/auth/userAuth/login';
import ForgotPassword from './componants/auth/userAuth/forgatepassword';
import ResetPassword from './componants/auth/userAuth/resetPassword';;
import ResetPasswordOTP from './componants/auth/userAuth/resetPassCompo';
import Home from './componants/pages/Home/HomePage';
import Cookies from 'js-cookie';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = Cookies.get('token');
  
  if (!token) {
    // Redirect to login if no token exists
    return <Navigate to="/login" />;
  }
  
  return children;
};

const App = () => {
  return (
 
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password-otp" element={<ResetPasswordOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          {/* Redirect to login by default */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      
     
      </div>
   
  );
};

export default App;
