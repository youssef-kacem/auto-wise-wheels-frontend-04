
import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
}

const BookingNotifications: React.FC = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'email_confirmation',
      label: 'Confirmation par email',
      description: 'Recevez un email de confirmation après avoir effectué une réservation',
      enabled: true,
      icon: <Mail size={18} />
    },
    {
      id: 'sms_reminder',
      label: 'Rappel par SMS',
      description: 'Recevez un SMS de rappel 24h avant le début de votre location',
      enabled: true,
      icon: <Smartphone size={18} />
    },
    {
      id: 'status_updates',
      label: 'Mises à jour de statut',
      description: 'Soyez informé des modifications concernant votre réservation',
      enabled: false,
      icon: <Bell size={18} />
    }
  ]);

  const handleTogglePreference = (id: string, newStatus: boolean) => {
    const updatedPreferences = preferences.map(pref => 
      pref.id === id ? { ...pref, enabled: newStatus } : pref
    );
    setPreferences(updatedPreferences);
    
    toast({
      title: "Préférence mise à jour",
      description: `Les notifications ont été ${newStatus ? 'activées' : 'désactivées'}.`,
    });
  };

  const handleSavePreferences = () => {
    // Simulation d'enregistrement des préférences
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences de notification ont été sauvegardées.",
      icon: <Check className="h-4 w-4" />
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <Bell className="mr-2 text-autowise-blue" />
        <h2 className="text-xl font-semibold">Préférences de notification</h2>
      </div>
      
      <div className="space-y-6">
        {preferences.map(preference => (
          <div key={preference.id} className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="bg-gray-100 p-2 rounded-md mr-3">
                {preference.icon}
              </div>
              <div>
                <h3 className="font-medium">{preference.label}</h3>
                <p className="text-sm text-gray-600">{preference.description}</p>
              </div>
            </div>
            <Switch 
              checked={preference.enabled}
              onCheckedChange={(checked) => handleTogglePreference(preference.id, checked)}
            />
          </div>
        ))}
      </div>
      
      <button 
        onClick={handleSavePreferences}
        className="btn-primary w-full mt-8"
      >
        Enregistrer mes préférences
      </button>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-medium mb-2">Comment fonctionnent les notifications ?</h3>
        <p className="text-sm text-gray-600">
          Les notifications vous permettent de rester informé sur vos réservations. 
          Vous pouvez choisir de recevoir des emails, des SMS ou les deux selon vos préférences.
          Vous pouvez modifier ces paramètres à tout moment depuis votre profil.
        </p>
      </div>
    </div>
  );
};

export default BookingNotifications;
