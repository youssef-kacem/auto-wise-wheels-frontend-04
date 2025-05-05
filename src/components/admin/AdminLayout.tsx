
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Calendar, 
  Users, 
  BarChart, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const adminEmail = localStorage.getItem('autowise_admin_email');

  const navItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Voitures', href: '/admin/cars', icon: Car },
    { name: 'Réservations', href: '/admin/reservations', icon: Calendar },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Statistiques', href: '/admin/statistics', icon: BarChart },
    { name: 'Notifications', href: '/admin/notifications', icon: Bell },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('autowise_admin_authenticated');
    localStorage.removeItem('autowise_admin_email');
    
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté de l'espace administration",
    });
    
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar mobile */}
      <div className="md:hidden">
        <button 
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow-md"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile sidebar */}
        <div className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-gray-800 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="flex items-center justify-center h-16 bg-gray-900">
            <span className="text-white font-bold text-xl">AutoWise Admin</span>
          </div>

          <div className="mt-4 px-4">
            <div className="flex items-center bg-gray-700 rounded-md p-2">
              <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                {adminEmail ? adminEmail.charAt(0).toUpperCase() : 'A'}
              </div>
              <div className="ml-2 text-sm text-white truncate">
                {adminEmail || 'Admin'}
              </div>
            </div>
          </div>
          
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => {
              const isActive = currentPage === item.name.toLowerCase();
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                >
                  <item.icon
                    className={`${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    } mr-3 flex-shrink-0 h-6 w-6`}
                  />
                  {item.name}
                </a>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-2 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
            >
              <LogOut className="mr-3 h-6 w-6 text-gray-400" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-gray-800">
            <div className="flex items-center justify-center h-16 bg-gray-900">
              <span className="text-white font-bold text-xl">AutoWise Admin</span>
            </div>
            
            <div className="mt-4 px-4">
              <div className="flex items-center bg-gray-700 rounded-md p-2">
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white font-semibold">
                  {adminEmail ? adminEmail.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="ml-2 text-sm text-white truncate">
                  {adminEmail || 'Admin'}
                </div>
              </div>
            </div>
            
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.name.toLowerCase();
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`${
                      isActive
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                  >
                    <item.icon
                      className={`${
                        isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                      } mr-3 flex-shrink-0 h-6 w-6`}
                    />
                    {item.name}
                  </a>
                );
              })}
            </nav>
            
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-2 py-2 text-base font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
              >
                <LogOut className="mr-3 h-6 w-6 text-gray-400" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">{currentPage}</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
