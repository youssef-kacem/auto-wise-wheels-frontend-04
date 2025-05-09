
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopMenu from './NavbarDesktopMenu';
import NavbarDesktopActions from './NavbarDesktopActions';
import NavbarMobileMenu from './NavbarMobileMenu';
import AdminButton from './AdminButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const isAdmin = localStorage.getItem('autowise_admin_authenticated') === 'true';
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-autowise py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavbarLogo />

          {/* Navigation desktop */}
          <div className="hidden md:block">
            <NavbarDesktopMenu isActive={isActive} />
          </div>

          {/* Boutons */}
          <div className="hidden md:flex items-center space-x-4">
            <NavbarDesktopActions 
              isAuthenticated={isAuthenticated} 
              handleLogout={handleLogout}
              isActive={isActive}
              user={user}
            />
            
            {/* Admin Button */}
            {isAdmin && <AdminButton isActive={isActive} />}
          </div>

          {/* Mobile menu toggle and admin button */}
          <div className="flex md:hidden items-center">
            {/* Admin Button Mobile */}
            {isAdmin && <AdminButton isActive={isActive} isMobile={true} />}
            
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-autowise-blue focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <NavbarMobileMenu 
            isActive={isActive} 
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            toggleMenu={toggleMenu}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
