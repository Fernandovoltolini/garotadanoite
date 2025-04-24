
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  isAdmin?: boolean;
}

const ProtectedRoute = ({ children, isAdmin = false }: ProtectedRouteProps) => {
  const { session, user } = useAuth();
  
  // Check if user is authenticated
  if (!session || !user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Check admin status if needed (you'd need to implement this check based on your user data structure)
  if (isAdmin) {
    // This is a placeholder - replace with your actual admin check
    // For example: if (!user.admin_role) return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
