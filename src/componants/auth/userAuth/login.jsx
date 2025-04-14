import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../utils/userApi';
import { Link } from 'react-router-dom';

const AmazonSignin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);
      const response = await loginUser(formData);

    
     if(response.status === 200){
       navigate("/home")
     }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-4">
      {/* Amazon Logo */}
      <div className="mb-4">
      <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            className="h-10 mx-auto"
          />
      </div>
      
      {/* Form Container */}
      <div className="w-full max-w-sm border border-gray-300 rounded p-4">
        <h1 className="text-xl font-normal mb-4">Log In</h1>
        
        {error && (
          <div className="rounded-md bg-red-50 p-2 mb-4">
            <div className="flex">
              <div className="ml-2">
                <h3 className="text-sm font-medium text-red-800">
                  {error}
                </h3>
              </div>
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Email/Phone field */}
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email or mobile phone number
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          {/* Password field with forgot link */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Link to={'/forgot-password'}
                
                className="text-xs text-blue-600 hover:text-orange-600 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          {/* Sign in button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 border border-yellow-500 rounded py-1 px-2 hover:bg-yellow-500 focus:outline-none focus:ring-1 focus:ring-yellow-500 mb-4"
          >
            {loading ? 'Signing in...' : 'Log In'}
          </button>
          
          {/* New to Amazon section */}
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500 mb-2">New to Amazon?</p>
            <Link to={'/signup'} className="text-xs text-blue-600 hover:text-orange-600 hover:underline">
              <button
                type="button"
                className="w-full bg-gray-100 border border-gray-300 rounded py-1 px-2 hover:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                Create an account
              </button>
            </Link>
          </div>
          
          {/* Terms text */}
          <p className="text-xs text-gray-700">
            By signing in you are agreeing to our{" "}
            <Link
              to="#"
              className="text-blue-600 hover:text-orange-600 hover:underline"
            >
              Conditions of Use
            </Link>{" "}
            and Sale and our{" "}
            <Link
              to="#"
              className="text-blue-600 hover:text-orange-600 hover:underline"
            >
              Privacy Notice
            </Link>.
          </p>
        </form>
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-4 text-xs text-blue-600">
          < Link to="#" className="hover:text-orange-600 hover:underline">
            Help
          </Link>
          <Link href="#" className="hover:text-orange-600 hover:underline">
            Conditions of Use
          </Link>
          <Link href="#" className="hover:text-orange-600 hover:underline">
            Privacy Notice
          </Link>
        </div>
        <p className="text-xs text-gray-600 mt-2">
          © 1996-2025, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default AmazonSignin;