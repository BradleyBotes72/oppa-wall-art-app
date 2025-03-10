import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import CheckoutButton from "../components/CheckoutButton";
import "./Cart.css";

const Cart = () => {
  const { cart, cartTotal, removeFromCart, decreaseQuantity, clearCart } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => setSelectedItem(item);
  const closeItemDetails = () => setSelectedItem(null);

  return (
    <div className="cart-page">
      <h1 className="cart-heading">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item" onClick={() => handleItemClick(item)}>
              <h2 className="item-name">{item.name}</h2>
              <p className="item-price">Price: R{item.price.toFixed(2)}</p>
              <p className="item-quantity">Quantity: {item.quantity}</p>
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(item.id);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <h3 className="total-heading">Total: R{cartTotal.toFixed(2)}</h3>
      {cart.length > 0 && (
        <>
          <button className="clear-btn" onClick={clearCart}>
            Clear Cart
          </button>
          <CheckoutButton />
        </>
      )}

      {selectedItem && (
        <div className="item-details-modal" onClick={closeItemDetails}>
          <div className="item-details-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedItem.name}</h2>
            <p>Price: R{selectedItem.price.toFixed(2)}</p>
            <p>Quantity: {selectedItem.quantity}</p>
            <p>Description: {selectedItem.description || "No description available."}</p>
            <button onClick={closeItemDetails}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
