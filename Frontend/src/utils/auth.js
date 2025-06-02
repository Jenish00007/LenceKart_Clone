import { useNavigate } from 'react-router-dom';

export const handleAuthRedirect = (navigate, message = 'Please sign in to continue') => {
  // Store the current path in localStorage for redirect after login
  localStorage.setItem('redirectPath', window.location.pathname);
  
  // Navigate to login page
  navigate('/login', { 
    state: { 
      message,
      from: window.location.pathname 
    }
  });
}; 