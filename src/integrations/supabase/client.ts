
import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = 'https://kfxntunkuchzicizuufg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmeG50dW5rdWNoemljaXp1dWZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Njk5NjcsImV4cCI6MjA2MjE0NTk2N30.KVkFV2LT7Srvn99il2wrW2Yi53KwtsXrHsceT2OXzvo';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});

// Fonction utilitaire pour télécharger une image au bucket
export const uploadCarImage = async (file: File, carId: string, isPrimary = false) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `${carId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from('car-images')
    .upload(filePath, file);

  if (error) {
    console.error('Erreur lors du téléchargement de l\'image:', error);
    throw error;
  }

  // Enregistrer les métadonnées de l'image dans la base de données
  const { error: dbError } = await supabase
    .from('car_images')
    .insert({
      car_id: carId,
      url: filePath,
      is_primary: isPrimary
    });

  if (dbError) {
    console.error('Erreur lors de l\'enregistrement des métadonnées de l\'image:', dbError);
    throw dbError;
  }

  return filePath;
};

// Fonction pour obtenir l'URL publique d'une image
export const getPublicImageUrl = (path: string) => {
  const { data } = supabase.storage
    .from('car-images')
    .getPublicUrl(path);
  
  return data.publicUrl;
};

// Fonction pour récupérer les notifications non lues d'un utilisateur
export const fetchUserNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Erreur lors de la récupération des notifications:', error);
    return [];
  }
  
  return data || [];
};

// Fonction pour marquer une notification comme lue
export const markNotificationAsRead = async (notificationId: string) => {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);
  
  if (error) {
    console.error('Erreur lors de la mise à jour de la notification:', error);
    throw error;
  }
  
  return true;
};

// Configuration des abonnements en temps réel
export const subscribeToUserNotifications = (
  userId: string,
  onNotification: (notification: any) => void
) => {
  return supabase
    .channel('notification-changes')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`
      },
      (payload) => onNotification(payload.new)
    )
    .subscribe();
};

// Fonction pour vérifier si une voiture est disponible sur une période donnée
export const checkCarAvailability = async (carId: string, startDate: string, endDate: string) => {
  const { data, error } = await supabase
    .rpc('check_car_availability', {
      car_id: carId,
      start_date: startDate,
      end_date: endDate
    });
  
  if (error) {
    console.error('Erreur lors de la vérification de disponibilité:', error);
    return false;
  }
  
  return data || false;
};
