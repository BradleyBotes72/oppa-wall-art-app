// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ 
      position: "fixed", top: 0, left: 0, width: "100%", 
      backgroundColor: "#333", color: "orange", padding: "1rem", 
      zIndex: 1000, display: "flex", justifyContent: "space-between", alignItems: "center" 
    }}>
      <div className="logo" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        <a href="#home" style={{ color: "orange", textDecoration: "none" }}>OPPA Wall Art</a>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <a href="#home" style={{ color: "orange", textDecoration: "none" }}>Home</a>
        <a href="#shop" style={{ color: "orange", textDecoration: "none" }}>Shop</a>
        <a href="#custom-design" style={{ color: "orange", textDecoration: "none" }}>Design Your Own</a>
        <a href="#cart" style={{ color: "orange", textDecoration: "none" }}>Cart</a>
        <Link to="/login" style={{ color: "orange", textDecoration: "none" }}>Login</Link>
        <Link to="/register" style={{ color: "orange", textDecoration: "none" }}>Register</Link>
        <Link to="/profile" style={{ color: "orange", textDecoration: "none" }}>Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
