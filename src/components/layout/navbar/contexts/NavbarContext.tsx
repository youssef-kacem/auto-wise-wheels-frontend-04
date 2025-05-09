
import React, { createContext, useState, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { useIsActive } from '../utils/navUtils';

interface NavbarContextType {
  user: User | null;
  isAuthenticated: boolean;
  isActive: (path: string) => boolean;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  handleLogout: () => void;
}

const NavbarContext = createContext<NavbarContextType | null>(null);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};

interface NavbarProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ user, children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isActive = useIsActive();
  
  const isAuthenticated = !!user;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const handleLogout = async () => {
    // This is just a placeholder to satisfy TypeScript
    // Actual implementation should be in a parent component
    console.log('Logout handler should be implemented in parent component');
  };

  return (
    <NavbarContext.Provider 
      value={{ 
        user, 
        isAuthenticated, 
        isActive, 
        isMobileMenuOpen,
        toggleMobileMenu,
        handleLogout
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};
