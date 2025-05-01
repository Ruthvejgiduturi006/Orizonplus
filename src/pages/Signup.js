import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import './Signup.css'; // Assuming you'll use the CSS provided earlier or adapt it

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await signup(formData);

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(response.user));
      alert('Signup successful!');

      navigate('/login'); // Redirect after signup
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="blue-circle circle"></div>
      <div className="orange-circle circle"></div>

      <div className="signup-card">
        {/* Right Panel (Text Section) - Reversed */}
        <div className="left-panel">
        <h2>Welcome Back! To ORIZON+</h2>
        <p>Stay connected with us by logging in using your personal information</p>
        <button onClick={() => navigate('/login')} className="ghost-btn">LOGIN</button>
        </div>

        {/* Left Panel (Form) - Reversed */}
        <div className="right-panel">
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Create Account</h2>

            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />

            <label htmlFor="role">Select Role</label>
            <select name="role" onChange={handleChange} required>
              <option value="">Choose your role</option>
              <option value="seeker">Job Seeker</option>
              <option value="provider">Job Provider</option>
            </select>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>
        </div>
      </div>

      <a href="/" className="back-home">
      ← Back to Home
      </a>
    </div>
  );
}

export default Signup;