
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Car, Calendar, BarChart2, Bell, Settings } from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  currentPage: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, currentPage }) => {
  const location = useLocation();
  
  // Liste des éléments du menu
  const menuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: 'Voitures', 
      path: '/admin/cars', 
      icon: <Car className="h-5 w-5" /> 
    },
    { 
      name: 'Réservations', 
      path: '/admin/reservations', 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      name: 'Utilisateurs', 
      path: '/admin/users', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: 'Statistiques', 
      path: '/admin/statistics', 
      icon: <BarChart2 className="h-5 w-5" /> 
    },
    { 
      name: 'Notifications', 
      path: '/admin/notifications', 
      icon: <Bell className="h-5 w-5" /> 
    },
    { 
      name: 'Paramètres', 
      path: '/admin/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path || 
           (path !== '/admin/dashboard' && location.pathname.startsWith(path));
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => {}}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="py-6 px-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActivePath(item.path)
                    ? 'bg-autowise-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-autowise-blue'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
