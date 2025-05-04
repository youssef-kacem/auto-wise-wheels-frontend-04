
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Save, Lock, Bell, Mail, MessageSquare } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Settings: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  // Données de paramètres fictives
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newBookingNotifications: true,
    marketingEmails: false,
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Champs requis",
        description: "Tous les champs sont requis.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur de mot de passe",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simuler la mise à jour du mot de passe
    setTimeout(() => {
      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été modifié avec succès.",
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    }, 1000);
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
    
    // Feedback instantané
    toast({
      title: "Paramètre mis à jour",
      description: `Préférence de notification mise à jour.`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Paramètres</h2>
      
      {/* Changement de mot de passe */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Lock size={20} className="mr-2 text-autowise-blue" />
          Modifier le mot de passe
        </h3>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe actuel
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Nouveau mot de passe
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule et un chiffre.
            </p>
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le nouveau mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              required
            />
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
                  Mettre à jour le mot de passe
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Préférences de notifications */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <Bell size={20} className="mr-2 text-autowise-blue" />
          Préférences de notifications
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-700 flex items-center">
                <Mail size={18} className="mr-2 text-gray-500" />
                Notifications par email
              </p>
              <p className="text-sm text-gray-500">
                Recevoir des mises à jour et des confirmations par email
              </p>
            </div>
            <Switch 
              checked={notifications.emailNotifications}
              onCheckedChange={() => handleNotificationChange('emailNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-700 flex items-center">
                <MessageSquare size={18} className="mr-2 text-gray-500" />
                Notifications par SMS
              </p>
              <p className="text-sm text-gray-500">
                Recevoir des alertes importantes par SMS
              </p>
            </div>
            <Switch 
              checked={notifications.smsNotifications}
              onCheckedChange={() => handleNotificationChange('smsNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-700">Notifications de nouvelles réservations</p>
              <p className="text-sm text-gray-500">
                Être notifié lorsqu'une réservation est confirmée
              </p>
            </div>
            <Switch 
              checked={notifications.newBookingNotifications}
              onCheckedChange={() => handleNotificationChange('newBookingNotifications')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-700">Emails marketing</p>
              <p className="text-sm text-gray-500">
                Recevoir des offres spéciales et des promotions
              </p>
            </div>
            <Switch 
              checked={notifications.marketingEmails}
              onCheckedChange={() => handleNotificationChange('marketingEmails')}
            />
          </div>
        </div>
      </div>
      
      {/* Fonctionnalités à venir */}
      <div className="bg-white rounded-lg shadow-sm border p-6 bg-opacity-60">
        <h3 className="text-lg font-medium mb-2">Autres paramètres</h3>
        <div className="p-4 bg-gray-50 rounded-md border border-dashed border-gray-300">
          <p className="text-gray-600 text-center">
            D'autres fonctionnalités seront bientôt disponibles
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
