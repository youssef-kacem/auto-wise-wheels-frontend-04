
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavbar } from './contexts/NavbarContext';

const NavbarDesktopMenu: React.FC = () => {
  const { isActive } = useNavbar();
  
  return (
    <div className="ml-10 flex items-center space-x-6">
      <Link to="/" 
        className={`${isActive('/') && !isActive('/cars') && !isActive('/services') && !isActive('/contact') ? 'text-autowise-blue font-medium' : 'text-gray-700 hover:text-autowise-blue'} font-medium transition-colors duration-200`}>
        Accueil
      </Link>
      <Link to="/cars" 
        className={`${isActive('/cars') ? 'text-autowise-blue font-medium' : 'text-gray-700 hover:text-autowise-blue'} font-medium transition-colors duration-200`}>
        Voitures
      </Link>
      <Link to="/services" 
        className={`${isActive('/services') ? 'text-autowise-blue font-medium' : 'text-gray-700 hover:text-autowise-blue'} font-medium transition-colors duration-200`}>
        Services
      </Link>
      <Link to="/contact" 
        className={`${isActive('/contact') ? 'text-autowise-blue font-medium' : 'text-gray-700 hover:text-autowise-blue'} font-medium transition-colors duration-200`}>
        Contact
      </Link>
    </div>
  );
};

export default NavbarDesktopMenu;
