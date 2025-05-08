
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import NavbarLogo from './NavbarLogo';
import NavbarDesktopMenu from './NavbarDesktopMenu';
import NavbarMobileMenu from './NavbarMobileMenu';
import NavbarDesktopActions from './NavbarDesktopActions';
import AdminButton from './AdminButton';
import NotificationMenu from './NotificationMenu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Vérifier la session actuelle
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);

      if (session?.user) {
        // Vérifier si l'utilisateur est admin
        const { data: adminStatus } = await supabase.rpc('is_admin', { 
          user_id: session.user.id 
        });
        setIsAdmin(adminStatus || false);
      }
    };

    checkSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);

        if (session?.user) {
          // Vérifier si l'utilisateur est admin
          const { data: adminStatus } = await supabase.rpc('is_admin', { 
            user_id: session.user.id 
          });
          setIsAdmin(adminStatus || false);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <NavbarLogo />
          
          {/* Menu Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <NavbarDesktopMenu />
            <div className="flex items-center space-x-4">
              {isAdmin && <AdminButton />}
              {user && <NotificationMenu />}
              <NavbarDesktopActions user={user} />
            </div>
          </div>
          
          {/* Bouton menu mobile */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Menu Mobile */}
        <NavbarMobileMenu isOpen={isMenuOpen} user={user} isAdmin={isAdmin} />
      </div>
    </header>
  );
};

export default Navbar;
