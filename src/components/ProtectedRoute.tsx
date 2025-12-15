import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export function ProtectedRoute({ children, allowedRoles, redirectTo }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Determine redirect based on allowed roles
    const loginPath = allowedRoles.includes('admin') ? '/admin/login' : '/volunteer/login';
    return <Navigate to={redirectTo || loginPath} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user!.role)) {
    // User is authenticated but doesn't have the right role
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
