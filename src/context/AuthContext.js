import React, { createContext, useContext, useState } from "react";

// Create the authentication context
const AuthContext = createContext();

// AuthProvider component wraps your app and provides auth state and functions
export const AuthProvider = ({ children }) => {
  // For demonstration, we'll use a simple state for user authentication.
  const [user, setUser] = useState(null);

  // Example login function (replace with your real login logic)
  const login = (username, password) => {
    // Simulate a user object after a successful login
    const fakeUser = { id: 1, username };
    setUser(fakeUser);
  };

  // Example logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the auth context easily
export const useAuth = () => useContext(AuthContext);
