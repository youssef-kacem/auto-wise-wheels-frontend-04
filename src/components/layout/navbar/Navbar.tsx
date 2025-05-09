
import React from 'react';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopMenu from './NavbarDesktopMenu';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarDesktopActions from './NavbarDesktopActions';
import NotificationMenu from './NotificationMenu';
import AdminButton from './AdminButton';

// Define proper props interface
interface NavbarProps {
  user?: any;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const isAuthenticated = !!user;

  const handleLogout = async () => {
    // This is just a placeholder to satisfy TypeScript
    // Actual implementation should be in a parent component
    console.log('Logout handler should be implemented in parent component');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container-autowise flex justify-between items-center py-4">
        {/* Logo */}
        <NavbarLogo />
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center">
          <NavbarDesktopMenu isActive="" />
        </div>
        
        {/* Actions (Desktop) */}
        <div className="hidden lg:flex items-center space-x-4">
          {user && <NotificationMenu />}
          <NavbarDesktopActions 
            user={user}
            isAuthenticated={isAuthenticated}
            handleLogout={handleLogout}
            isActive=""
          />
          {/* Pass only the necessary props */}
          {user && <AdminButton />}
        </div>
        
        {/* Mobile Menu Toggle */}
        <NavbarMobileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
