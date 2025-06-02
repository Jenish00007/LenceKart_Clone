import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { AuthContext } from "../ContextApi/AuthContext";

/**
 * A standalone logout button component that handles user logout
 * This provides a simple, direct way to log out users without complex context dependencies
 */
const LogoutButton = ({ customText, ...props }) => {
  const { setisAuth, setAuthData } = useContext(AuthContext);

  const handleLogout = () => {
    // Simple, direct approach that will work regardless of context
    try {
      // Update React state first to prevent stale data display
      setisAuth(false);
      setAuthData(null);
      
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Try to clear cookies
      document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // Add a small delay before reloading to ensure state updates happen
      setTimeout(() => {
        // Force reload the page to reset everything
        window.location.replace("/");
      }, 50);
    } catch (error) {
      console.error("Error during logout:", error);
      // Fallback
      localStorage.clear();
      setisAuth(false);
      setAuthData(null);
      window.location.reload();
    }
  };

  return (
    <Button
      onClick={handleLogout}
      colorScheme="blue"
      {...props}
    >
      {customText || "Sign Out"}
    </Button>
  );
};

export default LogoutButton; 