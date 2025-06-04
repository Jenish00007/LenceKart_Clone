import React, { createContext, useState, useEffect } from "react";
import { API_URL } from "../config";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const [Authdata, setAuthData] = useState();
  const [loading, setLoading] = useState(true);

  // Check for token on app initialization
  useEffect(() => {
    console.log('AuthContext: useEffect running');
    const checkAuthToken = async () => {
      console.log('AuthContext: checkAuthToken starting');
      const token = localStorage.getItem("token");
      const adminToken = localStorage.getItem("adminToken");
      
      console.log('AuthContext: token from localStorage:', token);
      console.log('AuthContext: adminToken from localStorage:', adminToken);

      if (token) {
        console.log('AuthContext: User token found. Verifying...');
        try {
          const response = await fetch(`${API_URL}/user`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            console.log('AuthContext: User token valid. Setting isAuth(true).');
            setisAuth(true);
            const userData = await response.json();
            setAuthData(userData);
            console.log('AuthContext: User data fetched and set.');
          } else {
            console.log('AuthContext: User token invalid. Removing token.');
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("AuthContext: Error verifying user auth token:", error);
          localStorage.removeItem("token");
        }
      } else if (adminToken) {
        console.log('AuthContext: Admin token found. Setting isAuth(true).');
        // If admin token exists, set auth state
        setisAuth(true);
        try {
            const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || "{}");
            setAuthData(adminInfo);
            console.log('AuthContext: Admin info parsed and set.');
        } catch (parseError) {
            console.error('AuthContext: Error parsing adminInfo from localStorage:', parseError);
            setAuthData(null);
        }
      } else {
        console.log('AuthContext: No valid token found in localStorage.');
      }
      
      setLoading(false);
      console.log('AuthContext: checkAuthToken finished. Final isAuth:', isAuth);
    };
    
    checkAuthToken();
  }, []); // isAuth dependency removed to prevent infinite loop

  // Function to handle logout
  const logout = () => {
    console.log('AuthContext: Logout initiated.');
    try {
      // Clear ALL local storage and session storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Reset auth state
      setisAuth(false);
      setAuthData(null);
      console.log('AuthContext: Local/Session storage cleared and auth state reset.');
      
      // Force a complete page reload
      window.location.replace("/");
      
      return true;
    } catch (error) {
      console.error("AuthContext: Error during logout:", error);
      
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
