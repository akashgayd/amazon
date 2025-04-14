import React, { useState } from 'react';
import { signupUser } from '../../../utils/userApi';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
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
      const response = await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      console.log('Signup successful', response);
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <div className="text-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
            alt="Amazon Logo"
            className="h-10 mx-auto"
          />
        </div>
        <h2 className="text-xl font-semibold mb-4">Create account</h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Your name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="First and last name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength="6"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="At least 6 characters"
            />
            <p className="text-xs text-gray-600 mt-1">Passwords must be at least 6 characters.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-sm text-black font-medium py-2 rounded focus:outline-none"
          >
            {loading ? 'Creating Account...' : 'Create your Amazon account'}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-6">
          By creating an account, you agree to Amazon's
          <span className="text-blue-600 cursor-pointer"> Conditions of Use </span>
          and
          <span className="text-blue-600 cursor-pointer"> Privacy Notice</span>.
        </p>

        <div className="border-t mt-6 pt-4 text-sm text-gray-700 text-center">
          Already have an account?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
