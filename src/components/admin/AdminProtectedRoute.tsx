
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-autowise-blue"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Rediriger vers la page de connexion admin avec l'URL de retour
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }
  
  if (!isAdmin) {
    console.log("Accès non autorisé : l'utilisateur n'est pas administrateur");
    // Rediriger vers la page d'accueil
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default AdminProtectedRoute;
