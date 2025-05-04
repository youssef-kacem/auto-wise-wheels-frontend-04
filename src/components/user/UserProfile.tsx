
import React, { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, User, MapPin, Save, Camera, Upload, FileText } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  idNumber: string;
  profileImage: string | null;
}

const UserProfile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    idNumber: 'ABC123456789',
    profileImage: null,
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

  const handleProfileImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserData(prev => ({
          ...prev,
          profileImage: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Mes informations personnelles</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo de profil */}
        <div className="bg-white rounded-lg shadow-sm border p-6 flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-medium mb-3">Photo de profil</h3>
            <div 
              onClick={handleProfileImageClick}
              className="relative cursor-pointer group"
            >
              <Avatar className="h-24 w-24">
                {userData.profileImage ? (
                  <AvatarImage src={userData.profileImage} alt={`${userData.firstName} ${userData.lastName}`} />
                ) : (
                  <AvatarFallback className="bg-autowise-blue text-white text-xl">
                    {userData.firstName.charAt(0)}{userData.lastName.charAt(0)}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*" 
              className="hidden" 
            />
            <p className="text-sm text-gray-500 mt-2">Cliquez pour modifier</p>
          </div>
          
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-3">
              Ajoutez une photo de profil pour personnaliser votre compte.
              Les formats acceptés sont JPG, PNG et GIF (max. 5 MB).
            </p>
            <button 
              type="button" 
              onClick={handleProfileImageClick} 
              className="px-4 py-2 border border-gray-300 rounded-md text-sm flex items-center hover:bg-gray-50"
            >
              <Upload size={16} className="mr-2" />
              Télécharger une image
            </button>
          </div>
        </div>
        
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
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <User size={18} />
                </span>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={userData.lastName}
                  onChange={handleChange}
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
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
            
            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Numéro d'identification (CIN / Passeport)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FileText size={18} />
                </span>
                <input
                  id="idNumber"
                  name="idNumber"
                  type="text"
                  value={userData.idNumber}
                  onChange={handleChange}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                Code postal
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <MapPin size={18} />
                </span>
                <input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={userData.postalCode}
                  onChange={handleChange}
                  className="input-field pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Adresse complète
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex items-center"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mise à jour en cours...
              </span>
            ) : (
              <>
                <Save size={18} className="mr-2" />
                Enregistrer les modifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;
