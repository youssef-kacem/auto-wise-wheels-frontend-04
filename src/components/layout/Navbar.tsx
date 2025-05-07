
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, User, Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/lovable-uploads/9524452a-d5e6-4363-8bfa-1b7f6dd5d92b.png" alt="AutoWise" className="h-16" />
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:block">
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
          </div>

          {/* Boutons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" 
                  className={`btn-outline flex items-center ${isActive('/profile') ? 'bg-autowise-blue text-white' : ''}`}>
                  <User size={18} className="mr-2" />
                  {user?.name || 'Mon Compte'}
                </Link>
                <button onClick={handleLogout} className="btn-outline flex items-center text-red-600 border-red-600 hover:bg-red-50">
                  <LogOut size={18} className="mr-2" />
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/auth" 
                className={`btn-outline ${isActive('/auth') ? 'bg-autowise-blue text-white' : ''}`}>
                Connexion
              </Link>
            )}
            <Link to="/cars" 
              className={`btn-primary flex items-center ${isActive('/cars') && !location.pathname.includes('/profile') ? 'bg-autowise-blue-dark' : ''}`}>
              <Car size={18} className="mr-2" />
              Réserver
            </Link>
            
            {/* Bouton Admin discret avec Tooltip */}
            {isAdmin && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      to="/admin/dashboard" 
                      className={`ml-2 p-2 rounded-full transition-colors duration-200 ${
                        isActive('/admin') 
                          ? "bg-autowise-blue text-white" 
                          : "text-gray-500 hover:text-autowise-blue hover:bg-gray-100"
                      }`}
                      aria-label="Administration"
                    >
                      <Settings size={20} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Accéder à l'administration</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* Menu mobile */}
          <div className="flex md:hidden items-center">
            {/* Bouton Admin mobile discret avec Tooltip */}
            {isAdmin && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link 
                      to="/admin/dashboard" 
                      className={`mr-3 p-1.5 rounded-full transition-colors duration-200 ${
                        isActive('/admin') 
                          ? "bg-autowise-blue text-white" 
                          : "text-gray-500 hover:text-autowise-blue hover:bg-gray-100"
                      }`}
                      aria-label="Administration"
                    >
                      <Settings size={18} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Accéder à l'administration</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-autowise-blue focus:outline-none transition-colors duration-200"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile déroulant */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <Link to="/" 
              className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive('/') && !isActive('/cars') && !isActive('/services') && !isActive('/contact') 
                  ? 'bg-autowise-blue text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`} 
              onClick={toggleMenu}>
              Accueil
            </Link>
            <Link to="/cars" 
              className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive('/cars') && !location.pathname.includes('/profile') && !location.pathname.includes('/booking') 
                  ? 'bg-autowise-blue text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`} 
              onClick={toggleMenu}>
              Voitures
            </Link>
            <Link to="/services" 
              className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive('/services') 
                  ? 'bg-autowise-blue text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`} 
              onClick={toggleMenu}>
              Services
            </Link>
            <Link to="/contact" 
              className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive('/contact') 
                  ? 'bg-autowise-blue text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`} 
              onClick={toggleMenu}>
              Contact
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              {isAuthenticated ? (
                <>
                  <Link to="/profile" 
                    className={`btn-outline w-full text-center flex items-center justify-center ${
                      isActive('/profile') 
                        ? 'bg-autowise-blue text-white' 
                        : ''
                    }`} 
                    onClick={toggleMenu}>
                    <User size={18} className="mr-2" />
                    Mon Compte
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="btn-outline w-full text-center flex items-center justify-center text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <LogOut size={18} className="mr-2" />
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link to="/auth" 
                  className={`btn-outline w-full text-center ${
                    isActive('/auth') 
                      ? 'bg-autowise-blue text-white' 
                      : ''
                  }`} 
                  onClick={toggleMenu}>
                  Connexion
                </Link>
              )}
              <Link to="/cars" 
                className={`btn-primary w-full text-center flex items-center justify-center ${
                  isActive('/cars') && !location.pathname.includes('/profile') 
                    ? 'bg-autowise-blue-dark' 
                    : ''
                }`} 
                onClick={toggleMenu}>
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
