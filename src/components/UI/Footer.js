import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <nav className="footer-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>

        <div className="footer-section">
          <h3>Connect With Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="author">Created by K224104-K228707-K224105</p>
        <p className="copyright">&copy; {currentYear} ExpenseTracker. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer; 