
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, LogOut, User } from 'lucide-react';
import { useNavbar } from './contexts/NavbarContext';

const NavbarMobileMenu: React.FC = () => {
  const { isActive, isAuthenticated, handleLogout, toggleMobileMenu } = useNavbar();
  const location = useLocation();
  
  return (
    <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
      <Link to="/" 
        className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
          isActive('/') && !isActive('/cars') && !isActive('/services') && !isActive('/contact') 
            ? 'bg-autowise-blue text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`} 
        onClick={toggleMobileMenu}>
        Accueil
      </Link>
      <Link to="/cars" 
        className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
          isActive('/cars') && !location.pathname.includes('/profile') && !location.pathname.includes('/booking') 
            ? 'bg-autowise-blue text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`} 
        onClick={toggleMobileMenu}>
        Voitures
      </Link>
      <Link to="/services" 
        className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
          isActive('/services') 
            ? 'bg-autowise-blue text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`} 
        onClick={toggleMobileMenu}>
        Services
      </Link>
      <Link to="/contact" 
        className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
          isActive('/contact') 
            ? 'bg-autowise-blue text-white' 
            : 'text-gray-700 hover:bg-gray-100'
        }`} 
        onClick={toggleMobileMenu}>
        Contact
      </Link>
      <div className="pt-2 flex flex-col space-y-2">
        {isAuthenticated ? (
          <>
            <Link to="/profile" 
              className={`btn-outline w-full text-center flex items-center justify-center ${
                isActive('/profile') 
                  ? 'bg-autowise-blue text-white' 
                  : ''
              }`} 
              onClick={toggleMobileMenu}>
              <User size={18} className="mr-2" />
              Mon Compte
            </Link>
            <button 
              onClick={handleLogout} 
              className="btn-outline w-full text-center flex items-center justify-center text-red-600 border-red-600 hover:bg-red-50"
            >
              <LogOut size={18} className="mr-2" />
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/auth" 
            className={`btn-outline w-full text-center ${
              isActive('/auth') 
                ? 'bg-autowise-blue text-white' 
                : ''
            }`} 
            onClick={toggleMobileMenu}>
            Connexion
          </Link>
        )}
        <Link to="/cars" 
          className={`btn-primary w-full text-center flex items-center justify-center ${
            isActive('/cars') && !location.pathname.includes('/profile') 
              ? 'bg-autowise-blue-dark' 
              : ''
          }`} 
          onClick={toggleMobileMenu}>
          <Car size={18} className="mr-2" />
          Réserver
        </Link>
      </div>
    </div>
  );
};

export default NavbarMobileMenu;
