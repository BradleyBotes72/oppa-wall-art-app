// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { db, auth } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfileData(docSnap.data());
          } else {
            console.error("No profile data found.");
          }
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
      setLoading(false);
    };

    fetchProfileData();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem" }}>
        My Profile
      </h2>
      {profileData ? (
        <div>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}

      <h3 style={{ marginTop: "2rem" }}>Your Cart</h3>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - R{item.price} x {item.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h3 style={{ marginTop: "2rem" }}>Your Custom Designs</h3>
      {(() => {
        const designs = JSON.parse(localStorage.getItem("designCart")) || [];
        if (designs.length > 0) {
          return (
            <ul>
              {designs.map((design, index) => (
                <li key={index}>
                  Design {index + 1}: {design.customWidth}mm x {design.customHeight}mm - R{design.finalPrice}
                </li>
              ))}
            </ul>
          );
        } else {
          return <p>No custom designs saved yet.</p>;
        }
      })()}

      <button
        onClick={handleLogout}
        style={{
          display: "block",
          width: "100%",
          padding: "0.5rem",
          backgroundColor: "red",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "2rem"
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
