
import React from 'react';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopMenu from './NavbarDesktopMenu';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarDesktopActions from './NavbarDesktopActions';
import NotificationMenu from './NotificationMenu';
import AdminButton from './AdminButton';

interface NavbarProps {
  user?: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container-autowise flex justify-between items-center py-4">
        {/* Logo */}
        <NavbarLogo />
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <NavbarDesktopMenu />
        </div>
        
        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          {user && <NotificationMenu />}
          <NavbarDesktopActions user={user} />
          <AdminButton user={user} />
        </div>
        
        {/* Mobile Menu Toggle */}
        <NavbarMobileMenu user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
