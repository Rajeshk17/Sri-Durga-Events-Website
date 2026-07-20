import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/logo/logo.png';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleToggle = () => setIsNavCollapsed(!isNavCollapsed);
  const handleClose = () => setIsNavCollapsed(true);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark luxury-navbar fixed-top py-3">
      <div className="container">
        {/* Brand/Logo - Sri Durga Events */}
        <Link className="navbar-brand d-flex align-items-center" to="/" onClick={handleClose}>
          <img 
            src={logo} 
            alt="Sri Durga Logo" 
            className="logo-header"
            style={{
              marginRight: '12px'
            }} 
          />
          <div className="d-flex flex-column justify-content-center" style={{ lineHeight: 1.1 }}>
            <span className="fw-bold text-gold" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.45rem', letterSpacing: '2.5px' }}>
              SRI DURGA
            </span>
            <span className="text-uppercase text-white fw-semibold" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '0.65rem', letterSpacing: '5px' }}>
              EVENTS
            </span>
          </div>
        </Link>

        {/* Hamburger Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={handleToggle}
          aria-controls="luxuryNavbar"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`} id="luxuryNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/" onClick={handleClose}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/about" onClick={handleClose}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/services" onClick={handleClose}>
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/gallery" onClick={handleClose}>
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/packages" onClick={handleClose}>
                Packages
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/contact" onClick={handleClose}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
