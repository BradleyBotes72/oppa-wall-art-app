import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./CheckoutButton.css";

const CheckoutButton = () => {
  const { cartTotal } = useCart();
  const [yoco, setYoco] = useState(null);

  useEffect(() => {
    console.log("Cart Total:", cartTotal);
    if (window.YocoSDK) {
      setYoco(new window.YocoSDK({ publicKey: "pk_live_9f64cbcaWkwJEY129fb4" }));
      console.log("Yoco SDK loaded successfully");
    } else {
      console.error("Yoco SDK not loaded. Check index.html");
    }
  }, [cartTotal]);

  const handleCheckout = () => {
    if (!yoco) {
      console.error("Yoco SDK not initialized.");
      return;
    }
    if (cartTotal <= 0 || isNaN(cartTotal)) {
      alert("Cart total is invalid or zero.");
      return;
    }

    const finalAmount = Math.round(cartTotal * 100); // Convert total to cents

    yoco.showPopup({
      amountInCents: finalAmount,
      currency: "ZAR",
      name: "Oppa Wall Art Store",
      description: `Total: R${cartTotal.toFixed(2)}`,
      callback: (result) => {
        if (result.error) {
          console.error("Payment Error:", result.error);
          alert("Payment failed. Please try again.");
        } else {
          console.log("Payment Successful:", result);
          alert(`Payment successful! Transaction ID: ${result.id}`);
        }
      },
    });
  };

  return (
    <div className="checkout-button-container">
      <button
        className="checkout-button"
        onClick={handleCheckout}
        disabled={!yoco || cartTotal <= 0}
      >
        {yoco ? `Pay R${cartTotal.toFixed(2)} with Yoco` : "Loading..."}
      </button>
    </div>
  );
};

export default CheckoutButton;
