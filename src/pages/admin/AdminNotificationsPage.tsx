
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Bell, 
  Calendar, 
  Car, 
  User, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  X,
  Settings,
  Mail,
  Smartphone,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

interface Notification {
  id: string;
  type: 'reservation' | 'return' | 'maintenance' | 'system' | 'user';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

const AdminNotificationsPage: React.FC = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<string>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      type: 'reservation',
      title: 'Nouvelle réservation',
      message: 'Julie Martin a réservé une BMW Série 5 du 25/05/2023 au 30/05/2023.',
      timestamp: new Date('2023-05-24T10:15:00'),
      read: false,
      priority: 'medium'
    },
    {
      id: 'notif-2',
      type: 'return',
      title: 'Retour de véhicule aujourd\'hui',
      message: 'Tesla Model 3 doit être retournée aujourd\'hui par Martin Dupont.',
      timestamp: new Date('2023-05-24T09:30:00'),
      read: false,
      priority: 'high'
    },
    {
      id: 'notif-3',
      type: 'maintenance',
      title: 'Maintenance programmée',
      message: 'La BMW X5 est prévue pour une maintenance demain à 14h00.',
      timestamp: new Date('2023-05-23T16:45:00'),
      read: true,
      priority: 'medium'
    },
    {
      id: 'notif-4',
      type: 'system',
      title: 'Sauvegarde système',
      message: 'La sauvegarde automatique du système a été effectuée avec succès.',
      timestamp: new Date('2023-05-23T03:00:00'),
      read: true,
      priority: 'low'
    },
    {
      id: 'notif-5',
      type: 'user',
      title: 'Nouvel utilisateur inscrit',
      message: 'Pierre Leroy s\'est inscrit sur la plateforme AutoWise.',
      timestamp: new Date('2023-05-22T14:20:00'),
      read: true,
      priority: 'low'
    },
    {
      id: 'notif-6',
      type: 'reservation',
      title: 'Réservation annulée',
      message: 'Sophie Lambert a annulé sa réservation pour la Renault Captur.',
      timestamp: new Date('2023-05-21T11:10:00'),
      read: false,
      priority: 'medium'
    },
    {
      id: 'notif-7',
      type: 'return',
      title: 'Retour de véhicule en retard',
      message: 'Audi A4 devait être retournée hier par Thomas Bernard.',
      timestamp: new Date('2023-05-20T17:30:00'),
      read: false,
      priority: 'high'
    },
  ]);

  // Paramètres de notification
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    newReservation: true,
    cancelledReservation: true,
    vehicleReturn: true,
    systemAlerts: false,
    userRegistration: false
  });

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    toast({
      title: "Notification marquée comme lue"
    });
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notif => ({ ...notif, read: true }))
    );
    toast({
      title: "Toutes les notifications marquées comme lues"
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
    toast({
      title: "Notification supprimée"
    });
  };

  // Fonction pour formater la date
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const dayInMs = 86400000; // 24 * 60 * 60 * 1000
    
    // Aujourd'hui
    if (date.toDateString() === now.toDateString()) {
      return `Aujourd'hui à ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    // Hier
    else if (diff < dayInMs && new Date(now.getTime() - dayInMs).toDateString() === date.toDateString()) {
      return `Hier à ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    // Cette semaine
    else if (diff < 7 * dayInMs) {
      const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      return `${days[date.getDay()]} à ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    // Plus ancien
    else {
      return date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getIconByType = (type: string) => {
    switch (type) {
      case 'reservation':
        return <Calendar className="h-5 w-5" />;
      case 'return':
        return <Car className="h-5 w-5" />;
      case 'maintenance':
        return <Clock className="h-5 w-5" />;
      case 'system':
        return <CheckCircle className="h-5 w-5" />;
      case 'user':
        return <User className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Haute';
      case 'medium':
        return 'Moyenne';
      case 'low':
        return 'Basse';
      default:
        return priority;
    }
  };

  // Filtrer les notifications
  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  // Mettre à jour les paramètres de notification
  const updateNotificationSetting = (setting: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: value
    });
    
    toast({
      title: "Paramètre mis à jour",
      description: `Les notifications ${value ? 'seront' : 'ne seront plus'} envoyées pour ce type d'événement.`
    });
  };

  // Gérer l'envoi des notifications test
  const sendTestNotification = (type: string) => {
    toast({
      title: "Notification test envoyée",
      description: `Une notification test de type ${type} a été envoyée.`
    });
  };

  const [activeTab, setActiveTab] = useState('liste');

  return (
    <AdminLayout currentPage="Notifications">
      <div className="bg-white rounded-lg shadow-md mb-6">
        <div className="border-b">
          <div className="flex">
            <button
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'liste'
                  ? 'border-b-2 border-autowise-blue text-autowise-blue'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('liste')}
            >
              Liste des notifications
            </button>
            <button
              className={`px-4 py-3 font-medium text-sm ${
                activeTab === 'parametres'
                  ? 'border-b-2 border-autowise-blue text-autowise-blue'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('parametres')}
            >
              Paramètres de notification
            </button>
          </div>
        </div>
        
        {activeTab === 'liste' && (
          <>
            <div className="p-4 flex flex-wrap justify-between items-center">
              <div className="flex space-x-2 mb-2 sm:mb-0">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === 'all' ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Toutes
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === 'unread' ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Non lues
                </button>
                <button
                  onClick={() => setFilter('reservation')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === 'reservation' ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Réservations
                </button>
                <button
                  onClick={() => setFilter('return')}
                  className={`px-3 py-1 text-sm rounded-full ${
                    filter === 'return' ? 'bg-autowise-blue text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Retours
                </button>
              </div>
              
              <button
                onClick={markAllAsRead}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
              >
                Tout marquer comme lu
              </button>
            </div>
            
            <div className="p-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-10">
                  <Bell className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                  <h3 className="text-lg font-medium text-gray-500">Pas de notifications</h3>
                  <p className="text-gray-500">
                    Vous n'avez aucune notification correspondant à ce filtre.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read ? 'bg-white' : 'bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start">
                          <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                            {getIconByType(notification.type)}
                          </div>
                          <div className="ml-3">
                            <div className="flex items-center">
                              <h3 className="font-medium">{notification.title}</h3>
                              {!notification.read && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Nouveau
                                </span>
                              )}
                              <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                                {getPriorityText(notification.priority)}
                              </span>
                            </div>
                            <p className="text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 rounded-full hover:bg-gray-100"
                              title="Marquer comme lu"
                            >
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 rounded-full hover:bg-gray-100"
                            title="Supprimer"
                          >
                            <X className="h-5 w-5 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
        
        {activeTab === 'parametres' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Settings className="mr-2 h-5 w-5 text-autowise-blue" />
                Paramètres des notifications
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium mb-3">Canaux de notification</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-2 text-gray-500" />
                        <div>
                          <p className="font-medium">Notifications par email</p>
                          <p className="text-sm text-gray-500">Recevez les alertes importantes par email</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notificationSettings.emailAlerts}
                        onCheckedChange={(checked) => updateNotificationSetting('emailAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Smartphone className="h-5 w-5 mr-2 text-gray-500" />
                        <div>
                          <p className="font-medium">Notifications par SMS</p>
                          <p className="text-sm text-gray-500">Recevez les alertes urgentes par SMS</p>
                        </div>
                      </div>
                      <Switch 
                        checked={notificationSettings.smsAlerts}
                        onCheckedChange={(checked) => updateNotificationSetting('smsAlerts', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium mb-3">Types d'événements</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2 text-blue-500" />
                        <p>Nouvelles réservations</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.newReservation}
                        onCheckedChange={(checked) => updateNotificationSetting('newReservation', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <X className="h-5 w-5 mr-2 text-red-500" />
                        <p>Réservations annulées</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.cancelledReservation}
                        onCheckedChange={(checked) => updateNotificationSetting('cancelledReservation', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Car className="h-5 w-5 mr-2 text-green-500" />
                        <p>Retours de véhicules</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.vehicleReturn}
                        onCheckedChange={(checked) => updateNotificationSetting('vehicleReturn', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                        <p>Alertes système</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.systemAlerts}
                        onCheckedChange={(checked) => updateNotificationSetting('systemAlerts', checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-purple-500" />
                        <p>Inscriptions utilisateurs</p>
                      </div>
                      <Switch 
                        checked={notificationSettings.userRegistration}
                        onCheckedChange={(checked) => updateNotificationSetting('userRegistration', checked)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium mb-3">Tester les notifications</h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Envoyez une notification test pour vérifier que tout fonctionne correctement.
                  </p>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => sendTestNotification('email')}
                      className="px-3 py-2 bg-autowise-blue text-white rounded-md hover:bg-blue-700 text-sm flex items-center"
                    >
                      <Mail className="h-4 w-4 mr-1" /> Tester l'email
                    </button>
                    <button 
                      onClick={() => sendTestNotification('sms')}
                      className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm flex items-center"
                    >
                      <Smartphone className="h-4 w-4 mr-1" /> Tester le SMS
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  className="px-4 py-2 bg-autowise-blue text-white rounded-md hover:bg-blue-700 flex items-center"
                  onClick={() => {
                    toast({
                      title: "Paramètres sauvegardés",
                      description: "Vos préférences de notification ont été enregistrées."
                    });
                  }}
                >
                  <Check className="h-4 w-4 mr-2" /> Sauvegarder les paramètres
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminNotificationsPage;
