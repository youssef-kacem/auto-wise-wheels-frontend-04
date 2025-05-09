
import React from 'react';
import { useNavbar } from './contexts/NavbarContext';
import NavbarMobileMenu from './NavbarMobileMenu';

const MobileMenuContent: React.FC = () => {
  const { isMobileMenuOpen } = useNavbar();
  
  if (!isMobileMenuOpen) return null;
  
  return (
    <div className="lg:hidden absolute top-full left-0 right-0 bg-white z-50 shadow-md">
      <div className="container-autowise">
        <NavbarMobileMenu />
      </div>
    </div>
  );
};

export default MobileMenuContent;
