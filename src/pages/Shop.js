import React from "react";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const dummyProducts = [
  {
    id: 1,
    name: "Standard Wall Art - Black",
    description: "Beautiful black diffuser art.",
    image: "/images/blacksf.jpg",
    price: 720,
  },
  {
    id: 2,
    name: "Standard Wall Art - White",
    description: "Vibrant white diffuser art.",
    image: "/images/whitesf.jpg",
    price: 720,
  },
  {
    id: 3,
    name: "Standard Wall Art - Teal",
    description: "Elegant teal diffuser art.",
    image: "/images/tealsf.jpg",
    price: 720,
  },
];

export default function Shop() {
  const { addToCart } = useCart();

  return (
    <div style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
        Shop Our Collection
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {dummyProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}  // Pass the addToCart function
          />
        ))}
      </div>
    </div>
  );
}
