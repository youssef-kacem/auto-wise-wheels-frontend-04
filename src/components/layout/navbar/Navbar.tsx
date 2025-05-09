
import React from 'react';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopMenu from './NavbarDesktopMenu';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarDesktopActions from './NavbarDesktopActions';
import NotificationMenu from './NotificationMenu';
import AdminButton from './AdminButton';
import { NavbarProvider } from './contexts/NavbarContext';
import { User } from '@supabase/supabase-js';
import MobileMenuToggle from './MobileMenuToggle';
import MobileMenuContent from './MobileMenuContent';

// Define proper props interface
interface NavbarProps {
  user?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  return (
    <NavbarProvider user={user || null}>
      <NavbarContent />
    </NavbarProvider>
  );
};

const NavbarContent: React.FC = () => {
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
          <NotificationMenu />
          <NavbarDesktopActions />
          <AdminButton />
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <MobileMenuToggle />
        </div>
        
        {/* Mobile Menu Content */}
        <MobileMenuContent />
      </div>
    </nav>
  );
};

export default Navbar;
