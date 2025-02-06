import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("user");
    if (savedData) {
      try {
        const { token, user } = JSON.parse(savedData);
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setUser({ ...decodedToken, ...user });
        } else {
          console.error("Token expired");
          logout();
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    }
  }, []);

  const login = (token, user) => {
    if (!token || token.split('.').length !== 3) {
      console.error("Invalid token format");
      return;
    }
  
    try {
      const decodedToken = jwtDecode(token);
      setUser({ ...decodedToken, ...user });
  
      localStorage.setItem("user", JSON.stringify({ token, user }));
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
