
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-autowise-blue"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  
  if (isAuthenticated && !isAdmin) {
    // Si l'utilisateur est connecté mais n'est pas admin, rediriger vers la page d'accueil
    console.log("Utilisateur connecté mais pas admin, redirection vers la page d'accueil");
    return <Navigate to="/" replace />;
  }
  
  // Si l'utilisateur est authentifié et est admin, afficher le contenu protégé
  console.log("Utilisateur admin authentifié, affichage du contenu protégé");
  return <>{children}</>;
};

export default AdminProtectedRoute;
