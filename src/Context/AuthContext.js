import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("tokenExpiration");
    localStorage.removeItem("selectedPackage");
    localStorage.removeItem("orderId");
    localStorage.removeItem("orderDetails");
    localStorage.removeItem("prevOrderDetails");
    localStorage.removeItem("cartTotal");
    localStorage.removeItem("cartItems");

    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const checkTokenExpiration = useCallback(() => {
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (tokenExpiration) {
      const expirationDate = new Date(tokenExpiration);
      const currentDate = new Date();

      if (currentDate > expirationDate) {
        logout();
        return false;
      }
    }
    return true;
  }, [logout]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userInfo = localStorage.getItem("userInfo");

    if (token && userInfo) {
      if (checkTokenExpiration()) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userInfo));
      }
    }

    const tokenCheckInterval = setInterval(() => {
      if (localStorage.getItem("token")) {
        checkTokenExpiration();
      }
    }, 60 * 60 * 1000);

    return () => clearInterval(tokenCheckInterval);
  }, [checkTokenExpiration]);

  const login = (token, userInfo) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setIsAuthenticated(true);
    setUser(userInfo);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, checkTokenExpiration }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
