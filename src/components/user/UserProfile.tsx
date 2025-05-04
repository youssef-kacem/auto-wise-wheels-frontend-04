
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, User, MapPin, Save, Trash2 } from 'lucide-react';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Données utilisateur fictives (à remplacer par des données réelles)
  const [userData, setUserData] = useState<UserData>({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@example.com',
    phone: '06 12 34 56 78',
    address: '123 Rue de Paris',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simuler la mise à jour du profil
    setTimeout(() => {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });
      setLoading(false);
    }, 1000);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.')) {
      // Code pour supprimer le compte
      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Mes informations personnelles</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations personnelles */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium mb-4">Informations personnelles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Prénom
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <User size={18} />
                </span>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={userData.firstName}
                  onChange={handleChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={userData.lastName}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Phone size={18} />
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={userData.phone}
                  onChange={handleChange}
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Adresse */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-medium mb-4">Adresse</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Adresse
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MapPin size={18} />
                </span>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={userData.address}
                  onChange={handleChange}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={userData.city}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Code postal
                </label>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={userData.postalCode}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Pays
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={userData.country}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Boutons */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full sm:w-auto flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Enregistrement...
              </span>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Enregistrer les modifications
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="text-red-500 hover:text-red-700 flex items-center text-sm w-full sm:w-auto justify-center"
          >
            <Trash2 size={16} className="mr-1" />
            Supprimer mon compte
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
