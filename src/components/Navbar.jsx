import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark luxury-navbar fixed-top py-3">
      <div className="container">
        {/* Brand/Logo - Sri Durga Events */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="fs-3 fw-bold text-gold" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '2px' }}>
            SRI DURGA
          </span>
          <span className="ms-2 fs-6 text-uppercase text-white tracking-widest d-none d-sm-inline" style={{ fontSize: '0.75rem', letterSpacing: '3px' }}>
            Events
          </span>
        </Link>

        {/* Hamburger Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#luxuryNavbar"
          aria-controls="luxuryNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="luxuryNavbar">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/services">
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/gallery">
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/packages">
                Packages
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link luxury-nav-link ${isActive ? 'active' : ''}`} to="/contact">
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
