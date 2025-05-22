import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "../config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const [Authdata, setAuthData] = useState();
  const [loading, setLoading] = useState(true);

  // Check for token on app initialization
  useEffect(() => {
    const checkAuthToken = async () => {
      const token = localStorage.getItem("token");
      
      if (token) {
        try {
          // Verify token by fetching user data
          const response = await fetch(`${API_URL}/user`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            setisAuth(true);
            // Fetch and store user data
            const userData = await response.json();
            setAuthData(userData);
            // Token is invalid, remove it
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error verifying auth token:", error);
          localStorage.removeItem("token");
        }
      }
      
      setLoading(false);
    };
    
    checkAuthToken();
  }, []);

  // Function to handle logout
  const logout = () => {
    try {
      // Clear ALL local storage and session storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Reset auth state
      setisAuth(false);
      setAuthData(null);
      
      // Force a complete page reload
      window.location.replace("/");
      
      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      
      // If there's an error, try the most basic approach
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace("/");
      
      return true;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuth, 
      setisAuth, 
      Authdata, 
      setAuthData,
      loading,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
