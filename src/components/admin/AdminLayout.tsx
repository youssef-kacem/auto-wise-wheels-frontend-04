
import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Vérifier l'authentification et le statut admin à chaque changement de route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    } else if (!isAdmin) {
      console.log("Redirection: Utilisateur connecté mais pas admin");
      navigate('/');
    }
  }, [isAuthenticated, isAdmin, navigate, location]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Barre de navigation admin */}
      <header className="bg-autowise-blue text-white shadow-md z-40 relative">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button
              className="p-1 md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <Link to="/admin/dashboard" className="font-bold text-xl">
              Admin<span className="text-white/70">Wise</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-sm">
              {user?.email && <span>Connecté en tant que: <span className="font-medium">{user.email}</span></span>}
            </div>
            <div className="flex items-center space-x-2">
              <Link to="/" className="px-3 py-1 text-sm rounded hover:bg-blue-600 transition-colors">
                Voir le site
              </Link>
              <button 
                onClick={handleLogout}
                className="px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar isOpen={isSidebarOpen} currentPage={currentPage} />
        
        {/* Contenu principal */}
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-64'}`}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">{currentPage}</h1>
            <p className="text-sm text-gray-500">
              Administration {currentPage.toLowerCase()}
            </p>
          </div>
          
          {children}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default AdminLayout;
