import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark luxury-navbar fixed-top py-3">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="Sri Durga Events Logo"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "contain",
              marginRight: "14px"
            }}
          />

          <div className="d-flex flex-column">
            <span
              className="fw-bold text-gold"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2rem",
                letterSpacing: "2px",
                lineHeight: "1"
              }}
            >
              SRI DURGA
            </span>

            <span
              style={{
                color: "#ffffff",
                letterSpacing: "5px",
                fontSize: "13px",
                textTransform: "uppercase"
              }}
            >
              EVENTS
            </span>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink className="nav-link luxury-nav-link" to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link luxury-nav-link" to="/about">
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link luxury-nav-link" to="/services">
                Services
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link luxury-nav-link" to="/gallery">
                Gallery
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link luxury-nav-link" to="/packages">
                Packages
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link luxury-nav-link" to="/contact">
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