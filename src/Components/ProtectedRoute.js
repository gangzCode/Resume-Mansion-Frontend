import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Store the attempted URL for redirect after login
    sessionStorage.setItem('redirectAfterLogin', location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;