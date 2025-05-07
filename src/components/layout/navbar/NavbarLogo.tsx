
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarLogo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center">
        <img src="/lovable-uploads/9524452a-d5e6-4363-8bfa-1b7f6dd5d92b.png" alt="AutoWise" className="h-16" />
      </Link>
    </div>
  );
};

export default NavbarLogo;
