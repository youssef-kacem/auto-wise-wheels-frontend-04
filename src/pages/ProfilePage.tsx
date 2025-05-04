
import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import UserProfile from '@/components/user/UserProfile';
import UserReservations from '@/components/user/UserReservations';
import { User, Calendar, Settings, LogOut, CreditCard } from 'lucide-react';

const ProfilePage = () => {
  const { tab } = useParams<{ tab: string }>();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Simulé, à remplacer par un contexte d'authentification

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  // Déterminer quel onglet afficher
  let currentTab = tab || 'profile';
  if (!['profile', 'reservations', 'payment', 'settings'].includes(currentTab)) {
    currentTab = 'profile';
  }

  const handleLogout = () => {
    // Logique de déconnexion
    setIsAuthenticated(false);
  };

  // Fonction pour déterminer si un onglet est actif
  const isTabActive = (tabName: string) => {
    return currentTab === tabName ? 'bg-autowise-blue text-white' : 'bg-white text-gray-700 hover:bg-gray-50';
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 min-h-[calc(100vh-64px)] py-8">
        <div className="container-autowise">
          <h1 className="text-3xl font-bold mb-8">Mon compte</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Avatar et nom */}
                <div className="p-6 border-b border-gray-100 text-center">
                  <div className="w-20 h-20 rounded-full bg-autowise-blue bg-opacity-10 flex items-center justify-center text-autowise-blue mx-auto mb-3">
                    <User size={32} />
                  </div>
                  <h2 className="font-semibold text-lg">Jean Dupont</h2>
                  <p className="text-sm text-gray-500">jean.dupont@example.com</p>
                </div>
                
                {/* Tabs navigation */}
                <nav className="p-2">
                  <Link
                    to="/profile"
                    className={`flex items-center py-3 px-4 rounded-md transition-colors mb-1 ${isTabActive('profile')}`}
                  >
                    <User size={18} className="mr-3" />
                    Mon profil
                  </Link>
                  <Link
                    to="/profile/reservations"
                    className={`flex items-center py-3 px-4 rounded-md transition-colors mb-1 ${isTabActive('reservations')}`}
                  >
                    <Calendar size={18} className="mr-3" />
                    Mes réservations
                  </Link>
                  <Link
                    to="/profile/payment"
                    className={`flex items-center py-3 px-4 rounded-md transition-colors mb-1 ${isTabActive('payment')}`}
                  >
                    <CreditCard size={18} className="mr-3" />
                    Paiements
                  </Link>
                  <Link
                    to="/profile/settings"
                    className={`flex items-center py-3 px-4 rounded-md transition-colors mb-1 ${isTabActive('settings')}`}
                  >
                    <Settings size={18} className="mr-3" />
                    Paramètres
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center py-3 px-4 rounded-md transition-colors text-red-500 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut size={18} className="mr-3" />
                    Déconnexion
                  </button>
                </nav>
              </div>
            </div>
            
            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {currentTab === 'profile' && (
                  <UserProfile />
                )}
                
                {currentTab === 'reservations' && (
                  <UserReservations />
                )}
                
                {currentTab === 'payment' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Mes moyens de paiement</h2>
                    <p className="text-gray-600">
                      Cette fonctionnalité sera disponible prochainement.
                    </p>
                  </div>
                )}
                
                {currentTab === 'settings' && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Paramètres</h2>
                    <p className="text-gray-600">
                      Cette fonctionnalité sera disponible prochainement.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
