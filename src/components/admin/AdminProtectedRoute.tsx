
import React from 'react';
import { Navigate } from 'react-router-dom';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem('autowise_admin_authenticated') === 'true';

  if (!isAdminAuthenticated) {
    // Rediriger vers la page de connexion admin
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
