// services/authService.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const signup = async (userData) => {
  const res = await axios.post(`${API_BASE}/auth/signup`, userData);
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', JSON.stringify(res.data.user));
  return res.data;
};

export const login = async (userData) => {
  const res = await axios.post(`${API_BASE}/auth/login`, userData);
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', JSON.stringify(res.data.user));
  return res.data;
};
