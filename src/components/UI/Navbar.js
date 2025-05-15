import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSun, 
  faMoon, 
  faSignOutAlt, 
  faSignInAlt, 
  faUserPlus,
  faChartLine,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleProfileSettings = () => {
    setShowProfileMenu(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    setShowProfileMenu(false);
    onLogout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FontAwesomeIcon icon={faChartLine} className="brand-icon" />
        <Link to="/" className="logo">
          ExpenseTracker
        </Link>
      </div>

      {user && (
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
      )}

      <div className="nav-controls">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          data-theme={theme}
        >
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
        </button>

        {user ? (
          <div className="profile-menu-container">
            <button className="profile-button" onClick={handleProfileClick}>
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={user.name}
                  className="profile-photo"
                />
              ) : (
                <div className="profile-photo-placeholder">
                  {user.name ? user.name[0].toUpperCase() : <FontAwesomeIcon icon={faUser} />}
                </div>
              )}
            </button>
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-menu-header">
                  <p className="profile-name">{user.name}</p>
                  <p className="profile-email">{user.email}</p>
                </div>
                <button onClick={handleProfileSettings}>Profile Settings</button>
                <button onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-button">
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </Link>
            <Link to="/signup" className="signup-button">
              <FontAwesomeIcon icon={faUserPlus} /> Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 