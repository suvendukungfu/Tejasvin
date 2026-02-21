import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types/admin';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles = ['admin'] }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  // Not authenticated → redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // Not authorized → redirect to home
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role as UserRole)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
