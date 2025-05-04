
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Simulé, à remplacer par un contexte d'authentification

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container-autowise py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/9524452a-d5e6-4363-8bfa-1b7f6dd5d92b.png" alt="AutoWise" className="h-16" />
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-autowise-blue font-medium transition-colors">
                Accueil
              </Link>
              <Link to="/cars" className="text-gray-700 hover:text-autowise-blue font-medium transition-colors">
                Voitures
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-autowise-blue font-medium transition-colors">
                Services
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-autowise-blue font-medium transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Boutons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/profile" className="btn-outline flex items-center">
                <User size={18} className="mr-2" />
                Mon Compte
              </Link>
            ) : (
              <Link to="/auth" className="btn-outline">
                Connexion
              </Link>
            )}
            <Link to="/cars" className="btn-primary flex items-center">
              <Car size={18} className="mr-2" />
              Réserver
            </Link>
          </div>

          {/* Menu mobile */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-autowise-blue focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
              Accueil
            </Link>
            <Link to="/cars" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
              Voitures
            </Link>
            <Link to="/services" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
              Services
            </Link>
            <Link to="/contact" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md" onClick={toggleMenu}>
              Contact
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              {isAuthenticated ? (
                <Link to="/profile" className="btn-outline w-full text-center flex items-center justify-center" onClick={toggleMenu}>
                  <User size={18} className="mr-2" />
                  Mon Compte
                </Link>
              ) : (
                <Link to="/auth" className="btn-outline w-full text-center" onClick={toggleMenu}>
                  Connexion
                </Link>
              )}
              <Link to="/cars" className="btn-primary w-full text-center flex items-center justify-center" onClick={toggleMenu}>
                <Car size={18} className="mr-2" />
                Réserver
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
