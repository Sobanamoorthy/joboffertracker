// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Navbar.css';

function Navbar({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">JobOfferTracker</div>
      <button onClick={handleSignOut}>Sign Out</button>
    </nav>
  );
}

Navbar.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Navbar;
