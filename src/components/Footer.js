// src/components/Footer.js
import React from "react";

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#333", color: "orange", textAlign: "center", padding: "1rem", marginTop: "2rem" }}>
      <p>&copy; {new Date().getFullYear()} OPPA Wall Art. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;
