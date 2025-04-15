import axios from 'axios';
import Cookies from 'js-cookie';

const Url = "https://otpgenraterfirst.onrender.com/api/v1";

const API = axios.create({
  baseURL: Url,
  headers: {
    'Content-Type': 'application/json',
  },
});



API.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const loginUser = async (data) => {
  const res = await API.post('auth/login', data);


  Cookies.set('token', res.data.token, { expires: 7 });

  return res;
};

export const signupUser = (data) => API.post('auth/register', data);

export const getOtp = () => API.post('auth/verify-otp');

export const forgotPassword = (data) => API.post('auth/forgot-password', data);

// product and cards api








export const getProducts = async (params = {}) => {
  const response = await axios.get(`${Url}/products`, { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${Url}/products/${id}`);
  return response.data;
};

// Cart API
export const getCart = async () => {
  const response = await axios.get(`${Url}/cart`);
  return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const response = await axios.post(`${Url}/cart/add`, { productId, quantity });
  return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const response = await axios.put(`${Url}/cart/update/${itemId}`, { quantity });
  return response.data;
};

export const removeFromCart = async (itemId) => {
  const response = await axios.delete(`${Url}/cart/${itemId}`);
  return response.data;
};

// Wishlist API
export const getWishlist = async () => {
  const response = await axios.get(`${Url}/wishlist`);
  return response.data;
};

export const addToWishlist = async (productId) => {
  const response = await axios.post(`${Url}/wishlist/add`, { productId });
  return response.data;
};

export const removeFromWishlist = async (productId) => {
  const response = await axios.delete(`${Url}/wishlist/${productId}`);
  return response.data;
};

// Orders API
export const createOrder = async (orderData) => {
  const response = await axios.post(`${Url}/orders`, orderData);
  return response.data;
};

export const getUserOrders = async () => {
  const response = await axios.get(`${Url}/orders/user`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await API.post('products', productData);
  return response.data;
};