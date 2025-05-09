
import React from 'react';
import { Menu } from 'lucide-react';
import { useNavbar } from './contexts/NavbarContext';

const MobileMenuToggle: React.FC = () => {
  const { toggleMobileMenu, isMobileMenuOpen } = useNavbar();
  
  return (
    <button 
      onClick={toggleMobileMenu}
      className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
      aria-expanded={isMobileMenuOpen}
      aria-label="Toggle menu"
    >
      <Menu size={24} />
    </button>
  );
};

export default MobileMenuToggle;
