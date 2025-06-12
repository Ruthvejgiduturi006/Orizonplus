// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      alert('Login successful!'); // ✅ success message
      navigate('/dashboard');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      {/* Back to Home Link */}
      <Link to="/" className="back-home">← Back to Home</Link>

      {/* Login Card */}
      <div className="login-card">
        {/* Left Panel (Form) */}
        <div className="left-panel">
          <h2>Login</h2>
          <p>
            Don't have an account yet?{' '}
            <Link to="/signup" className="signup-link">Sign Up</Link>
          </p>

          <form onSubmit={handleLogin}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <span className="forgot-password">Forgot Password?</span>
            </div>

            <button type="submit" className="login-btn">LOGIN</button>

          </form>
        </div>

        {/* Decorative Circles */}
        <div className="blue-circle circle"></div>
        <div className="orange-circle circle"></div>

        {/* Right Panel (Image) */}
        <div className="right-panel">
          <img src="bjob.gif" alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default Login;
