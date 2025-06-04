import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../ContextApi/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);
  const location = useLocation();

  if (!isAuth) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 