// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'; // Import the new CSS file

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        
        {/* Header Section */}
        <div className="register-header">
          <h1>JobOfferTracker</h1>
        </div>
        
        {/* Card Body */}
        <div className="register-card">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            
            <button type="submit" className="register-button">Register</button>
          </form>
          
          <div className="register-footer">
            <p>
              Already have an account?{' '}
              <button className="link-button" onClick={() => navigate('/login')}>
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;