
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import { supabase, fetchUserNotifications, markNotificationAsRead, subscribeToUserNotifications } from '@/integrations/supabase/client';
import { Notification } from '@/types/supabase';
import { useNavbar } from './contexts/NavbarContext';

const NotificationMenu: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useNavbar();

  // Don't render if there's no user
  if (!user) return null;

  useEffect(() => {
    // Charger les notifications initiales
    const loadNotifications = async () => {
      try {
        const data = await fetchUserNotifications(user.id);
        // Cast the returned data to the correct type
        const typedNotifications = (data || []).map(n => ({
          ...n,
          type: (n.type as 'success' | 'error' | 'info') || 'info'
        })) as Notification[];
        
        setNotifications(typedNotifications);
        setUnreadCount(typedNotifications.filter(n => !n.is_read).length);
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    };

    loadNotifications();

    // S'abonner aux notifications en temps réel
    const subscription = subscribeToUserNotifications(
      user.id,
      (newNotification) => {
        const typedNotification = {
          ...newNotification,
          type: (newNotification.type as 'success' | 'error' | 'info') || 'info'
        } as Notification;
        
        setNotifications(prev => [typedNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
        
        // Afficher un toast pour la nouvelle notification
        toast({
          title: newNotification.title,
          description: newNotification.message,
          variant: newNotification.type === 'error' ? 'destructive' : 'default'
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [user, toast]);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, is_read: true } : n
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Erreur lors du marquage de la notification:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      for (const notification of notifications.filter(n => !n.is_read)) {
        await markNotificationAsRead(notification.id);
      }
      
      setNotifications(notifications.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
      
      toast({
        title: "Notifications",
        description: "Toutes les notifications ont été marquées comme lues"
      });
    } catch (error) {
      console.error('Erreur lors du marquage de toutes les notifications:', error);
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return formatDistanceToNow(new Date(dateStr), { addSuffix: true, locale: fr });
    } catch (error) {
      return 'Date incorrecte';
    }
  };

  return (
    <div className="relative">
      <button 
        className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="text-xs text-blue-600 hover:underline"
                onClick={handleMarkAllAsRead}
              >
                Tout marquer comme lu
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Aucune notification
              </div>
            ) : (
              notifications.map(notification => (
                <div 
                  key={notification.id}
                  className={`p-3 border-b hover:bg-gray-50 ${!notification.is_read ? 'bg-blue-50' : ''}`}
                  onClick={() => !notification.is_read && handleMarkAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <div className={`p-2 rounded-full mr-3 ${getNotificationColor(notification.type)}`}>
                      <span className="sr-only">{notification.type}</span>
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(notification.created_at)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {notifications.length > 0 && (
            <div className="p-2 text-center border-t">
              <button 
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Fermer
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
