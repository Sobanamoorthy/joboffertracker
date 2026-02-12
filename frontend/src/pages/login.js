// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Importing the provided CSS file

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });

      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        
        {/* Header Section */}
        <div className="login-header">
          <h1>JobOfferTracker</h1>
          <p>Sign in to manage your applications</p>
        </div>
        
        {/* Card Body */}
        <div className="login-card">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          
          <form onSubmit={handleSubmit}>
            {/* Form groups for input spacing */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button type="submit" className="login-button">Sign In</button>
          </form>

          {/* Footer Section for Registration Link */}
          <div className="login-footer">
            <p>
              Don’t have an account?{' '}
              <button
                className="link-button"
                onClick={() => navigate('/register')}
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;