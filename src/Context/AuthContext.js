import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in on component mount
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");
    if (token && userInfo) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const login = (token, userInfo) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setIsAuthenticated(true);
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("selectedPackage");
    localStorage.removeItem("orderId");
    localStorage.removeItem("orderDetails");
    localStorage.removeItem("prevOrderDetails");
    localStorage.removeItem("cartTotal");
    localStorage.removeItem("cartItems");

    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
