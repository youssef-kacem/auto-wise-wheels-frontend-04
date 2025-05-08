
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarDesktopMenuProps {
  isActive: (path: string) => boolean;
}

const NavbarDesktopMenu: React.FC<NavbarDesktopMenuProps> = ({ isActive }) => {
  return (
    <nav className="hidden md:flex space-x-6">
      <Link 
        to="/" 
        className={`text-base transition-colors duration-200 hover:text-autowise-blue ${
          isActive('/') && !isActive('/cars') && !isActive('/services') && !isActive('/contact') 
            ? "text-autowise-blue font-medium" 
            : "text-gray-700"
        }`}
      >
        Accueil
      </Link>
      <Link 
        to="/cars" 
        className={`text-base transition-colors duration-200 hover:text-autowise-blue ${
          isActive('/cars') ? "text-autowise-blue font-medium" : "text-gray-700"
        }`}
      >
        Nos Véhicules
      </Link>
      <Link 
        to="/services" 
        className={`text-base transition-colors duration-200 hover:text-autowise-blue ${
          isActive('/services') ? "text-autowise-blue font-medium" : "text-gray-700"
        }`}
      >
        Services
      </Link>
      <Link 
        to="/contact" 
        className={`text-base transition-colors duration-200 hover:text-autowise-blue ${
          isActive('/contact') ? "text-autowise-blue font-medium" : "text-gray-700"
        }`}
      >
        Contact
      </Link>
    </nav>
  );
};

export default NavbarDesktopMenu;
