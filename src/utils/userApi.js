import axios from 'axios';
import Cookies from 'js-cookie';

const Url = "https://amazon-vdth.onrender.com/api/v1/auth/";

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
  const res = await API.post('/login', data);


  Cookies.set('token', res.data.token, { expires: 7 });

  return res;
};

export const signupUser = (data) => API.post('/signup', data);

export const getOtp = () => API.post('/verify-otp');

export const forgotPassword = (data) => API.post('/forgot-password', data);