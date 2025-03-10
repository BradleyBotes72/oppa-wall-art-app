import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CheckoutButton from "./components/CheckoutButton";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CustomDesign from "./pages/CustomDesign";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home route with a one-page layout */}
        <Route
          path="/"
          element={
            <>
              <section id="home">
                <Home />
              </section>
              <section id="shop">
                <Shop />
              </section>
              <section id="custom-design">
                <CustomDesign />
              </section>
              <section id="cart">
                <Cart />
                <CheckoutButton />
              </section>
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Optional: you can remove this extra Footer if you want it only on the home layout */}
      <Footer />
    </>
  );
}

export default App;
