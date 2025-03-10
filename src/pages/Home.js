// src/pages/Home.js
import React from "react";

const productImages = [
  "/images/product1.jpg",
  "/images/product2.jpg",
  "/images/product3.jpg",
  "/images/product4.jpg",
  "/images/product5.jpg",
  "/images/product6.jpg"
];

export default function Home() {
  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
        Welcome to OPPA Wall Art
      </h2>
      <div className="image-gallery">
        {productImages.map((img, index) => (
          <img key={index} src={img} alt={`Product ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}
