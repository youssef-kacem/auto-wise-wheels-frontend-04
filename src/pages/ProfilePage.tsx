
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import UserProfile from '@/components/user/UserProfile';
import Settings from '@/components/user/Settings';
import UserReservations from '@/components/user/UserReservations';
import { User, Settings as SettingsIcon, Bookmark, Car, Clock } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { tab } = useParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState(tab || 'profile');

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <MainLayout>
      <div className="container-autowise py-8">
        <h1 className="text-2xl font-bold mb-8">Espace personnel</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Navigation latérale */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border">
              <ul className="divide-y">
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'profile' ? 'text-autowise-blue font-medium' : 'text-gray-700'}`}
                    onClick={() => handleTabChange('profile')}
                  >
                    <User size={18} className="mr-2" />
                    Mon profil
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'settings' ? 'text-autowise-blue font-medium' : 'text-gray-700'}`}
                    onClick={() => handleTabChange('settings')}
                  >
                    <SettingsIcon size={18} className="mr-2" />
                    Paramètres
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'reservations' ? 'text-autowise-blue font-medium' : 'text-gray-700'}`}
                    onClick={() => handleTabChange('reservations')}
                  >
                    <Bookmark size={18} className="mr-2" />
                    Mes réservations
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'history' ? 'text-autowise-blue font-medium' : 'text-gray-700'}`}
                    onClick={() => handleTabChange('history')}
                  >
                    <Clock size={18} className="mr-2" />
                    Historique
                  </button>
                </li>
                <li>
                  <button
                    className={`w-full text-left px-4 py-3 flex items-center ${activeTab === 'cars' ? 'text-autowise-blue font-medium' : 'text-gray-700'}`}
                    onClick={() => handleTabChange('cars')}
                  >
                    <Car size={18} className="mr-2" />
                    Mes voitures favorites
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contenu */}
          <div className="md:col-span-3">
            {activeTab === 'profile' && <UserProfile />}
            {activeTab === 'settings' && <Settings />}
            {activeTab === 'reservations' && <UserReservations />}
            {activeTab === 'history' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Historique</h2>
                <div className="p-4 bg-gray-50 rounded-md border border-dashed border-gray-300">
                  <p className="text-gray-600 text-center">
                    Votre historique de location est vide
                  </p>
                </div>
              </div>
            )}
            {activeTab === 'cars' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Mes voitures favorites</h2>
                <div className="p-4 bg-gray-50 rounded-md border border-dashed border-gray-300">
                  <p className="text-gray-600 text-center">
                    Vous n'avez pas encore de voitures favorites
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
