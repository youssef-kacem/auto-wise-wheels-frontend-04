
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, LogOut, User } from 'lucide-react';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface NavbarDesktopActionsProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
  isActive: (path: string) => boolean;
  user: SupabaseUser | null;
}

const NavbarDesktopActions: React.FC<NavbarDesktopActionsProps> = ({ 
  isAuthenticated, 
  handleLogout, 
  isActive,
  user
}) => {
  const location = useLocation();

  // Récupérer le nom d'utilisateur à partir des métadonnées ou utiliser un fallback
  const getUserDisplayName = () => {
    if (user && user.user_metadata) {
      const firstName = user.user_metadata.first_name;
      const lastName = user.user_metadata.last_name;
      
      if (firstName || lastName) {
        return [firstName, lastName].filter(Boolean).join(' ');
      }
    }
    return 'Mon Compte';
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <Link to="/profile" 
            className={`btn-outline flex items-center ${isActive('/profile') ? 'bg-autowise-blue text-white' : ''}`}>
            <User size={18} className="mr-2" />
            {getUserDisplayName()}
          </Link>
          <button onClick={handleLogout} className="btn-outline flex items-center text-red-600 border-red-600 hover:bg-red-50">
            <LogOut size={18} className="mr-2" />
            Déconnexion
          </button>
        </>
      ) : (
        <Link to="/auth" 
          className={`btn-outline ${isActive('/auth') ? 'bg-autowise-blue text-white' : ''}`}>
          Connexion
        </Link>
      )}
      <Link to="/cars" 
        className={`btn-primary flex items-center ${isActive('/cars') && !location.pathname.includes('/profile') ? 'bg-autowise-blue-dark' : ''}`}>
        <Car size={18} className="mr-2" />
        Réserver
      </Link>
    </>
  );
};

export default NavbarDesktopActions;
