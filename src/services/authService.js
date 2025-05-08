// services/authService.js
import axios from 'axios';

const API_URL = 'https://orizonplus.onrender.com/api/auth';

export const signup = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/signup`, userData);
    
    // Save token + user to localStorage
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    
    return res.data;
  } catch (err) {
    console.error('Signup Failed:', err.response?.data || err.message);
    throw err;
  }
};

export const login = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/login`, userData);
    
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    
    return res.data;
  } catch (err) {
    console.error('Login Failed:', err.response?.data || err.message);
    throw err;
  }
};
